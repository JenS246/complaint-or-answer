# Complaint or Answer?

Complaint or Answer? is a short browser game for introductory Civil Litigation I students. It asks students to decide whether each of 15 realistic statements or actions belongs in a civil complaint or an answer.

The questions use Pennsylvania pleading concepts, including allegations and requests for relief in a complaint, admissions and denials in an answer, and affirmative defenses pleaded under the heading `New Matter`.

## How it works

- One question appears at a time.
- The student chooses `Complaint` or `Answer`.
- The game gives immediate feedback and a short explanation.
- Progress and score stay visible during play.
- The final screen shows the score and offers a complete answer review.
- Questions are shuffled on each playthrough, but every playthrough includes all 15.
- Keys `1` and `2` select the two answers when a question is active.

The game uses plain HTML, CSS, and JavaScript. It has no external dependencies, accounts, analytics, or backend.

## Run locally

Open `index.html` in a browser, or serve the directory with any static web server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Test

Run the content and structure checks with Node.js:

```bash
node tests/game.test.mjs
```

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the repository root to GitHub Pages whenever the default branch is updated. In the repository settings, set Pages to use **GitHub Actions** as its source.

Live site: https://jens246.github.io/complaint-or-answer/

Repository: https://github.com/JenS246/complaint-or-answer

## Question review

1. **Complaint:** A driver alleges that another driver ran a red light and caused a collision.
2. **Answer:** The sued driver admits the collision but denies running the red light.
3. **Complaint:** A homeowner asks for the cost of repairing a leaking roof.
4. **Answer:** A contractor raises release as New Matter.
5. **Complaint:** An employee alleges unpaid wages under a written agreement.
6. **Answer:** An employer admits work occurred but denies that wages remain unpaid.
7. **Complaint:** A tenant demands return of a security deposit and damages.
8. **Answer:** A landlord raises the statute of limitations as New Matter.
9. **Complaint:** A pedestrian alleges an untreated icy entrance caused a fall.
10. **Answer:** A store responds that reasonable investigation left it without sufficient knowledge to admit or deny a medical-treatment allegation.
11. **Complaint:** A delivery company alleges breach of a written contract and nonpayment.
12. **Answer:** A customer raises payment as New Matter.
13. **Complaint:** A property owner alleges excavation damaged a retaining wall and identifies repair costs.
14. **Answer:** A neighbor admits excavation but denies causing the crack.
15. **Answer:** A clinic admits the treatment date but denies that treatment caused the injury.

The exact student-facing wording and explanations are in `game.js`.

## Legal references

The introductory explanations were checked against the Pennsylvania Rules of Civil Procedure:

- [Rule 1019: Contents of Pleadings](https://www.pacodeandbulletin.gov/secure/pacode/data/231/chapter1000/s1019.html)
- [Rule 1029: Denials and Effect of Failure to Deny](https://www.pacodeandbulletin.gov/secure/pacode/data/231/chapter1000/s1029.html)
- [Rule 1030: New Matter](https://www.pacodeandbulletin.gov/secure/pacode/data/231/chapter1000/s1030.html)

This activity is an introductory classroom exercise, not legal advice.

## Project files

- `index.html`: page structure and accessible screen regions
- `styles.css`: responsive presentation, focus states, and light/dark color tokens
- `game.js`: questions, scoring, feedback, keyboard controls, and review screen
- `tests/game.test.mjs`: dependency-free content checks
- `.github/workflows/pages.yml`: GitHub Pages deployment
