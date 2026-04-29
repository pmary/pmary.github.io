---
layout: post
title:  "The programmer's tombstone"
date:   2026-02-23 08:00:40
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-04-28-the-programer-tombstone/header-illustration.jpg'
description: "Seven predictions have buried the programmer and been wrong every time. The eighth will probably be wrong too. That isn't the real problem."
---
<img src="/assets/posts/2026-04-28-the-programer-tombstone/header-illustration.jpg" alt="The programmer's tombstone" class="grid-fig" />

# The programmer's tombstone

Around 1960, Howard Bromberg drove away from his office at RCA in a fit of frustration with the committee designing COBOL. The specification work was moving too slowly, and a tense Friday-afternoon phone call with the committee's chairman, Charles Phillips, had just ended badly. On the way home he spotted a monument shop off a freeway exit, pulled in, and bought a marble tombstone. He had the mason engrave a single word: COBOL. Then he and his neighbors packed it in a crate on the sidewalk, and Bromberg mailed it to Phillips at the Pentagon, collect.

It was a joke. Sixty-six years later, the tombstone sits in the Computer History Museum. COBOL does not. Estimates of how much COBOL runs in production today vary widely, from around 250 billion lines (Open Mainframe Project) to over 800 billion (a 2024 Micro Focus survey of 1,100 engineers across 49 countries). But every serious count runs into the hundreds of billions. It ran the US unemployment claims systems that buckled in 2020. It runs most of global banking.

Bromberg was frustrated with a committee; he wasn't seriously predicting his own language's death. But in the decades since he mailed that marble to the Pentagon, at least seven other people have carved tombstones for the programming profession itself, and meant them. The occupant keeps failing to arrive.

I want to say up front that this essay is not really about whether the latest tombstone, the one with "programmer" or "mid-level engineer" on it today, will also go unclaimed. The historical record answers that question well enough to act on, and I'll walk through it briefly. What I want to spend most of this piece on is a different question that the replacement debate has almost entirely obscured:

**Even if the profession's headcount holds, what happens to the pipeline that produces senior engineers?**

That is the live question. It has no historical answer. And it is the question an engineering leader can actually affect this quarter. Whether she's calibrating junior-to-senior ratios for 2027, deciding what training to invest in, or defending headcount to a CFO who has read Amodei's quotes and concluded the line item can be cut.

## A brief history of the tombstone

The pattern is old enough to have its own cliché. I'll stick to the clean cases. The unambiguous ones are plenty:

- James Martin, 1982 preface to *Application Development Without Programmers*: "The number of programmers available per computer is shrinking so fast that most computers in the future will have to work at least in part without programmers."
- Ed Yourdon, *Decline and Fall of the American Programmer*, 1992: American programmers would be replaced by lower-cost offshore labor using CASE tools.
- John McCarthy at Forrester, 2002: 3.3 million US white-collar jobs going offshore in fifteen years, IT leading.
- Gartner, June 2021: by 2024, 80% of technology products and services would be built by non-IT professionals.
- Jensen Huang at the World Government Summit, February 2024: "Everybody in the world is now a programmer."
- Mark Zuckerberg on Rogan, January 2025: Meta and peers would field AI "mid-level engineers" within the year.
- Dario Amodei at CFR, March 2025: AI would write 90% of code within three to six months and essentially all of it within twelve.

Read the sequence back-to-back and the striking thing is how little the language changes. The numbers shift between 80% / 90%, but the shape is identical. A new tool lets non-programmers build software. The profession collapses. The collapse is imminent.

Every prediction was falsifiable, and the census data falsifies every one. US IT employment: 450,000 in 1970, 781,000 in 1980, 1.5 million in 1990, 3.4 million in 2000. In May 2024, 5.19 million Americans worked in Computer and Mathematical occupations, 1.65 million of them Software Developers. Through every wave that was supposed to end the profession, the direction was up.

![Actual evolution of the US computer workforce.](/assets/posts/2026-04-28-the-programer-tombstone/workforce_vs_predictions.png)

One caveat. US occupational codes were redefined in 2000, reclassifying millions of "programmers" as "software engineers" and producing an apparent decline in the narrow BLS Computer Programmers series. *Fortune*'s March 2025 headline about programmer employment hitting its lowest level since 1980 is technically true of that single code and almost entirely an artifact of reclassification. The work did not disappear. The label moved.

What has actually happened in each wave is a shift in composition, not a drop in headcount. 4GLs created 4GL specialists. CASE failed outright and Yourdon himself reversed in 1996's *Rise and Resurrection of the American Programmer* after the adoption data came in. Visual Basic produced roughly 3.5 million amateur developers, and US IT employment grew 127% in the following decade, the largest decadal growth in the BLS series. Low-code grew to a real but modest ~$26.9 billion market by 2023, while US software developer employment went from 1.1 million in 2015 to 1.7 million in 2024, straight through the peak of the hype.

## The current wave, measured

Amodei's March 2025 timeline has now aged. The three-to-six-month window for 90% AI-authored code and the twelve-month window for essentially all code have both closed. More importantly, the underlying trajectory is not tracking toward the prediction. Satya Nadella put Microsoft's AI-authored share at "20 to 30%" at LlamaCon in April 2025. Sundar Pichai gave a similar number on Alphabet's Q3 2024 earnings call. The signal across major code-producing organizations has landed in the 20–35% range and appears to be plateauing. Real, worth watching, and an order of magnitude below the headline forecast.

The 2025–2026 productivity evidence points the same direction as prior waves. METR's July 2025 randomized controlled trial of sixteen experienced developers working in their own mature open-source repos found developers forecasted a 24% speedup from Cursor and Claude, estimated 20% after the fact, and measured a 19% *slowdown*. A February 2026 follow-up with 57 developers across 143 repos produced the same sign: a small negative effect. Though METR concluded the signal had become unreliable due to selection bias and changed their experimental design.

DORA's 2024 survey of nearly 3,000 engineers found a 25% increase in AI adoption correlated with 1.5% lower delivery throughput and 7.2% lower delivery stability. The 2025 edition reversed the throughput finding but not the stability one. It's worth pausing on, because it means the productivity story is now improving while the quality story is not, and only the second compounds. GitClear (which sells code-quality analytics, so flag the commercial incentive) found copy-pasted lines rose from 8.3% to 12.3% between 2020 and 2024 while refactored lines fell from 24.1% to 9.5%. Stack Overflow's survey shows favorable AI-tool sentiment dropping from 77% in 2023 to 60% in 2025, a slide that cuts across experience levels.

Meanwhile BLS projects 15% growth for software developers from 2024 to 2034, adding roughly 129,200 openings per year. This projection was released in 2025, after Amodei's prediction was on the public record.

## The objection, this time

Here is the strongest version of the counter-argument, that I'm goind to address.

The earlier tools were bounded. 4GLs had a fixed grammar. CASE operated on a fixed set of diagrams. Low-code runs inside a predefined runtime. Large language models are not bounded that way. They exhibit genuine generalization that scales with compute; the loss curves have not bent; benchmark saturation has repeatedly been followed by harder benchmarks that also fell. Appeals to historical base rates are backward-looking when the underlying phenomenon is qualitatively new.

All of that is true. And it is precisely why the complexity problem gets worse, not better.

Programmers were never indispensable for typing code. They are the people managing complexity through abstraction: compressing seven things into one, recursively, until a system that would break any human brain becomes thinkable. That problem does not get easier when code is cheaper to generate. It gets harder. More code to reason about. More systems interacting. More failure modes to trace.

A concrete example from my own experience. I was called into a production incident on a payment service. The symptom was intermittent timeouts under load. An AI assistant, given the stack trace and the offending function, will generate a plausible fix: Add a retry, increase a connection pool, cache a lookup. And any of them can be made to compile and pass the unit tests. The actual root cause was that an idempotency key was being derived from a request timestamp rounded to the minute, which meant two retries in the same minute silently collapsed into one charge instead of two, which looked like a timeout to the caller because the second response never came. Finding that required reading four services, remembering that the payment processor had changed its deduplication window in a ticket from six months earlier, and recognizing a pattern from a past similar incident. No amount of code generation substitutes for that chain. The generated fixes would have made the symptom go away and left the money broken.

The judgment work was to know which failure hypothesis to pursue, which historical context to apply, when to stop trusting what the code says and start reading what actually happens in production. It's where an engineer earns her salary. That work becomes more important, not less, as the mechanical parts of coding are automated.

Which brings me to my point. AI will not replace software engineers but the same tools that keep failing to eliminate the profession may be hollowing out the specific mechanism by which the profession reproduces itself. Total headcount still hold, the BLS projection says it will, but the pipeline that produces seniors quietly thins.

### Why AI-assisted apprenticeship don't work

Maybe AI-assisted apprenticeship produces *better* juniors, not worse ones. A junior in 2020 learned from whichever senior happened to be in her Slack. After all, the old apprenticeship wasn't free and self-organizing. It was radically uneven, depended on getting lucky with your first manager, and failed most people. A junior in 2026 can ask "why does this code do X" at 2am without feeling guilty. She can read more codebases faster. She gets Socratic questioning from a patient tutor on every concept. Formalizing apprenticeship around AI-assisted learning could, in principle, produce stronger engineers faster.

Reading explanations don't substitutes for the experience of having been burned. There is a difference between knowing that retries without idempotency keys are dangerous (you can learn this from the model in thirty seconds) and having the specific memory of watching your company refund $40K because your own code made the mistake (you cannot learn this from the model at all). The senior engineers I most trust are not the ones who have read the most; they are the ones who have shipped, broken, and fixed across a wide enough surface area that their prior is calibrated when something weird appears in production. The model accelerates reading. It cannot accelerate scar tissue.

AI-assisted apprenticeship could work, but AI is an amplifier. If junior apprenticeship was bad at your company, it will be worse with AI in the room. To make it work better, the organization need to structures it deliberately. The failure mode is the default mode. Juniors optimizing for shipping output with the model while nobody protects the slower, harder feedback loops. That is the path most organizations are currently on.

## The reproduction question

Senior engineers are not born. They are produced by a roughly ten-year apprenticeship in which a junior does work that is, in retrospect, mostly mechanical: writing CRUD endpoints, fixing null-pointer bugs, reading existing code until the architecture clicks, debugging under pressure, shipping small features end-to-end, watching how her code breaks in production. None of those individual tasks requires deep judgment. What they produce, cumulatively, is the pattern library that senior engineering runs on.

You learn that retries without idempotency keys are a trap because you once shipped one. You learn to read a stack trace quickly because you spent three years reading stack traces slowly. You learn when a design document is too vague because you once implemented one and discovered the vagueness the hard way.

The judgment is downstream of the mechanical work. I think this is the part the profession has not metabolized. The strongest direct evidence comes from the GitClear data, which deserves a closer look here, even with the commercial-incentive caveat I flagged earlier. Copy-pasted lines rose from 8.3% to 12.3%; refactored lines fell from 24.1% to 9.5%, a compression to roughly a third of the prior rate. Refactoring is not an aesthetic activity. It is the mechanism by which an engineer takes a working system apart and puts it back together, and the sequence of taking-apart-and-putting-back is how the mental model of the system gets built. A junior who refactors a function understands the function in a way that a junior who reads a generated explanation of the function does not. Output volume rising while refactoring collapses is the telemetric signature you would expect if mechanical engagement with code were being substituted by mechanical generation of code.

This is not proof. It is the closest thing to proof that current measurement infrastructure permits. What would change my mind, and what the field needs, is a longitudinal study tracking juniors who started post-Copilot against the 2019 cohort at matched tenure, on three specific metrics:  
- Mean time to recovery on novel production incidents (incidents whose pattern is not in the model's training corpus)
- Senior-escalation rate on non-routine tickets
- Architectural-judgment performance on unassisted code review. 

If the post-Copilot cohort matches the 2019 cohort on these by year five, I am wrong, and the apprenticeship-via-AI thesis is right. No such study exists yet. The absence is itself the most important research gap in the field right now.

The complementary evidence is softer but consistent. Stack Overflow 2025 shows a broad drop in AI-tool favorability, from 77% in 2023 to 60% in 2025. Most pronounced among professional developers, the group that used to become senior by doing the mechanical work. And the pattern I keep hearing from engineering managers, is consistent so far. One director put it this way: "The 2023 cohort debugs by asking the model. The 2019 cohort debugs by reading. When something weird happens in production, I can tell within ten minutes which cohort is on-call." The observation is not that the younger engineers are worse in the abstract. They are often faster on well-scoped tasks. It is that they have had less exposure to the class of problems where the model can't help them. The ones where the intuition has to come from somewhere, and the model hasn't been where they are.

## Historical parallels

The parallels are instructive but limited.

Accountants did not lose to spreadsheets; they moved to audit and advisory, defended by two centuries of apprenticeship infrastructure: certifications, articled clerkships, structured ladders. Architects did not lose to CAD; they moved from drafting to design, defended by licensure exams and physical-model workshops that force the grounding before the profession allows the abstraction.

The closest parallel, and the one most worth studying, is radiology. Geoffrey Hinton predicted in 2016 that radiologists would be obsolete within five years; radiology employment has instead grown, and the ACR now names a radiologist *shortage* as one of the profession's defining pressures. On the replacement question, the score is identical to the seven software tombstones.

But the training pipeline tells a different story than the headcount. Residents now work downstream of AI pre-read systems that surface likely findings before the human reads the study. Throughput goes up. What a resident learns per case goes down. The mechanical exposure of scanning a full study looking for whatever is there has been partially replaced by verifying what the model flagged. The result, increasingly discussed within the profession, is a slower accumulation of the pattern recognition that makes an attending radiologist an attending radiologist. Nothing in the employment numbers shows this. It is a reproduction problem, not a replacement problem, and it is legible to residency program directors in the quality of fifth-year reads, not in the aggregate employment data.

Radiology has institutional infrastructure to respond. The American Board of Radiology controls certification, the ACGME accredits residencies, the American College of Radiology issues practice guidelines. When the profession noticed the training drift, it could respond at the level of the profession, redesigning curricula to include deliberate practice on cases the AI has already read, mandating unassisted reading blocks, tracking resident performance across cohorts. The response is imperfect and contested, but it exists, and it exists above the individual hospital. Software has nothing equivalent. There is no engineering licensure in most jurisdictions, no articled clerkship, no professional body with authority over training. Apprenticeship happens inside individual companies, varies by company, and is accountable to quarterly delivery rather than to a profession-wide standard. When the radiology pipeline starts to thin, radiology can coordinate a response. When the software pipeline starts to thin, there is no one whose job it is to notice.

This points to a version of the reproduction crisis that is more legible inside a quarterly frame than the aggregate one. The 2035 senior-engineer market does not need to be empty for the problem to bite; it only needs to be concentrated. Where radiology's pipeline thinned and the profession could respond as a profession, software's pipeline thins and the response will happen at the firm level, unevenly. The companies that treat junior development as capital investment from now on will have seniors in the mid-2030s. The companies that don't will be buying them, at whatever the market price turns out to be. For the CTO of a firm in the second category, this stops being a 2035 problem and becomes a hiring-budget problem in roughly 2031, when the labor market begins to price in the scarcity. The question worth asking your peers, quietly: which category is your company in, and how would you know?

That absence of institutional memory made the pipeline fragile long before a single model was trained. Software apprenticeship was already under pressure from cost-cutting before AI arrived. Meta's "Year of Efficiency," the 2023–2024 tech layoffs that fell disproportionately on recent hires, the quiet widespread policy of not backfilling junior roles.

**The pipeline was thin before AI. AI makes it thinner.**

If the pattern continues, the profession arrives at 2035 with a healthy senior cohort aging out of the current workforce, a hollow mid-career layer, and a junior cohort that never did the mechanical work that would have made them the next seniors. This is not a replacement crisis. It is a reproduction crisis. It looks nothing like the Amodei scenario, and current organizational decisions either compound it or mitigate it.

## What solving it actually requires

Solving the reproduction problem doesn't require believing anything particular about AI's ceiling. It requires four commitments, and they stack in a specific order. Each one only works if the previous one is in place.

The first is financial, and without it everything else is theater. Junior engineers have to be treated as a pipeline investment, not a current-year cost center. That means hiring juniors at a rate that exceeds what the current work justifies, and protecting their exposure to mechanical work even when an AI could do it faster. The cost is real and shows up this quarter; the benefit accrues as optionality on a labor market most organizations have not yet priced. The right frame is not "training expense against quarterly delivery" but a hedge against a known-direction risk of unknown magnitude. The direction is known. The senior engineers who debug production systems unassisted today will retire, and the cohort behind them has had measurably less unassisted exposure. The magnitude is not, which is exactly why it is a hedge rather than a forecast. CFOs understand optionality. The version of this argument that loses is the one that tries to specify the 2032 senior salary premium to two decimal places; the version that wins is the one that names the uncertainty itself as the reason to invest now.

The second is managerial. Mentorship has to be structured rather than incidental. In the pre-AI era, juniors absorbed seniors' judgment through proximity, watching how they debugged, what they asked in code review, where they pushed back on product. The faster-interlocutor-on-tap changes the dynamic. The junior now has a more available substitute for the slower, harder feedback loop with a human senior, and she will drift toward the substitute unless the organization scaffolds against the drift. That means pair debugging sessions, code review as teaching, rotations through hard problems, and protected time for seniors to explain reasoning aloud. This is engineering-manager work, and most organizations do not currently do it well.

The third, which only functions if the first two are in place, is deliberate-practice infrastructure. Radiology is the template: internal training curricula, structured incident-review practice, "read this production system and explain it" exercises, and, controversially, periods where juniors deliberately do not use AI for specific kinds of work. The controversy is real. The alternative is worse. Without the first two commitments, the third is expensive and performative; with them, it is how a junior becomes a senior in a world where organic exposure has dropped.

The fourth is the one an individual junior engineer has to make for herself, and none of the organizational commitments above produce it on their own. The AI is a productivity multiplier and an apprenticeship risk at the same time. Every hour saved by generating code that works is an hour not spent developing the intuition about why the code works. The multiplier is real. The opportunity cost on skill formation is also real. Juniors who recognize the tradeoff will invest in reading others' code, writing their own from scratch sometimes, and doing the slow work even when the fast work is available. Juniors who don't will accumulate output without skill, and the difference will show up around year five.

None of this is guaranteed. Most organizations are optimizing for quarterly delivery and will continue to under-invest in the pipeline. Most juniors will take the multiplier without thinking hard about the formation cost. Most engineering managers have never had to think about apprenticeship explicitly, because the old version was close to free and self-organizing. The transition to a world where apprenticeship has to be deliberately engineered is a genuine organizational shift, happening unevenly, mostly invisibly, and mostly without being named.

I would rather be wrong about this. The more the profession organically develops radiology-style training infrastructure (shared, portable, not company-proprietary) the less concentrated the 2035 senior-engineer supply will be. I don't currently see the movement toward the shared version. I see individual companies quietly deciding to protect their own pipelines, and most of the rest assuming the problem doesn't exist.

If you are running an engineering organization, these are the questions worth forcing your leadership team to answer, out loud, this quarter.

- **What is our junior-to-senior ratio, and is it sustainable at current hiring rates?**

- **How much protected time do our seniors have to teach, as distinct from ship?**

- **What specific mechanical work do we still expect our juniors to do, even though AI could do it faster?**

- **How are we measuring the growth of their judgment, not just their output?**

- **Who in the org is accountable for the pipeline, as a distinct deliverable from quarterly velocity?**

None of these questions requires you to know whether Amodei's next prediction will come true. All of them compound.

Bromberg's tombstone is still in the Computer History Museum. The name on it keeps changing: COBOL, the programmer, the American programmer, the software engineer, the mid-level engineer... The occupant keeps failing to arrive. But the pipeline that produces the occupant is a different monument, and the 2035 version of it is being carved now, in decisions most organizations are making without realizing they are making them.

---

## Sources

### US workforce and population data

- Beckhusen, J. (2016). *Occupations in Information Technology*. American Community Survey Reports ACS-35, US Census Bureau.
- US Bureau of Labor Statistics. *Occupational Employment and Wages - May 2024*. [bls.gov/news.release/ocwage.htm](https://www.bls.gov/news.release/ocwage.htm)
- BLS OEWS 15-1252 Software Developers; 15-1251 Computer Programmers.
- BLS Occupational Outlook Handbook 2025-26, Software Developers.
- BLS Employment Projections 2024–2034.
- 1970 Census Subject Reports PC(2)-7A; 1980 Census Supplementary Report PC80-S1-15 (1984); 1990 Census EEO File CP-S-1-1.

### Historical predictions (primary)

- Martin, J. (1982). *Application Development Without Programmers*. Prentice-Hall.
- Yourdon, E. (1992). *Decline and Fall of the American Programmer*. Prentice-Hall.
- Yourdon, E. (1996). *Rise and Resurrection of the American Programmer*. Prentice-Hall.
- McCarthy, J. C. (November 11, 2002). *3.3 Million U.S. Services Jobs To Go Offshore*. Forrester Research.
- Gartner, *By 2024, 80% of Technology Products and Services Will Be Built by Professionals Outside of IT* (June 10, 2021).
- Huang, J. (February 12, 2024). World Government Summit Dubai.
- Zuckerberg on *Joe Rogan Experience* #2255 (January 10, 2025).
- Amodei, D. (March 10, 2025). Council on Foreign Relations.

### CASE, 4GLs, VB

- Iivari, J. (1996). "Why are CASE tools not used?" *CACM* 39(10):94–103.
- Kemerer, C. F. (1992). "How the learning curve affects CASE tool adoption." *IEEE Software* 9(3):23–28.
- Retool, *Something Pretty Right: A History of Visual Basic*.

### Current AI wave statements and reversals

- Nadella, S. (April 29, 2025) at Meta LlamaCon.
- Alphabet Q3 2024 earnings call (October 29, 2024).
- Klarna AI reversal (May 2025).
- Jassy, A. (June 17, 2025). Memo to Amazon employees.

### Empirical AI productivity and quality studies

- Becker, J., Rush, N., Barnes, E., & Rein, D. (July 10, 2025). "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." METR. arXiv:2507.09089.
- METR follow-up (February 24, 2026).
- DORA 2024 report; DORA 2025 report.
- GitClear (January 2024). *Coding on Copilot*. GitClear (February 2025). *AI Copilot Code Quality: 2025 Data*.
- Stack Overflow Developer Survey 2024; 2025.
- Faros AI, *AI Productivity Paradox Report 2025*; *AI Engineering Report 2026*.

### Labor-market AI exposure studies

- Eloundou, T., Manning, S., Mishkin, P., & Rock, D. (2024). "GPTs are GPTs: Labor Market Impact Potential of Large Language Models." *Science*. arXiv:2303.10130.
- Goldman Sachs (Briggs & Kodnani, March 2023). *The Potentially Large Effects of AI on Economic Growth*.
- McKinsey Global Institute (July 2023). *Generative AI and the Future of Work in America*.
- World Economic Forum (January 2025). *Future of Jobs Report 2025*.
- Yale Budget Lab (January 2026). *Labor Market AI Exposure: What Do We Know?*

### Labor economics and class analysis of software work

- Ensmenger, N. (2010). *The Computer Boys Take Over*. MIT Press.
- Braverman, H. (1974). *Labor and Monopoly Capital*. Monthly Review Press.
- Benanav, A. (2020). *Automation and the Future of Work*. Verso.
- Pasquinelli, M. (2023). *The Eye of the Master*. Verso.

### Counter-tradition - automation anxiety as bad forecasting

- Autor, D. (2015). "Why Are There Still So Many Jobs?" *Journal of Economic Perspectives* 29(3).
- Bessen, J. (2019). "Automation and Jobs: When Technology Boosts Employment." *Economic Policy*.
- Mokyr, J., Vickers, C., & Ziebarth, N. L. (2015). "The History of Technological Anxiety and the Future of Economic Growth." *Journal of Economic Perspectives* 29(3).

### Structural explanations for coding focus in AI

- SWE-Bench Verified leaderboard, Princeton NLP / OpenAI.
- Anthropic funding announcement (2025).
- GitHub Copilot subscriber statistics 2026.
- AI coding assistants market share 2026.

### Others

- Radiologist employment growth since Hinton's 2016 prediction - coverage in *The New Republic* and CNN (2026).
- Bromberg, H., Hopper, G. M., Jones, J. L., & Nelson, D. *The Story of the COBOL Tombstone*. Transcript of COBOL's 25th Anniversary Celebration at The Computer Museum, May 16, 1985. Computer History Museum.
- Drezner, D. W. (May/June 2004). "The Outsourcing Bogeyman." *Foreign Affairs*.