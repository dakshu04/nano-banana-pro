// config/plans.ts
import { Plan } from "@prisma/client"; // Import the Enum from your Prisma Schema

export interface PlanItem {
  key: Plan;            // Matches your Prisma Enum
  name: string;
  priceId: string;      // The "Product ID" from Dodo Payments
  price: number;
  description: string;
  credits: number;
  features: string[];
}

export const PLANS: PlanItem[] = [
  {
    key: Plan.FREE,
    name: "Free Starter",
    priceId: "", // Free plan has no ID usually
    price: 0,
    description: "For hobbyists just starting out.",
    credits: 0,
    features: [
      "5 Credits per month",
      "Basic Support",
      "Low Resolution"
    ]
  },
  {
    key: Plan.CREATOR,
    name: "Creator",
    priceId: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_CREATOR!, // Environment variable
    price: 19,
    description: "Perfect for independent creators.",
    credits: 100,
    features: [
      "100 Credits per month",
      "Priority Support",
      "High Resolution",
      "Commercial License"
    ]
  },
  {
    key: Plan.PREMIUM,
    name: "Premium",
    priceId: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PREMIUM!,
    price: 49,
    description: "For power users who need more.",
    credits: 500,
    features: [
      "500 Credits per month",
      "24/7 Support",
      "4K Resolution",
      "API Access"
    ]
  },
  {
    key: Plan.PRO,
    name: "Pro Agency",
    priceId: process.env.NEXT_PUBLIC_DODO_PRODUCT_ID_PRO!,
    price: 99,
    description: "For agencies and teams.",
    credits: 1000,
    features: [
      "Unlimited Credits",
      "Dedicated Manager",
      "Raw Files",
      "SSO Authentication"
    ]
  }
];