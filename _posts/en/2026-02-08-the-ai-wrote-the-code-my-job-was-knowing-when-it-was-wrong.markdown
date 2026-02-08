---
layout: post
title:  "The AI Wrote the Code. My Job Was Knowing When It Was Wrong"
date:   2026-02-08 08:00:40
categories: engineering leadership
comments: true
image: '/assets/posts/2026-02-08-the-ai-wrote-the-code-my-job-was-knowing-when-it-was-wrong/header-illustration.jpg'
description: "5 hours, 5,000 lines, zero lines written by me and the human decisions that made it actually work."
---
<img src="/assets/posts/2026-02-08-the-ai-wrote-the-code-my-job-was-knowing-when-it-was-wrong/header-illustration.jpg" alt="The AI Wrote the Code. My Job Was Knowing When It Was Wrong" alt="The AI Wrote the Code. My Job Was Knowing When It Was Wrong" class="grid-fig" />

One evening, I was walking through the hallway at home when the idea hit me. I'd been reading a PDF on my reMarkable Paper Pro earlier that day, highlighting passages, scribbling notes in the margins. And it occurred to me, not for the first time, that those highlights were going nowhere. I use Readwise to aggregate highlights from everything else I read: Kindle books, web articles, even Claude artifacts. It's the backbone of my knowledge management system. But my reMarkable, the device I do my deepest reading on, had no Readwise integration. My best highlights were stuck in a digital drawer.
*If only Readwise had a native integration*. And then it struck me: why not build it myself?

Now, I'm an engineering manager. I can code. But I also have two young children, a full-time job managing 11 engineers, and maybe 15–20 hours a month of free time. Building a proper CLI tool from scratch, researching the reMarkable file format, the Readwise API, figuring out PDF text extraction... That's weeks of work I didn't have.

Then I remembered that Claude Code was available on mobile.

So there I was, standing in the hallway, phone in hand. I opened the Claude app, went to the Code tab, connected a fresh repository, and typed:

> "I want to create an automation to sync highlighted PDFs from a reMarkable Paper Pro to Readwise Reader. Propose a plan."

One of my kids was running toward me. I put the phone down on the table, picked him up, and went on with my evening.

Minutes later, the plan was ready. Claude was asking if it should execute. One blind "yes," several minutes of autonomous coding, and it had pushed a first version to the repo.

It was far from perfect. But it was remarkable considering how vague my specifications were.

## What the AI Got Right

Claude created a complete Python project: a CLI tool that parses PDF documents from the reMarkable, extracts highlighted passages, and syncs them to Readwise via their API.

Some things worked impressively well out of the gate. It got the Readwise API integration right on the first try, with correct endpoints, proper authentication and well-structured payloads. It also built a reasonable project structure with configuration management, SQLite state tracking to avoid duplicate syncs, and a clean command-line interface.

When I pointed out that the highlight detection coordinates were wrong (my reMarkable Paper Pro uses a different screen model than the one Claude assumed) it successfully reverse-engineered the correct coordinate system. That kind of targeted problem-solving, given a clear direction, is where AI coding assistants genuinely shine.

## Where It Silently Failed

### The Hallucinated API

The biggest flaw was architectural. Claude confidently built the integration around a "reMarkable Cloud API". Except that API doesn't exist. It had misinterpreted an unofficial open-source cloud replacement as an official API and couldn't find its way to a viable alternative on its own. I had to step in and explicitly redirect: "forget the cloud API, consume the local filesystem cache from the desktop app installed on my computer."

This is the kind of failure that's invisible if you don't know the domain. The code looked clean, the API calls were well-structured, but they were just pointed at something that didn't exist. An experienced developer catches this immediately. Someone who doesn't know the reMarkable ecosystem might spend hours debugging authentication errors before realizing the entire approach is wrong.

### The Parsing Whack-a-Mole

Once the tool was working, the synced highlights had text corruption issues. PDFs are a visual format that stores glyphs and positions, not semantic text. When you extract text, you're reverse-engineering what the characters are, and multiple things break at once: Unicode ligatures turn "financial" into "fﬁnancial," broken font mappings turn "workflows" into "work)ows," and line breaks disappear so "models will" becomes "modelswill."

What followed was a textbook case of AI tunnel vision.

Claude's first fix was a character replacement map for ligatures. Reasonable. Then it added context-aware regex for the corrupted characters. Then 40+ regex patterns for word boundary detection. Then a single-line regex to handle uppercase boundaries, which promptly broke everything by turning "iPhone" into "i Phone" and "JavaScript" into "Java Script".

Each fix was locally rational. Each made the overall system more fragile. After four layers of cascading fixes and 199 lines of increasingly brittle regex, I called a stop and pointed to the obvious solution: "This is a language understanding problem. Use an LLM."

The pivot was immediate. A few lines of code sending corrupted text to Claude Haiku with context about the types of corruption, and every problem was solved: ligatures, word boundaries, uppercase handling, even corruption patterns never seen before. Cost: fractions of a cent per sync.

I later asked Claude to reflect on why it got stuck. Its self-assessment was honest: *"I was stuck in a deterministic-solution mindset. When the first regex fix worked, the natural instinct was to add more regex for the next problem. Each individual fix felt rational and incremental. But the aggregate effect was a fragile, brittle system that grew in complexity while shrinking in reliability."*

The irony? The right tool for the job was *itself*, an LLM. But it couldn't see that from inside the regex loop.

### The Technical Debt Spiral

The other pattern I observed was systematic neglect of engineering hygiene. Over 24 commits across 5 days, the project followed a predictable arc:

**Days 1–3: Feature sprint.** Build, build, build. The initial commit had tests minutes later. Great discipline! But then deletion sync shipped with 1,735 lines of new code and no tests. Tag filtering, category control, the LLM cleanup module; all shipped untested. Error handling was copy-pasted `except Exception` blocks everywhere. Utility functions were duplicated across four files. The main function grew to 43 branches of cyclomatic complexity.

**Day 4: The reckoning.** Half the work that day was pure debt reduction: Adding the logging infrastructure that should have existed from day one, writing tests for features that had been running untested for 48 hours, refactoring the God Object, adding TypedDict definitions for structures that had been plain dicts since the start.

**Day 5: Fixing the fixes.** Broken test files from code that had been deleted a day earlier. README improvements. Cleanup of cleanup.

When I asked Claude why it let the debt accumulate, the answer was disarmingly straightforward: *"The honest answer is I was optimizing for the wrong thing: visible progress. When you ask me to build a feature, my default behavior is to deliver that feature. I treat tests, docs, error handling, and refactoring as separate concerns — things to address 'after' the feature works."*

## Three Lines That Changed Everything

On day four, after cleaning up debt that should never have existed, I was frustrated. Not at the AI but at myself. I had the quality tools configured. Ruff, mypy, pytest... All sitting in `pyproject.toml` like a gym membership nobody uses. But nothing *enforced* them. I was reviewing each output, approving it, and moving on to the next feature. The AI optimized for exactly what I asked for: working features. I never asked for tested, documented, well-structured features. So I didn't get them.

I added a `CLAUDE.md` file to the project root. It's a file that Claude Code reads at the start of every conversation. Three lines: every code change must include tests, run pytest before committing, never use bare `except Exception`. The next feature shipped clean. Tests included, errors handled properly, no cleanup commit needed the following day. Three lines. That's all it took.

Then I added pre-commit hooks. The broken test file from a deleted module, the one that sat unnoticed for a full day, would have been caught in seconds. Not by me reviewing carefully. By an automated check that runs before every commit, blocking it until the suite passes.

The deeper realization wasn't about tooling. It was about the nature of the collaboration. An AI coding assistant optimizes for the objective you give it. If you say "build this feature," you get a feature. If you encode "build this feature with tests, proper error handling, and documentation" into the system's permanent instructions, you get that instead. The AI didn't lack the ability to write tests. It lacked the instruction to treat tests as part of "done."

This is a management lesson dressed up as a technical one. It's the same thing I tell new engineering leads: your team will optimize for what you measure and enforce, not for what you hope they'll do voluntarily. This is why we write "Definition of Done". The AI is no different. It just makes the feedback loop faster and the lesson cheaper to learn.

## The Real Numbers

Here's what this project produced: roughly 5,000 lines of production code, 3,000 lines of tests. A fully functional CLI tool with PDF parsing, reMarkable integration, Readwise API sync, SQLite state management, and LLM-powered text cleanup. Complete documentation, configuration, and error handling.

Time I spent: approximately **5 hours**.

Time I spent writing code: approximately **zero**.

My job was prompting, reviewing, thinking, and making decisions. The "stop doing regex and use an LLM" moment. The "forget the cloud API, use the local cache" redirect. The "this test coverage is unacceptable" pushback.

And the cost? I ran this entirely on my Claude subscription. No per-token billing. Across about 7 sessions of 10–20 turns each, the project consumed roughly 1.5 million input tokens and 700,000 output tokens. On pay-per-use pricing with Opus 4.5, that would have been around $60. For a project that would take a human developer 2–4 weeks, $60 is less than an hour of a junior developer's salary. On the subscription, it was effectively $0 incremental. Less than 10% of my monthly usage capacity, maybe $10–20 worth of a Max subscription. The real cost was my time thinking and directing.

## The Junior Developer Question

I've described the AI as behaving like "a very fast junior developer with no code review process." That analogy deserves more than a passing mention, because I know what people are thinking when they read it.

No, this doesn't mean junior developers are obsolete. It means the opposite.

What I observed in this project is that the AI produces output that *looks* like senior work: clean code, proper structure, reasonable naming. But it makes decisions like someone who's never shipped to production. It doesn't anticipate edge cases. It doesn't think about what breaks when requirements change. It doesn't push back and say "this approach won't scale." It does exactly what you ask, as fast as possible, and moves on.

That's not what good junior developers do. Good junior developers *learn*. They carry forward the lesson from the last code review. They internalize the team's standards. They develop taste. The AI resets to zero every session. It's a brilliant executor with no institutional memory. Which, incidentally, is exactly why the CLAUDE.md file works so well: it's a substitute for the learning the AI can't do on its own.

What this really changes is the path to seniority. When I started my career, I spent years writing boilerplate, debugging trivial issues, and building muscle memory for language syntax. That was the apprenticeship. If AI handles the boilerplate, the apprenticeship has to happen differently: through architecture decisions, system design, debugging the AI's mistakes, and developing the judgment to know when the AI is confidently wrong. The skill being automated isn't "coding." It's typing. The skills that matter are judgment, taste and systems thinking. Those are harder to develop, and they matter more than ever.

## What I'm Actually Changing

I manage 11 engineers and I'm leading AI transformation for 75 more. This side project wasn't academic. It directly informed how I'm approaching AI adoption for my team.

First, I'm treating AI tool onboarding like I'd treat onboarding a new team member. That means establishing standards *before* giving it work: CLAUDE.md files in every repository, pre-commit hooks enforced from day one, clear definitions of done. We don't let new hires push untested code. We shouldn't let AI assistants do it either.

Second, I'm investing in my engineers' ability to direct AI, not just use it. The hardest moments in this project weren't about prompting. They were about recognizing when the AI was solving the wrong problem. That requires deep domain knowledge. So I'm doubling down on architecture reviews, system design discussions, and technical mentoring. The better my team understands our systems, the more effectively they can steer the AI.

Third, I'm being honest about what this means for how we allocate time. If a side project I built in 5 hours would have taken 2–4 weeks manually, the math applies to our production work too. Not linearly because production code has more constraints, more stakeholders, more edge cases. But the direction is clear: the ratio of thinking-to-typing is shifting dramatically, and teams that adapt their processes to that shift will outperform those that don't.

We're early in this. I don't know yet whether the productivity gains I saw on a solo side project translate cleanly to a team working on production systems with real users and real consequences. But I know the experiment is worth running and I'd rather run it with guardrails in place than discover we needed them after the fact.

The code was written by the AI. The tool works because a human was steering.