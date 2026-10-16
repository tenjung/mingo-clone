import { redirect } from "next/navigation";
export default async function LegacyEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  redirect(`/topic/${(await params).id}`);
}
