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
  },
  {
    id: 26,
    title: "Competitive Positioning Matrix",
    category: "Business",
    ai: "Claude",
    level: "Advanced",
    tags: ["strategy", "competitors", "positioning"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Act as a positioning strategist. Given my product — [describe product] — and 3 competitors — [list competitors] — build a positioning matrix comparing us on 4 axes that actually matter to the buyer (not vanity features). For each axis, state where we win, where we lose, and one repositioning move that would shift the whole map in our favor without a product change."
  },
  {
    id: 27,
    title: "Pricing Page Objection Killer",
    category: "Business",
    ai: "ChatGPT",
    level: "Intermediate",
    tags: ["pricing", "conversion", "objections"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Here are our 3 pricing tiers: [list tiers with price and features]. Write short objection-handling copy (1-2 sentences each) for the 4 most common hesitations a buyer has at this price point — cost, commitment, missing feature, and 'can I do this myself for free.' Place each next to the tier it's most likely to appear on, and keep the tone confident, not apologetic."
  },
  {
    id: 28,
    title: "Board Meeting Agenda Builder",
    category: "Business",
    ai: "Claude",
    level: "Advanced",
    tags: ["board", "governance", "meetings"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Build a 60-minute board meeting agenda for [company/stage]. Allocate time blocks, and for each item specify whether it's for information, discussion, or a decision that requires a vote. Front-load the single most important strategic decision rather than burying it after routine updates, and include a pre-read list of what should be sent 48 hours in advance."
  },
  {
    id: 29,
    title: "Customer Churn Diagnosis",
    category: "Business",
    ai: "ChatGPT",
    level: "Advanced",
    tags: ["churn", "retention", "customers"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "We're seeing [churn rate/number] monthly churn in [customer segment]. Here's what we know about the cancelling accounts: [paste usage patterns, feedback, or survey data]. Act as a retention consultant: propose 3 hypotheses for the root cause ranked by likelihood, the fastest way to validate each one, and one retention offer per hypothesis that addresses the cause rather than just discounting."
  },
  {
    id: 30,
    title: "Elevator Pitch in Three Lengths",
    category: "Business",
    ai: "Claude",
    level: "Beginner",
    tags: ["pitch", "elevator-pitch", "networking"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Write my elevator pitch for [company/product] in 3 lengths: a 10-second version for a hallway introduction, a 30-second version for a networking event, and a 60-second version for an investor who just asked 'so what do you do.' Each version must stand alone — the 30-second isn't just the 10-second with more words, it should add the 'why now' or 'why us' angle."
  },
  {
    id: 31,
    title: "Cornell Notes Converter",
    category: "Study",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["notes", "cornell-method", "organization"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Convert the lecture notes I paste below into the Cornell Notes format: a cues column with 6-10 trigger questions, a main notes column with the key content condensed and organized under those cues, and a 3-sentence summary at the bottom that could stand alone as a study recap. Notes: [paste raw notes here]"
  },
  {
    id: 32,
    title: "Research Paper Source Evaluator",
    category: "Study",
    ai: "Claude",
    level: "Advanced",
    tags: ["research", "sources", "academic-writing"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "I'm writing a research paper on [topic] and considering this source: [paste abstract or summary]. Evaluate it on credibility (author expertise, publication venue, recency), relevance to my specific thesis — [state thesis] — and potential bias. Tell me whether it belongs as a primary source, supporting evidence, or a counter-argument to address, and suggest one search term to find a stronger source if this one is weak."
  },
  {
    id: 33,
    title: "Language Learning Conversation Partner",
    category: "Study",
    ai: "ChatGPT",
    level: "Intermediate",
    tags: ["language-learning", "conversation", "practice"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Act as a conversation partner in [target language] at a [CEFR level, e.g. B1] level. Start a natural dialogue about [topic] and stay fully in the target language unless I write 'switch to English.' After every 3 of my responses, gently correct my 2 biggest grammar or vocabulary mistakes in a short aside, then continue the conversation without breaking the flow."
  },
  {
    id: 34,
    title: "Group Project Task Splitter",
    category: "Study",
    ai: "Gemini",
    level: "Beginner",
    tags: ["group-work", "collaboration", "planning"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "We have a group project on [topic] due [date] with [number] members and these individual strengths: [list members and strengths]. Break the project into clear, non-overlapping workstreams, assign each to the member best suited for it, define what 'done' looks like for each piece, and propose 2 checkpoint dates before the deadline to catch problems early."
  },
  {
    id: 35,
    title: "Docker Compose Environment Generator",
    category: "Coding",
    ai: "Claude",
    level: "Intermediate",
    tags: ["docker", "devops", "local-dev"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Generate a docker-compose.yml for a local development environment with these services: [list services, e.g. Node API, Postgres, Redis]. Include sensible environment variables, a named volume for the database so data survives restarts, health checks on each service, and comments explaining any non-obvious configuration choice. Flag any port that commonly conflicts with a default local install."
  },
  {
    id: 36,
    title: "Legacy Code Onboarding Map",
    category: "Coding",
    ai: "ChatGPT",
    level: "Advanced",
    tags: ["legacy-code", "onboarding", "architecture"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "I'm new to this codebase and need to understand it fast. Here's the directory structure and a sample of key files: [paste tree + file excerpts]. Produce an onboarding map: the likely entry point, how data flows through the top 3 layers, which parts look fragile or under-tested, and 3 targeted questions I should ask the team before touching anything."
  },
  {
    id: 37,
    title: "GraphQL Schema Designer",
    category: "Coding",
    ai: "Claude",
    level: "Advanced",
    tags: ["graphql", "schema", "api-design"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Design a GraphQL schema for a [domain] application with these entities: [list entities and relationships]. Define types, queries, and mutations, using proper nullability (only nullable where a field can genuinely be absent). Flag any N+1 query risk in the relationships and recommend where a DataLoader pattern would be necessary."
  },
  {
    id: 38,
    title: "CI/CD Pipeline From Scratch",
    category: "Coding",
    ai: "ChatGPT",
    level: "Advanced",
    tags: ["ci-cd", "devops", "automation"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Design a CI/CD pipeline for a [language/framework] project deployed to [platform, e.g. AWS, Vercel]. Stages should include: install/cache dependencies, lint, test with coverage threshold, build, and a deploy step gated on a manual approval for production. Write it as a config file for [CI tool, e.g. GitHub Actions] and explain any stage that can run in parallel to cut pipeline time."
  },
  {
    id: 39,
    title: "Regex Builder With Explanation",
    category: "Coding",
    ai: "Gemini",
    level: "Beginner",
    tags: ["regex", "validation", "patterns"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Write a regular expression that matches [describe the exact pattern, e.g. 'US phone numbers with optional country code']. Show 3 strings it should match and 3 it should correctly reject. Then break the regex down piece by piece in plain English so I can modify it myself later without looking it up again."
  },
  {
    id: 40,
    title: "LinkedIn Thought-Leadership Post",
    category: "Social",
    ai: "Claude",
    level: "Intermediate",
    tags: ["linkedin", "thought-leadership", "b2b"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Write a LinkedIn post sharing a lesson I learned from [specific experience/failure/win]. Open with a one-line hook that states the lesson before the story, tell the story in 3 short paragraphs with no corporate speak, and close with a genuine question that invites people to share their own experience — not 'thoughts?'"
  },
  {
    id: 41,
    title: "Community AMA Question Set",
    category: "Social",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["community", "ama", "engagement"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "I'm hosting an AMA about [topic/expertise] for my [platform] community. Generate 12 seed questions to post if engagement is slow, ranging from beginner-friendly to genuinely hard, plus 3 follow-up questions I could ask myself if a great answer needs more depth. Avoid questions I could answer in one word."
  },
  {
    id: 42,
    title: "Viral Thread Structure",
    category: "Social",
    ai: "Claude",
    level: "Intermediate",
    tags: ["twitter", "threads", "storytelling"],
    trending: true,
    createdAt: "2026-07-11",
    prompt:
      "Turn this idea — [paste idea or draft] — into a 7-tweet thread. Tweet 1 is the hook and must work as a standalone tweet even if no one reads further. Tweets 2-6 each deliver one specific, useful point (no filler transitions like 'here's the thing'). Tweet 7 closes with a takeaway and a soft call to action. Keep every tweet under 240 characters."
  },
  {
    id: 43,
    title: "Influencer Collab Pitch Message",
    category: "Social",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["influencer", "outreach", "partnerships"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Write a DM pitching a collaboration to a [platform] creator with [audience size/niche] about [product/campaign]. Reference something specific about their recent content to prove I actually follow them, state exactly what's in it for them (not just for me), and keep the whole message under 80 words so it doesn't read as a mass-sent template."
  },
  {
    id: 44,
    title: "Post-Workout Recovery Planner",
    category: "Fitness",
    ai: "Claude",
    level: "Beginner",
    tags: ["recovery", "sleep", "soreness"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "I just finished a [type of workout, e.g. heavy leg day] session at [intensity level]. Build me a 24-hour recovery plan: what to eat in the first 2 hours, a stretching or mobility sequence for the muscle groups worked, a sleep target, and one sign that would indicate I'm under-recovering and should adjust tomorrow's session."
  },
  {
    id: 45,
    title: "Home Gym Equipment Substitution Guide",
    category: "Fitness",
    ai: "Gemini",
    level: "Beginner",
    tags: ["home-workout", "equipment", "substitutions"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Here's my planned gym workout: [list exercises with sets/reps]. I only have [list home equipment, e.g. resistance bands, one pair of dumbbells] at home today. For each exercise, give the closest home substitution that trains the same muscle group and movement pattern, adjusted reps/tempo to compensate for lower resistance, and flag any exercise with no safe substitute."
  },
  {
    id: 46,
    title: "Race-Day Nutrition Timeline",
    category: "Fitness",
    ai: "ChatGPT",
    level: "Advanced",
    tags: ["running", "race-day", "nutrition"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "I'm running a [distance, e.g. half marathon] with a [start time] start. Build a nutrition and hydration timeline starting the night before through the race itself: what to eat/drink and when, a caffeine strategy if I use one, an in-race fueling plan by mile/km, and one adjustment for [weather condition, e.g. hot and humid] conditions."
  },
  {
    id: 47,
    title: "Mobility Warm-Up Sequence",
    category: "Fitness",
    ai: "Claude",
    level: "Beginner",
    tags: ["mobility", "warm-up", "flexibility"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Build a 10-minute dynamic warm-up sequence before [activity, e.g. heavy squats, a run, a basketball game]. Order movements from general to specific, include rep counts or duration for each, and explain in one line why each movement matters for that specific activity so I understand the purpose, not just the checklist."
  },
  {
    id: 48,
    title: "Freelance Proposal Generator",
    category: "Business",
    ai: "Claude",
    level: "Intermediate",
    tags: ["freelance", "proposal", "client-work"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Write a freelance project proposal for a [service, e.g. website redesign] client. Structure: a one-paragraph understanding of their problem in their own language (not mine), a scope of work broken into clear phases, a timeline with milestones, pricing presented as a package rather than an hourly rate, and one clarifying question that shows I've actually thought about their specific situation."
  },
  {
    id: 49,
    title: "Algorithm Complexity Explainer",
    category: "Coding",
    ai: "ChatGPT",
    level: "Intermediate",
    tags: ["algorithms", "big-o", "interview-prep"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "Here's my solution to [problem, e.g. 'find duplicates in an array']: [paste code]. Determine its exact time and space complexity with a line-by-line justification, not just the final Big-O. Then show one alternative approach with a better complexity tradeoff, and explain the tradeoff in practical terms (when the 'better' one actually isn't worth the added complexity)."
  },
  {
    id: 50,
    title: "Pomodoro Study Session Planner",
    category: "Study",
    ai: "ChatGPT",
    level: "Beginner",
    tags: ["pomodoro", "focus", "productivity"],
    trending: false,
    createdAt: "2026-07-11",
    prompt:
      "I have [total time available] to study [subject/topics] today. Build a Pomodoro-based session plan: how many 25/5 blocks fit, which topic or task goes in each block ordered from hardest to easiest while my focus is fresh, and one specific 5-minute break activity per block that won't kill my momentum (nothing involving a phone feed)."
  }
];