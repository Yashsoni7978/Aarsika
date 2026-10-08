"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[]; // product ids
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isFinderOpen: boolean;
  toastMessage: string | null;
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsFinderOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load state from localStorage on mount with migration
  useEffect(() => {
    try {
      let savedCart = localStorage.getItem("aarsika_cart");
      if (!savedCart) {
        const legacyCart = localStorage.getItem("mehraab_cart");
        if (legacyCart) {
          savedCart = legacyCart;
          localStorage.setItem("aarsika_cart", legacyCart);
        }
      }
      if (savedCart) setCart(JSON.parse(savedCart));

      let savedWishlist = localStorage.getItem("aarsika_wishlist");
      if (!savedWishlist) {
        const legacyWishlist = localStorage.getItem("mehraab_wishlist");
        if (legacyWishlist) {
          savedWishlist = legacyWishlist;
          localStorage.setItem("aarsika_wishlist", legacyWishlist);
        }
      }
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("aarsika_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("aarsika_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product: Product, size?: string, quantity = 1) => {
    const selectedSize = size || product.defaultSize;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, size: selectedSize, quantity }];
      }
    });

    showToast(`Added ${product.name} (${selectedSize}) to your Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        if (product) showToast(`Removed ${product.name} from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        if (product) showToast(`Saved ${product.name} to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isFinderOpen,
        toastMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsFinderOpen,
        showToast,
        cartCount,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
