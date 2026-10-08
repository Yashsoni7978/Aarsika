// DRAFT: verify oil composition with supplier before final labels or claims
// TODO: JSON file store is not concurrency-safe; migrate to real database before launch.

import { NextResponse } from 'next/server';
import { DB } from '@/lib/store';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const orders = DB.getOrders();
  const order = orders.find(o => o.id === params.id || o.orderNumber === params.id);

  if (!order) {
    return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, order });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    if (body.orderStatus === 'CANCELLED') {
      const cancelledOrder = DB.cancelOrder(params.id);
      if (!cancelledOrder) {
        return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, order: cancelledOrder });
    }

    const orders = DB.getOrders();
    const index = orders.findIndex(o => o.id === params.id || o.orderNumber === params.id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    const updatedOrder = {
      ...orders[index],
      ...body,
      updatedAt: new Date().toISOString()
    };

    orders[index] = updatedOrder;
    DB.saveOrders(orders);

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update order' }, { status: 500 });
  }
}
