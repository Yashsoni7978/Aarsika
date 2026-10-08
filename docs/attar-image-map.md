# Attar Image Asset Map & Regeneration Flag Registry

This document tracks image assets for the Aarsika 7 Attar collection and flags legacy imagery containing regional branding ("Jaipur in a Drop") that require photo regeneration for global brand positioning.

---

## 1. Legacy Image Audit & Regeneration Flags

| Product Name | Current Image File | Legacy Text Printed on Image | Status | Action Required |
| :--- | :--- | :--- | :--- | :--- |
| **Sehar E Gulab** | `/images/gul-e-rooh.jpg` | `"Jaipur in a Drop"` | `NEEDS REGENERATION` | Re-shoot / regenerate bottle imagery without printed city text `"Jaipur in a Drop"`. Prefer clean bottle render or photo without printed location copy. |
| **Maati** | `/images/mitti-royale.jpg` | None | `COMPLIANT` | Clean bottle & clay render. |
| **Saanjh** | `/images/mehraab-signature-edp.jpg` | None | `COMPLIANT` | Clean bottle render. |
| **Shaam Ka Noor** | `/images/oud-e-jaipur.jpg` | `"Oud-e-Jaipur"` | `NEEDS REGENERATION` | Re-label image asset to `"Shaam Ka Noor"`. |
| **Raat Ki Rani** | `/images/raatraani.jpg` | None | `COMPLIANT` | Clean white floral bottle render. |
| **Resham Oudh** | `/images/sapphire-oud.jpg` | None | `COMPLIANT` | Clean silken oud bottle render. |
| **Mehfil** | `/images/saffron-sandal.jpg` | None | `COMPLIANT` | Clean saffron amber bottle render. |

---

## 2. Tax & GST Calculation Audit Report

- **MRP Rule:** All displayed prices (3ml = ₹249, 6ml = ₹399, 12ml = ₹499, 30ml = ₹999) are **Inclusive of GST**.
- **Checkout Behavior:** `subtotal` is calculated directly from variant MRPs. GST is calculated as inclusive 18% GST (`tax = Math.round(subtotal * 0.18 / 1.18)`) and displayed as *"GST Tax (Included)"*.
- **GST Addition Audit:** **No GST is added on top of MRP at checkout.** Cart and checkout totals match exact MRP prices.

---
