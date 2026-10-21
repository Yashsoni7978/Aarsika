import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { DB } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { amount: clientAmount, currency = 'INR', receipt, notes } = await request.json();

    let amount = clientAmount;
    if (notes && notes.orderId) {
      const dbOrder = DB.getOrders().find(o => o.id === notes.orderId || o.orderNumber === notes.orderId);
      if (dbOrder && dbOrder.totalAmount) {
        amount = dbOrder.totalAmount;
      }
    }

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, message: 'Invalid order amount' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Convert INR rupees to paise for Razorpay
    const amountInPaise = Math.round(amount * 100);

    // If Razorpay keys are configured in environment, call real Razorpay API endpoint
    if (keyId && keySecret) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency,
          receipt: receipt || `rcpt_${Date.now()}`,
          notes: notes || {}
        })
      });

      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json({ success: false, message: data.error?.description || 'Razorpay order creation failed' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        orderId: data.id,
        amount: data.amount,
        currency: data.currency,
        key: keyId
      });
    }

    // Fallback Sandbox Order ID generator when running in demo/development without credentials
    const mockRazorpayOrderId = `order_${crypto.randomBytes(10).toString('hex')}`;
    return NextResponse.json({
      success: true,
      orderId: mockRazorpayOrderId,
      amount: amountInPaise,
      currency,
      key: keyId || 'rzp_test_aarsika_mock_key',
      isSandboxMock: true
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error creating payment order' }, { status: 500 });
  }
}
