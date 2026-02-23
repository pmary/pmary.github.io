---
layout: post
title:  "The Broken Ladder, Part 2: How to Build a Retention Moat Before the Senior Talent Crisis Hits"
date:   2026-02-23 08:00:40
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-02-17-the-broken-ladder-part-2-how-to-build-a-retention-moat-before-the-senior-talent-crisis-hits/header-illustration.jpg'
description: "A retention playbook for engineering leaders who see the pipeline drying up. And want to be ready when competitors aren't."
---
<img src="/assets/posts/2026-02-17-the-broken-ladder-part-2-how-to-build-a-retention-moat-before-the-senior-talent-crisis-hits/header-illustration.jpg" alt="The Broken Ladder, Part 2: How to Build a Retention Moat Before the Senior Talent Crisis Hits" class="grid-fig" />

A few weeks after we rolled out Claude across a 75+ engineer organization, one of my senior engineers told me what was actually happening on the ground. Colleagues were using AI to "produce more of the wrong thing." Faster.

He wasn't being cynical. He was describing the gap between having powerful tools and having a strategy for the humans using them. In [Part 1](https://pierremary.com/en/posts/the-broken-ladder-ai-is-killing-junior-careers), I argued that AI isn't killing engineering jobs, it's killing engineering careers. Three forces are compounding: juniors aren't building depth, mid-levels are burning out, and seniors are getting poached. If you buy that diagnosis, the question becomes: what do you actually do about it?

The first useful thing I did wasn't deploying a framework. It was asking my team what had actually changed for them. In one-on-ones and in front of the coffee, the picture got more specific. Juniors worried they weren't learning anything. Mid-levels felt squeezed between rising expectations and unclear career paths. Seniors were fielding recruiter calls weekly. Same AI rollout, three different crises.

## Fixing the Ladder: What Actually Works

The default response to "your people need development" is to buy everyone a Coursera license and call it a day. In the past, I've been in the leadership meetings where this gets proposed with a straight face. It does not work.

There's a broader version of the same mistake: treating tool deployment as strategy. It shows up as "we've rolled out Copilot" in the board deck and "I don't know what I'm supposed to be learning anymore" in one-on-ones. The gap between those two sentences is the entire problem. Engineers don't develop judgment from online courses or AI tools. They develop it from doing progressively harder work on real problems, with feedback from people who've done it before.

The challenge is designing systems where AI accelerates that development instead of bypassing it.

### Principle 1: Redefine What Each Level Actually Does

A few months after our AI rollout, one of my engineers told me that his job had become "reviewing AI-generated pull requests all day." He wasn't complaining about the AI. He was telling me his role had changed underneath him and nobody had acknowledged it.

He was right. The traditional engineering ladder assumed that juniors write code, mid-levels design components, and seniors architect systems. AI has compressed the bottom of that stack. A junior with a coding agent can produce mid-level output. The difference is in what they *understand* about it. And understanding is what makes them valuable in two years.

So I started thinking about the ladder differently:

**Junior (E1-E2): The Validator.** I noticed a pattern in our juniors' PRs: they were shipping faster than ever, but their code review comments had gone from paragraphs to thumbs-up emojis. They weren't learning from the code anymore, they were forwarding it.

The junior role hasn't disappeared. It's shifted. The primary job is no longer writing code from scratch: it's evaluating, testing, and understanding AI-generated code. Can they explain why this implementation works? Can they spot the edge case the AI missed? If you measure juniors on bugs caught in AI-generated code, on review quality, on their ability to articulate trade-offs, then, reviewing AI output becomes a powerful learning mechanism. If you measure them on tickets closed, it's just a treadmill.

**Mid-level (E3): The Orchestrator.** One of my mid-levels described his job shift as going from "building services" to "making sure AI-generated services actually integrate with our current infrastructure and golden paths." He wasn't exaggerating. Mid-levels become system integrators: the people who manage the context AI tools lack and translate business requirements into constraints AI can execute against. Less implementation code, more connective tissue: API contracts, failure handling across service boundaries, system-level optimization.

This is also the level under the most pressure. Mid-levels are often the most productive AI users on a team. But also the ones most likely to burn out if nobody's managing the gap between what they're shipping and what they're learning.

**Senior (E4-E5): The Strategist.** Seniors operate where AI adds the least value: organizational trade-offs, multi-year technical strategy, mentorship, cross-team influence. Their role doesn't change much, but their leverage increases dramatically. A seniors can spend two hours defining the API contract constraints for a new service. Three juniors can then use AI to generate implementations against those constraints in a day. Without those two hours of senior judgment, we'd have had three fast, incompatible services. That's the multiplier.

Which is exactly what makes them targets. Replacing a senior costs 1–2x their annual salary in recruiting and ramp-up alone, and Wharton's Matthew Bidwell found that external hires need roughly two years to match the performance of someone promoted from within. When a senior leaves, you don't just lose output, you lose the person who was developing your next three mid-levels.

The investment: protect senior time for mentorship and strategic work. Don't let the temptation to "have seniors use AI to do more individual work" undermine their highest-value contribution: developing the people around them. On my team, the biggest AI productivity gains came from seniors who used the tools to free up time for architecture reviews and one-on-ones. Not from seniors who used them to write more code themselves.

### Principle 2: Restructure How Juniors Learn

Redefining levels only works if the pipeline feeding them still develops real skill. Matt Beane's research, which I referenced in Part 1, identifies three requirements for skill development: challenge, complexity, and connection. AI disrupts all three. The fix isn't banning AI, it's engineering the conditions for learning even when AI is present.

**Deliberate friction.** Designate specific projects or sprints where juniors work without AI assistance, or where they solve the problem first, then compare their solution to what AI produces. Think of it like surgical training: observation, then supervised practice, then independence. Each stage requiring demonstrated competence before advancing. The manual work builds the mental model that makes the automated work effective.

This will be the hardest sell. Engineers who've gotten fast with AI will see deliberate friction as a productivity tax, like being asked to dig a ditch with a spoon when there's a backhoe right there. They won't be wrong about the feeling. But Beane's research is clear: skill development requires struggle with real problems, not just exposure to solutions. When I see juniors shipping PRs they can't meaningfully review, I'm looking at the cost of skipping that struggle. AI-free sprints are the experiment I'm planning to run next. I don't know yet if the team will buy in. But if the alternative is a pipeline that produces fast engineers who understand nothing, the friction is worth testing.

**AI-as-tutor, not AI-as-doer.** Train juniors to use AI in explain mode, not generate mode. The prompt isn't "fix this", it's "explain why this might fail under load." Not "write this for me", but "what are the trade-offs between these three approaches?"

The difference is concrete. A junior prompting "write a rate limiter for this API" gets working code and learns nothing. The same junior prompting "I'm considering a token bucket versus a sliding window approach for rate limiting. What are the failure modes of each under bursty traffic?" gets trade-offs they have to evaluate. Same tool. Radically different development outcome. The same tool that shortcuts learning can deepen it, depending entirely on how it's used.

**Three-way pair programming.** The classic pair model gains a third participant: the AI tool. The junior drives, the senior navigates, the AI generates. The senior's job isn't to write code or dictate. It's to ask questions: "Why did the AI suggest this approach? What would happen if we changed this constraint? Where could this fail?" The AI provides raw material. The senior provides the judgment framework. The junior develops both.

### Principle 3: Measure Capability Growth, Not Just Output

Here's a stat that should make every engineering leader uncomfortable: the 2025 DORA report found that despite 90% AI adoption across surveyed teams, AI correlated with a 1.5% decrease in delivery throughput and a 7.2% reduction in delivery stability. Upwork's 2024 study tells the same story from the human side: Among the most productive AI users, 88% report burnout, and they're twice as likely to quit. Output metrics said everything was fine. The people and the systems were degrading underneath.

I learned this the hard way. For the first two months after our AI rollout, every dashboard looked great. PRs merged faster, cycle time dropped, deployment frequency climbed. Then we had a production incident that should have been caught in review. The engineer who'd approved the PR told me he'd been averaging 15 reviews a day and "the AI code all looks the same after a while." Our output metrics had been hiding a capability problem.

After that incident, I stopped trusting output metrics on their own. Here's what I added:

**Code review quality.** Track whether reviews are catching meaningful issues versus rubber-stamping approvals. We started tagging review comments as "nitpick," "bug," or "design concern". The ratio tells you whether reviews are substantive or performative.

**Incident resolution depth.** When engineers respond to incidents, are they following runbooks or contributing root cause analysis? We started tracking whether the post-mortem included a root cause the engineer identified independently versus one escalated to a senior. The trend over quarters tells you more about growth than any sprint velocity chart.

**Architecture decision participation.** Are mid-levels contributing to ADRs? Are they raising trade-offs the team hadn't considered? I started requiring at least one mid-level reviewer on every ADR. Not as a gate, but as a growth mechanism. The quality of their comments became one of my clearest signals for promotion readiness.

**AI usage patterns.** Engineers who use AI primarily for generation ("write this for me") develop differently from those who use it for exploration ("explain this," "compare approaches," "what could go wrong here"). You don't need to surveil individual prompts but you can build team norms that push toward exploratory use. When my team was producing more of the wrong thing faster, we needed to measure *how* people worked with AI, not just what they shipped.

## Where to Start: A 90-Day Plan

If this feels like a lot, that's because it is. But the alternative is doing nothing and hoping your seniors stick around. It's more work. You just don't see it until the resignation email lands.

### Days 1-30: Listen and audit

Start with your people, not your process. Run an anonymous survey, not about AI satisfaction, but about growth. Ask: *Do you feel you're developing new skills? Do you understand the AI strategy? Do you see a career path here?*

Then map your team against your levels framework. For each person, answer two questions: Where are they today? Where would they be if AI didn't exist? The gap tells you how much AI has accelerated output versus development.

### Days 31-60: Pilot one team

Pick one squad and run a "learning sprint", a real project with structured AI constraints. Not no-AI, but intentional-AI. Pair juniors with seniors using the three-way model. Measure comprehension, not velocity: Can the junior explain the system they just built? Can they debug it without AI assistance? Can they articulate why this approach was chosen over alternatives?

Document what you learn. You'll need the data to make the case for scaling.

### Days 61-90: Make one invisible thing visible
Add one capability metric to your existing performance framework. Don't overhaul everything, just make one thing measurable: code review quality, incident resolution depth, or architecture participation. The act of measuring changes behavior. It also sends a signal to your team: we value growth, not just output.

By day 90, you'll have data from your survey, learnings from your pilot, and one new metric in production. That's enough to build a roadmap for the next year and to start changing the conversation with your leadership about what "AI strategy" actually means.

## What I'm Still Figuring Out

The natural objection to everything I've described is "we can't afford to slow down when competitors ship faster with AI." I think that framing is backwards. Your competitors are shipping faster today by consuming their pipeline. They are otimizing for the quarter at the expense of the decade. I don't have a decade of data to prove that. I have conviction, early signals, and the historical pattern from every previous technology wave where the companies that invested in their people outperformed the ones that optimized purely for output.

Here's what I'm still watching: Will the three-way pair programming model hold up as AI tools get better, or will it need to evolve again in a year? How do you measure capability growth without turning it into surveillance? Can "deliberate friction" survive the next quarter where leadership asks why your team's velocity dipped?

I don't know yet. But the organizations asking these questions now, imperfectly, experimentally, will be in a fundamentally different position than the ones that wake up in 2029 wondering where all their senior engineers went.

The ladder is breaking. I'd rather be caught building a new one than waiting for someone else to figure it out.

This is Part 2 of The Broken Ladder series. Read [Part 1: The Broken Ladder: AI Isn't Killing Engineering Jobs. It's Killing Engineering Careers](https://pierremary.com/en/posts/the-broken-ladder-ai-is-killing-junior-careers).

## Sources

- Upwork / Workplace Intelligence (2024). "From Burnout to Balance: AI-Enhanced Work Models." Survey of 2,500 workers across four countries.
- Bidwell, M. (2011). "Paying More to Get Less: The Effects of External Hiring versus Internal Mobility." Wharton, Administrative Science Quarterly.
- Bersin, J. Employee replacement cost analysis (1.5-2x annual salary). As cited in Qualtrics workforce research.
- Beane, M. (2024). The Skill Code: How to Save Human Ability in an Age of Intelligent Machines. HarperCollins.
- Google Cloud DORA Team (2025). "2025 Accelerate State of DevOps Report." AI adoption impact on delivery throughput and stability.
- PMC / NIH (2023-2024). Robotic surgery graduated autonomy training models.
