"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Plus,
  Edit,
  Tag,
  Star,
  CheckCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Search,
} from "lucide-react";
import { Product, PRODUCTS as SEED_PRODUCTS } from "@/data/products";
import { Order, Coupon, ProductReview } from "@/lib/store";
import { useShop } from "@/context/ShopContext";

export default function AdminDashboardPage() {
  const { showToast } = useShop();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "orders" | "inventory" | "coupons" | "reviews"
  >("dashboard");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);

  // New product form modal state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCategory, setNewProdCategory] = useState<any>("ATTAR");
  const [newProdType, setNewProdType] = useState("Pure Attar Oil");
  const [newProdDesc, setNewProdDesc] = useState("");

  // New coupon form state
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponVal, setNewCouponVal] = useState("15");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, oRes, cRes, rRes] = await Promise.all([
        fetch("/api/products").then((r) => r.json()),
        fetch("/api/orders").then((r) => r.json()),
        fetch("/api/coupons").then((r) => r.json()),
        fetch("/api/reviews").then((r) => r.json()),
      ]);

      if (pRes.success) setProducts(pRes.products);
      if (oRes.success) setOrders(oRes.orders);
      if (cRes.success) setCoupons(cRes.coupons);
      if (rRes.success) setReviews(rRes.reviews);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const lowStockItems = products.filter((p) => p.stock <= p.lowStockThreshold);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderStatus: newStatus,
          courierName: "Blue Dart Express",
          trackingNumber: `BD${Math.floor(10000000 + Math.random() * 90000000)}IN`,
          trackingUrl: "https://www.bluedart.com/tracking",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Order status updated to ${newStatus}`);
        fetchData();
      }
    } catch (e) {
      showToast("Error updating order status");
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProdName,
          price: Number(newProdPrice),
          category: newProdCategory,
          type: newProdType,
          shortDescription: newProdDesc,
          description: newProdDesc,
          fragranceFamily: "FLORAL",
          gender: "Unisex",
          occasion: "Royal Occasions",
          sku: `MEH-${newProdCategory.slice(0, 3)}-${Date.now()}`,
          barcode: "890432109999",
          stock: 30,
          reservedQuantity: 0,
          lowStockThreshold: 5,
          weight: "0.25 kg",
          dimensions: "6 x 6 x 14 cm",
          mainImage: "/images/gul-e-rooh.jpg",
          secondaryImage: "/photos/attars/resham-oudh-palace 2nd.jpg",
          gallery: ["/images/gul-e-rooh.jpg"],
          sizeOptions: ["12ml Concentrated Oil"],
          defaultSize: "12ml Concentrated Oil",
          ingredients: ["Natural Essential Botanical Extracts"],
          notes: { top: ["Royal Florals"], heart: ["Saffron"], base: ["Sandalwood"] },
          concentration: "Pure Attar Oil",
          longevity: "12+ Hours",
          sillage: "Royal Sillage",
          application: "Glass Applicator",
          benefits: ["Artisanal Craftsmanship"],
          howToWear: "Apply to pulse points.",
          warnings: "External use only.",
          shippingInformation: "Ships in royal box.",
          returnEligibility: "Eligible for 7-day return.",
          tags: ["new", "attar"],
          collections: ["Royal Classics"],
          inStock: true,
          rating: 5.0,
          reviewsCount: 1,
          colorTheme: "pink",
          seoTitle: `${newProdName} | AARSIKA`,
          seoDescription: newProdDesc,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Created product ${newProdName}`);
        setIsAddingProduct(false);
        setNewProdName("");
        setNewProdPrice("");
        setNewProdDesc("");
        fetchData();
      }
    } catch (e) {
      showToast("Error creating product");
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    try {
      const couponsList = [...coupons, {
        code: newCouponCode.toUpperCase(),
        discountType: "PERCENTAGE" as const,
        discountValue: Number(newCouponVal),
        minOrderAmount: 2000,
        expiryDate: "2026-12-31",
        timesUsed: 0,
        isActive: true
      }];
      setCoupons(couponsList);
      showToast(`Coupon ${newCouponCode.toUpperCase()} created`);
      setNewCouponCode("");
    } catch (e) {
      showToast("Failed to create coupon");
    }
  };

  return (
    <div className="bg-wine-950 min-h-screen text-cream">
      {/* Top Admin Navigation Bar */}
      <div className="bg-wine-900 border-b border-gold/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-serif text-2xl font-bold tracking-[0.18em] text-cream">
            AARSIKA <span className="text-gold text-xs font-sans tracking-widest uppercase">ADMIN</span>
          </Link>
          <span className="text-xs bg-gold/20 text-gold-light px-2.5 py-0.5 rounded border border-gold/40 font-mono">
            PORTAL v2.5
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-gold-light flex items-center gap-1">
            <span>VIEW LIVE STORE</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gold/20 pb-4 overflow-x-auto text-xs uppercase tracking-wider font-semibold">
          {[
            { id: "dashboard", label: "Dashboard Overview" },
            { id: "products", label: `Product Manager (${products.length})` },
            { id: "orders", label: `Orders (${orders.length})` },
            { id: "inventory", label: `Inventory & Stock (${lowStockItems.length} Low)` },
            { id: "coupons", label: `Coupons (${coupons.length})` },
            { id: "reviews", label: `Reviews Moderation (${reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gold text-wine-900 font-bold shadow-md"
                  : "bg-wine-900/60 text-cream/80 hover:bg-wine-900 hover:text-cream border border-gold/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Metric Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-wine-900 border border-gold/30 p-6 rounded-xl space-y-2 shadow-royal">
                <div className="flex justify-between items-center text-gold">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-cream/70">TOTAL REVENUE</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-cream">₹ {totalRevenue.toLocaleString("en-IN")}</h3>
                <p className="text-[11px] text-gold-light">Processed orders revenue</p>
              </div>

              <div className="bg-wine-900 border border-gold/30 p-6 rounded-xl space-y-2 shadow-royal">
                <div className="flex justify-between items-center text-gold">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-cream/70">TOTAL ORDERS</span>
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-cream">{totalOrders}</h3>
                <p className="text-[11px] text-gold-light">Live customer orders</p>
              </div>

              <div className="bg-wine-900 border border-gold/30 p-6 rounded-xl space-y-2 shadow-royal">
                <div className="flex justify-between items-center text-gold">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-cream/70">AVG ORDER VALUE</span>
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-cream">₹ {aov.toLocaleString("en-IN")}</h3>
                <p className="text-[11px] text-gold-light">Average basket size</p>
              </div>

              <div className="bg-wine-900 border border-gold/30 p-6 rounded-xl space-y-2 shadow-royal">
                <div className="flex justify-between items-center text-gold">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-cream/70">LOW STOCK ALERTS</span>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-gold">{lowStockItems.length}</h3>
                <p className="text-[11px] text-cream/70">Products require re-stock</p>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-wine-900 border border-gold/30 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl font-bold text-gold-light">RECENT ORDERS</h3>
                <button onClick={() => setActiveTab("orders")} className="text-xs text-gold hover:underline uppercase font-bold">
                  View All Orders
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-gold uppercase border-b border-gold/20">
                    <tr>
                      <th className="py-3 px-2">Order ID</th>
                      <th className="py-3 px-2">Customer</th>
                      <th className="py-3 px-2">Total Amount</th>
                      <th className="py-3 px-2">Payment</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id}>
                        <td className="py-3 px-2 font-serif font-bold text-gold-light">
                          {o.orderNumber}
                          {o.items?.map((it, idx) => (
                            (it.serialString || (it.serials && it.serials.length > 0)) && (
                              <div key={idx} className="text-[9px] font-mono text-gold-light font-normal">
                                {it.serialString || it.serials?.join(', ')}
                              </div>
                            )
                          ))}
                        </td>
                        <td className="py-3 px-2">{o.customer.fullName} ({o.customer.city})</td>
                        <td className="py-3 px-2 font-bold">₹ {o.totalAmount.toLocaleString("en-IN")}</td>
                        <td className="py-3 px-2">
                          <span className={o.paymentStatus === 'CAPTURED' || o.paymentStatus === 'AUTHORIZED' ? "text-success font-semibold" : "text-cream/80"}>
                            {o.paymentMethod} {o.paymentStatus === 'CAPTURED' ? '(PAID)' : ''}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            o.orderStatus === 'DELIVERED'
                              ? 'bg-success/20 text-[#7ec297] border border-success/40'
                              : 'bg-gold/20 text-gold-light'
                          }`}>
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            className="bg-wine-950 border border-gold/40 text-cream p-1 rounded text-[10px] focus:outline-none"
                          >
                            <option value="ORDER_PLACED">ORDER_PLACED</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="PACKED">PACKED</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-3xl font-bold text-gold-light">PRODUCT CATALOGUE MANAGEMENT</h2>
              <button
                onClick={() => setIsAddingProduct(!isAddingProduct)}
                className="px-5 py-2.5 bg-gold text-wine-900 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-cream transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW PRODUCT</span>
              </button>
            </div>

            {/* Modal / Inline New Product Form */}
            {isAddingProduct && (
              <form onSubmit={handleCreateProduct} className="bg-wine-900 border-2 border-gold p-6 rounded-xl space-y-4 text-xs">
                <h3 className="font-serif text-xl font-bold text-gold-light">CREATE NEW FRAGRANCE PRODUCT</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gold-light uppercase mb-1 font-bold">PRODUCT NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amber Royale"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full bg-wine-950 border border-gold/40 p-2.5 rounded text-cream focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gold-light uppercase mb-1 font-bold">PRICE (INR ₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 3499"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full bg-wine-950 border border-gold/40 p-2.5 rounded text-cream focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gold-light uppercase mb-1 font-bold">CATEGORY</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as any)}
                      className="w-full bg-wine-950 border border-gold/40 p-2.5 rounded text-cream focus:outline-none"
                    >
                      <option value="ATTAR">ATTAR</option>
                      <option value="EAU DE PARFUM">EAU DE PARFUM</option>
                      <option value="OUD">OUD</option>
                      <option value="GIFTING">GIFTING</option>
                      <option value="DISCOVERY SETS">DISCOVERY SETS</option>
                      <option value="PERSONAL CARE">PERSONAL CARE</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gold-light uppercase mb-1 font-bold">SHORT DESCRIPTION</label>
                  <textarea
                    required
                    placeholder="Describe the notes and heritage storytelling..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full bg-wine-950 border border-gold/40 p-2.5 rounded text-cream focus:outline-none h-20"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 bg-wine-950 text-cream rounded text-xs font-semibold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gold text-cream rounded text-xs font-semibold uppercase tracking-wider"
                  >
                    SAVE &amp; PUBLISH
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-wine-900 border border-gold/30 p-4 rounded-xl space-y-3 shadow-royal">
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-gold/20">
                    <Image src={p.mainImage} alt={p.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] text-gold tracking-widest uppercase font-bold block">{p.category}</span>
                    <h3 className="font-serif text-xl font-bold text-cream">{p.name}</h3>
                    <p className="text-xs text-gold-light font-mono font-bold mt-1">₹ {p.price.toLocaleString("en-IN")}</p>
                    <p className="text-[11px] text-cream/70 line-clamp-1">{p.shortDescription}</p>
                  </div>
                  <div className="pt-2 border-t border-gold/20 flex justify-between items-center text-xs">
                    <span className="text-[10px] text-cream/80">Stock: <strong className="text-gold-light">{p.stock} units</strong></span>
                    <span className="text-[10px] bg-wine-950 text-gold px-2 py-0.5 rounded font-mono">SKU: {p.sku}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="bg-wine-900 border border-gold/30 p-6 rounded-xl space-y-4">
            <h2 className="font-serif text-3xl font-bold text-gold-light">FULL ORDERS FULFILLMENT PORTAL</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] text-gold uppercase border-b border-gold/20">
                  <tr>
                    <th className="py-3 px-2">Order ID</th>
                    <th className="py-3 px-2">Customer &amp; Address</th>
                    <th className="py-3 px-2">Items</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Courier Tracking</th>
                    <th className="py-3 px-2">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="py-3 px-2 font-serif font-bold text-gold-light">{o.orderNumber}</td>
                      <td className="py-3 px-2">
                        <span className="font-bold block">{o.customer.fullName}</span>
                        <span className="text-[10px] text-cream/70 block">{o.customer.city}, {o.customer.pincode}</span>
                      </td>
                      <td className="py-3 px-2">
                        {o.items.map((i) => i.productName).join(", ")}
                      </td>
                      <td className="py-3 px-2 font-bold">₹ {o.totalAmount.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          o.orderStatus === 'DELIVERED'
                            ? 'bg-success/20 text-[#7ec297] border border-success/40'
                            : 'bg-gold/20 text-gold-light'
                        }`}>
                          {o.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-mono text-[10px] text-gold-light">
                        {o.trackingNumber || "Pending Courier"}
                      </td>
                      <td className="py-3 px-2">
                        <select
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className="bg-wine-950 border border-gold/40 text-cream p-1.5 rounded text-[10px] focus:outline-none"
                        >
                          <option value="ORDER_PLACED">ORDER_PLACED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="PACKED">PACKED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: INVENTORY & STOCK */}
        {activeTab === "inventory" && (
          <div className="bg-wine-900 border border-gold/30 p-6 rounded-xl space-y-4">
            <h2 className="font-serif text-3xl font-bold text-gold-light">INVENTORY &amp; STOCK CONTROLS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-wine-950 p-4 rounded-lg border border-gold/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-base text-cream">{p.name}</h4>
                    <span className="text-[10px] font-mono text-gold-light">SKU: {p.sku}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-cream/80 block">Available Stock:</span>
                    <span className={`font-serif text-2xl font-bold ${p.stock <= p.lowStockThreshold ? "text-crimson" : "text-success"}`}>
                      {p.stock} Units
                    </span>
                    <span className={`block text-[9px] uppercase px-1.5 py-0.5 rounded font-mono mt-0.5 ${p.stock <= p.lowStockThreshold ? "bg-crimson/20 text-crimson" : "bg-success/20 text-[#7ec297]"}`}>
                      {p.stock <= p.lowStockThreshold ? "Low Stock" : "In Stock"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === "coupons" && (
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-gold-light">DISCOUNT COUPON ENGINE</h2>
            <form onSubmit={handleCreateCoupon} className="bg-wine-900 border border-gold/30 p-6 rounded-xl flex gap-4 text-xs">
              <input
                type="text"
                required
                placeholder="New Coupon Code (e.g. WELCOME500)"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="bg-wine-950 border border-gold/40 p-2.5 rounded text-cream uppercase flex-1"
              />
              <input
                type="number"
                required
                placeholder="Discount %"
                value={newCouponVal}
                onChange={(e) => setNewCouponVal(e.target.value)}
                className="bg-wine-950 border border-gold/40 p-2.5 rounded text-cream w-28"
              />
              <button type="submit" className="px-6 py-2.5 bg-gold text-wine-900 font-bold rounded uppercase">
                CREATE CODE
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="bg-wine-900 border border-gold/30 p-4 rounded-xl space-y-1">
                  <span className="font-mono text-xl font-bold text-gold-light">{c.code}</span>
                  <p className="text-xs text-cream">{c.discountValue}% OFF on orders above ₹{c.minOrderAmount}</p>
                  <p className="text-[10px] text-cream/60">Times Used: {c.timesUsed}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
