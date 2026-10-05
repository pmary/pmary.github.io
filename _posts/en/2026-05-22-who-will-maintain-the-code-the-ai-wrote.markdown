---
layout: post
title:  "Who will maintain the code the AI wrote?"
date:   2026-05-22 08:00:00
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-05-22-who-will-maintain-the-code-the-ai-wrote/header-illustration.jpg'
description: "The question sounds like a provocation, but it has a structural answer, and the answer is unsettling."
---
<img src="/assets/posts/2026-05-22-who-will-maintain-the-code-the-ai-wrote/header-illustration.jpg" alt="Who will maintain the code the AI wrote?" class="grid-fig" />

When a developer generates a contribution with AI, something happens that didn't happen when they wrote the same code by hand. The code enters the repository, but the mental model that would let them debug it at 3 a.m. under load does not enter their head. The artifact is there. The comprehension is not. Multiply this across a team, a quarter, a codebase, and you have a new kind of debt: code that is owned on paper by people who cannot maintain it in practice.

The standard framing treats this as a code-quality problem. AI writes sloppy code? Reviewers should be more careful, tooling will improve. That framing is too small. The real claim is structural: **AI code generation creates maintenance debt at a rate that exceeds the rate at which the industry is producing engineers capable of paying it down, and the gap will compound until it becomes a binding constraint on the next decade of software systems.** In [a previous essay](https://pierremary.com/en/posts/the-programmer-tombstone) I argued that software faces a reproduction crisis, not a replacement crisis. This piece traces the operational mechanism through which that crisis shows up first: the maintenance asymmetry, and the people it leaves holding the bag.

## The generation-comprehension asymmetry

Writing code used to be the dominant cost of producing software, and as a side effect, it was also the main mechanism by which engineers built mental models of the systems they owned. You couldn't ship a module without internalizing its structure, because the act of typing it out, getting it wrong, rewriting it, and watching it fail in staging was the structure entering your head. The artifact and the model arrived together.

AI generation cleaves them apart. The artifact arrives in seconds; the model still takes hours, even days. And when the artifact passes all the quality gates (it compiles, it tests green, it reads cleanly) there's no forcing function that demands the model also be built. The reviewer's job, as currently constituted, is to verify that the code respects all the constraints, not to demonstrate that they could rewrite it under pressure. These are different bars, and the industry has quietly lowered itself from the second to the first.

The cleanest direct measurement of the gap comes from Anthropic's own January 2026 randomized trial (Shen and Tamkin, "How AI Impacts Skill Formation," arXiv:2601.20245). Fifty-two mostly junior engineers were asked to learn Trio, an unfamiliar Python async library. The AI-assisted group averaged 50% on the post-task comprehension quiz; the hand-coding group averaged 67%. A seventeen-point gap, Cohen's *d* of 0.74, with the largest deficit on debugging questions. Time savings from AI were about two minutes per task and not statistically significant. The artifact arrived faster; the model arrived smaller, and smallest precisely on the skill that constitutes maintenance. Anthropic explicitly expects agentic coding's impact on skill development to be "more pronounced" than what its RCT measured. That is the closest thing the industry has to a frontier lab conceding that its own tools interfere with the production of capable maintainers.

Addy Osmani, writing at *O'Reilly Radar* earlier this year, named the phenomenon "comprehension debt" and relayed the cleanest field observation of it I've seen, from Margaret-Anne Storey: a student team whose project AI had mostly implemented hit the wall in week seven. They could no longer make simple changes without breaking something unexpected, because no one could explain why design decisions had been made. "The theory of the system had evaporated." The fix is to slow down, read the code, ask what you would have done differently. That discipline does not survive deadline pressure, and it does not scale to a team where review queues grow faster than reviewers.

## The failure modes are exactly the ones that need seniors

Whether AI-generated code fails more often than human-written code is an empirical question with noisy data. What is clearer is that it fails differently. The failures cluster where the generator was statistically unlikely to look: cross-system interactions, implicit assumptions about runtime state, ordering dependencies between services, edge cases that don't appear in the training distribution but do appear at 2 a.m. during holidays.

A concrete example from my own experience. An AI-suggested refactor of a read-through cache in front of a heavily-read service. The diff was tidy. The model's reasoning, in the PR description, was that the cache key was "over-specified," and a smaller tuple would reduce key cardinality without changing behavior. CI was green, review approved in the hour. Two weeks later we caught the service occasionally serving data that was technically valid but stale across a specific kind of state transition. The AI had compressed away the component of the key whose only job was to distinguish state-before from state-after across that transition. The case wasn't in the test suite because it was rare enough that no one had thought to write a test for it. We had left a three-line comment immediately above the key structure saying, in effect, *do not touch this without reading the 2022 postmortem*. The model had not weighted it. The reviewer had not read it.

Diagnosis took an afternoon and three things in sequence: noticing that the stale responses correlated with the transition rather than with load, remembering that we had hardened the cache key against exactly this class of bug three years earlier, and reading enough surrounding code to confirm the "extra" key component was deliberately load-bearing. The refactor was correct on the artifact and wrong on the system. Locally coherent, globally brittle. A junior following the model's logic would have reached "the key is over-keyed, here is a tidier version" and stopped, never reaching the history that explained why the over-keying was the entire point. That pattern library, *this looks like a race condition I saw in 2019, this smells like cache invalidation, this is the third time I've seen retries collapse on a timestamp-derived idempotency key*, is what the AI lacks and what the engineer who accepted the AI's code never built.

Faros AI's 2026 *AI Engineering Report* aggregates two years of telemetry across 22,000 developers and 4,000 teams. It compared periods of lowest and highest AI adoption within the same organizations. It shows that:
- incidents per PR run 242.7% higher
- median time in PR review runs 441% longer
- the no-review merge rate runs 31% higher
- bugs per developer have widened from a 9% gap in the 2025 report to 54% in 2026. 

Faros sells engineering-intelligence tooling, so read the figures with the usual vendor discount. And the comparison is between adoption regimes, not between AI-written and human-written patches: it measures what happens to a delivery system when AI volume rises, which is this essay's question, but it does not settle whether any individual AI patch is worse than a human one. DORA's 2025 survey of roughly 5,000 engineers points the same direction from an independent dataset: AI adoption now correlates positively with delivery throughput, a reversal from 2024, but the negative relationship with delivery stability persists. Throughput is improving. Stability is not. The first you can buy back later; the second you cannot.

## The pipeline that produced maintainers is the pipeline being cut

> Junior engineers feel the pain of bad code. Agents do not. The pain is the pedagogy. Remove the pain by removing the writing and you remove the curriculum.

The cohort that would, in the old world, have built diagnostic capability by maintaining their own bad code is now generating new AI code instead. The apprenticeship by which the friction loop produces senior judgment is being short-circuited at exactly the moment the system most needs its outputs. Juniors who reach for the agent before the textbook, who one-shot the ticket and push for review without understanding what the tool decided, are not lazy. They are responding rationally to an incentive structure that rewards shipped tickets, not internalized models.

Diagnostic judgment, in radiology as in engineering, is the same operation: narrowing a hypothesis space by recognizing patterns that don't match the learned baseline, a capacity built by doing the work without the model until the patterns are in the head. The cleanest published evidence of what happens when that work is partially substituted is a 2023 study by Chassagnon and colleagues at Cochin Hospital (*European Radiology*). Eight radiology residents read chest X-rays in three phases: baseline, then with an AI second-reader for half the cohort, then with the AI removed for everyone. During the assisted phase the AI group significantly outperformed controls. After the AI was removed, the difference vanished entirely: sensitivity, specificity, and accuracy were statistically indistinguishable. The authors' conclusion lands directly on the maintenance question: AI improved performance during use but "cannot be used alone as a learning tool." It is a small study, and a 2025 Brescia follow-up reads more positively in places. But the cleanly null skill-transfer finding is the strongest primary evidence in any adjacent field for what AI-assisted apprenticeship actually produces.

The labor-market data tells the same story. Brynjolfsson, Chandar, and Chen's "Canaries in the Coal Mine?" (Stanford Digital Economy Lab, August 2025, revised 2026) found that US software developers aged 22–25 in ADP payroll data fell nearly 20% from the October 2022 peak to July 2025, while older developers were unchanged. SignalFire's 2025 *State of Talent Report* puts new graduates at 7% of Big Tech hires, down 25% from 2023 and more than 50% from pre-pandemic levels.

The consequence is a concentration effect visible to anyone running an engineering organization honestly. Maintenance burden falls on a shrinking number of engineers who still understand the codebase. Stack Overflow's 2025 survey captures the split: among experienced developers, the cohort doing most production maintenance, only 2.6% report high trust in AI output, while 20% express strong distrust, the widest cohort gap in the survey. The seniors who do the careful work get drowned; those who wave it through get rewarded for throughput. Left unchecked, the careful reviewers either capitulate or leave, and the codebase loses its last readers. I am describing what I see in my own organization and hear from peers; the Faros review-time and no-review-merge figures are the closest thing to a public measurement of it.

## The counterarguments worth taking seriously

The strongest objection is that models will close the maintenance gap themselves. Long-context reasoning improves, cross-file comprehension improves, debugging benchmarks fall; by the time the current senior cohort retires, models will read codebases as well as the seniors did. This is possible, and it deserves a deeper reflection. The training data for generation is essentially all of GitHub. The training data for maintenance, the process by which a senior narrows a hypothesis space and remembers which deploy correlated with which symptom, has until recently lived in human heads. That is changing: agentic coding sessions, PR threads, and postmortems are exactly the traces labs now collect at scale, so the asymmetry is large today rather than permanent. But the benchmarks that suggest it is closing are less informative than they look. Top systems now score above 80% on SWE-bench Verified, against 1.96% for the best model on the original 2023 benchmark. Yet a 2026 contamination study (SWE-ABS, arXiv:2603.00520) found that 19.71% of cases the top-thirty agents had labeled "solved" were semantically incorrect: patches passing weak tests without fixing the issue. On the harder SWE-Bench Pro, the top system drops from 78.80% to 45.89%. Models are good at producing patches that satisfy the tests they can see. Maintenance is the discipline of the failure the tests didn't anticipate, and that is exactly the gap benchmarks are least able to measure.

A related claim is that even if models can't maintain code alone, they make the remaining seniors fast enough to carry the load. Here the pushback is METR's July 2025 randomized trial (arXiv:2507.09089), which gave sixteen experienced open-source developers Cursor and Claude Sonnet on 246 tasks in their own mature repositories. Developers predicted a 24% speedup and afterwards believed they had gotten 20%. Measured: 19% *slower*, and the slowdown was largest for the developers with the deepest repository familiarity. The seniors. METR's February 2026 follow-up complicated the picture: the original developers who returned still measured 18% slower, a new cohort came in at –4% with a confidence interval from –15% to +9%, and METR concluded participants were "likely more sped up" than in 2025 but that selection effects meant the design could no longer measure it reliably. Hold both honestly. The 2025 result says AI demonstrably slowed seniors in mature codebases; the 2026 update says we no longer have a clean number. Neither says AI is giving the remaining seniors the multiplier that would let them absorb the load on the timeline executives are making headcount decisions against.

The continuity counter is more robust: software has always had unmaintained code. COBOL still runs banks, and the burden is not new, AI just shifts who carries it. Partly right. But previous unmaintained code accumulated over decades, bounded by the rate at which humans could write it. In April 2026 Sundar Pichai put the AI-generated share of new code at Google at 75%, up from 25% in late 2024; Satya Nadella put Microsoft's at 20–30% a year earlier; Dario Amodei has said Claude writes on the order of 90% of Anthropic's code, elsewhere hedged to "70, 80, 90%." Take those numbers with a grain of salt, but even then it's clear that AI-generated code accumulates at a multiple of the previous rate while the cohort able to maintain it shrinks. The flow exceeds the drain. And thinking that tests catch regressions is misplaced trust. SWE-ABS shows AI producing patches that pass weak tests while being wrong. AI-generated debt sits under green CI until behavior drifts past whatever the suite exercises, and nobody notices in time. COBOL also offers a darker reading of market correction: its maintainers have been scarce and load-bearing for the payment system for twenty-five years without ever commanding the scarcity premium that should have rebuilt the cohort. Shortages of maintenance capability can persist for decades without efficient correction.

The market-solves-it counter, "senior wages rise, entrants flood in, equilibrium restores," assumes a correction cycle shorter than the damage cycle. Senior engineers take ten years to produce. AI-generated code accumulates in quarters. By the time the wage signal redirects career choices, the codebases that needed those engineers have entered failure modes no compensation fixes retroactively. The strongest counter-evidence comes from inside the AI industry. When Cognition acquired what remained of Windsurf in July 2025, after Google had reverse-acquihired its leadership for $2.4 billion, it structured the deal around retention: every remaining employee received fully accelerated vesting, and cliffs were waived. The IP without the institutional-knowledge holders was, by the acquirer's revealed preference, insufficient. M&A is starting to treat maintenance capacity, not code, as the binding constraint. If AI-native firms behave this way when they set the price, the market-solves-it counter falls through.

## What the consequences already look like

Several implications are legible right now. Production incident rate is the leading indicator, and where it is measured it is degrading. Mean time to recovery is the metric that will separate organizations that kept their maintainers from those that didn't, and almost nobody yet reports it split by AI-heavy versus AI-light code. Bus-factor risk concentrates on named individuals whose departure headcount cannot smooth over. Companies bifurcate into "we have the seniors" and "we don't." A real two-tier industry. And due diligence will start asking the question most acquirers do not yet know to ask: not "who wrote this code" but "who, by name, could rewrite it under load."

If you are running an engineering organization, these are the questions worth asking your leadership team to answer this quarter:

- **What's the Mean Time To Recover (MTTR) trend on AI-heavy versus AI-light code areas, and which engineers are absorbing that load?**

- **What percentage of your codebase is owned by someone who couldn't rewrite it from scratch?**

- **Where is your bus-factor risk concentrated, and what's your succession plan if that person leaves in the next six months?**

- **How much of your engineering time this quarter went to maintaining code that nobody on the team fully understood when it shipped, and is that share rising?**

The question in the title was rhetorical, but its answer is not. The maintenance asymmetry is the reproduction crisis viewed at the level of the codebase. On current trends, the people who will maintain the code the AI wrote are the same ones who could already maintain code before the AI existed, and there are fewer of them every year. The consequences arrive on a timeline shorter than the labor market's correction cycle, which means the correction, when it comes, will come through failures rather than hiring. Which side your organization is on is being decided right now, in headcount decisions, tooling decisions and the quiet erosion of code comprehension.

---

## Sources

### Skill formation and comprehension

- Shen, J. H. & Tamkin, A. (January 28, 2026). "How AI Impacts Skill Formation." Anthropic. arXiv:2601.20245.
- Osmani, A. (February 2026). "Comprehension Debt: The Hidden Cost of AI-Generated Code." *O'Reilly Radar*.
- Storey, M.-A., as cited in Osmani (2026).

### Production telemetry and stability

- Faros AI (April 2026). *AI Engineering Report 2026: The Acceleration Whiplash*.
- Faros AI (July 2025). *The AI Productivity Paradox Report*.
- DORA / Google Cloud (2024). *Accelerate State of DevOps Report*.
- DORA / Google Cloud (2025). *State of AI-Assisted Software Development*.

### Productivity randomized trials

- Becker, J., Rush, N., Barnes, E., & Rein, D. (July 2025). "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." METR. arXiv:2507.09089.
- Becker, J., Rush, N., Cunningham, T., Rein, D., & Mahamud, K. (February 24, 2026). "We are Changing our Developer Productivity Experiment Design." METR blog.

### Benchmarks

- Yu, B., Cao, Y., et al. (February 2026). "SWE-ABS: Adversarial Benchmark Strengthening Exposes Inflated Success Rates on Test-based Benchmark." arXiv:2603.00520.
- Jimenez, C., et al. (October 2023). "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?" arXiv:2310.06770. SWE-bench Verified: OpenAI (August 2024).
- Scale AI, SWE-Bench Pro leaderboard.

### Developer sentiment

- Stack Overflow Developer Survey (2025).

### Labor market

- Brynjolfsson, E., Chandar, B., & Chen, R. (August 2025; revised 2026). "Canaries in the Coal Mine? Six Facts About the Recent Employment Effects of Artificial Intelligence." Stanford Digital Economy Lab.
- SignalFire (May 20, 2025). *2025 State of Talent Report*.

### Cross-disciplinary apprenticeship analog

- Chassagnon, G., Billet, N., Rutten, C., et al. (November 2023). "Learning from the machine: AI assistance is not an effective learning tool for resident education in chest x-ray interpretation." *European Radiology* 33(11):8241–8250.
- Savardi, M., et al. (January 2025). "Upskilling or deskilling? Measurable role of an AI-supported training for radiology residents." *Insights into Imaging*.

### M&A and the value of institutional knowledge

- Cognition AI blog (July 14, 2025). "Cognition acquires Windsurf."

### AI-generated code share

- Pichai, S. (April 22, 2026). Google blog post; Alphabet Q3 2024 earnings call for the 25% figure.
- Nadella, S. (April 29, 2025), Meta LlamaCon.
- Amodei, D. (October 15, 2025), Dreamforce; Redwood Research, "Is 90% of code at Anthropic being written by AIs?" (October 2025) for the hedged figure.