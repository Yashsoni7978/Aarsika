"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, Check, ArrowRight, RotateCcw } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#102746]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#FFF9F1] border-2 border-[#C49A52] rounded-2xl w-full max-w-2xl overflow-hidden shadow-royal relative text-[#241C1B]">
        {/* Close Button */}
        <button
          onClick={() => setIsFinderOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 text-[#6b5f55] hover:text-[#8b1a2b] transition-colors rounded-none bg-[#F6EFE2]"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#17345F] text-[#FFF9F1] px-6 py-5 text-center relative border-b border-[#C49A52]/30">
          <span className="text-[10px] tracking-[0.35em] text-[#C49A52] uppercase font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C49A52]" />
            ROYAL SCENT PROFILER
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide mt-1">
            FIND YOUR SIGNATURE FRAGRANCE
          </h2>
          <p className="text-xs text-[#FFF9F1]/80 font-light mt-1">
            Answer 4 questions to reveal your bespoke royal fragrance match.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: MOOD */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-[#C49A52] uppercase font-bold">QUESTION 1 OF 4</span>
                <h3 className="font-serif text-2xl font-bold text-[#17345F] mt-1">What mood defines your presence?</h3>
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
                        ? "border-[#B94D70] bg-[#B94D70]/10 text-[#17345F]"
                        : "border-[#C49A52]/30 bg-[#F8F1E7] hover:border-[#C49A52]"
                    }`}
                  >
                    <span className="font-serif font-bold text-base text-[#17345F]">{m.label}</span>
                    <span className="text-[11px] text-[#756B63] mt-1">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: FRAGRANCE FAMILY */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-[#C49A52] uppercase font-bold">QUESTION 2 OF 4</span>
                <h3 className="font-serif text-2xl font-bold text-[#17345F] mt-1">Which olfactory family draws you?</h3>
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
                        ? "border-[#B94D70] bg-[#B94D70]/10 text-[#17345F]"
                        : "border-[#C49A52]/30 bg-[#F8F1E7] hover:border-[#C49A52]"
                    }`}
                  >
                    <span className="font-serif font-bold text-base text-[#17345F] block">{f.label}</span>
                    <span className="text-[11px] text-[#756B63] mt-1 block">{f.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: INTENSITY */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-[#C49A52] uppercase font-bold">QUESTION 3 OF 4</span>
                <h3 className="font-serif text-2xl font-bold text-[#17345F] mt-1">Desired sillage &amp; intensity?</h3>
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
                        ? "border-[#B94D70] bg-[#B94D70]/10 text-[#17345F]"
                        : "border-[#C49A52]/30 bg-[#F8F1E7] hover:border-[#C49A52]"
                    }`}
                  >
                    <span className="font-serif font-bold text-base text-[#17345F] block">{i.label}</span>
                    <span className="text-[11px] text-[#756B63] mt-1 block">{i.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: OCCASION */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <span className="text-[10px] tracking-widest text-[#C49A52] uppercase font-bold">FINAL QUESTION</span>
                <h3 className="font-serif text-2xl font-bold text-[#17345F] mt-1">When will you wear this fragrance?</h3>
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
                    className="p-4 rounded-xl border border-[#C49A52]/30 bg-[#F8F1E7] hover:border-[#C49A52] hover:bg-[#B94D70]/10 text-left transition-all"
                  >
                    <span className="font-serif font-bold text-base text-[#17345F] block">{o.label}</span>
                    <span className="text-[11px] text-[#756B63] mt-1 block">{o.desc}</span>
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
                  <div className="w-10 h-10 border-2 border-[#C49A52] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-[#17345F] tracking-widest uppercase font-semibold">
                    Consulting Royal Olfactory Archives...
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-1">
                    <span className="text-[10px] tracking-widest text-[#C49A52] uppercase font-bold">YOUR MATCH RESULTS</span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17345F]">
                      RECOMMENDED SIGNATURE FRAGRANCES
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {recommendations.map(({ product, matchScore }) => (
                      <div
                        key={product.id}
                        className="bg-[#F8F1E7] border border-[#C49A52]/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#C49A52]/30 shrink-0">
                            <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-[#17345F] text-[#FFF9F1] px-2 py-0.5 rounded font-bold">
                                {matchScore}% MATCH
                              </span>
                              <span className="text-[10px] text-[#C49A52] font-semibold">{product.type}</span>
                            </div>
                            <h4 className="font-serif text-lg font-bold text-[#17345F] mt-0.5">{product.name}</h4>
                            <p className="text-xs text-[#756B63] line-clamp-1">{product.shortDescription}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                          <span className="font-serif font-bold text-base text-[#30070D]">
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

                  <div className="pt-2 flex justify-between items-center border-t border-[#C49A52]/20">
                    <button
                      onClick={resetQuiz}
                      className="text-xs text-[#756B63] hover:text-[#17345F] flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Scent Quiz</span>
                    </button>
                    <button
                      onClick={() => setIsFinderOpen(false)}
                      className="text-xs text-[#17345F] hover:text-[#B94D70] font-bold uppercase tracking-wider"
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
