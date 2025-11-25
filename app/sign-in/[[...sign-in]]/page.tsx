import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2]">
      <SignIn />
    </div>
  );
}
