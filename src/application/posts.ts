"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { serverClient } from "@/lib/supabase/server";
import { insertTopic, deleteOwnedTopic } from "@/lib/repositories/topic-writes";
import { serializeContent, writableBoards } from "@/domain/cafe";
import type { FormState } from "./auth";

export async function publishPost(
  _: FormState,
  form: FormData,
): Promise<FormState> {
  const client = await serverClient();
  if (!client)
    return {
      error:
        "게시판에 연결할 수 없습니다. 작성한 내용은 이 화면에 남아 있습니다.",
    };
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return { error: "로그인 후 글을 등록해 주세요." };
  const title = String(form.get("title") ?? "").trim();
  const content = String(form.get("content") ?? "").trim();
  const category = String(form.get("category") ?? "");
  if (
    !title ||
    title.length > 100 ||
    !content ||
    content.length > 20000 ||
    !writableBoards.some((b) => b.id === category)
  )
    return {
      error:
        "게시판을 선택하고 제목(100자 이내)과 본문(20,000자 이내)을 입력해 주세요.",
    };
  const file = form.get("photo");
  if (category === "photo" && (!(file instanceof File) || file.size === 0))
    return { error: "사진첩에는 사진을 함께 올려 주세요." };
  let attachment: { file: File; extension: string } | null = null;
  if (file instanceof File && file.size > 0) {
    const extensions: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
    if (!extensions[file.type] || file.size > 5 * 1024 * 1024)
      return {
        error: "사진은 5MB 이하의 JPG, PNG, WebP 파일만 등록할 수 있습니다.",
      };
    attachment = { file, extension: extensions[file.type] };
  }
  const result = await insertTopic(
    client,
    { title, content: serializeContent(content), category, author: user.id },
    attachment,
  );
  if (result.error === "upload")
    return {
      error:
        "사진 업로드에 실패했습니다. 저장소 연결과 업로드 권한을 확인해 주세요.",
    };
  if (result.error === "insert")
    return {
      error:
        "글 등록에 실패했습니다. 게시판 연결과 작성 권한을 확인해 주세요. 입력한 내용은 유지됩니다.",
    };
  revalidatePath("/", "layout");
  redirect(`/topic/${result.id}`);
}

export async function deletePost(
  _: FormState,
  form: FormData,
): Promise<FormState> {
  const id = String(form.get("id") ?? "");
  if (!/^\d+$/.test(id) || form.get("confirmed") !== "yes")
    return { error: "삭제 확인 항목에 체크해 주세요." };
  const client = await serverClient();
  if (!client) return { error: "게시판에 연결할 수 없습니다." };
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return { error: "로그인 후 다시 시도해 주세요." };
  const deleted = await deleteOwnedTopic(client, id, user.id);
  if (!deleted)
    return { error: "글을 삭제하지 못했습니다. 본인의 글인지 확인해 주세요." };
  revalidatePath("/", "layout");
  redirect("/board/all");
}
