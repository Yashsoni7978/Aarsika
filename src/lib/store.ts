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
let memoryReviews: ProductReview[] | null = null;
let memoryReturns: ReturnRequest[] | null = null;

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
      memoryOrders = readJSON<Order[]>('orders.json', [
        {
          id: "ord_1001",
          orderNumber: "MEH-984210",
          customer: {
            fullName: "Ananya Roy",
            email: "ananya.roy@example.com",
            phone: "+91 98201 12345",
            address: "42 Golf Course Road, DLF Phase 5",
            city: "Gurugram",
            state: "Haryana",
            pincode: "122002",
            country: "India",
            gstin: "07AAAAA0000A1Z5"
          },
          items: [
            {
              productId: "p1",
              productName: "Gul-e-Rooh",
              productImage: "/images/gul-e-rooh.jpg",
              size: "12ml Concentrated Oil",
              unitPrice: 2499,
              quantity: 1,
              totalPrice: 2499
            }
          ],
          subtotal: 2499,
          discount: 0,
          tax: 449.82,
          shippingFee: 0,
          totalAmount: 2499,
          paymentMethod: "COD",
          paymentStatus: "CAPTURED",
          orderStatus: "SHIPPED",
          courierName: "Blue Dart Express",
          trackingNumber: "BD987654321IN",
          trackingUrl: "https://www.bluedart.com/tracking?id=BD987654321IN",
          createdAt: "2026-09-25T10:30:00Z",
          updatedAt: "2026-09-26T14:20:00Z"
        }
      ]);
    }
    return memoryOrders;
  },

  saveOrders(orders: Order[]) {
    memoryOrders = orders;
    writeJSON('orders.json', orders);
  },

  addOrder(order: Order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);

    // Deduct stock
    const products = this.getProducts();
    order.items.forEach(item => {
      const prodIndex = products.findIndex(p => p.id === item.productId);
      if (prodIndex > -1) {
        products[prodIndex].stock = Math.max(0, products[prodIndex].stock - item.quantity);
        if (products[prodIndex].stock === 0) {
          products[prodIndex].inStock = false;
        }
      }
    });
    this.saveProducts(products);
  },

  getCoupons(): Coupon[] {
    if (!memoryCoupons) {
      memoryCoupons = readJSON<Coupon[]>('coupons.json', [
        {
          code: "ROYAL15",
          discountType: "PERCENTAGE",
          discountValue: 15,
          minOrderAmount: 2000,
          maxDiscount: 1000,
          expiryDate: "2026-12-31",
          timesUsed: 14,
          isActive: true
        },
        {
          code: "WELCOME500",
          discountType: "FIXED",
          discountValue: 500,
          minOrderAmount: 2500,
          expiryDate: "2026-12-31",
          timesUsed: 8,
          isActive: true
        },
        {
          code: "WELCOME10",
          discountType: "PERCENTAGE",
          discountValue: 10,
          minOrderAmount: 1000,
          expiryDate: "2026-12-31",
          timesUsed: 42,
          isActive: true
        }
      ]);
    }
    return memoryCoupons;
  },

  saveCoupons(coupons: Coupon[]) {
    memoryCoupons = coupons;
    writeJSON('coupons.json', coupons);
  },

  getReviews(): ProductReview[] {
    if (!memoryReviews) {
      memoryReviews = readJSON<ProductReview[]>('reviews.json', [
        {
          id: "rev_1",
          productId: "p1",
          customerName: "Aditi Sharma",
          rating: 5,
          title: "Divine Rose Attar",
          comment: "The most beautiful rose attar I have ever experienced. Aged in sandalwood, it lasts all day on skin.",
          isVerifiedPurchase: true,
          isApproved: true,
          createdAt: "2026-09-10T12:00:00Z"
        },
        {
          id: "rev_2",
          productId: "p2",
          customerName: "Rohan Malhotra",
          rating: 5,
          title: "Piece of Heritage",
          comment: "Mehraab Fragrances feel like a piece of Jaipur heritage. Truly exceptional sillage and regal packaging.",
          isVerifiedPurchase: true,
          isApproved: true,
          createdAt: "2026-09-15T15:30:00Z"
        }
      ]);
    }
    return memoryReviews;
  },

  saveReviews(reviews: ProductReview[]) {
    memoryReviews = reviews;
    writeJSON('reviews.json', reviews);
  },

  getReturns(): ReturnRequest[] {
    if (!memoryReturns) {
      memoryReturns = readJSON<ReturnRequest[]>('returns.json', []);
    }
    return memoryReturns;
  },

  saveReturns(returns: ReturnRequest[]) {
    memoryReturns = returns;
    writeJSON('returns.json', returns);
  }
};
