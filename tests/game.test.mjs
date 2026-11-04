import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../game.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

const questionBlock = source.match(/const QUESTIONS = (\[[\s\S]*?\n\]);\n\nconst TOTAL_QUESTIONS/);
assert.ok(questionBlock, "The question bank should be readable by the test.");

const questions = Function(`"use strict"; return ${questionBlock[1]};`)();

assert.equal(questions.length, 15, "The game must contain exactly 15 questions.");
assert.deepEqual(
  new Set(questions.map((question) => question.answer)),
  new Set(["Complaint", "Answer"]),
  "Only Complaint and Answer may be correct answers."
);

for (const [index, question] of questions.entries()) {
  assert.equal(typeof question.prompt, "string", `Question ${index + 1} needs a prompt.`);
  assert.ok(question.prompt.length >= 60, `Question ${index + 1} needs enough context to avoid ambiguity.`);
  assert.ok(question.prompt.endsWith("?"), `Question ${index + 1} should end as a question.`);
  assert.ok(question.explanation.length >= 45, `Question ${index + 1} needs a useful explanation.`);
}

assert.match(html, /data-answer="Complaint"/);
assert.match(html, /data-answer="Answer"/);
assert.match(html, /aria-live="polite"/);
assert.match(html, /id="review-screen"/);

console.log(`Passed: ${questions.length} questions, two answer choices, review screen, and content checks.`);
