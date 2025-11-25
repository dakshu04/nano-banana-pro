// lib/uploadToSupabase.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadToSupabase(base64: string) {
  const buffer = Buffer.from(base64, "base64");
  const filename = `generated/${Date.now()}.png`;

  const { error } = await supabase.storage
    .from("text-to-image")
    .upload(filename, buffer, {
      contentType: "image/png",
    });

  if (error) throw error;

  return supabase.storage.from("text-to-image").getPublicUrl(filename).data.publicUrl;
}
