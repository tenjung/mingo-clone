import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

type NewTopic = {
  title: string;
  category: string;
  content: string;
  author: string;
};
type Attachment = { file: File; extension: string } | null;
type WriteResult =
  | { id: number; error: null }
  | { id: null; error: "upload" | "insert" };

export async function insertTopic(
  client: SupabaseClient,
  topic: NewTopic,
  attachment: Attachment,
): Promise<WriteResult> {
  let thumbnail: string | null = null;
  let uploadedPath: string | null = null;
  if (attachment) {
    uploadedPath = `topics/${topic.author}/${crypto.randomUUID()}.${attachment.extension}`;
    const { error } = await client.storage
      .from("files")
      .upload(uploadedPath, attachment.file);
    if (error) return { id: null, error: "upload" };
    thumbnail = client.storage.from("files").getPublicUrl(uploadedPath)
      .data.publicUrl;
  }
  const { data, error } = await client
    .from("topics")
    .insert({ ...topic, status: "PUBLISH", thumbnail })
    .select("id")
    .single();
  if (error) {
    if (uploadedPath) await client.storage.from("files").remove([uploadedPath]);
    return { id: null, error: "insert" };
  }
  return { id: data.id, error: null };
}

export async function deleteOwnedTopic(
  client: SupabaseClient,
  id: string,
  author: string,
) {
  const { data, error } = await client
    .from("topics")
    .delete()
    .eq("id", id)
    .eq("author", author)
    .select("id");
  return !error && Boolean(data?.length);
}
