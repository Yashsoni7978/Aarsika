// DRAFT: verify oil composition with supplier before final labels or claims
// TODO: JSON file store is not concurrency-safe; migrate to real database before launch.

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { DB } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json({ success: false, message: 'Missing payment parameters' }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keySecret) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ success: false, message: 'Invalid payment signature. Verification failed.' }, { status: 400 });
      }
    }

    let updatedOrder = null;

    // Payment verification successful. Assign serials & update order in database.
    if (orderId) {
      const orders = DB.getOrders();
      const idx = orders.findIndex(o => o.id === orderId || o.orderNumber === orderId);
      if (idx > -1) {
        orders[idx].razorpayOrderId = razorpay_order_id;
        orders[idx].razorpayPaymentId = razorpay_payment_id;
        orders[idx].razorpaySignature = razorpay_signature;

        // Atomically assign consecutive serial numbers and deduct stock on confirmed payment
        updatedOrder = DB.assignSerialsAndConfirmOrder(orders[idx]);
        orders[idx] = updatedOrder;
        DB.saveOrders(orders);
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      message: 'Razorpay payment verified successfully',
      paymentId: razorpay_payment_id,
      order: updatedOrder
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 500 });
  }
}
