import { NextResponse } from 'next/server';
import { DB, Order } from '@/lib/store';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '@/config/shop';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  let orders = DB.getOrders();
  if (email) {
    orders = orders.filter(o => o.customer.email.toLowerCase() === email.toLowerCase());
  }

  return NextResponse.json({ success: true, orders, count: orders.length });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, notes } = body;

    if (!customer || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid order data' }, { status: 400 });
    }

    // Server-side calculation from trusted database products
    const dbProducts = DB.getProducts();
    let calculatedSubtotal = 0;

    const validatedItems = items.map((item: any) => {
      const prod = dbProducts.find((p) => p.id === item.productId || p.slug === item.productId);
      const unitPrice = prod ? prod.price : item.unitPrice || 0;
      const quantity = Math.max(1, parseInt(item.quantity || 1, 10));
      const itemTotal = unitPrice * quantity;
      calculatedSubtotal += itemTotal;

      return {
        productId: prod ? prod.id : item.productId,
        productName: prod ? prod.name : item.productName || 'Royal Fragrance',
        productImage: prod ? prod.mainImage : item.productImage || '/images/hero-approved.jpg',
        size: item.size || (prod ? prod.defaultSize : '12ml'),
        unitPrice,
        quantity,
        totalPrice: itemTotal,
      };
    });

    const calculatedDiscount = Math.max(0, parseInt(body.discount || 0, 10));
    const discountedSubtotal = Math.max(0, calculatedSubtotal - calculatedDiscount);
    const shippingFee = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || discountedSubtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
    const tax = Math.round(discountedSubtotal * 0.18);
    const calculatedTotalAmount = discountedSubtotal + shippingFee;

    const orderNumber = `MEH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      customer,
      items: validatedItems,
      subtotal: calculatedSubtotal,
      discount: calculatedDiscount,
      tax,
      shippingFee,
      totalAmount: calculatedTotalAmount,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'AUTHORIZED',
      orderStatus: 'ORDER_PLACED',
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    DB.addOrder(newOrder);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create order' }, { status: 500 });
  }
}
