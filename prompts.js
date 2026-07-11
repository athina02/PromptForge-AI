/**
 * ============================================================
 * PromptForge AI — Data Layer
 * ============================================================
 * This file owns all static content: category metadata and the
 * prompt library itself. It has zero DOM/localStorage logic —
 * app.js is the only module allowed to touch the DOM or state,
 * which keeps data and behavior cleanly separated.
 * ============================================================
 */

/**
 * Category metadata.
 * `id` must exactly match the `category` field used on prompt
 * objects below — everything else (grid, filters, chips) is
 * derived from this single source of truth.
 */
const CATEGORIES = [
  { id: "Business", icon: "💼", blurb: "Pitches, strategy & growth" },
  { id: "Study", icon: "📚", blurb: "Learning & exam prep" },
  { id: "Coding", icon: "💻", blurb: "Ship code faster" },
  { id: "Social", icon: "📱", blurb: "Posts that get noticed" },
  { id: "Fitness", icon: "🏋️", blurb: "Training & nutrition" }
];

/**
 * Prompt library.
 * - id: stable unique integer, used as the key everywhere (favorites, routing, copy)
 * - trending: surfaces the prompt in the Home "Trending" rail
 * - createdAt: ISO date, powers the "Recent" rail (newest first)
 */
const PROMPTS = [
  {
    id: 1,
    title: "Startup Pitch Deck Outline",
    category: "Business",
    ai: "ChatGPT",
    level: "Intermediate",
    tags: ["pitch", "startup", "investors", "deck"],
    trending: true,
    createdAt: "2026-07-08",
    prompt:
      "Act as a startup advisor who has helped raise over $50M in seed funding. Build a 10-slide pitch deck outline for a [industry] startup solving [problem]. For each slide, give: the slide title, the single core message it must land, 3 bullet points of supporting content, and one common investor objection it should pre-empt. Keep language sharp and free of jargon."
  },
  {
    id: 2,
    title: "Cold Outreach Email That Converts",
    category: "Business",
    ai: "Claude",
    level: "Beginner",
    tags: ["email", "sales", "outreach", "b2b"],
    trending: false,
    createdAt: "2026-06-21",
    prompt:
      "Write a 90-word cold outreach email to a [job title] at a [industry] company. The goal is to book a 15-minute call about [product/service]. Open with a specific, researched observation about their business (not a generic compliment), state one measurable benefit, and close with a low-friction call to action. No fluff, no exclamation points, no 'I hope this finds you well.'"
  },
  {
    id: 3,
    title: "Quarterly OKR Planning Framework",
    category: "Business",
    ai: "ChatGPT",
    level: "Advanced",
    tags: ["okr", "planning", "strategy", "leadership"],
    trending: false,
    createdAt: "2026-05-30",
    prompt:
      "Act as a VP of Operations at a Series B company. Help me draft 3 Objectives and 3 Key Results per Objective for the [department] team for Q[X]. Objectives must be qualitative and inspiring; Key Results must be quantitative, time-bound, and independently verifiable. Flag any KR that is actually a task in disguise and rewrite it as a true outcome metric."
  },
  {
    id: 4,
    title: "Negotiation Prep Sheet",
    category: "Business",
    ai: "Claude",
    level: "Intermediate",
    tags: ["negotiation", "contracts", "strategy"],
    trending: false,
    createdAt: "2026-04-11",
    prompt:
      "I'm entering a negotiation for [deal/contract/salary]. My goal is [desired outcome] and my walk-away point is [minimum acceptable outcome]. Build me a prep sheet with: the other side's likely priorities, 3 opening anchors I could use, 2 concessions I can afford to trade, and 3 questions that reveal their real constraints without sounding adversarial."
  },
  {
    id: 5,
    title: "Feynman-Style Concept Explainer",
    category: "Study",
    ai: "Claude",
    level: "Beginner",
    tags: ["learning", "explain", "feynman", "concepts"],
    trending: true,
    createdAt: "2026-07-09",
    prompt:
      "Explain [concept] to me using the Feynman Technique: plain language only, no jargon, and if a technical term is unavoidable define it in the same sentence. Use one concrete real-world analogy. After the explanation, give me 3 questions that test whether I actually understood it, not just whether I can repeat it back."
  },
  {
    id: 6,
    title: "Active-Recall Flashcard Generator",
    category: "Study",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["flashcards", "memory", "exam", "spaced-repetition"],
    trending: false,
    createdAt: "2026-06-15",
    prompt:
      "From the text I paste below, generate 15 active-recall flashcards in a Question / Answer format optimized for spaced repetition. Questions should test understanding and application, not just definition recall. Keep answers under 2 sentences. Text: [paste your notes here]"
  },
  {
    id: 7,
    title: "Essay Structure & Thesis Sharpener",
    category: "Study",
    ai: "Claude",
    level: "Intermediate",
    tags: ["essay", "writing", "thesis", "academic"],
    trending: false,
    createdAt: "2026-05-02",
    prompt:
      "Here is my essay topic: [topic]. First, propose 3 possible thesis statements that take a clear, arguable position — not a vague observation. Then, for the strongest one, outline a 5-paragraph structure where each body paragraph maps to one piece of evidence that directly supports the thesis, and flag the type of counter-argument I should address."
  },
  {
    id: 8,
    title: "Exam Simulation Question Bank",
    category: "Study",
    ai: "Gemini",
    level: "Advanced",
    tags: ["exam", "practice", "test-prep"],
    trending: false,
    createdAt: "2026-03-19",
    prompt:
      "Act as an exam setter for [subject/certification]. Generate 10 practice questions at the difficulty of the real exam: 6 multiple choice, 3 short answer, 1 applied scenario. After the question bank, provide an answer key with a one-line justification for each answer, and mark which topics I should review based on question weighting."
  },
  {
    id: 9,
    title: "Code Review & Refactor Pass",
    category: "Coding",
    ai: "Claude",
    level: "Intermediate",
    tags: ["code-review", "refactor", "clean-code"],
    trending: true,
    createdAt: "2026-07-10",
    prompt:
      "Review the following [language] code as a senior engineer doing a pull request review. Identify: bugs or edge cases, readability issues, performance concerns, and any violation of [language]'s idiomatic conventions. For each issue, show the exact line, explain the risk, and give the corrected snippet. Do not rewrite the whole file unless the architecture itself is broken.\n\n[paste code here]"
  },
  {
    id: 10,
    title: "Bug Reproduction & Root-Cause Trace",
    category: "Coding",
    ai: "ChatGPT",
    level: "Advanced",
    tags: ["debugging", "root-cause", "bug"],
    trending: false,
    createdAt: "2026-06-25",
    prompt:
      "I'm seeing this bug: [describe symptom]. Here's the relevant code and error/stack trace: [paste]. Walk through the execution path step by step to isolate the root cause — don't guess-and-check fixes. Once identified, explain why it happens in one paragraph, then provide the minimal fix that addresses the cause, not just the symptom."
  },
  {
    id: 11,
    title: "REST API Design From Scratch",
    category: "Coding",
    ai: "Claude",
    level: "Advanced",
    tags: ["api", "backend", "architecture", "rest"],
    trending: false,
    createdAt: "2026-05-14",
    prompt:
      "Design a RESTful API for a [domain] application with these core resources: [list resources]. For each resource, give the endpoints (method + path), request/response shape, status codes for success and failure, and pagination/filtering strategy. Flag any resource relationship that would be better served by a nested route vs. a query parameter, and justify the call."
  },
  {
    id: 12,
    title: "Unit Test Generator",
    category: "Coding",
    ai: "ChatGPT",
    level: "Intermediate",
    tags: ["testing", "unit-tests", "qa"],
    trending: false,
    createdAt: "2026-04-28",
    prompt:
      "Write unit tests for the following [language/framework] function using [testing library]. Cover: the happy path, boundary values, invalid input, and any async/error branches. Use descriptive test names that state the expected behavior, not the input values. Group related tests with describe/context blocks.\n\n[paste function here]"
  },
  {
    id: 13,
    title: "SQL Query Optimizer",
    category: "Coding",
    ai: "Gemini",
    level: "Advanced",
    tags: ["sql", "database", "performance"],
    trending: false,
    createdAt: "2026-02-27",
    prompt:
      "Here is a slow SQL query and its EXPLAIN output: [paste query + explain plan]. Identify exactly which operation is the bottleneck (full scan, missing index, bad join order, etc.), explain why in plain terms, and rewrite the query for better performance. List any index you'd recommend adding, with the tradeoff on write performance."
  },
  {
    id: 14,
    title: "Scroll-Stopping Hook Generator",
    category: "Social",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["hooks", "short-form", "reels", "tiktok"],
    trending: true,
    createdAt: "2026-07-07",
    prompt:
      "Write 8 scroll-stopping hooks (first line only, under 12 words each) for a short-form video about [topic]. Use a mix of: a bold claim, a curiosity gap, a relatable pain point, and a contrarian take. No emojis, no clickbait that the video can't actually deliver on."
  },
  {
    id: 15,
    title: "Carousel Post Script",
    category: "Social",
    ai: "Claude",
    level: "Intermediate",
    tags: ["carousel", "instagram", "linkedin", "content"],
    trending: false,
    createdAt: "2026-06-09",
    prompt:
      "Write an 8-slide carousel post about [topic] for [platform]. Slide 1 is the hook (one bold line, no setup). Slides 2–7 each make one clear point with a short supporting line — no slide should require the reader to have seen another slide to make sense. Slide 8 is a specific call to action, not 'follow for more.' Keep total word count under 160."
  },
  {
    id: 16,
    title: "Brand Voice Guideline Builder",
    category: "Social",
    ai: "Claude",
    level: "Advanced",
    tags: ["branding", "voice", "copywriting"],
    trending: false,
    createdAt: "2026-04-03",
    prompt:
      "Based on this description of my brand — [describe product, audience, and 2-3 competitors] — define a voice and tone guide: 4 voice traits (each with a 'we sound like this / not like this' example), 3 words we never use, and a sample caption rewritten in this voice from a generic version I'll provide: [paste generic caption]."
  },
  {
    id: 17,
    title: "Comment-Reply Response Bank",
    category: "Social",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["engagement", "community", "replies"],
    trending: false,
    createdAt: "2026-03-01",
    prompt:
      "Generate 10 short, on-brand reply templates for common comment types on [platform] posts about [topic]: a compliment, a question about price/availability, a skeptical comment, a complaint, and a request for a follow. Each reply should sound like a person, not a script — vary sentence length and avoid corporate phrasing like 'we appreciate your feedback.'"
  },
  {
    id: 18,
    title: "12-Week Strength Progression Plan",
    category: "Fitness",
    ai: "ChatGPT",
    level: "Intermediate",
    tags: ["strength", "program", "gym"],
    trending: true,
    createdAt: "2026-07-05",
    prompt:
      "Design a 12-week strength training program for someone at [experience level] training [days per week], with access to [equipment]. Structure it in 3 4-week blocks with progressive overload (specify the exact progression rule, e.g. +2.5kg or +1 rep per week). Include main lifts, accessory work, and a deload guideline. Flag any exercise that needs a form cue for safety."
  },
  {
    id: 19,
    title: "Macro-Based Meal Plan",
    category: "Fitness",
    ai: "Gemini",
    level: "Beginner",
    tags: ["nutrition", "macros", "meal-plan"],
    trending: false,
    createdAt: "2026-05-22",
    prompt:
      "Build a 1-day meal plan hitting approximately [calories] kcal with a macro split of [protein/carbs/fat grams], for someone who [dietary restrictions/preferences]. Give 4 meals plus 1 snack, with realistic portion sizes in grams, and a quick swap option for each meal for variety. Keep grocery items common and affordable."
  },
  {
    id: 20,
    title: "Injury-Aware Workout Modifier",
    category: "Fitness",
    ai: "Claude",
    level: "Advanced",
    tags: ["injury", "mobility", "modification"],
    trending: false,
    createdAt: "2026-06-30",
    prompt:
      "I have [injury/limitation] and my planned workout today is: [list exercises]. For each exercise, tell me whether to keep it, modify it, or replace it, and give the exact substitution with a reason tied to the limitation. This is not medical advice — remind me to confirm with a physio if pain is sharp or worsening, then proceed with the modifications."
  },
  {
    id: 21,
    title: "Habit-Stacking Routine Designer",
    category: "Fitness",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["habits", "routine", "consistency"],
    trending: false,
    createdAt: "2026-02-14",
    prompt:
      "Help me stack a new habit — [new habit, e.g. 10 min mobility] — onto an existing routine I already do consistently: [existing habit, e.g. morning coffee]. Give me the exact trigger phrase ('After I ___, I will ___'), the smallest viable version of the habit for low-motivation days, and one way to track the streak without needing an app."
  },
  {
    id: 22,
    title: "Investor Update Email",
    category: "Business",
    ai: "Claude",
    level: "Advanced",
    tags: ["investors", "update", "reporting"],
    trending: false,
    createdAt: "2026-01-20",
    prompt:
      "Write a monthly investor update email for [company]. Structure: one-line headline metric, 3 wins, 2 challenges (stated honestly, not spun), 1 specific ask for help, and key metrics in a short table (MRR, growth %, burn, runway). Tone: direct and confident, never defensive about the challenges section."
  },
  {
    id: 23,
    title: "Git Commit Message Cleaner",
    category: "Coding",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["git", "commits", "workflow"],
    trending: false,
    createdAt: "2026-01-05",
    prompt:
      "Rewrite the following list of messy git commit messages into clean, conventional-commit-style messages (type(scope): summary). Group related commits if they'd be better squashed, and flag any commit message that's too vague to know what actually changed without reading the diff.\n\n[paste commit list here]"
  },
  {
    id: 24,
    title: "Study Schedule From a Syllabus",
    category: "Study",
    ai: "Gemini",
    level: "Intermediate",
    tags: ["schedule", "syllabus", "planning"],
    trending: false,
    createdAt: "2026-06-18",
    prompt:
      "Here is my course syllabus and exam date: [paste topics + date]. Build a week-by-week study schedule working backward from the exam, allocating more time to topics marked as high-weight, and reserving the final week entirely for practice tests and weak-area review. Tell me which weeks are at risk of overload based on topic density."
  },
  {
    id: 25,
    title: "Platform-Native Caption Adapter",
    category: "Social",
    ai: "Claude",
    level: "Beginner",
    tags: ["captions", "repurposing", "multi-platform"],
    trending: false,
    createdAt: "2026-05-08",
    prompt:
      "Take this core message — [paste your message/idea] — and adapt it into 3 native captions: one for Instagram (visual-first, short), one for LinkedIn (context-first, slightly longer, no hashtags), and one for X/Twitter (under 280 characters, punchy). Each should read as if written for that platform, not copy-pasted across."
  }
];
