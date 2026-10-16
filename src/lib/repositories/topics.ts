import "server-only";
import { cache } from "react";
import { serverClient } from "@/lib/supabase/server";
export interface Topic {
  id: number;
  title: string;
  category: string;
  content: string;
  created_at: string;
  thumbnail: string | null;
  author: string;
  status: string;
}
export type TopicsResult = {
  topics: Topic[];
  total: number;
  unavailable: boolean;
};
export const listTopics = cache(
  async (
    category = "all",
    search = "",
    page = 1,
    limit = 12,
  ): Promise<TopicsResult> => {
    const client = await serverClient();
    if (!client) return { topics: [], total: 0, unavailable: true };
    let query = client
      .from("topics")
      .select("id,title,category,content,created_at,thumbnail,author,status", {
        count: "exact",
      })
      .eq("status", "PUBLISH")
      .order("created_at", { ascending: false });
    if (category !== "all") query = query.eq("category", category);
    if (search.trim())
      query = query.ilike(
        "title",
        `%${search.replace(/[\%_]/g, "").slice(0, 100)}%`,
      );
    const { data, error, count } = await query.range(
      (page - 1) * limit,
      page * limit - 1,
    );
    return {
      topics: (data ?? []) as Topic[],
      total: count ?? 0,
      unavailable: Boolean(error),
    };
  },
);
export async function findTopic(id: string) {
  const client = await serverClient();
  if (!client || !/^\d+$/.test(id))
    return { topic: null, unavailable: !client };
  const { data, error } = await client
    .from("topics")
    .select("*")
    .eq("id", id)
    .eq("status", "PUBLISH")
    .maybeSingle();
  return { topic: data as Topic | null, unavailable: Boolean(error) };
}
export const currentUser = cache(async () => {
  const client = await serverClient();
  if (!client) return null;
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
});
