---
layout: post
title:  "The Broken Ladder, Part 2: How to Build a Retention Moat Before the Senior Talent Crisis Hits"
date:   2026-02-08 08:00:40
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-02-16-the-broken-ladder-ai-is-killing-junior-careers/header-illustration.jpg'
description: "The playbook for engineering leaders who see the pipeline drying up. And want to be ready when competitors aren't."
---
<img src="/assets/posts/2026-02-16-the-broken-ladder-ai-is-killing-junior-careers/header-illustration.jpg" alt="The Broken Ladder, Part 2: How to Build a Retention Moat Before the Senior Talent Crisis Hits" class="grid-fig" />

In Part 1, I argued that AI isn't killing engineering jobs. It's killing engineering careers. Entry-level hiring has collapsed across the industry. The learning-grade work that used to build junior engineers into seniors is being automated away. And companies are consuming their talent pipeline to capture short-term productivity gains.

If you buy that diagnosis, and the data is increasingly hard to argue with, the question becomes: what do you actually do about it?

I've spent the past year answering that question in practice, not theory. I run a platform engineering team of 11 and led the deployment of AI tools across a 75-engineer organization. What follows is what I've learned, what I'm implementing, and what I think every engineering leader should be planning for right now.

## The Retention Bomb You're Not Seeing

Before we get to solutions, let's be precise about the threat.

Gartner projects that 80% of the engineering workforce will need significant upskilling by 2027 to remain effective in an AI-augmented environment. That's not a gradual transition. That's a cliff. And the organizations that don't invest in getting their people across that cliff are going to lose them to the organizations that do.

The math is brutal. According to Gallup, replacing a mid-level employee costs between 50% and 200% of their annual salary (analyst Josh Bersin puts the figure at 1.5 to 2x) when you account for recruiting, onboarding, lost productivity during ramp-up, and the institutional knowledge that walks out the door. Wharton's Matthew Bidwell quantified the alternative: external hires are paid 18-20% more than internal promotions for equivalent roles, receive lower performance evaluations for their first two years, and carry 61% higher risk of being fired. They need approximately two full years just to reach the performance level of someone promoted from within. For a senior engineer with deep system understanding, the true cost is often higher because the knowledge they carry about why architectural decisions were made, what was tried and failed, and where the hidden landmines live in the codebase simply cannot be transferred in a handover document.

Now combine three forces:

**Force 1: Your juniors aren't developing**. AI handles the learning-grade work, so the juniors you do have aren't building depth at the rate previous cohorts did. They ship faster. They understand less.

**Force 2: Your mid-levels are burned out**. Without juniors to absorb routine work, mid-level engineers are stuck doing both feature delivery and the operational tasks that used to be distributed across the team. They're working harder with less support, and they can see the promotion path narrowing as AI compresses the middle of the ladder. Upwork's 2024 study of 2,500 workers quantified this: 77% of AI-using employees say these tools have added to their workload, not reduced it. The most productive AI users are the most burned out at 88%, and they are twice as likely to consider quitting. An HBR ethnographic study (February 2026) identified the mechanisms: task expansion (workers absorb responsibilities that previously justified additional headcount), blurred work-life boundaries, and increased multitasking across AI-generated outputs. AI isn't lightening the load. It's redistributing and intensifying it.

**Force 3: Your seniors are getting poached**. In a market where everyone has the same AI tools, the scarce asset is the human who knows what to build and why. Senior engineers with strong judgment and system understanding command a growing premium, and they know it.

The timeline looks something like this:

**2025-2026**: Companies optimize headcount through AI productivity. Feels great. Sprint velocity up, cost per feature down. Leadership congratulates itself.

**2027-2028**: Mid-level attrition accelerates as burned-out engineers leave for organizations that invest in their growth. Institutional knowledge starts bleeding out. The juniors who were hired two years ago aren't ready to backfill because they didn't develop sufficient depth.

**2028-2030**: Senior engineers become the most contested talent in tech. The pipeline that should have produced the next generation of seniors was thinned at the bottom and squeezed in the middle. Organizations compete for a shrinking pool, driving compensation up and making retention even harder.

This isn't speculation. It's the direct, logical consequence of the hiring and automation patterns we can already measure. A Harvard study examining approximately 62 million workers across 285,000 U.S. firms found that when companies adopt generative AI, junior employment drops 9-10% within six quarters while senior employment barely changes. The Stanford Digital Economy Lab tracked 3.5 to 5 million workers through ADP payroll records and found employment for software developers aged 22-25 declined nearly 20% from its 2022 peak, while employment for workers aged 30 and above in high AI-exposure categories grew 6-12% over the same period. The divergence began precisely when ChatGPT launched. The only question is whether you're the company building the moat or the one watching your people climb over someone else's.

## Fixing the Ladder: What Actually Works

The default response to "your people need upskilling" is to buy everyone a Coursera license and call it a day. This does not work. Engineers don't develop judgment from online courses. They develop it from doing progressively harder work on real problems, with feedback from people who've done it before.

The challenge is designing a system where AI accelerates that development instead of bypassing it.

### Principle 1: Redefine What Each Level Actually Does

The traditional engineering ladder assumed that juniors write code, mid-levels design components, and seniors architect systems. AI has compressed the bottom half of that stack. A junior with a coding agent can produce code that looks like mid-level output. The difference is in what they understand about that code. And understanding is what makes them valuable in two years.

Here's how I think about the redefined ladder:

**Junior (E1-E2): The Validator**. Their primary job is no longer writing code from scratch. It's evaluating, testing, and understanding AI-generated code. Can they explain why this implementation works? Can they identify the edge case the AI missed? Can they trace the failure mode that will show up at scale? This is harder than writing the code themselves, and far more valuable as a learning mechanism.

The key shift: instead of measuring juniors on lines written or tickets closed, measure them on bugs caught in AI-generated code, on the quality of their code reviews, on their ability to articulate trade-offs. Sprint velocity is no longer the signal. Comprehension depth is.

**Mid-level (E3): The Orchestrator**. Mid-level engineers become system integrators, the people who understand how components interact, who manage the context that AI tools lack, and who translate business requirements into technical constraints that AI can execute against. They spend less time writing implementation code and more time on the connective tissue: API contracts, failure handling across service boundaries, performance optimization at the system level.

The critical development: orchestration skill is what separates someone who uses AI tools productively from someone who generates plausible-looking code that fails in production. This is the skill companies will be desperate for by 2028.

**Senior (E4-E5): The Strategist**. Seniors operate at the level where AI tools add the least value: organizational trade-offs, multi-year technical strategy, mentorship, cross-team influence. Their role doesn't change much, but their leverage increases dramatically. One senior engineer who can define the right constraints for AI-augmented development multiplies the output of every engineer below them.

The investment: protect senior time for mentorship and strategic work. Don't let the temptation to "have seniors use AI to do more individual work" undermine their highest-value contribution, which is developing the people around them.

This framework isn't just theoretical. Nicholas Zakas (creator of ESLint) independently proposed a similar three-stage evolution: Autocomplete (AI as productivity tool), Conductor (engineers guide LLMs through synchronous sessions), and Orchestrator (managing multiple autonomous agents). Jellyfish's productivity data shows why the level distinction matters: senior developers write code 22% faster with Copilot, while junior developers gain only 4%. The same tool, radically different leverage, depending on the depth of understanding the person brings to it.

### Principle 2: Restructure How Juniors Learn

Matt Beane's research, which I referenced in Part 1, identifies three requirements for skill development: challenge, complexity, and connection. AI disrupts all three. The fix isn't banning AI tools, it's deliberately engineering the conditions for learning even when AI is present.

**Deliberate friction**. Designate specific projects, rotations, or sprints where juniors work without AI assistance, or where they're required to solve the problem first, then compare their solution to what AI produces. The most mature model for this comes from robotic surgery training, which follows a five-stage graduated autonomy path: theoretical knowledge, observation, simulation, supervised practice with progressive autonomy, and independent practice only after proctor confirmation. AI provides automated skill assessment and adaptive feedback throughout, but the surgeon must demonstrate understanding at each stage before advancing. Engineering organizations could adopt this structure directly: theory (system architecture review), observation (shadowing senior debugging sessions), simulation (solving problems in staging environments), supervised practice (AI-assisted work with senior review), and independence (full autonomy after demonstrated comprehension). The manual work builds the mental model that makes the automated work effective.

**AI-as-tutor, not AI-as-doer**. Train juniors to use AI tools in explain mode, not generate mode. When they encounter unfamiliar code, the prompt isn't "fix this", it's "explain why this might fail under load." When they're designing a component, the prompt isn't "write this for me", it's "what are the trade-offs between these three approaches?" The same tool that can shortcut learning can deepen it, depending entirely on how it's used. An ACM 2025 study quantified this split: only 23% of computing students say AI helps them "understand better," while 72% say it helps them "finish faster." Students using AI "spent much less time evaluating their work," raising concerns about what the researchers call "metacognitive laziness." The gap is the difference between building an engineer and building a dependency.

**Structured pair programming with AI in the room**. The classic pair programming model, where one drives, one navigates, gains a third participant: the AI tool. The junior drives, the senior navigates, and the AI generates. The senior's job isn't to write the code or to tell the junior what to type. It's to ask questions: "Why did the AI suggest this approach? What would happen if we changed this constraint? Where could this fail?" The AI provides the raw material. The senior provides the judgment framework. The junior develops both.

### Principle 3: Measure Capability Growth, Not Just Output

This is where most organizations fail. Their entire performance infrastructure measures output: sprint velocity, story points, deployment frequency, cycle time. None of it measures whether an engineer is developing the judgment they'll need in two years. The 2025 DORA report, the industry's most-adopted framework for engineering effectiveness, makes this case definitively. Despite near-universal AI adoption (90%), DORA found AI correlated with a 1.5% decrease in delivery throughput and 7.2% reduction in delivery stability. Output metrics said everything was fine. The systems were degrading underneath. DORA responded by abandoning its linear performance rankings entirely, replacing them with team archetypes that blend delivery performance with human factors. If the most influential metrics framework in the world is moving away from output measurement, your organization should too.

Add capability metrics alongside output metrics:

**Code review quality scores**. Track whether an engineer's code reviews are catching meaningful issues versus rubber-stamping approvals. An improving review score means deepening system understanding.

**Incident resolution depth**. When an engineer participates in incident response, are they following runbooks or contributing to root cause analysis? Track the complexity of incidents they can resolve independently over time.

**Architecture decision participation**. Are mid-level engineers contributing to ADRs (Architecture Decision Records)? Are they raising trade-offs that the team hadn't considered? This is a direct signal of developing judgment.

**AI tool usage patterns**. This is sensitive but important. Engineers who use AI tools primarily for generation (write this for me) develop differently than those who use them for exploration (explain this, compare these approaches, what could go wrong here). You don't need to surveil individual prompts — but you can create cultural norms and team practices that push toward exploratory use.

## Where to Start: A 90-Day Quick Start

If you're reading this as an engineering leader and thinking "this is a lot," here's what I'd prioritize in the first 90 days:

**Days 1-30: Audit**. Map your team against a skills/levels framework. For each person, answer two questions: Where are they today? Where would they be if AI didn't exist? The gap between those answers tells you how much AI has accelerated their output versus their development.

**Days 31-60: Design**. Pick one team or squad and pilot the restructured model. Create a "learning sprint" where juniors work on a real project with deliberate AI constraints. Not no-AI, but structured-AI. Pair them with seniors using the three-way model described above. Measure comprehension, not velocity.

**Days 61-90: Instrument**. Add one capability metric to your existing performance framework. Don't overhaul everything at once. Just make one invisible thing visible: code review quality, incident depth, or architecture participation. The act of measuring will change behavior.

## The Competitive Moat

Everything I've described costs money and attention. The natural objection is: "We can't afford to slow down when competitors are shipping faster with AI."

Here's the counter: your competitors are shipping faster today by consuming their talent pipeline. The ones cutting juniors, burning out mid-levels, and hoping AI will somehow solve the senior shortage are optimizing for the current quarter at the expense of the current decade.

Korn Ferry projects a global shortage of 85 million skilled workers by 2030, with technology roles among the hardest hit. IDC estimates the worldwide developer shortage at 4 million, with economic losses from unfilled tech roles reaching $5.5 trillion by 2026. In the U.S., the Bureau of Labor Statistics projects software developer employment growing 15% through 2034. Twice the rate of the general workforce, with over 129,000 openings annually. The semiconductor industry needs one million additional workers worldwide by 2030. These aren't AI-displacement numbers — they're AI-demand numbers. The technology creates more work than it eliminates, but the work it creates requires deeper skills than the work it removes.

The organizations that will dominate the 2028-2030 talent market are the ones investing now in two things:

**Internal talent development**: building the systems that turn today's juniors into tomorrow's seniors, even (especially) in an AI-augmented environment. This is cheaper than external hiring at senior levels and produces engineers with institutional knowledge that no external hire can replicate.

**Retention through growth**: creating an environment where engineers see a clear path to deeper expertise, not just faster output. Exit interview data consistently shows that the primary reason strong engineers leave isn't compensation. It's the feeling that they've stopped growing. The organizations that can offer genuine growth in an AI-augmented world will retain disproportionately.

The investment is real but manageable. Industry benchmarks from ATD and LinkedIn's Workplace Learning Report suggest $3,000-5,000 per engineer annually for structured development: conferences, internal learning programs, protected time for mentorship, AI-augmented training environments. That's roughly the cost of two days of a recruiter's time trying to backfill a departing senior. And the returns are not marginal. ATD's landmark study found companies with comprehensive training programs have 218% higher income per employee and 24% higher profit margins. LinkedIn's workforce data shows companies excelling at internal mobility see twice the retention rate, and 94% of employees say they would stay longer if the company invested in their career development. Every dollar invested in training returns $4.53 on average.

The ROI compounds. Applying Gallup's replacement cost formula (1-2x annual salary) to a senior engineer earning $165,000 or more means every senior you develop internally instead of hiring externally saves six figures in recruiting, ramp-up, and lost productivity. Every mid-level you retain instead of losing to burnout preserves six months of institutional knowledge transfer. Every junior who develops real depth instead of AI-dependent surface skills becomes a mid-level two years sooner.

## The Choice
The next three years will bifurcate the technology industry into two types of organizations.

**Type A** companies recognize that AI tools are table stakes, everyone has them, and that sustainable competitive advantage comes from the depth and judgment of the humans using those tools. They invest in talent development, restructure their engineering ladders, and build cultures where growth is as valued as output. They retain their best people because those people can see a future worth building toward.

**Type B** companies treat AI as a headcount reduction lever. They cut juniors, burn mid-levels, and chase senior talent on the open market at ever-increasing premiums. They ship fast in 2025. By 2028, they're paying 2x market rate for seniors who don't stay, running on institutional knowledge that's increasingly thin, and wondering why their AI-generated code keeps failing in ways nobody on the team can diagnose. This isn't hypothetical. Klarna pursued aggressive AI replacement, shrinking from 5,527 employees to 3,422 in two years, a 40% reduction. The CEO deployed AI chatbots to perform the work of roughly 700 customer service agents. Customer satisfaction fell sharply. The company began rehiring human staff. Engineers, designers, and marketing employees were asked to help answer customer inquiries during the quality crisis. The speed was real. The sustainability wasn't.

The wall between these two types hardens over time. Type A companies attract talent. Type B companies bleed it. The engineers who leave Type B for Type A take their knowledge with them. The gap widens.

You don't get to choose later. The talent pipeline decisions you make in 2026 determine which type you are in 2030.

The ladder is breaking. Fix it now, while there's still time to build something people want to climb.

This is Part 2 of The Broken Ladder series. Read [Part 1: The Broken Ladder: AI Isn't Killing Engineering Jobs. It's Killing Engineering Careers](https://pierremary.com/en/posts/the-broken-ladder-ai-is-killing-junior-careers).

## Sources

- Gartner (2024). "Generative AI Will Require 80% of Engineering Workforce to Upskill Through 2027."
- Korn Ferry. "The Talent Crunch: Global Talent Shortage Could Reach 85 Million Workers by 2030."
- Beane, M. (2024). The Skill Code: How to Save Human Ability in an Age of Intelligent Machines. HarperCollins.
- Gallup. "The Cost of Replacing an Individual Employee." Employee turnover cost analysis (50%-200% of annual salary).
- Bersin, J. Employee replacement cost analysis (1.5-2x annual salary). As cited in Qualtrics workforce research.
- Bureau of Labor Statistics (2024). Occupational Outlook Handbook: Software Developers. 15% projected growth 2024-2034, 129,200 annual openings.
- IDC. Global developer shortage projections (4 million by 2025) and economic impact analysis ($5.5 trillion by 2026).
- SEMI (2024). Global semiconductor workforce projections.
- Stack Overflow Developer Survey (2024-2025). AI tool usage and developer satisfaction data.
- LinkedIn Workplace Learning Report (2024-2025). Employee retention and growth opportunity data.
- ATD (Association for Talent Development). Annual benchmarks on organizational learning and development spending. Comprehensive training programs linked to 218% higher income per employee.
- Upwork / Workplace Intelligence (2024). "From Burnout to Balance: AI-Enhanced Work Models." Survey of 2,500 workers across four countries.
- Harvard Business Review (2026). "AI Doesn't Reduce Work — It Intensifies It." Ethnographic study of AI's impact on work intensity.
- Bidwell, M. (2011). "Paying More to Get Less: The Effects of External Hiring versus Internal Mobility." Wharton, Administrative Science Quarterly.
- Lichtinger, G. and Hosseini Massoum, S.M. (2025). "AI Adoption and Junior Employment: Evidence from 285,000 US Firms." Harvard University.
- Stanford Digital Economy Lab (2025). "Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence."
- Zakas, N. (2026). "From Coder to Orchestrator: The Future of Software Engineering with AI." Human Who Codes.
- Jellyfish (2025). "AI Codegen Tools Propel Senior Developers." Senior vs junior AI productivity gap data.
- ACM (2025). "The Effects of GitHub Copilot on Computing Students' Programming Effectiveness." Proceedings of ICER 2025.
- Google Cloud DORA Team (2025). "2025 Accelerate State of DevOps Report." AI adoption impact on delivery throughput and stability.
- Fast Company / CNBC (2025). Klarna workforce reduction and subsequent quality crisis reporting.
- PMC / NIH (2023-2024). Robotic surgery graduated autonomy training models.