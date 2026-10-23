import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false, noarchive: true },
};

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2]">
      <SignIn />
    </div>
  );
}
