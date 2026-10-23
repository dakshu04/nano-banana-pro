// lib/uploadToSupabase.ts
import { createClient } from "@supabase/supabase-js";

export async function uploadToSupabase(base64: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase storage is not configured");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
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
