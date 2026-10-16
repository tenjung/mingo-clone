"use client";

import { useActionState, type ReactNode } from "react";
import type { FormState } from "@/application/auth";

export function ActionForm({
  action,
  children,
  submit,
  pendingText = "처리 중…",
}: {
  action: (state: FormState, data: FormData) => Promise<FormState>;
  children: ReactNode;
  submit: string;
  pendingText?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="action-form">
      {children}
      {state.error && (
        <p className="form-message error" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="form-message success" role="status">
          {state.success}
        </p>
      )}
      <button
        className="button primary"
        disabled={pending || Boolean(state.success)}
        type="submit"
      >
        {pending ? pendingText : submit}
      </button>
    </form>
  );
}
