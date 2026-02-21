---
layout: post
title:  "The Broken Ladder, Part 2: How to Build a Retention Moat Before the Senior Talent Crisis Hits"
date:   2026-02-17 08:00:40
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-02-16-the-broken-ladder-ai-is-killing-junior-careers/header-illustration.jpg'
description: "The playbook for engineering leaders who see the pipeline drying up. And want to be ready when competitors aren't."
---
<img src="/assets/posts/2026-02-16-the-broken-ladder-ai-is-killing-junior-careers/header-illustration.jpg" alt="The Broken Ladder, Part 2: How to Build a Retention Moat Before the Senior Talent Crisis Hits" class="grid-fig" />

In [Part 1](https://pierremary.com/en/posts/the-broken-ladder-ai-is-killing-junior-careers), I argued that AI isn't killing engineering jobs — it's killing engineering careers. If you buy that diagnosis, the question becomes: what do you actually do about it?

I've spent the past year answering that in practice. I run a platform engineering team of 11 and led AI deployment across a 75-engineer organization. When we rolled out Claude, we hit near-100% adoption in a week. Engineers loved it. Then our eNPS survey came back and complicated the picture.

In one-on-ones, engineers told me they feared being asked to produce more with no upside for them. Some worried their entire domain was becoming obsolete. One senior engineer put it more bluntly: colleagues were using AI to "produce more of the wrong thing." The tools weren't the problem. The absence of a strategy for the humans using them was.

## The Problem in Three Sentences

If you haven't read Part 1, here's the short version. Juniors aren't developing depth because AI handles the learning-grade work. Mid-levels are burning out under the pressure to "do more with AI" without clarity on what "more" means. And seniors are getting poached, because when everyone has the same tools, the scarce asset is the human who knows what to build and why.

Three forces, compounding. And if you're not actively building against them, they're building against you.

## Fixing the Ladder: What Actually Works

The default response to "your people need development" is to buy everyone a Coursera license and call it a day. I've been in the leadership meetings where this gets proposed with a straight face. It does not work. Engineers don't develop judgment from online courses. They develop it from doing progressively harder work on real problems, with feedback from people who've done it before.

The challenge is designing systems where AI accelerates that development instead of bypassing it.

### Principle 1: Redefine What Each Level Actually Does

A few months after our AI rollout, one of my engineers told me in a one-on-one that his job had become "reviewing AI-generated pull requests all day." He wasn't complaining about the AI. He was telling me his role had changed underneath him and nobody had acknowledged it.

He was right. The traditional engineering ladder assumed that juniors write code, mid-levels design components, and seniors architect systems. AI has compressed the bottom of that stack. A junior with a coding agent can produce output that looks mid-level. The difference is in what they *understand* about it. And understanding is what makes them valuable in two years.

So I started thinking about the ladder differently:

**Junior (E1-E2): The Validator.** Their primary job is no longer writing code from scratch — it's evaluating, testing, and understanding AI-generated code. Can they explain why this implementation works? Can they spot the edge case the AI missed? Can they trace the failure mode that shows up at scale?

This is already happening whether we design for it or not. The question is whether we treat it as a bug or a feature. If you measure juniors on bugs caught in AI-generated code, on code review quality, on their ability to articulate trade-offs — reviewing AI output becomes a powerful learning mechanism. If you measure them on tickets closed, it's just a treadmill.

**Mid-level (E3): The Orchestrator.** One of my mid-levels described his job shift as going from "building services" to "making sure five AI-generated services actually talk to each other." He wasn't exaggerating. Mid-levels become system integrators — the people who manage the context AI tools lack and translate business requirements into constraints AI can execute against. Less implementation code, more connective tissue: API contracts, failure handling across service boundaries, system-level optimization.

This is also the level under the most pressure. Upwork's 2024 study of 2,500 workers found that among the most productive AI users, 88% report burnout, and they're twice as likely to quit. Mid-levels are often the most productive AI users on a team — and the most at risk of burning out if you don't actively manage their workload and growth.

**Senior (E4-E5): The Strategist.** Seniors operate where AI adds the least value: organizational trade-offs, multi-year technical strategy, mentorship, cross-team influence. Their role doesn't change much, but their leverage increases dramatically. One senior who defines the right constraints for AI-augmented development multiplies the output of everyone below them.

That leverage makes them targets. Replacing a senior costs 1–2x their annual salary in recruiting and ramp-up alone, and Wharton's Matthew Bidwell found that external hires need roughly two years to match the performance of someone promoted from within. When a senior leaves, you don't just lose output — you lose the person who was developing your next three mid-levels.

The investment: protect senior time for mentorship and strategic work. Don't let the temptation to "have seniors use AI to do more individual work" undermine their highest-value contribution — developing the people around them. Jellyfish's productivity data shows why the distinction matters: senior developers gain 22% more speed from Copilot, while juniors gain only 4%. Same tool, radically different leverage, depending on the depth the person brings.

### Principle 2: Restructure How Juniors Learn

Matt Beane's research, which I referenced in Part 1, identifies three requirements for skill development: challenge, complexity, and connection. AI disrupts all three. The fix isn't banning AI — it's engineering the conditions for learning even when AI is present.

**Deliberate friction.** Designate specific projects or sprints where juniors work without AI assistance, or where they solve the problem first, then compare their solution to what AI produces. Think of it like surgical training: theory first, then observation, then simulation, then supervised practice with progressive autonomy, then independence only after demonstrated comprehension. Each stage requires mastery before advancing. The manual work builds the mental model that makes the automated work effective.

I'll be honest: this is the hardest sell. When I first proposed AI-free sprints to my team, two engineers pushed back immediately. They'd gotten fast with AI and saw deliberate friction as a productivity tax. One told me it felt like being asked to dig a ditch with a spoon when there's a backhoe right there. He wasn't wrong about the feeling. But we ran a pilot anyway, and something interesting happened: the junior who'd been shipping the fastest with AI couldn't explain the retry logic in a service she'd built the week before. The sprint without AI forced her to actually understand what she was building. She told me afterward it was the most she'd learned in months. I don't think she'd have said that before the experiment made the gap visible.

**AI-as-tutor, not AI-as-doer.** Train juniors to use AI in explain mode, not generate mode. The prompt isn't "fix this" — it's "explain why this might fail under load." Not "write this for me" — but "what are the trade-offs between these three approaches?" The same tool that shortcuts learning can deepen it, depending entirely on how it's used.

**Three-way pair programming.** The classic pair model gains a third participant: the AI tool. The junior drives, the senior navigates, the AI generates. The senior's job isn't to write code or dictate — it's to ask questions: "Why did the AI suggest this approach? What would happen if we changed this constraint? Where could this fail?" The AI provides raw material. The senior provides the judgment framework. The junior develops both.

### Principle 3: Measure Capability Growth, Not Just Output

Here's a stat that should make every engineering leader uncomfortable: the 2025 DORA report found that despite 90% AI adoption across surveyed teams, AI correlated with a 1.5% *decrease* in delivery throughput and a 7.2% *reduction* in delivery stability. Output metrics said everything was fine. The systems were degrading underneath. DORA's response was to abandon its linear performance rankings entirely, replacing them with team archetypes that blend delivery performance with human factors. If the most influential engineering metrics framework in the world is moving away from pure output measurement, your organization should too.

I learned this the hard way. For the first two months after our AI rollout, every dashboard looked great — PRs merged faster, cycle time dropped, deployment frequency climbed. Then we had a production incident that should have been caught in review. The engineer who'd approved the PR told me he'd been averaging 15 reviews a day and "the AI code all looks the same after a while." Our output metrics had been hiding a capability problem.

Add capability metrics alongside output metrics:

**Code review quality.** Track whether reviews are catching meaningful issues versus rubber-stamping approvals. After that incident, this became the first metric I added to our team health dashboard.

**Incident resolution depth.** When engineers respond to incidents, are they following runbooks or contributing root cause analysis? Track the complexity they can resolve independently over time.

**Architecture decision participation.** Are mid-levels contributing to ADRs (Architecture Decision Records)? Are they raising trade-offs the team hadn't considered?

**AI usage patterns.** Engineers who use AI primarily for generation ("write this for me") develop differently from those who use it for exploration ("explain this," "compare approaches," "what could go wrong here"). You don't need to surveil individual prompts — but you can build team norms that push toward exploratory use. When my team was producing more of the wrong thing faster, we needed to measure *how* people worked with AI, not just what they shipped.

## Where to Start: A 90-Day Plan

If this feels like a lot, here's how I'd sequence it.

**Days 1-30: Listen and audit.** Start with your people, not your process. Run an anonymous survey — not about AI satisfaction, but about growth. Ask: *Do you feel you're developing new skills? Do you understand the AI strategy? Do you see a career path here?*

I almost skipped this and went straight to process changes. The eNPS survey I described earlier is what stopped me — without it, I'd have been solving for the wrong problem.

Then map your team against your levels framework. For each person, answer two questions: Where are they today? Where would they be if AI didn't exist? The gap tells you how much AI has accelerated output versus development.

**Days 31-60: Pilot one team.** Pick one squad and run a "learning sprint" — a real project with structured AI constraints. Not no-AI, but intentional-AI. Pair juniors with seniors using the three-way model. Measure comprehension, not velocity: Can the junior explain the system they just built? Can they debug it without AI assistance? Can they articulate why this approach was chosen over alternatives?

Document what you learn. You'll need the data to make the case for scaling.

**Days 61-90: Make one invisible thing visible.** Add one capability metric to your existing performance framework. Don't overhaul everything — just make one thing measurable: code review quality, incident resolution depth, or architecture participation. The act of measuring changes behavior. It also sends a signal to your team: we value growth, not just output.

By day 90, you'll have data from your survey, learnings from your pilot, and one new metric in production. That's enough to build a roadmap for the next year — and to start changing the conversation with your leadership about what "AI strategy" actually means.

## What I'm Still Figuring Out

I want to end honestly rather than neatly.

The natural objection to everything I've described is "we can't afford to slow down when competitors ship faster with AI." I'd argue your competitors are shipping faster today by consuming their pipeline — optimizing for the quarter at the expense of the decade. But I don't have a decade of data to prove that. I have conviction, early signals, and the historical pattern from every previous technology wave where the companies that invested in their people outperformed the ones that optimized purely for output.

Here's what I'm still watching: Will the three-way pair programming model hold up as AI tools get better, or will it need to evolve again in a year? How do you measure capability growth without turning it into surveillance? Can "deliberate friction" survive the pressure to ship faster in a downturn?

I don't know yet. But the organizations asking these questions now — imperfectly, experimentally — will be in a fundamentally different position than the ones that wake up in 2029 wondering where all their senior engineers went.

The ladder is breaking. I'd rather be caught building a new one than waiting for someone else to figure it out.

This is Part 2 of The Broken Ladder series. Read [Part 1: The Broken Ladder: AI Isn't Killing Engineering Jobs. It's Killing Engineering Careers](https://pierremary.com/en/posts/the-broken-ladder-ai-is-killing-junior-careers).

## Sources

- Upwork / Workplace Intelligence (2024). "From Burnout to Balance: AI-Enhanced Work Models." Survey of 2,500 workers across four countries.
- Bidwell, M. (2011). "Paying More to Get Less: The Effects of External Hiring versus Internal Mobility." Wharton, Administrative Science Quarterly.
- Bersin, J. Employee replacement cost analysis (1.5-2x annual salary). As cited in Qualtrics workforce research.
- Beane, M. (2024). The Skill Code: How to Save Human Ability in an Age of Intelligent Machines. HarperCollins.
- Jellyfish (2025). "AI Codegen Tools Propel Senior Developers." Senior vs junior AI productivity gap data.
- Google Cloud DORA Team (2025). "2025 Accelerate State of DevOps Report." AI adoption impact on delivery throughput and stability.
- PMC / NIH (2023-2024). Robotic surgery graduated autonomy training models.
