"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Package, Heart, MapPin, Sparkles, LogOut, ExternalLink, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Order } from "@/lib/store";
import { PRODUCTS } from "@/data/products";

export default function AccountPage() {
  const { wishlist, toggleWishlist } = useShop();
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "wishlist" | "addresses">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState({
    name: "Patron",
    email: "patron@aarsika.com",
    phone: "+91 98765 00000",
    city: "New Delhi",
    fragrancePreference: "Damask Rose & Mysore Sandalwood",
  });

  useEffect(() => {
    fetch("/api/orders?email=" + encodeURIComponent(user.email))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
      })
      .catch((e) => console.error(e));
  }, [user.email]);

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#F8F1E7] min-h-screen py-16 text-[#241C1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Account Header */}
        <div className="bg-[#FFF9F1] border border-[#C49A52]/40 rounded-2xl p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-[#17345F] text-[#DDBD78] border-2 border-[#C49A52] flex items-center justify-center font-serif text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] tracking-[0.35em] text-[#C49A52] uppercase font-bold">ROYAL CLIENT</span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#17345F]">{user.name}</h1>
              <p className="text-xs text-[#756B63]">{user.email} &bull; {user.city}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-[#17345F]/10 border border-[#17345F]/30 text-[#17345F] px-4 py-2 rounded-full font-semibold">
              PREFERENCE: {user.fragrancePreference}
            </span>
          </div>
        </div>

        {/* Account Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#C49A52]/30 pb-3 text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "orders" ? "bg-[#17345F] text-[#FFF9F1]" : "bg-[#FFF9F1] text-[#756B63] border border-[#C49A52]/30"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>MY ORDERS ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "wishlist" ? "bg-[#17345F] text-[#FFF9F1]" : "bg-[#FFF9F1] text-[#756B63] border border-[#C49A52]/30"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>SAVED WISHLIST ({wishlistProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "profile" ? "bg-[#17345F] text-[#FFF9F1]" : "bg-[#FFF9F1] text-[#756B63] border border-[#C49A52]/30"
            }`}
          >
            <User className="w-4 h-4" />
            <span>PROFILE &amp; PREFERENCES</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-[#FFF9F1] border border-[#C49A52]/30 rounded-xl p-12 text-center space-y-4">
                <p className="font-serif text-2xl text-[#17345F]">No past orders found for this account.</p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#17345F] text-[#FFF9F1] text-xs font-semibold uppercase tracking-wider rounded"
                >
                  <span>BROWSE CATALOGUE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-[#FFF9F1] border border-[#C49A52]/30 rounded-xl p-6 shadow-soft space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C49A52]/20 pb-3 text-xs">
                    <div>
                      <span className="font-serif font-bold text-lg text-[#17345F]">{ord.orderNumber}</span>
                      <p className="text-[#756B63] text-[11px]">Placed on {new Date(ord.createdAt).toLocaleDateString("en-IN")}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#17345F] text-[#FFF9F1] text-[10px] font-bold rounded uppercase">
                        {ord.orderStatus.replace(/_/g, " ")}
                      </span>
                      <Link
                        href={`/orders/${ord.id}`}
                        className="text-xs text-[#B94D70] font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
                      >
                        <span>VIEW DETAILS</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-12 bg-[#F8F1E7] rounded overflow-hidden border border-[#C49A52]/20 shrink-0">
                            <Image src={it.productImage} alt={it.productName} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-serif font-bold text-[#17345F]">{it.productName}</p>
                            <p className="text-[10px] text-[#756B63]">{it.size} x {it.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-[#241C1B]">₹ {it.totalPrice.toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#C49A52]/20 flex justify-between items-center text-xs font-bold text-[#17345F]">
                    <span>Total Amount Paid:</span>
                    <span className="font-serif text-lg">₹ {ord.totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === "wishlist" && (
          <div className="space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="bg-[#FFF9F1] border border-[#C49A52]/30 rounded-xl p-12 text-center space-y-4">
                <p className="font-serif text-2xl text-[#17345F]">Your wishlist is currently empty.</p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#17345F] text-[#FFF9F1] text-xs font-semibold uppercase tracking-wider rounded"
                >
                  <span>EXPLORE FRAGRANCES</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="bg-[#FFF9F1] border border-[#C49A52]/30 rounded-xl p-4 space-y-3">
                    <div className="relative aspect-square w-full rounded overflow-hidden">
                      <Image src={p.mainImage} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#17345F]">{p.name}</h4>
                      <p className="text-xs text-[#756B63]">{p.type}</p>
                      <span className="font-serif font-bold text-base text-[#17345F] block mt-1">
                        ₹ {p.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${p.slug}`}
                        className="flex-1 text-center py-2 bg-[#17345F] text-[#FFF9F1] text-xs font-semibold uppercase tracking-wider rounded"
                      >
                        VIEW ITEM
                      </Link>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="px-3 py-2 bg-[#F8F1E7] border border-[#C49A52]/40 rounded text-xs text-[#756B63] hover:text-[#B94D70]"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === "profile" && (
          <div className="bg-[#FFF9F1] border border-[#C49A52]/30 rounded-xl p-6 sm:p-8 space-y-6 max-w-2xl">
            <h3 className="font-serif text-2xl font-bold text-[#17345F] border-b border-[#C49A52]/20 pb-3">
              CLIENT PROFILE DETAILS
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#17345F] uppercase mb-1">FULL NAME</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 p-3 rounded text-[#17345F] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#17345F] uppercase mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 p-3 rounded text-[#17345F] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-[#17345F] uppercase mb-1">PHONE</label>
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full bg-[#F8F1E7] border border-[#C49A52]/40 p-3 rounded text-[#17345F] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
