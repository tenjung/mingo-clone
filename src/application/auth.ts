"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { serverClient } from "@/lib/supabase/server";
import { safeReturnPath } from "@/domain/cafe";

export type FormState = { error?: string; success?: string };

export async function googleSignIn(
  _: FormState,
  form: FormData,
): Promise<FormState> {
  const client = await serverClient();
  const origin = (await headers()).get("origin");
  if (!client || !origin)
    return { error: "지금은 Google 로그인에 연결할 수 없습니다." };
  const callback = new URL("/auth/callback", origin);
  callback.searchParams.set("next", safeReturnPath(form.get("next")));
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: callback.href, skipBrowserRedirect: true },
  });
  if (error || !data.url)
    return {
      error: "Google 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    };
  redirect(data.url);
}

export async function signIn(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password)
    return { error: "이메일과 비밀번호를 입력해 주세요." };
  const client = await serverClient();
  if (!client)
    return {
      error: "지금은 로그인에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.",
    };
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error)
    return {
      error:
        error.code === "invalid_credentials"
          ? "이메일 또는 비밀번호가 맞지 않습니다."
          : "로그인에 실패했습니다. 연결 상태와 입력 정보를 확인해 주세요.",
    };
  revalidatePath("/", "layout");
  redirect(safeReturnPath(form.get("next")));
}

export async function signUp(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const nickname = String(form.get("nickname") ?? "").trim();
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length < 8 ||
    nickname.length < 2 ||
    nickname.length > 20
  )
    return {
      error: "이메일, 8자 이상 비밀번호, 2~20자 닉네임을 확인해 주세요.",
    };
  if (password !== form.get("confirmPassword"))
    return { error: "비밀번호가 일치하지 않습니다." };
  const client = await serverClient();
  if (!client)
    return {
      error: "지금은 가입에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.",
    };
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: { nickname } },
  });
  if (error)
    return {
      error:
        "가입에 실패했습니다. 입력 정보를 확인하거나 잠시 후 다시 시도해 주세요.",
    };
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/");
  }
  return {
    success:
      "입력한 이메일의 인증 메일을 확인해 주세요. 인증을 마친 뒤 로그인할 수 있습니다.",
  };
}

export async function signOut() {
  const client = await serverClient();
  const result = await client?.auth.signOut();
  if (result?.error) redirect("/sign-in?message=logout-failed");
  revalidatePath("/", "layout");
  redirect("/");
}
