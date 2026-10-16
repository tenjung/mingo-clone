import { test } from "node:test";
import assert from "node:assert/strict";
import {
  safeReturnPath,
  plainText,
  serializeContent,
  boardLabel,
  writableBoards,
} from "../src/domain/cafe.ts";

test("login redirect stays on this cafe, including malicious URL forms", () => {
  for (const path of [
    "https://example.com",
    "//example.com",
    "/\\example.com",
    "/\r\nLocation: https://example.com",
    "/\t/evil.example",
    "/\u0000/evil.example",
    null,
  ])
    assert.equal(safeReturnPath(path), "/");
  assert.equal(safeReturnPath("/write?board=photo"), "/write?board=photo");
});

test("original BlockNote inline text and nested content remain readable", () => {
  const content = JSON.stringify([
    {
      type: "paragraph",
      content: [
        { text: "김다현을 " },
        {
          type: "link",
          href: "https://example.com",
          content: [{ text: "응원해요" }],
        },
      ],
      children: [{ content: [{ text: "함께해요" }] }],
    },
  ]);
  assert.equal(plainText(content).trim(), "김다현을 응원해요\n함께해요");
});

test("plain text and malformed legacy JSON are rendered as text", () => {
  assert.equal(plainText("오늘도 응원해요"), "오늘도 응원해요");
  assert.equal(plainText("{invalid"), "{invalid");
});

test("new posts use the original BlockNote content contract", () => {
  const serialized = serializeContent("첫인사");
  assert.equal(plainText(serialized).trim(), "첫인사");
  assert.equal(JSON.parse(serialized)[0].type, "paragraph");
});

test("members cannot publish notices and legacy categories remain labeled", () => {
  assert.ok(!writableBoards.some((board) => String(board.id) === "notice"));
  assert.equal(boardLabel("programming"), "이전 게시글");
  assert.equal(boardLabel("letter"), "다현에게");
});
