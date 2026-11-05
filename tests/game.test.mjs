import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../game.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

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

const questionText = questions.map((question) => `${question.prompt} ${question.explanation}`).join(" ");
assert.doesNotMatch(
  questionText,
  /landlord|tenant|security deposit|\brent\b|eviction/i,
  "The question bank must not include landlord-tenant topics."
);

assert.match(
  html,
  /Read each situation\. Does it belong in a complaint or an answer\?/,
  "The introduction should use the approved wording."
);
assert.doesNotMatch(
  html,
  /There are 15 questions\./,
  "The introduction should not announce the question count."
);
assert.match(readme, /restaurant alleges that a supplier delivered spoiled food/i);
assert.match(readme, /auto repair shop raises the statute of limitations/i);
assert.doesNotMatch(
  readme,
  /tenant demands|landlord raises/i,
  "The question review must reflect the replacements."
);

assert.match(html, /data-answer="Complaint"/);
assert.match(html, /data-answer="Answer"/);
assert.match(html, /aria-live="polite"/);
assert.match(html, /id="review-screen"/);
assert.match(html, /COMPLAINT OR ANSWER\?/);
assert.match(html, /CIVIL LITIGATION I/);
assert.match(html, /Score: <span id="final-score">0 \/ 15<\/span>\./);
assert.match(html, /Review Answers/);
assert.match(source, /showScreen\("end"\);[\s\S]*?window\.scrollTo\(\{ top: 0, behavior: "auto" \}\);/);
assert.doesNotMatch(
  html,
  /C \/ A|WHICH PLEADING\?|ACTIVITY COMPLETE|ANSWER REVIEW|ALL 15 QUESTIONS|family-mark|card-mark/,
  "Removed decorative wording should not return."
);
assert.match(styles, /--page: #008c95;/);
assert.match(html, /class="background-shapes" aria-hidden="true"/);
assert.match(styles, /--yellow: #f4c34f;/);
assert.match(styles, /--turquoise: #62d0cb;/);
assert.doesNotMatch(styles, /#d7d8a7|#243036|family-mark|card-mark|linear-gradient|radial-gradient/);

console.log(`Passed: ${questions.length} questions, two answer choices, review screen, and content checks.`);
