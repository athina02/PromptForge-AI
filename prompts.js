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
  { id: "Fitness", icon: "🏋️", blurb: "Training & nutrition" }, 
{ id: "Marketing", icon: "📈", blurb: "Ads & growth marketing" },
{ id: "AI", icon: "🤖", blurb: "AI workflows & automation" },
{ id: "Writing", icon: "✍️", blurb: "Blogs, books & copywriting" },
{ id: "Design", icon: "🎨", blurb: "UI, UX & graphics" },
{ id: "Career", icon: "💼", blurb: "Jobs & interviews" },
{ id: "Finance", icon: "💰", blurb: "Money & investing" },
{ id: "Productivity", icon: "⚡", blurb: "Focus & time management" },
{ id: "Education", icon: "🎓", blurb: "Teaching & learning" },
{ id: "Content", icon: "🎥", blurb: "YouTube & content creation" },
{ id: "Legal", icon: "⚖️", blurb: "Contracts & legal writing" },
{ id: "Travel", icon: "✈️", blurb: "Trips & itineraries" },
{ id: "Health", icon: "🩺", blurb: "Wellness & healthy living" }
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
  }, 
{
  id: 51,
  title: "SaaS Landing Page Copy Generator",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["saas", "landing-page", "copywriting", "conversion"],
  trending: true,
  createdAt: "2026-07-11",
  prompt:
    "Act as a senior SaaS copywriter. Create a complete landing page for [product]. Include: headline, subheadline, hero CTA, 5 key benefits, feature section, customer objections with responses, testimonials placeholders, FAQ, and a strong closing CTA. Focus on clarity, trust, and conversions instead of marketing buzzwords."
},
{
  id: 52,
  title: "YouTube Script Blueprint",
  category: "Content Creation",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["youtube", "script", "content", "creator"],
  trending: true,
  createdAt: "2026-07-11",
  prompt:
    "Write a high-retention YouTube script about [topic]. Structure it into: Hook (first 15 seconds), Introduction, Main Content, Pattern Interrupts, Curiosity Loops, Practical Examples, Final Takeaway, and Call-to-Action. Keep viewers engaged without using misleading clickbait."
},
{
  id: 53,
  title: "AI Startup Idea Validator",
  category: "Startup",
  ai: "Claude",
  level: "Advanced",
  tags: ["startup", "validation", "business", "ideas"],
  trending: false,
  createdAt: "2026-07-11",
  prompt:
    "Evaluate this startup idea: [idea]. Analyze the target audience, market demand, competitors, monetization opportunities, biggest risks, unfair advantages, and first MVP features. Finish with a launch score out of 10 and explain how to improve weak areas before investing time or money."
},
{
  id: 54,
  title: "Advanced Resume Optimizer",
  category: "Career",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["resume", "ats", "jobs", "career"],
  trending: false,
  createdAt: "2026-07-11",
  prompt:
    "Rewrite my resume for the following job description: [paste JD]. Improve ATS compatibility, quantify achievements wherever possible, remove weak wording, strengthen action verbs, and identify any missing skills or experiences that should be highlighted or learned."
},
{
  id: 55,
  title: "Personal Finance Roadmap",
  category: "Finance",
  ai: "Gemini",
  level: "Beginner",
  tags: ["finance", "budget", "saving", "investing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt:
    "Act as a personal finance coach. Based on my monthly income, expenses, savings, debts, and financial goals, create a practical 12-month roadmap. Include a monthly budget, emergency fund target, debt repayment priority, investment suggestions based on risk tolerance, and common financial mistakes I should avoid."
},
{
  id: 56,
  title: "Business Name Generator",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["branding", "startup", "business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Generate 30 unique business names for a [business type]. Each name should be memorable, easy to pronounce, available for branding, and include a one-line explanation of why it works."
},
{
  id: 57,
  title: "Logo Design Brief",
  category: "Design",
  ai: "Claude",
  level: "Intermediate",
  tags: ["logo", "branding", "design"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a professional logo design brief for my company. Include brand personality, target audience, color palette, typography, symbols to use or avoid, and three creative logo concepts."
},
{
  id: 58,
  title: "YouTube Video Script",
  category: "Content",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["youtube", "script", "video"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Write a high-retention YouTube script about [topic]. Include a powerful hook, engaging storytelling, pattern interrupts every minute, and a compelling CTA."
},
{
  id: 59,
  title: "Instagram Reel Ideas",
  category: "Content",
  ai: "Claude",
  level: "Beginner",
  tags: ["instagram", "reels", "content"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Generate 25 viral Instagram Reel ideas for the niche [niche]. Include hook, title, and why each idea has viral potential."
},
{
  id: 60,
  title: "SEO Blog Outline",
  category: "Marketing",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["seo", "blog", "marketing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a complete SEO blog outline targeting the keyword [keyword]. Include headings, FAQs, internal linking ideas, meta title, meta description, and search intent."
},
{
  id: 61,
  title: "Email Newsletter Writer",
  category: "Marketing",
  ai: "Claude",
  level: "Intermediate",
  tags: ["email", "newsletter"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Write a weekly email newsletter for [audience] with an engaging subject line, valuable content, and a strong CTA."
},
{
  id: 62,
  title: "AI Automation Planner",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["automation", "workflow", "ai"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design an AI automation workflow for [business/task]. Identify repetitive tasks, recommended AI tools, automation flow, estimated time savings, and possible risks."
},
{
  id: 63,
  title: "Prompt Optimizer",
  category: "AI",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["prompt", "optimization"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Improve my AI prompt for maximum output quality. Explain weaknesses, rewrite it professionally, and provide three optimized versions for ChatGPT, Claude, and Gemini."
},
{
  id: 64,
  title: "Resume ATS Checker",
  category: "Career",
  ai: "Claude",
  level: "Intermediate",
  tags: ["resume", "ats", "career"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Rewrite my resume for the following job description: [paste JD]. Improve ATS compatibility, quantify achievements, remove weak wording, and identify missing skills."
},
{
  id: 65,
  title: "Interview Question Simulator",
  category: "Career",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["interview", "job"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as a hiring manager for the role [job]. Ask me realistic interview questions one at a time, evaluate my answers, and coach me to improve."
}, 
{
  id: 66,
  title: "Landing Page Copy Generator",
  category: "Marketing",
  ai: "Claude",
  level: "Advanced",
  tags: ["landing-page", "copywriting", "conversion"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Write a high-converting landing page for [product/service]. Include a compelling hero section, benefit-driven headlines, social proof, objection handling, FAQs, and a strong call-to-action. Optimize for conversions, not just readability."
},
{
  id: 67,
  title: "AI SaaS Idea Validator",
  category: "AI",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["startup", "saas", "validation"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Evaluate my AI SaaS idea: [describe idea]. Analyze the target audience, market demand, competitors, pricing strategy, technical complexity, risks, and monetization opportunities. End with a clear Go / Maybe / No-Go recommendation backed by reasoning."
},
{
  id: 68,
  title: "Google Ads Campaign Builder",
  category: "Marketing",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["google-ads", "ppc", "marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as a Google Ads specialist. Build a complete Google Search campaign for [product/service]. Include campaign structure, ad groups, keyword strategy, negative keywords, responsive search ads, extensions, bidding strategy, and optimization tips for maximum ROI."
},
{
  id: 69,
  title: "UX Case Study Generator",
  category: "Design",
  ai: "Claude",
  level: "Advanced",
  tags: ["ux", "case-study", "portfolio"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a professional UX case study for [project]. Include problem statement, research, user personas, journey map, wireframes, design decisions, usability testing, key metrics, lessons learned, and portfolio-ready presentation."
},
{
  id: 70,
  title: "YouTube SEO Optimizer",
  category: "Content",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["youtube", "seo", "content"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Optimize my YouTube video for search. Generate an SEO-friendly title, description, timestamps, tags, hashtags, thumbnail ideas, and a strategy to increase click-through rate and watch time."
},
{
  id: 71,
  title: "Startup Growth Roadmap",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["startup", "growth", "strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as a startup growth advisor. Create a 12-month roadmap for [startup]. Break it into monthly milestones covering product, marketing, hiring, funding, customer acquisition, retention, and KPIs."
},
{
  id: 72,
  title: "AI Business Automation Blueprint",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["automation", "business", "workflow"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a complete AI automation blueprint for [business]. Identify repetitive tasks, recommend AI tools, map workflows, estimate time and cost savings, highlight implementation risks, and prioritize automations by ROI."
},
{
  id: 73,
  title: "High-Converting Sales Page Writer",
  category: "Marketing",
  ai: "Claude",
  level: "Advanced",
  tags: ["sales-page", "copywriting", "conversion"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Write a high-converting sales page for [product/service]. Include an irresistible headline, emotional storytelling, pain points, benefits, social proof, FAQs, objection handling, guarantees, and a compelling CTA optimized for conversions."
},
{
  id: 74,
  title: "Mobile App Launch Strategy",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["app", "launch", "startup"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a complete launch strategy for my mobile app. Include pre-launch marketing, ASO, influencer outreach, Product Hunt launch, social media plan, email campaigns, launch-day checklist, and 90-day growth strategy."
},
{
  id: 75,
  title: "UI Color Palette Generator",
  category: "Design",
  ai: "Claude",
  level: "Intermediate",
  tags: ["ui", "colors", "branding"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Generate a modern UI color system for a [type] app. Include primary, secondary, accent, background, surface, success, warning, and error colors with accessibility considerations and design rationale."
},
{
  id: 76,
  title: "LinkedIn Profile Optimizer",
  category: "Career",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["linkedin", "career", "branding"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Optimize my LinkedIn profile for [job role]. Rewrite the headline, About section, experience, featured section, skills, and profile SEO to attract recruiters and increase profile views."
},
{
  id: 77,
  title: "AI Agent Architecture Planner",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["ai-agent", "architecture", "automation"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design an AI agent architecture for [use case]. Define the agent's goals, tools, memory, reasoning workflow, APIs, error handling, safety checks, scalability, and deployment strategy."
},
{
  id: 78,
  title: "SaaS Pricing Strategy",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["saas", "pricing", "strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as a SaaS pricing consultant. Design a pricing strategy for [product]. Recommend pricing tiers, feature limits, free trial vs freemium, annual discounts, upgrade triggers, and explain the psychology behind each pricing decision."
},
{
  id: 79,
  title: "Brand Identity System",
  category: "Design",
  ai: "Claude",
  level: "Advanced",
  tags: ["branding", "identity", "design"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a complete brand identity system for [brand]. Include mission, vision, values, logo direction, typography, color palette, imagery style, iconography, voice & tone, and practical brand guidelines."
},
{
  id: 80,
  title: "TikTok Viral Content Planner",
  category: "Content",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["tiktok", "viral", "content"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Generate a 30-day TikTok content calendar for [niche]. Include daily video ideas, hooks, captions, hashtags, posting schedule, and audience engagement tactics to maximize reach."
},
{
  id: 81,
  title: "Salary Negotiation Coach",
  category: "Career",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["salary", "negotiation", "career"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Help me negotiate my salary for a [job role]. Prepare negotiation scripts, counter-offers, responses to common objections, confidence tips, and strategies for maximizing total compensation."
},
{
  id: 82,
  title: "AI Prompt Chain Builder",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["prompt-engineering", "workflow", "ai"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a multi-step AI prompt chain for [task]. Break the workflow into specialized prompts, define inputs and outputs for each stage, identify quality checks, and explain how chaining improves the final result over using a single prompt."
},
{
  id: 83,
  title: "AI Customer Support Assistant",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["customer-support", "automation", "ai"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design an AI-powered customer support system for [business]. Include ticket routing, FAQ automation, escalation rules, tone guidelines, response templates, KPIs, and ways to reduce support costs without hurting customer satisfaction."
},
{
  id: 84,
  title: "Facebook Ads Funnel Builder",
  category: "Marketing",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["facebook-ads", "funnels", "meta"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Build a complete Facebook Ads funnel for [product/service]. Include campaign objective, audience targeting, creatives, copy, budget allocation, retargeting strategy, conversion tracking, and optimization plan."
},
{
  id: 85,
  title: "Personal Finance Planner",
  category: "Finance",
  ai: "Claude",
  level: "Intermediate",
  tags: ["budget", "finance", "money"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a personalized financial plan based on my monthly income, expenses, savings, and goals. Include a monthly budget, emergency fund target, investment allocation, debt payoff strategy, and long-term wealth-building roadmap."
},
{
  id: 86,
  title: "Book Writing Blueprint",
  category: "Writing",
  ai: "Claude",
  level: "Advanced",
  tags: ["book", "writing", "author"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Help me write a book about [topic]. Generate a complete chapter outline, writing schedule, target audience, tone, chapter goals, and publishing roadmap from first draft to launch."
},
{
  id: 87,
  title: "Podcast Episode Planner",
  category: "Content",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["podcast", "content", "script"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Plan a professional podcast episode on [topic]. Include a strong opening hook, talking points, audience engagement questions, sponsor placement, outro, and promotional clips for social media."
},
{
  id: 88,
  title: "Productivity System Designer",
  category: "Productivity",
  ai: "Claude",
  level: "Intermediate",
  tags: ["productivity", "habits", "planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a productivity system for someone with [goals]. Combine task management, habit tracking, deep work scheduling, weekly reviews, and burnout prevention into one practical workflow."
},
{
  id: 89,
  title: "E-commerce Store Audit",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["ecommerce", "audit", "conversion"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Audit my e-commerce store. Analyze homepage, product pages, checkout flow, pricing, trust signals, SEO, mobile experience, and conversion rate optimization. Prioritize improvements by expected business impact."
},
{
  id: 90,
  title: "Startup Funding Strategy",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["startup", "fundraising", "vc"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as a startup fundraising advisor. Build a funding strategy for [startup]. Include bootstrapping, angel investors, VCs, grant opportunities, fundraising timeline, pitch improvements, valuation considerations, and investor outreach plan."
},
{
  id: 91,
  title: "Cold DM Outreach Generator",
  category: "Marketing",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["dm", "sales", "outreach"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Write 10 personalized cold DMs for [target audience]. Focus on building trust, creating curiosity, and encouraging replies without sounding spammy."
},
{
  id: 92,
  title: "UI/UX Audit Expert",
  category: "Design",
  ai: "Claude",
  level: "Advanced",
  tags: ["ui", "ux", "audit"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Review my app or website UI/UX. Identify usability issues, accessibility problems, visual hierarchy flaws, navigation improvements, and provide actionable recommendations with priority levels."
},
{
  id: 93,
  title: "YouTube Channel Growth Plan",
  category: "Content",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["youtube", "growth", "creator"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a 90-day YouTube growth plan for [niche]. Cover content strategy, upload schedule, SEO, thumbnails, audience retention, monetization, and analytics review."
},
{
  id: 94,
  title: "Investment Portfolio Advisor",
  category: "Finance",
  ai: "Claude",
  level: "Advanced",
  tags: ["investing", "portfolio", "finance"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Based on my investment goals, risk tolerance, and time horizon, design a diversified investment portfolio. Explain asset allocation, expected risks, rebalancing strategy, and long-term growth potential."
},
{
  id: 95,
  title: "Technical Documentation Writer",
  category: "Writing",
  ai: "Claude",
  level: "Intermediate",
  tags: ["documentation", "technical", "writing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Write professional technical documentation for [software/API]. Include installation, setup, usage examples, troubleshooting, FAQs, and best practices in a developer-friendly format."
},
{
  id: 96,
  title: "Remote Team Management Coach",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["management", "remote", "leadership"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a remote team management strategy for [company]. Cover communication, productivity tracking, meeting structure, team culture, conflict resolution, and performance reviews."
},
{
  id: 97,
  title: "AI Research Assistant",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["research", "analysis", "ai"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as an AI research assistant. Analyze the topic [topic] by summarizing key findings, comparing expert opinions, identifying knowledge gaps, suggesting reliable sources, and proposing future research directions."
},
{
  id: 98,
  title: "Startup SWOT Analysis",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["swot", "strategy", "startup"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Perform a detailed SWOT analysis for [business/startup]. Identify internal strengths, weaknesses, external opportunities, threats, and recommend the top 5 strategic actions based on the analysis."
},
{
  id: 99,
  title: "Content Repurposing Machine",
  category: "Content",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["content", "repurpose", "social-media"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Turn one piece of content into 15 platform-specific formats including YouTube, Instagram, LinkedIn, X, Facebook, blog, email newsletter, Threads, and Shorts while maintaining a consistent message."
},
{
  id: 100,
  title: "AI Startup Idea Generator",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["startup", "ai", "ideas"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Generate 20 AI startup ideas based on [industry]. For each idea include the problem, target customers, revenue model, MVP features, competitors, and market opportunity."
},
{
  id: 101,
  title: "Personal Brand Strategy",
  category: "Marketing",
  ai: "Claude",
  level: "Advanced",
  tags: ["branding", "marketing", "growth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a complete personal branding strategy for [person/profession]. Include positioning, content pillars, audience growth, monetization methods, and a 90-day execution plan."
},
{
  id: 102,
  title: "Freelancer Client Acquisition Plan",
  category: "Career",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["freelance", "clients", "career"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Build a client acquisition strategy for a freelance [profession]. Include outreach methods, portfolio improvements, pricing strategy, proposal templates, and follow-up sequences."
},
{
  id: 103,
  title: "Modern Dashboard UI Planner",
  category: "Design",
  ai: "Claude",
  level: "Advanced",
  tags: ["dashboard", "ui", "ux"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Design a modern analytics dashboard for [product]. Define layout, widgets, KPIs, navigation, responsive behavior, accessibility improvements, and user experience best practices."
},
{
  id: 104,
  title: "Financial Goal Roadmap",
  category: "Finance",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["finance", "planning", "goals"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a financial roadmap to achieve [goal] within [time]. Include monthly saving targets, investment strategy, risk management, milestone tracking, and review schedule."
},
{
  id: 105,
  title: "Long-Form Article Writer",
  category: "Writing",
  ai: "Claude",
  level: "Advanced",
  tags: ["writing", "article", "blog"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Write an in-depth article on [topic] with a compelling introduction, logical sections, supporting evidence, practical examples, FAQs, and a strong conclusion optimized for readability and SEO."
},
{
  id: 106,
  title: "Business Process Optimizer",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["business", "operations", "optimization"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Analyze an existing business process for [company]. Identify bottlenecks, unnecessary steps, automation opportunities, cost reductions, efficiency improvements, KPIs, and provide an optimized workflow."
},
{
  id: 107,
  title: "Product Hunt Launch Planner",
  category: "Marketing",
  ai: "Claude",
  level: "Advanced",
  tags: ["product-hunt", "launch", "marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a complete Product Hunt launch strategy for [product]. Include a 30-day preparation plan, launch-day checklist, hunter outreach, social promotion, community engagement, KPIs, and post-launch follow-up."
},
{
  id: 108,
  title: "Customer Persona Builder",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["persona", "customers", "marketing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Build detailed customer personas for [product/service]. Include demographics, goals, frustrations, buying triggers, objections, favorite platforms, and messaging recommendations."
},
{
  id: 109,
  title: "AI Meeting Notes Summarizer",
  category: "AI",
  ai: "Claude",
  level: "Intermediate",
  tags: ["meetings", "summary", "productivity"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Convert meeting notes into a structured summary with key decisions, action items, owners, deadlines, unresolved questions, and a concise executive overview."
},
{
  id: 110,
  title: "Design System Generator",
  category: "Design",
  ai: "Claude",
  level: "Advanced",
  tags: ["design-system", "ui", "components"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a complete design system for a [web/mobile] application. Define typography, spacing, color tokens, buttons, inputs, cards, navigation, icons, accessibility rules, and component usage guidelines."
},
{
  id: 111,
  title: "Newsletter Content Calendar",
  category: "Content",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["newsletter", "content", "calendar"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Plan a 12-week newsletter content calendar for [audience]. Include weekly themes, subject lines, CTAs, engagement ideas, and growth tactics."
},
{
  id: 112,
  title: "Investment Risk Analyzer",
  category: "Finance",
  ai: "Claude",
  level: "Advanced",
  tags: ["investment", "risk", "analysis"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Analyze the risks of this investment: [investment]. Evaluate market, liquidity, volatility, diversification impact, worst-case scenarios, and risk mitigation strategies."
},
{
  id: 113,
  title: "Technical Interview Coach",
  category: "Career",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["technical", "interview", "career"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as a senior interviewer for [role]. Conduct a mock technical interview with coding, system design, and behavioral questions. Evaluate each answer and suggest improvements."
},
{
  id: 114,
  title: "Storytelling Framework Builder",
  category: "Writing",
  ai: "Claude",
  level: "Intermediate",
  tags: ["storytelling", "writing", "framework"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Transform my idea into a compelling story using proven storytelling frameworks. Include hook, conflict, turning point, emotional payoff, and memorable ending."
},
{
  id: 115,
  title: "Productivity Dashboard Planner",
  category: "Productivity",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["dashboard", "productivity", "planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a personal productivity dashboard with daily priorities, habit tracker, weekly goals, focus metrics, review system, and actionable insights."
},
{
  id: 116,
  title: "Travel Itinerary Optimizer",
  category: "Travel",
  ai: "Claude",
  level: "Intermediate",
  tags: ["travel", "itinerary", "planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Plan an optimized travel itinerary for [destination] over [days]. Include attractions, travel times, food recommendations, budget estimates, backup options for bad weather, and local travel tips."
},
{
  id: 117,
  title: "Competitor Analysis Report",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["competitors", "market", "analysis"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Analyze my business against these competitors: [list competitors]. Compare pricing, positioning, marketing, strengths, weaknesses, customer perception, and identify 10 opportunities to gain a competitive advantage."
},
{
  id: 118,
  title: "Instagram Growth Blueprint",
  category: "Marketing",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["instagram", "growth", "social"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a 90-day Instagram growth strategy for [niche]. Include posting schedule, Reels strategy, Stories, collaborations, hashtags, engagement plan, analytics, and monetization ideas."
},
{
  id: 119,
  title: "AI Workflow Optimizer",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["workflow", "automation", "productivity"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Review my current workflow for [task]. Identify bottlenecks, recommend AI tools, redesign the workflow, estimate time savings, and provide an implementation roadmap."
},
{
  id: 120,
  title: "Figma UI Wireframe Planner",
  category: "Design",
  ai: "Claude",
  level: "Intermediate",
  tags: ["figma", "wireframe", "ui"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Design a wireframe plan for a [web/mobile] app in Figma. Define screens, layout hierarchy, user flow, reusable components, spacing system, and usability recommendations."
},
{
  id: 121,
  title: "Video Editing Workflow",
  category: "Content",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["video", "editing", "content"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a professional video editing workflow for [content type]. Cover project organization, editing sequence, sound design, color grading, captions, exports, and publishing checklist."
},
{
  id: 122,
  title: "Wealth Building Blueprint",
  category: "Finance",
  ai: "Claude",
  level: "Advanced",
  tags: ["wealth", "finance", "investing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Build a long-term wealth creation strategy based on my income, expenses, age, and goals. Include saving, investing, tax efficiency, risk management, and annual review checkpoints."
},
{
  id: 123,
  title: "Career Transition Planner",
  category: "Career",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["career", "transition", "jobs"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Help me transition from [current role] to [target role]. Build a step-by-step roadmap covering skills, certifications, portfolio projects, networking, resume updates, and interview preparation."
},
{
  id: 124,
  title: "Book Summary Generator",
  category: "Writing",
  ai: "Claude",
  level: "Intermediate",
  tags: ["books", "summary", "writing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Summarize the book [title] into key ideas, actionable lessons, memorable quotes, practical applications, and a one-page executive summary."
},
{
  id: 125,
  title: "Deep Work Planner",
  category: "Productivity",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["deep-work", "focus", "planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a Deep Work schedule for someone with [daily routine]. Include focus blocks, distraction management, breaks, recovery, weekly reviews, and performance metrics."
},
{
  id: 126,
  title: "Luxury Travel Planner",
  category: "Travel",
  ai: "Claude",
  level: "Advanced",
  tags: ["luxury", "travel", "planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Plan a luxury trip to [destination]. Include premium hotels, fine dining, unique experiences, transportation, estimated budget, seasonal advice, and a day-by-day itinerary."
},
{
  id: 127,
  title: "Business Expansion Strategy",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["expansion", "growth", "strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a strategic expansion plan for [business]. Evaluate new markets, customer demand, competition, pricing, partnerships, operational challenges, risks, and a 12-month execution roadmap."
},
{
  id: 128,
  title: "Google Analytics Insights",
  category: "Marketing",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["analytics", "marketing", "ga4"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Analyze my Google Analytics data. Identify traffic trends, user behavior, conversion bottlenecks, high-performing pages, weak pages, and provide actionable recommendations to improve performance."
},
{
  id: 129,
  title: "Autonomous AI Agent Planner",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["ai-agent", "planning", "automation"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design an autonomous AI agent for [task]. Define objectives, reasoning loop, tool selection, memory architecture, safety rules, monitoring, and success metrics."
},
{
  id: 130,
  title: "Landing Page UI Blueprint",
  category: "Design",
  ai: "Claude",
  level: "Intermediate",
  tags: ["landing-page", "ui", "design"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a modern landing page UI for [product]. Define layout, sections, CTA placement, typography, color hierarchy, mobile responsiveness, and accessibility improvements."
},
{
  id: 131,
  title: "Content Marketing Roadmap",
  category: "Content",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["content", "marketing", "strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Build a 6-month content marketing roadmap for [brand]. Include content pillars, publishing schedule, SEO topics, distribution channels, KPIs, and repurposing strategy."
},
{
  id: 132,
  title: "Retirement Planning Assistant",
  category: "Finance",
  ai: "Claude",
  level: "Advanced",
  tags: ["retirement", "finance", "planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a retirement plan based on my age, savings, income, lifestyle goals, and retirement target. Include investment strategy, inflation considerations, withdrawal plan, and annual review checklist."
},
{
  id: 133,
  title: "Executive Resume Builder",
  category: "Career",
  ai: "Claude",
  level: "Advanced",
  tags: ["resume", "executive", "career"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Rewrite my resume for a senior leadership role. Highlight measurable achievements, executive presence, strategic impact, leadership experience, and ATS optimization."
},
{
  id: 134,
  title: "Book Outline Generator",
  category: "Writing",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["book", "outline", "writing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Generate a complete outline for a book about [topic]. Include chapters, subtopics, learning objectives, reader takeaways, and a writing schedule."
},
{
  id: 135,
  title: "Weekly Planning System",
  category: "Productivity",
  ai: "Claude",
  level: "Intermediate",
  tags: ["planning", "weekly", "productivity"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Design a weekly planning system that balances work, learning, health, and personal goals. Include reviews, prioritization, scheduling, and reflection questions."
},
{
  id: 136,
  title: "Budget Travel Planner",
  category: "Travel",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["budget", "travel", "trip"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Plan a budget-friendly trip to [destination]. Include transport, accommodation, daily itinerary, food, attractions, estimated costs, and money-saving tips."
},
{
  id: 137,
  title: "Business KPI Dashboard Designer",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["kpi", "dashboard", "analytics"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a KPI dashboard for [business]. Identify the most important metrics, define visualizations, reporting frequency, alert thresholds, and executive summary recommendations."
},
{
  id: 138,
  title: "SaaS Metrics Analyzer",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["saas", "metrics", "analytics"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Analyze my SaaS metrics including MRR, ARR, churn, CAC, LTV, activation rate, and retention. Identify weak areas, benchmark against industry standards, and recommend the highest-impact improvements."
},
{
  id: 139,
  title: "Marketing Funnel Optimizer",
  category: "Marketing",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["marketing", "funnels", "conversion"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Audit my marketing funnel from awareness to retention. Identify drop-off points, optimize messaging, recommend experiments, define KPIs, and prioritize improvements by expected ROI."
},
{
  id: 140,
  title: "Multi-Agent AI Workflow",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["multi-agent", "workflow", "automation"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a multi-agent AI workflow for [task]. Define each agent's responsibility, communication flow, shared memory, quality control, error recovery, and scalability considerations."
},
{
  id: 141,
  title: "Mobile App UX Audit",
  category: "Design",
  ai: "Claude",
  level: "Advanced",
  tags: ["mobile", "ux", "audit"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Review my mobile app UX. Evaluate onboarding, navigation, accessibility, usability, consistency, visual hierarchy, and recommend improvements ranked by impact."
},
{
  id: 142,
  title: "YouTube Thumbnail Strategist",
  category: "Content",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["youtube", "thumbnail", "ctr"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Generate 10 high-CTR YouTube thumbnail concepts for [topic]. Explain the psychology behind each concept, text placement, color choices, and visual hierarchy."
},
{
  id: 143,
  title: "Passive Income Planner",
  category: "Finance",
  ai: "Claude",
  level: "Intermediate",
  tags: ["passive-income", "finance", "wealth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Recommend realistic passive income strategies based on my budget, available time, skills, and risk tolerance. Rank them by effort, startup cost, and long-term income potential."
},
{
  id: 144,
  title: "Promotion Strategy Coach",
  category: "Career",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["promotion", "career", "leadership"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Create a strategy to earn a promotion within the next 12 months. Include skills to develop, visibility tactics, leadership behaviors, measurable achievements, and conversations to have with my manager."
},
{
  id: 145,
  title: "Persuasive Writing Assistant",
  category: "Writing",
  ai: "Claude",
  level: "Advanced",
  tags: ["persuasion", "copywriting", "writing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Rewrite my text to make it more persuasive without sounding manipulative. Improve clarity, structure, emotional appeal, credibility, and call-to-action while keeping the original meaning."
},
{
  id: 146,
  title: "Goal Tracking Framework",
  category: "Productivity",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["goals", "tracking", "habits"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Design a complete goal-tracking framework for [goal]. Include milestones, weekly reviews, progress metrics, accountability systems, and motivation strategies."
},
{
  id: 147,
  title: "Adventure Trip Planner",
  category: "Travel",
  ai: "Claude",
  level: "Intermediate",
  tags: ["adventure", "travel", "planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: "Plan an adventure trip to [destination]. Include activities, safety tips, equipment checklist, transport, accommodation, estimated costs, and weather considerations."
},
{
  id: 148,
  title: "Business Automation Audit",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["automation", "business", "operations"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Audit my business operations and identify automation opportunities across sales, marketing, support, HR, finance, and reporting. Estimate implementation effort, cost, ROI, and potential risks."
},
{
  id: 149,
  title: "Email Marketing Sequence",
  category: "Marketing",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["email", "marketing", "automation"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Write a 7-email marketing sequence for [product/service]. Include welcome, education, trust building, objection handling, offer, urgency, and follow-up emails with compelling subject lines."
},
{
  id: 150,
  title: "Cursor AI Pair Programmer",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["cursor", "coding", "ai"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as an expert Cursor AI pair programmer. Help me implement [feature] by first understanding the existing codebase, proposing the smallest safe changes, explaining trade-offs, identifying edge cases, and generating production-ready code with clear comments."
},
{
  id: 151,
  title: "GitHub Copilot Prompt Engineer",
  category: "Coding",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["copilot", "github", "coding"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Generate the best prompt and coding context for GitHub Copilot to build [feature]. Include file structure, coding standards, expected behavior, edge cases, and acceptance criteria."
},
{
  id: 152,
  title: "Perplexity Deep Research",
  category: "AI",
  ai: "Perplexity",
  level: "Advanced",
  tags: ["research", "perplexity", "analysis"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as a professional research analyst. Investigate [topic] using reliable and recent sources, compare expert opinions, highlight conflicting evidence, summarize key findings, and end with practical recommendations."
},
{
  id: 153,
  title: "Lovable App Builder",
  category: "AI",
  ai: "Claude",
  level: "Advanced",
  tags: ["lovable", "app", "builder"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a complete app in Lovable for [idea]. Define features, pages, user flows, database structure, authentication, integrations, UI components, and an MVP roadmap."
},
{
  id: 154,
  title: "Bolt.new Full-Stack Generator",
  category: "Coding",
  ai: "Claude",
  level: "Advanced",
  tags: ["bolt", "fullstack", "development"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Generate a Bolt.new prompt to build a production-ready [web app]. Include tech stack, folder structure, authentication, database schema, APIs, responsive UI, testing strategy, and deployment checklist."
},
{
  id: 155,
  title: "v0 UI Generator",
  category: "Design",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["v0", "ui", "design"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a detailed v0 prompt for designing a beautiful [dashboard/app]. Define layout, components, spacing, typography, color palette, responsive behavior, animations, and accessibility."
},
{
  id: 156,
  title: "Midjourney Master Prompt",
  category: "Design",
  ai: "Midjourney",
  level: "Advanced",
  tags: ["midjourney", "image", "art"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Generate a highly detailed Midjourney prompt for [scene]. Specify subject, composition, lighting, camera angle, lens, color grading, artistic style, aspect ratio, and quality parameters."
},
{
  id: 157,
  title: "FLUX Image Creator",
  category: "Design",
  ai: "FLUX",
  level: "Advanced",
  tags: ["flux", "image", "ai"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Write an optimized FLUX prompt for creating [image]. Include composition, realism level, lighting, environment, textures, negative prompts, and style modifiers for maximum quality."
},
{
  id: 158,
  title: "Stable Diffusion Prompt Pro",
  category: "Design",
  ai: "Stable Diffusion",
  level: "Advanced",
  tags: ["stable-diffusion", "image", "art"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Create a Stable Diffusion prompt for [image idea]. Include positive prompt, negative prompt, sampling suggestions, CFG guidance, resolution recommendations, and style keywords."
},
{
  id: 159,
  title: "OpenAI API Architect",
  category: "Coding",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["openai", "api", "development"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Design a scalable application using the OpenAI API for [use case]. Define API flow, prompt engineering, error handling, rate-limit strategy, security, caching, cost optimization, and deployment architecture."
},
{
  id: 160,
  title: "Windsurf AI Coding Partner",
  category: "Coding",
  ai: "Claude",
  level: "Advanced",
  tags: ["windsurf", "coding", "developer"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Act as an expert Windsurf AI coding partner. Review my project, propose an implementation plan, generate clean production-ready code, identify bugs before they happen, optimize performance, and explain every major architectural decision."
},
{
  id: 161,
  title: "AI Startup MVP Planner",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["startup", "mvp", "business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Plan the MVP for my startup idea. Prioritize essential features, define user journeys, recommend the tech stack, estimate development phases, identify risks, and outline a go-to-market launch plan."
},
{
  id: 162,
  title: "Prompt Library Optimizer",
  category: "AI",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["prompts", "optimization", "library"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: "Review my prompt library and identify duplicate ideas, weak prompts, missing categories, inconsistent formatting, and opportunities to improve clarity, usefulness, and organization. Rewrite only the prompts that genuinely need improvement."
},
{
  id: 163,
  title: "Professional Email Writer",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["email", "business", "communication"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Act as a professional business communication expert.

Write a clear, polite, and professional email based on the following information.

Purpose:
[Describe the purpose]

Recipient:
[Who will receive it]

Tone:
(Formal, Friendly, Persuasive, Apologetic)

Important Points:
[List all key points]

Return only the final email with a strong subject line and proper formatting.`
},
{
  id: 164,
  title: "Business Proposal Generator",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["proposal", "business", "sales"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Act as an experienced business consultant.

Create a complete business proposal.

Business Type:
[Type]

Client:
[Client Name]

Objective:
[Goal]

Budget:
[Budget]

Include:
• Executive Summary
• Problem
• Solution
• Pricing
• Timeline
• Benefits
• Call To Action`
},
{
  id: 165,
  title: "Meeting Summary Generator",
  category: "Business",
  ai: "Gemini",
  level: "Beginner",
  tags: ["meeting", "summary", "notes"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Act as a professional meeting assistant.

Summarize the following meeting notes.

Include:
• Key Decisions
• Action Items
• Deadlines
• Responsible Person
• Important Discussion Points

Meeting Notes:
[Paste Here]`
}, 
{
  id: 163,
  title: "Professional Email Writer",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["email","business","writing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Write a professional email based on the details below.

Purpose:
Recipient:
Tone:
Key Points:

Generate a clear subject line and a polished email ready to send.`
},

{
  id: 164,
  title: "Business Proposal Generator",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["proposal","sales","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a professional business proposal.

Business:
Client:
Goal:
Budget:
Timeline:

Include an executive summary, pricing, benefits, timeline and call-to-action.`
},

{
  id: 165,
  title: "Meeting Summary Generator",
  category: "Business",
  ai: "Gemini",
  level: "Beginner",
  tags: ["meeting","summary","notes"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Summarize these meeting notes.

Include:
- Key decisions
- Action items
- Deadlines
- Responsible people
- Next steps

Meeting Notes:
[Paste Here]`
},

{
  id: 166,
  title: "Cold Email Generator",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["cold email","sales","clients"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Write a persuasive cold email.

Product/Service:
Target Customer:
Main Benefit:
Call to Action:

Keep it short, professional and engaging.`
},

{
  id: 167,
  title: "Marketing Strategy Planner",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["marketing","strategy","growth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a complete marketing strategy.

Business:
Target Audience:
Budget:
Goal:

Include online, offline, social media and content marketing ideas.`
},

{
  id: 168,
  title: "SWOT Analysis Creator",
  category: "Business",
  ai: "Gemini",
  level: "Beginner",
  tags: ["swot","analysis","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Perform a SWOT analysis.

Business:
Industry:
Goal:

Return:
Strengths
Weaknesses
Opportunities
Threats`
},

{
  id: 169,
  title: "Startup Pitch Deck Writer",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["startup","pitch","investors"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a startup pitch deck.

Startup:
Problem:
Solution:
Business Model:
Revenue:
Market:
Competition:

Generate slide-by-slide content.`
},

{
  id: 170,
  title: "Business Name Generator",
  category: "Business",
  ai: "Claude",
  level: "Beginner",
  tags: ["brand","startup","name"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate 50 unique business names.

Industry:
Style:
Target Audience:

Also provide tagline ideas and domain suggestions.`
},

{
  id: 171,
  title: "Client Follow-up Message",
  category: "Business",
  ai: "Gemini",
  level: "Beginner",
  tags: ["clients","followup","communication"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a professional follow-up message.

Client:
Previous Discussion:
Goal:
Tone:

Keep it polite and increase response chances.`
},

{
  id: 172,
  title: "Invoice Reminder Email",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["invoice","payment","email"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a polite invoice reminder email.

Invoice Number:
Due Date:
Amount:
Client Name:

Maintain a professional tone while encouraging prompt payment.`
},
{
  id: 173,
  title: "Resume Optimizer",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["resume","cv","career"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Improve my resume for the following job role. Highlight achievements, ATS keywords, and measurable impact while keeping it professional.`
},

{
  id: 174,
  title: "Cover Letter Generator",
  category: "Business",
  ai: "Claude",
  level: "Beginner",
  tags: ["cover letter","job","career"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a personalized cover letter using my experience, skills, company name and job description. Make it professional and concise.`
},

{
  id: 175,
  title: "LinkedIn Profile Rewrite",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["linkedin","profile","branding"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Rewrite my LinkedIn profile headline, about section and experience to attract recruiters in my target industry.`
},

{
  id: 176,
  title: "Sales Pitch Generator",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["sales","pitch","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a persuasive sales pitch for my product or service. Focus on benefits, objections, and a strong closing statement.`
},

{
  id: 177,
  title: "Customer Reply Assistant",
  category: "Business",
  ai: "Claude",
  level: "Beginner",
  tags: ["customer","support","email"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a polite, professional response to a customer inquiry or complaint while maintaining a positive brand image.`
},

{
  id: 178,
  title: "Invoice Description Writer",
  category: "Business",
  ai: "Gemini",
  level: "Beginner",
  tags: ["invoice","billing","finance"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate clear invoice descriptions for products or services with professional wording suitable for clients.`
},

{
  id: 179,
  title: "Project Timeline Planner",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["project","timeline","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a detailed project timeline with milestones, deadlines, responsibilities and risk management suggestions.`
},

{
  id: 180,
  title: "Business Idea Validator",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["startup","idea","validation"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Evaluate my business idea for market demand, competition, scalability, risks and potential improvements.`
},

{
  id: 181,
  title: "Pricing Strategy Advisor",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["pricing","strategy","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Recommend the best pricing strategy for my product based on target customers, competitors and business goals.`
},

{
  id: 182,
  title: "Market Research Assistant",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["market","research","analysis"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Perform detailed market research including target audience, competitors, trends, opportunities and threats for my business.`
},

{
  id: 183,
  title: "Professional Bio Writer",
  category: "Business",
  ai: "Claude",
  level: "Beginner",
  tags: ["bio","branding","profile"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a professional biography suitable for websites, conferences and LinkedIn using my background and achievements.`
},

{
  id: 184,
  title: "Business Goal Planner",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["goals","planning","success"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create SMART business goals with monthly milestones, KPIs, action steps and review checkpoints.`
},

{
  id: 185,
  title: "Negotiation Strategy Builder",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["negotiation","business","strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Prepare a complete negotiation strategy including objectives, BATNA, possible objections, responses and closing techniques.`
},
{
  id: 186,
  title: "Executive Summary Writer",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["summary","business","report"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a concise executive summary from the information below. Highlight the objective, key findings, recommendations and expected outcomes in a professional tone.`
},

{
  id: 187,
  title: "Business Report Generator",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["report","analysis","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a detailed business report including introduction, analysis, data interpretation, recommendations and conclusion using the provided information.`
},

{
  id: 188,
  title: "Competitor Analysis Expert",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["competition","research","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Analyze my competitors by comparing pricing, products, strengths, weaknesses, marketing strategies and customer experience.`
},

{
  id: 189,
  title: "Business Risk Assessment",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["risk","planning","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Identify possible business risks, estimate their impact and probability, and recommend practical mitigation strategies.`
},

{
  id: 190,
  title: "Mission Statement Creator",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["mission","vision","branding"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a powerful mission statement and vision statement that reflects my company's values and long-term goals.`
},

{
  id: 191,
  title: "Product Launch Planner",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["launch","product","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Develop a complete product launch plan including timeline, marketing strategy, budget, KPIs and launch checklist.`
},

{
  id: 192,
  title: "Business SOP Generator",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["SOP","operations","process"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a Standard Operating Procedure (SOP) for the given business process with clear step-by-step instructions and responsibilities.`
},

{
  id: 193,
  title: "Client Onboarding Checklist",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["client","onboarding","checklist"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate a complete client onboarding checklist that ensures a smooth and professional onboarding experience.`
},

{
  id: 194,
  title: "Business Growth Planner",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["growth","strategy","planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Design a 12-month business growth strategy with monthly objectives, KPIs, marketing initiatives and scaling opportunities.`
},

{
  id: 195,
  title: "Investor Update Letter",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["investor","update","startup"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a professional investor update summarizing achievements, metrics, financial highlights, challenges and upcoming milestones.`
},

{
  id: 196,
  title: "Brand Voice Creator",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["branding","voice","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Define a unique brand voice with personality traits, tone guidelines, writing examples and messaging principles.`
},

{
  id: 197,
  title: "Business KPI Dashboard",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["KPI","dashboard","analytics"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Recommend the most important KPIs for my business and explain how to track, measure and improve each one.`
},

{
  id: 198,
  title: "Business Automation Advisor",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["automation","AI","workflow"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Identify repetitive business tasks and recommend AI tools, automations and workflow improvements to save time and reduce costs.`
},

{
  id: 199,
  title: "Customer Persona Builder",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["customer","persona","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a detailed customer persona including demographics, goals, pain points, buying behavior, motivations and preferred communication channels.`
},

{
  id: 200,
  title: "Business Budget Planner",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["budget","finance","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a detailed business budget with estimated income, expenses, savings targets, contingency funds and financial recommendations.`
},

{
  id: 201,
  title: "Profit Improvement Advisor",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["profit","growth","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Analyze my business and recommend practical strategies to increase profit while reducing unnecessary costs.`
},

{
  id: 202,
  title: "Business Expansion Planner",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["expansion","growth","strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Prepare a step-by-step expansion strategy including market research, financial planning, staffing and risk assessment.`
},

{
  id: 203,
  title: "Company Policy Writer",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["policy","company","HR"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a professional company policy based on the topic provided using clear language and practical guidelines.`
},

{
  id: 204,
  title: "Business FAQ Generator",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["FAQ","customers","support"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate a complete FAQ section with clear questions and answers for my business or product.`
},

{
  id: 205,
  title: "Service Agreement Draft",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["agreement","contract","service"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Draft a professional service agreement including scope of work, payment terms, timelines, confidentiality and termination clauses.`
},

{
  id: 206,
  title: "Press Release Generator",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["press","media","announcement"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Write a professional press release announcing a product launch, company milestone or important business update.`
},

{
  id: 207,
  title: "Supplier Evaluation Tool",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["supplier","evaluation","procurement"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Evaluate suppliers based on price, quality, reliability, delivery performance and long-term partnership value.`
},

{
  id: 208,
  title: "Customer Satisfaction Survey",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["survey","customers","feedback"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a customer satisfaction survey with rating questions, open-ended questions and improvement suggestions.`
},

{
  id: 209,
  title: "Recruitment Plan Generator",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["recruitment","HR","hiring"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Develop a hiring strategy including job description, sourcing methods, interview process and onboarding recommendations.`
},

{
  id: 210,
  title: "Employee Performance Review",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["employee","performance","HR"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a constructive employee performance review highlighting achievements, strengths, improvement areas and future goals.`
},

{
  id: 211,
  title: "Business Presentation Outline",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["presentation","business","slides"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a professional presentation outline with slide titles, key talking points and audience engagement tips.`
},

{
  id: 212,
  title: "Partnership Proposal Writer",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["partnership","proposal","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Write a compelling partnership proposal explaining mutual benefits, responsibilities, goals and collaboration opportunities.`
},

{
  id: 213,
  title: "Business Crisis Response Plan",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["crisis","management","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Develop a crisis response plan covering communication, decision-making, recovery strategy and risk mitigation.`
},

{
  id: 214,
  title: "Annual Business Review",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["annual","review","report"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Prepare a complete annual business review summarizing achievements, financial performance, challenges, lessons learned and future objectives.`
},
{
  id: 215,
  title: "Business Goal Tracker",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["goals","tracking","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a business goal tracking system with milestones, KPIs, deadlines and weekly review points.`
},

{
  id: 216,
  title: "Client Feedback Analyzer",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["feedback","customers","analysis"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Analyze customer feedback, identify common issues, positive trends and recommend actionable improvements.`
},

{
  id: 217,
  title: "Business SWOT Expert",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["SWOT","analysis","strategy"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Perform a comprehensive SWOT analysis with strategic recommendations for business growth.`
},

{
  id: 218,
  title: "Business Process Optimizer",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["workflow","optimization","process"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Review a business workflow and suggest improvements to increase efficiency, reduce costs and improve quality.`
},

{
  id: 219,
  title: "Investor Pitch Script",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["investor","pitch","startup"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Write a persuasive investor pitch script that explains the problem, solution, business model, traction and funding request.`
},

{
  id: 220,
  title: "Business Meeting Agenda",
  category: "Business",
  ai: "Claude",
  level: "Beginner",
  tags: ["meeting","agenda","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate a structured meeting agenda with discussion topics, time allocation, objectives and expected outcomes.`
},

{
  id: 221,
  title: "Brand Positioning Strategy",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["branding","positioning","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Develop a brand positioning strategy that differentiates the business from competitors and appeals to the target audience.`
},

{
  id: 222,
  title: "Business Checklist Generator",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["checklist","planning","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a complete checklist for launching, managing or improving a business based on the provided goal.`
},

{
  id: 223,
  title: "Product Pricing Calculator",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["pricing","profit","finance"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Recommend an optimal product price based on costs, competitors, target margin and customer expectations.`
},

{
  id: 224,
  title: "Business KPI Advisor",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["KPI","metrics","analytics"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Suggest the most valuable KPIs for the business and explain how to monitor and improve each one.`
},

{
  id: 225,
  title: "Customer Retention Planner",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["retention","customers","growth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Design a customer retention strategy that improves loyalty, repeat purchases and long-term satisfaction.`
},

{
  id: 226,
  title: "Business Newsletter Writer",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["newsletter","email","marketing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a professional business newsletter with updates, announcements, tips and a strong call-to-action.`
},

{
  id: 227,
  title: "Revenue Growth Planner",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["revenue","growth","sales"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a detailed revenue growth strategy with new opportunities, pricing improvements and expansion ideas.`
},

{
  id: 228,
  title: "Business Decision Assistant",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["decision","strategy","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Evaluate multiple business options, compare risks and benefits, then recommend the best decision with clear reasoning.`
},

{
  id: 229,
  title: "Sales Funnel Planner",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["sales","funnel","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Build a complete sales funnel from awareness to conversion with recommended content and customer touchpoints.`
},

{
  id: 230,
  title: "Business Action Plan",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["action","planning","execution"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a step-by-step business action plan with priorities, deadlines, responsibilities and success metrics.`
},

{
  id: 231,
  title: "Business Roadmap Creator",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["roadmap","planning","growth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a detailed 12-month business roadmap with quarterly goals, milestones, KPIs, risks and expected outcomes.`
},

{
  id: 232,
  title: "Customer Journey Mapper",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["customer","journey","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Map the complete customer journey from awareness to loyalty and recommend improvements at every stage.`
},

{
  id: 233,
  title: "Business Cost Reduction Plan",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["cost","finance","optimization"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Analyze business expenses and suggest practical ways to reduce costs without reducing quality or customer satisfaction.`
},

{
  id: 234,
  title: "Business Vision Statement",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["vision","branding","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a clear and inspiring vision statement that reflects the long-term direction of the business.`
},

{
  id: 235,
  title: "Business Partnership Email",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["partnership","email","communication"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a professional partnership proposal email explaining collaboration opportunities and mutual benefits.`
},

{
  id: 236,
  title: "Sales Forecast Generator",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["sales","forecast","analytics"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Generate a realistic sales forecast using historical performance, seasonality, trends and growth assumptions.`
},

{
  id: 237,
  title: "Customer Complaint Resolver",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["customer","complaint","support"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a professional response that resolves a customer complaint while protecting the company's reputation.`
},

{
  id: 238,
  title: "Business Workshop Planner",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["workshop","training","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a business workshop agenda with learning objectives, activities, discussion points and expected outcomes.`
},

{
  id: 239,
  title: "Financial Goal Planner",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["finance","goals","planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Develop financial goals with monthly targets, budgeting recommendations and performance tracking methods.`
},

{
  id: 240,
  title: "Business Communication Guide",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["communication","writing","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create professional communication guidelines for emails, meetings, presentations and client interactions.`
},

{
  id: 241,
  title: "Business Compliance Checklist",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["compliance","legal","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate a business compliance checklist covering documentation, policies, regulations and operational best practices.`
},

{
  id: 242,
  title: "Business Analytics Advisor",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["analytics","data","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Recommend the most useful analytics, reports and dashboards to improve business performance and decision-making.`
},

{
  id: 243,
  title: "Customer Loyalty Program",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["loyalty","customers","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Design a customer loyalty program that encourages repeat purchases and long-term engagement.`
},

{
  id: 244,
  title: "Business Networking Strategy",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["networking","growth","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a networking strategy for building valuable professional relationships and business opportunities.`
},

{
  id: 245,
  title: "Business Productivity Coach",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["productivity","workflow","management"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Suggest productivity systems, daily workflows and automation ideas to improve business efficiency.`
},

{
  id: 246,
  title: "Business Success Blueprint",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["success","strategy","planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a complete business success blueprint including planning, execution, marketing, finance, scaling and long-term sustainability.`
},

{
  id: 247,
  title: "Business Dashboard Planner",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["dashboard","analytics","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Design a business dashboard showing revenue, expenses, profit, customer growth, sales performance and KPIs with recommendations for improvement.`
},

{
  id: 248,
  title: "Business Exit Strategy",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["exit","strategy","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a business exit strategy covering valuation, buyers, legal preparation, financial planning and transition steps.`
},

{
  id: 249,
  title: "Business Audit Assistant",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["audit","business","analysis"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Perform a complete business audit and identify strengths, weaknesses, financial issues, operational risks and growth opportunities.`
},

{
  id: 250,
  title: "Business Brainstorming Partner",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["ideas","brainstorm","innovation"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Generate creative business ideas, improvements and innovative solutions based on the provided challenge.`
},

{
  id: 251,
  title: "Monthly Business Report",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["monthly","report","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Prepare a monthly business report including revenue, expenses, KPIs, customer growth, achievements and future priorities.`
},

{
  id: 252,
  title: "Employee Training Plan",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["training","employees","HR"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Develop a structured employee training program with objectives, schedule, resources and performance evaluation methods.`
},

{
  id: 253,
  title: "Business Opportunity Scanner",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["opportunity","growth","market"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Identify profitable business opportunities by analyzing trends, customer needs, competition and market demand.`
},

{
  id: 254,
  title: "Business FAQ Optimizer",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["FAQ","support","customers"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Improve an existing FAQ by making answers clearer, shorter and more useful for customers.`
},

{
  id: 255,
  title: "Business Value Proposition",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["value","branding","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a compelling value proposition explaining why customers should choose the business over competitors.`
},

{
  id: 256,
  title: "Business Performance Review",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["performance","review","analysis"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Analyze business performance using sales, customer satisfaction, financial metrics and operational efficiency.`
},

{
  id: 257,
  title: "Business Survey Builder",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["survey","research","feedback"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a professional survey to collect customer opinions, satisfaction levels and improvement suggestions.`
},

{
  id: 258,
  title: "Business Expansion Checklist",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["expansion","checklist","growth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Generate a complete checklist for expanding a business into new cities, regions or international markets.`
},

{
  id: 259,
  title: "Business Innovation Planner",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["innovation","ideas","strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Develop an innovation strategy that introduces new products, services or business models while managing risks.`
},

{
  id: 260,
  title: "Business Networking Email",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["networking","email","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a professional networking email requesting a meeting, collaboration or mentorship opportunity.`
},

{
  id: 261,
  title: "Business Resource Planner",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["resources","planning","management"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a resource allocation plan covering staff, budget, equipment, time and operational priorities.`
},

{
  id: 262,
  title: "Business Growth Roadmap",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["growth","roadmap","strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Build a long-term business growth roadmap with quarterly milestones, revenue targets, expansion strategies and risk management.`
},

{
  id: 263,
  title: "Business Competitor Tracker",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["competitors","tracking","analysis"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Track competitors by comparing pricing, marketing campaigns, product updates, strengths, weaknesses and customer reviews.`
},

{
  id: 264,
  title: "Business Cash Flow Planner",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["cashflow","finance","planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a monthly cash flow plan including expected income, expenses, emergency reserves and improvement recommendations.`
},

{
  id: 265,
  title: "Customer Support SOP",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["support","SOP","customers"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a Standard Operating Procedure for customer support covering response time, escalation process and service quality.`
},

{
  id: 266,
  title: "Business Investment Analyzer",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["investment","ROI","finance"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Evaluate a business investment by calculating potential ROI, risks, payback period and long-term value.`
},

{
  id: 267,
  title: "Business Rebranding Planner",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["branding","rebrand","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Develop a complete rebranding strategy including brand identity, messaging, design direction and launch plan.`
},

{
  id: 268,
  title: "Business Newsletter Ideas",
  category: "Business",
  ai: "Gemini",
  level: "Beginner",
  tags: ["newsletter","content","marketing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate 30 engaging newsletter ideas that educate customers, increase engagement and promote products naturally.`
},

{
  id: 269,
  title: "Business KPI Report",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["KPI","report","analytics"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Prepare a KPI report highlighting current performance, trends, challenges and recommended actions.`
},

{
  id: 270,
  title: "Supplier Negotiation Plan",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["supplier","negotiation","procurement"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a negotiation strategy for suppliers focused on better pricing, quality, delivery and long-term partnerships.`
},

{
  id: 271,
  title: "Business Meeting Minutes",
  category: "Business",
  ai: "Gemini",
  level: "Beginner",
  tags: ["meeting","minutes","documentation"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Convert meeting notes into professional meeting minutes with attendees, decisions, action items and deadlines.`
},

{
  id: 272,
  title: "Business Risk Matrix",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["risk","matrix","planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Build a business risk matrix by ranking risks according to probability, impact and recommended mitigation actions.`
},

{
  id: 273,
  title: "Marketing Budget Planner",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["marketing","budget","finance"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Plan a marketing budget across advertising, social media, SEO, email marketing and offline campaigns.`
},

{
  id: 274,
  title: "Business Workflow Designer",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["workflow","operations","automation"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Design an efficient workflow that improves productivity, reduces delays and eliminates unnecessary manual work.`
},

{
  id: 275,
  title: "Business Proposal Review",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["proposal","review","editing"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Review my business proposal and improve clarity, persuasion, professionalism and overall impact.`
},

{
  id: 276,
  title: "Business Acquisition Analyzer",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["acquisition","merger","analysis"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Analyze a business acquisition opportunity by reviewing valuation, financial health, legal risks and expected synergies.`
},

{
  id: 277,
  title: "Business Revenue Forecast",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["revenue","forecast","growth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Forecast business revenue for the next 12 months using growth assumptions, market conditions and seasonal trends.`
},

{
  id: 278,
  title: "Business Action Checklist",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["checklist","execution","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate a step-by-step business action checklist for achieving the specified business objective efficiently.`
},

{
  id: 279,
  title: "Business Expansion Risk Analysis",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["expansion","risk","strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Analyze the risks of expanding my business into a new market. Include financial, operational, legal and competitive risks with mitigation strategies.`
},

{
  id: 280,
  title: "Customer Retention Email",
  category: "Business",
  ai: "ChatGPT",
  level: "Beginner",
  tags: ["customer","email","retention"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Write a friendly customer retention email encouraging repeat purchases while providing value and maintaining trust.`
},

{
  id: 281,
  title: "Business Expense Optimizer",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["expenses","finance","optimization"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Review business expenses and recommend ways to reduce costs while maintaining productivity and quality.`
},

{
  id: 282,
  title: "Company Culture Builder",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["culture","team","leadership"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a positive company culture plan including values, communication, recognition and employee engagement initiatives.`
},

{
  id: 283,
  title: "Business Goal Review",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["goals","review","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Evaluate current business goals and recommend adjustments based on performance, market changes and future opportunities.`
},

{
  id: 284,
  title: "Business Partnership Checklist",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["partnership","checklist","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Generate a comprehensive checklist for evaluating and forming successful business partnerships.`
},

{
  id: 285,
  title: "Business Presentation Coach",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["presentation","public speaking","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Improve my business presentation with better structure, storytelling, visuals and audience engagement techniques.`
},

{
  id: 286,
  title: "Product Launch Timeline",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["launch","timeline","planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a detailed product launch timeline from planning to post-launch evaluation with key milestones.`
},

{
  id: 287,
  title: "Business Decision Matrix",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["decision","matrix","analysis"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Compare multiple business decisions using weighted criteria, risks, costs, benefits and long-term impact.`
},

{
  id: 288,
  title: "Sales Team Motivation Plan",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["sales","motivation","team"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Design a motivation plan for a sales team including incentives, recognition, coaching and performance goals.`
},

{
  id: 289,
  title: "Business Communication Audit",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["communication","audit","management"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Audit internal and external business communication and recommend improvements for clarity, efficiency and professionalism.`
},

{
  id: 290,
  title: "Business Planning Assistant",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["planning","strategy","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a detailed business plan including objectives, resources, timelines, KPIs and execution strategy.`
},

{
  id: 291,
  title: "Business Brand Audit",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["brand","audit","marketing"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Review my brand identity, messaging, visual consistency and customer perception with practical improvement suggestions.`
},

{
  id: 292,
  title: "Business Productivity Report",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["productivity","report","operations"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Analyze productivity metrics and recommend workflow improvements that increase efficiency and reduce wasted effort.`
},

{
  id: 293,
  title: "Business Strategy Reviewer",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["strategy","review","growth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Review my business strategy and identify strengths, weaknesses, opportunities and strategic improvements.`
},

{
  id: 294,
  title: "Business Success Metrics",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["metrics","KPI","success"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Recommend the most important success metrics for my business and explain how to measure and improve each one.`
},

{
  id: 295,
  title: "Business Growth Checklist",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["growth","checklist","planning"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Create a complete business growth checklist with monthly priorities, KPIs and action steps for sustainable expansion.`
},

{
  id: 296,
  title: "Competitive Pricing Strategy",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["pricing","competition","sales"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Develop a competitive pricing strategy based on costs, competitors, customer value and market positioning.`
},

{
  id: 297,
  title: "Business Performance Dashboard",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["dashboard","performance","analytics"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Design a business performance dashboard with KPIs, revenue, expenses, customer metrics and operational insights.`
},

{
  id: 298,
  title: "Business Communication Template",
  category: "Business",
  ai: "Claude",
  level: "Beginner",
  tags: ["communication","template","business"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Generate professional communication templates for clients, partners, employees and suppliers.`
},

{
  id: 299,
  title: "Business Expansion Budget",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["budget","expansion","finance"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Prepare a detailed expansion budget including investment, staffing, marketing, operations and contingency planning.`
},

{
  id: 300,
  title: "Business Success Roadmap",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["roadmap","success","strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Build a step-by-step roadmap for achieving long-term business success with measurable milestones and review points.`
},

{
  id: 301,
  title: "Business Process Documentation",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["documentation","process","operations"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Document a complete business process including responsibilities, workflow, quality checks and improvement suggestions.`
},

{
  id: 302,
  title: "Business Sales Analysis",
  category: "Business",
  ai: "Gemini",
  level: "Advanced",
  tags: ["sales","analysis","growth"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Analyze sales performance and recommend strategies to increase conversions, average order value and customer retention.`
},

{
  id: 303,
  title: "Business Team Planner",
  category: "Business",
  ai: "ChatGPT",
  level: "Intermediate",
  tags: ["team","management","planning"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create an organizational plan defining team roles, responsibilities, communication channels and reporting structure.`
},

{
  id: 304,
  title: "Business Opportunity Report",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["opportunity","report","market"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Generate a report identifying emerging business opportunities, customer needs, trends and revenue potential.`
},

{
  id: 305,
  title: "Customer Experience Planner",
  category: "Business",
  ai: "Gemini",
  level: "Intermediate",
  tags: ["customer","experience","service"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Design a customer experience improvement plan covering every stage from first contact to long-term loyalty.`
},

{
  id: 306,
  title: "Business Marketing Audit",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["marketing","audit","branding"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Audit current marketing activities and recommend improvements for SEO, social media, advertising and branding.`
},

{
  id: 307,
  title: "Business Revenue Tracker",
  category: "Business",
  ai: "Claude",
  level: "Intermediate",
  tags: ["revenue","tracking","finance"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a revenue tracking system with monthly targets, comparisons, charts and actionable insights.`
},

{
  id: 308,
  title: "Business Launch Checklist",
  category: "Business",
  ai: "Gemini",
  level: "Beginner",
  tags: ["launch","startup","checklist"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Generate a complete launch checklist for starting a new business, covering legal, branding, marketing and operations.`
},

{
  id: 309,
  title: "Business Risk Monitor",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["risk","monitoring","management"],
  trending: false,
  createdAt: "2026-07-11",
  prompt: `Create a business risk monitoring system with risk indicators, review frequency and mitigation actions.`
},

{
  id: 310,
  title: "Business Strategy Blueprint",
  category: "Business",
  ai: "Claude",
  level: "Advanced",
  tags: ["strategy","blueprint","business"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Develop a complete business strategy blueprint covering vision, goals, operations, finance, marketing, scaling and continuous improvement.`
},

{
  id: 311,
  title: "Complete Business Consultant",
  category: "Business",
  ai: "ChatGPT",
  level: "Advanced",
  tags: ["consulting","business","strategy"],
  trending: true,
  createdAt: "2026-07-11",
  prompt: `Act as a world-class business consultant with expertise in strategy, finance, operations, marketing, sales, branding and scaling.

Analyze my business in detail using the information I provide.

Business Information:
• Industry:
• Products/Services:
• Target Audience:
• Current Revenue:
• Team Size:
• Business Goals:
• Biggest Challenges:

Provide:
1. SWOT Analysis
2. Growth Opportunities
3. Marketing Strategy
4. Sales Improvement Plan
5. Cost Optimization
6. Risk Analysis
7. 90-Day Action Plan
8. Long-Term Scaling Strategy
9. Key Performance Indicators (KPIs)
10. Final Recommendations

Present the response in a clear, professional and actionable format.`
},

];
