// DRAFT: verify oil composition with supplier before final labels or claims
// TODO: JSON file store is not concurrency-safe; migrate to real database before launch.

import fs from 'fs';
import path from 'path';
import { Product, PRODUCTS as SEED_PRODUCTS } from '@/data/products';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  serialString?: string;
  serials?: string[];
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  gstin?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: "RAZORPAY" | "COD";
  paymentStatus: "PENDING" | "AUTHORIZED" | "CAPTURED" | "FAILED" | "REFUNDED" | "CANCELLED";
  orderStatus: "ORDER_PLACED" | "PAYMENT_PENDING" | "PAYMENT_CONFIRMED" | "PROCESSING" | "PACKED" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED" | "RETURN_REQUESTED" | "RETURNED" | "REFUNDED";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  courierName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit?: number;
  timesUsed: number;
  isActive: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerEmail: string;
  reason: string;
  itemNames: string[];
  status: "RETURN_REQUESTED" | "RETURN_APPROVED" | "PICKUP_SCHEDULED" | "RETURN_RECEIVED" | "REFUND_INITIATED" | "REFUND_COMPLETED" | "RETURN_REJECTED";
  trackingNumber?: string;
  refundAmount: number;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'scratch_data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(filename: string) {
  ensureDir();
  return path.join(DATA_DIR, filename);
}

function readJSON<T>(filename: string, fallback: T): T {
  try {
    const file = getFilePath(filename);
    if (!fs.existsSync(file)) {
      return fallback;
    }
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data) as T;
  } catch (e) {
    console.error(`Error reading ${filename}:`, e);
    return fallback;
  }
}

function writeJSON<T>(filename: string, data: T) {
  try {
    const file = getFilePath(filename);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error(`Error writing ${filename}:`, e);
  }
}

// Global seed initializers
let memoryProducts: Product[] | null = null;
let memoryOrders: Order[] | null = null;
let memoryCoupons: Coupon[] | null = null;

export const DB = {
  getProducts(): Product[] {
    if (!memoryProducts) {
      memoryProducts = readJSON<Product[]>('products.json', SEED_PRODUCTS);
      if (memoryProducts.length === 0) memoryProducts = SEED_PRODUCTS;
    }
    return memoryProducts;
  },

  saveProducts(products: Product[]) {
    memoryProducts = products;
    writeJSON('products.json', products);
  },

  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find(p => p.slug === slug || p.id === slug);
  },

  getOrders(): Order[] {
    if (!memoryOrders) {
      memoryOrders = readJSON<Order[]>('orders.json', []);
    }
    return memoryOrders;
  },

  saveOrders(orders: Order[]) {
    memoryOrders = orders;
    writeJSON('orders.json', orders);
  },

  // TODO: JSON file store is not concurrency-safe; migrate to real database before launch.
  assignSerialsAndConfirmOrder(order: Order): Order {
    const products = this.getProducts();

    const updatedItems = order.items.map((item) => {
      const prodIndex = products.findIndex(
        (p) => p.id === item.productId || p.slug === item.productId
      );

      if (prodIndex > -1) {
        const product = products[prodIndex];
        const variantIndex = product.variants?.findIndex(
          (v) => v.size === item.size
        );

        if (variantIndex !== undefined && variantIndex > -1) {
          const variant = product.variants[variantIndex];
          const batchNo = variant.batchNo || 1;
          const batchSize = variant.batchSize || 69;
          const startSerial = variant.nextSerial || 1;

          const assignedSerials: string[] = [];
          for (let i = 0; i < item.quantity; i++) {
            const num = startSerial + i;
            assignedSerials.push(
              `${product.name}, ${item.size}, Batch ${String(batchNo).padStart(2, '0')}, No. ${num} of ${batchSize}`
            );
          }

          // Atomically update variant counter and stock
          variant.nextSerial = startSerial + item.quantity;
          variant.stock = Math.max(0, variant.stock - item.quantity);
          product.stock = Math.max(0, product.stock - item.quantity);
          if (product.stock === 0) product.inStock = false;

          const serialString =
            item.quantity === 1
              ? assignedSerials[0]
              : `${product.name}, ${item.size}, Batch ${String(batchNo).padStart(2, '0')}, No. ${startSerial}–${startSerial + item.quantity - 1} of ${batchSize}`;

          return {
            ...item,
            serials: assignedSerials,
            serialString,
          };
        }
      }
      return item;
    });

    this.saveProducts(products);

    const confirmedOrder: Order = {
      ...order,
      items: updatedItems,
      orderStatus: order.paymentMethod === 'COD' ? 'ORDER_PLACED' : 'PAYMENT_CONFIRMED',
      paymentStatus: order.paymentMethod === 'COD' ? 'PENDING' : 'CAPTURED',
      updatedAt: new Date().toISOString(),
    };

    return confirmedOrder;
  },

  addOrder(order: Order): Order {
    const orders = this.getOrders();
    let finalOrder = order;

    // COD orders confirm immediately; Online orders confirm upon payment verification
    if (order.paymentMethod === 'COD') {
      finalOrder = this.assignSerialsAndConfirmOrder(order);
    }

    orders.unshift(finalOrder);
    this.saveOrders(orders);
    return finalOrder;
  },

  cancelOrder(orderId: string): Order | undefined {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex((o) => o.id === orderId);
    if (orderIndex === -1) return undefined;

    const order = orders[orderIndex];
    if (order.orderStatus === 'CANCELLED') return order;

    // Release stock back to inventory without re-using nextSerial
    const products = this.getProducts();
    order.items.forEach((item) => {
      const prodIndex = products.findIndex(
        (p) => p.id === item.productId || p.slug === item.productId
      );
      if (prodIndex > -1) {
        const product = products[prodIndex];
        product.stock += item.quantity;
        product.inStock = true;

        const variantIndex = product.variants?.findIndex(
          (v) => v.size === item.size
        );
        if (variantIndex !== undefined && variantIndex > -1) {
          product.variants[variantIndex].stock += item.quantity;
        }
      }
    });

    this.saveProducts(products);

    orders[orderIndex].orderStatus = 'CANCELLED';
    orders[orderIndex].paymentStatus = 'CANCELLED';
    orders[orderIndex].updatedAt = new Date().toISOString();
    this.saveOrders(orders);

    return orders[orderIndex];
  },

  getCoupons(): Coupon[] {
    if (!memoryCoupons) {
      memoryCoupons = readJSON<Coupon[]>('coupons.json', [
        {
          code: 'WELCOME500',
          discountType: 'FIXED',
          discountValue: 500,
          minOrderAmount: 2000,
          expiryDate: '2026-12-31T23:59:59Z',
          timesUsed: 12,
          isActive: true,
        },
      ]);
    }
    return memoryCoupons;
  },

  saveCoupons(coupons: Coupon[]) {
    memoryCoupons = coupons;
    writeJSON('coupons.json', coupons);
  },
};
