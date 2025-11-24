import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if(userId) {
    redirect("/dashboard")
  } 
  return (
    <main>
      <div className="flex gap-4">
        <Link href="/sign-in">
          Sign In 
        </Link>
        <Link href="/sign-up">
          Sign Up 
        </Link>
      </div>
    </main>    
  );
}
