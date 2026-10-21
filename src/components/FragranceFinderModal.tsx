"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Sparkles, RotateCcw } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/data/products";
import PearlButton from "./PearlButton";

export const FragranceFinderModal: React.FC = () => {
  const { isFinderOpen, setIsFinderOpen, addToCart } = useShop();

  const [step, setStep] = useState(1);
  const [mood, setMood] = useState("");
  const [family, setFamily] = useState("");
  const [intensity, setIntensity] = useState("");
  const [occasion, setOccasion] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{ product: Product; matchScore: number }[]>([]);

  if (!isFinderOpen) return null;

  const handleCalculate = async () => {
    setLoading(true);
    setStep(5); // Results step
    try {
      const res = await fetch("/api/fragrance-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, family, intensity, occasion })
      });
      const data = await res.json();
      if (data.success) {
        setRecommendations(data.recommendations);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setMood("");
    setFamily("");
    setIntensity("");
    setOccasion("");
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-cream border-2 border-gold rounded-2xl w-full max-w-2xl overflow-hidden shadow-royal relative text-ink">
        {/* Close Button */}
        <button
          onClick={() => setIsFinderOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 text-muted hover:text-wine-900 transition-colors rounded-none bg-ivory"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-wine-900 text-ivory px-6 py-5 text-center relative border-b border-gold/30">
          <span className="text-[10px] tracking-[0.35em] text-gold uppercase font-bold flex items-center justify-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            ROYAL SCENT PROFILER
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide mt-1">
            FIND YOUR SIGNATURE FRAGRANCE
          </h2>
          <p className="text-xs text-ivory/80 font-light mt-1">
            Answer 4 questions to reveal your bespoke royal fragrance match.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: MOOD */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-from-right duration-300">
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-gold-deep uppercase font-mono">QUESTION 1 OF 4</span>
                <h3 className="font-serif text-2xl font-normal text-ink mt-1">What mood defines your presence?</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: "Regal", label: "Regal & Sovereign", desc: "Opulent, commanding & majestic" },
                  { id: "Romantic", label: "Romantic Rose", desc: "Velvety, passionate & timeless" },
                  { id: "Mysterious", label: "Mysterious Oud", desc: "Smoky, deep & alluring" },
                  { id: "Fresh", label: "Monsoon Dew", desc: "Crisp, rain-drenched earth" },
                  { id: "Calm", label: "Serene Chandan", desc: "Peaceful Mysore sandalwood" },
                  { id: "Musky", label: "Ivory Warmth", desc: "Clean, intimate silk aura" }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMood(m.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      mood === m.id
                        ? "border-wine-900 bg-wine-900/10 text-wine-900"
                        : "border-gold/30 bg-ivory hover:border-wine-900"
                    }`}
                  >
                    <span className="font-serif font-medium text-base text-ink">{m.label}</span>
                    <span className="text-[11px] text-muted mt-1">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: FRAGRANCE FAMILY */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-from-right duration-300">
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-gold-deep uppercase font-mono">QUESTION 2 OF 4</span>
                <h3 className="font-serif text-2xl font-normal text-ink mt-1">Which olfactory family draws you?</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "ATTAR", label: "Pure Botanical Attar", desc: "100% Non-alcoholic concentrated oil" },
                  { id: "EAU DE PARFUM", label: "Eau de Parfum Spray", desc: "Modern, radiant 25% extrait strength" },
                  { id: "OUD", label: "Aged Assam Agarwood", desc: "Rare 7-year wild agarwood resin" },
                  { id: "MUSK", label: "White Silk Musk", desc: "Serene, luminous white lotus accord" }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setFamily(f.id);
                      setStep(3);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      family === f.id
                        ? "border-wine-900 bg-wine-900/10 text-wine-900"
                        : "border-gold/30 bg-ivory hover:border-wine-900"
                    }`}
                  >
                    <span className="font-serif font-medium text-base text-ink block">{f.label}</span>
                    <span className="text-[11px] text-muted mt-1 block">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: INTENSITY */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-from-right duration-300">
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-gold-deep uppercase font-mono">QUESTION 3 OF 4</span>
                <h3 className="font-serif text-2xl font-normal text-ink mt-1">Desired sillage &amp; intensity?</h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "Soft", label: "Intimate", desc: "Close to skin, gentle whisper" },
                  { id: "Medium", label: "Signature", desc: "Balanced royal presence" },
                  { id: "Strong", label: "Majestic", desc: "Unmistakable royal sillage" }
                ].map((i) => (
                  <button
                    key={i.id}
                    onClick={() => {
                      setIntensity(i.id);
                      setStep(4);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      intensity === i.id
                        ? "border-wine-900 bg-wine-900/10 text-wine-900"
                        : "border-gold/30 bg-ivory hover:border-wine-900"
                    }`}
                  >
                    <span className="font-serif font-medium text-base text-ink block">{i.label}</span>
                    <span className="text-[11px] text-muted mt-1 block">{i.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: OCCASION */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-from-right duration-300">
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-gold-deep uppercase font-mono">FINAL QUESTION</span>
                <h3 className="font-serif text-2xl font-normal text-ink mt-1">When will you wear this fragrance?</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: "Everyday", label: "Daily Sanctuary", desc: "Work, meditation, daily elegance" },
                  { id: "Evening", label: "Moonlit Dinners", desc: "Intimate evening gatherings" },
                  { id: "Wedding", label: "Royal Weddings", desc: "Celebrations & regal events" },
                  { id: "Festive", label: "Festive Gatherings", desc: "Diwali, Eid, family occasions" },
                  { id: "Royal Occasions", label: "Grand Banquets", desc: "Statement luxury occasions" }
                ].map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setOccasion(o.id);
                      handleCalculate();
                    }}
                    className="p-4 rounded-xl border border-gold/30 bg-ivory hover:border-wine-900 text-left transition-all"
                  >
                    <span className="font-serif font-medium text-base text-ink block">{o.label}</span>
                    <span className="text-[11px] text-muted mt-1 block">{o.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: RESULTS */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {loading ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-wine-900 tracking-widest uppercase font-mono">
                    Consulting Royal Olfactory Archives...
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-1">
                    <span className="text-[10px] tracking-widest text-gold-deep uppercase font-mono">YOUR MATCH RESULTS</span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-wine-900">
                      RECOMMENDED SIGNATURE FRAGRANCES
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {recommendations.map(({ product, matchScore }) => (
                      <div
                        key={product.id}
                        className="bg-ivory border border-gold/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gold/30 shrink-0 bg-sand">
                            <Image src={product.mainImage || "/photos/attars/sehar-e-gulab.jpg"} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-wine-900 text-ivory px-2 py-0.5 rounded-full font-mono font-medium">
                                {matchScore}% MATCH
                              </span>
                              <span className="text-[10px] text-gold-deep font-mono">{product.type}</span>
                            </div>
                            <h4 className="font-serif text-lg font-normal text-ink mt-0.5">{product.name}</h4>
                            <p className="text-xs text-muted line-clamp-1">{product.shortDescription}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                          <span className="font-serif font-bold text-base text-ink">
                            ₹ {product.price.toLocaleString("en-IN")}
                          </span>
                          <PearlButton
                            onClick={() => {
                              addToCart(product);
                              setIsFinderOpen(false);
                            }}
                            variant="burgundy"
                            size="sm"
                          >
                            ADD TO BAG
                          </PearlButton>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center border-t border-gold/20">
                    <button
                      onClick={resetQuiz}
                      className="text-xs text-muted hover:text-wine-900 flex items-center gap-1 font-mono"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Scent Quiz</span>
                    </button>
                    <button
                      onClick={() => setIsFinderOpen(false)}
                      className="text-xs text-wine-900 hover:text-crimson font-mono uppercase tracking-wider"
                    >
                      Close Finder
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
