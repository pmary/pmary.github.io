---
layout: post
title:  "L'échelle brisée, partie 2 : Construire un avantage rétention avant que la pénurie de talents seniors ne frappe"
date:   2026-02-23 08:00:40
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-02-17-the-broken-ladder-part-2-how-to-build-a-retention-moat-before-the-senior-talent-crisis-hits/header-illustration.jpg'
description: "Le guide pratique pour les engineering leaders qui voient le vivier se tarir. Et veulent être prêts quand leurs concurrents ne le seront pas."
---
<img src="/assets/posts/2026-02-17-the-broken-ladder-part-2-how-to-build-a-retention-moat-before-the-senior-talent-crisis-hits/header-illustration.jpg" alt="L'échelle brisée, partie 2 : Construire un avantage rétention avant que la pénurie de talents seniors ne frappe" class="grid-fig" />

Quelques semaines après avoir déployé Claude dans une organisation de plus de 75 ingénieurs, un de mes seniors m'a dit ce qui se passait parfois sur le terrain. Ses collègues utilisaient l'IA pour « produire davantage et plus vite, dans la mauvaise direction ».

Il n'était pas cynique. Il décrivait l'écart entre disposer d'outils puissants et avoir une stratégie adaptée aux humains qui les utilisent. Dans la [partie 1](https://pierremary.com/fr/posts/the-broken-ladder-ai-is-killing-junior-careers), j'ai avancé que l'IA ne tue pas les emplois d'ingénieurs, elle tue les carrières. Trois dynamiques se renforcent mutuellement : les juniors n'approfondissent pas leurs profondes, les mid-levels s'épuisent, et les seniors se font débaucher. Si ce diagnostic vous parle, la question suivante s'impose : qu'est-ce qu'on fait concrètement ?

La première chose utile que j'ai faite, ce n'était pas de déployer un framework. C'était de demander à mon équipe ce qui avait réellement changé pour eux. En one-on-one et devant la machine à café, le tableau s'est précisé. Les juniors s'inquiétaient de ne plus rien apprendre. Les mid-levels se sentaient coincés entre des attentes en hausse et des perspectives de carrière floues. Les seniors recevaient des appels de chasseurs de têtes toutes les semaines. Même déploiement IA, trois crises différentes.

## Réparer l'échelle : ce qui fonctionne vraiment

La réponse par défaut à « vos équipes ont besoin de monter en compétences » est d'acheter une licence Coursera à tout le monde et de passer à autre chose. Par le passé, j'ai assisté à des comités de direction où des gens étaient persuadés d'avoit trouvé LA solution. Ça ne marche pas.

Une autre version de la même erreur : confondre déploiement d'outils et stratégie. Ça se traduit par « on a déployé Copilot » dans le deck de direction et « je ne sais plus ce que je suis censé apprendre » en one-on-one. L'écart entre ces deux phrases, c'est tout le problème. Les ingénieurs ne développent pas leur jugement avec des cours en ligne ou des outils IA. Ils le développent en travaillant sur des problèmes de plus en plus difficiles, avec le feedback de gens qui sont passés par là avant eux.

Le défi est donc de concevoir des systèmes où l'IA accélère cette montée en compétences au lieu de la court-circuiter.

### Principe 1 : Redéfinir ce que chaque niveau fait réellement

Quelques mois après notre déploiement IA, un de mes ingénieurs m'a dit que son travail s'était résumé à « relire des pull requests générées par l'IA toute la journée ». Il ne se plaignait pas de l'IA. Il me disait que son rôle avait changé sans qu'on lui demande son avis ou annonce.

Il avait raison. L'échelle traditionnelle supposait que les juniors écrivent du code, les mid-levels conçoivent des composants, et les seniors architecturent des systèmes. L'IA a compressé le bas de cette pile. Un junior avec un agent de code peut produire un output de niveau mid-level. La différence, c'est ce qu'il *comprend* de ce qu'il produit. Et c'est cette compréhension qui fera de lui un middle dans deux ans.

J'ai commencé à repenser l'échelle différemment :

**Junior (E1-E2) : Le Validateur.** Le rôle junior n'a pas disparu. Il s'est transformé. Le travail principal n'est plus d'écrire du code from scratch : c'est d'évaluer, de tester et de comprendre le code généré par l'IA. Est-ce qu'ils peuvent expliquer pourquoi cette implémentation fonctionne ? Est-ce qu'ils repèrent le cas limite que l'IA a raté ? Si vous mesurez vos juniors sur les bugs détectés dans le code généré par l'IA, sur la qualité de leurs reviews, sur leur capacité à articuler des compromis, alors relire du code IA devient un puissant mécanisme d'apprentissage. Si vous les mesurez sur les tickets fermés, vous les enfermez dans une roue de hamster.

**Mid-level (E3) : L'Orchestrateur.** Un de mes mid-levels a résumé l'évolution de son poste comme ça : il est passé de « développer des services » à « s'assurer que les services générés par l'IA s'intègrent correctement avec notre infrastructure et nos golden paths ». Il n'exagérait pas. Les mid-levels deviennent des intégrateurs système : ceux qui gèrent le contexte que les outils IA n'ont pas et qui traduisent les besoins métier en contraintes exploitables par l'IA. Moins de code d'implémentation, plus de tissu connectif : contrats d'API, gestion des erreurs aux frontières entre services, optimisation à l'échelle du système.

C'est aussi le niveau sous la plus forte pression. Les mid-levels sont souvent les utilisateurs IA les plus productifs d'une équipe. Mais aussi les plus exposés au burnout si personne ne gère l'écart entre ce qu'ils livrent et ce qu'ils apprennent.

**Senior (E4-E5) : Le Stratège.** Les seniors opèrent là où l'IA apporte le moins de valeur : les arbitrages organisationnels, la stratégie technique pluriannuelle, le mentorat, l'influence transverse. Leur rôle ne change pas fondamentalement, mais leur effet de levier augmente considérablement. Un senior peut passer deux heures à définir les contraintes de contrat d'API pour un nouveau service. Trois juniors peuvent ensuite utiliser l'IA pour générer des implémentations conformes à ces contraintes en une journée. Sans ces deux heures de réflexion senior, on aurait eu trois services générés rapidement mais incompatibles. L'effet multiplicateur est réel.

Et c'est précisément ce qui en fait des cibles pour les recruteurs d'à côté. Remplacer un senior coûte 1 à 2 fois son salaire annuel en recrutement et en montée en compétences, et les travaux de Matthew Bidwell à Wharton montrent que les recrutements externes mettent environ deux ans à atteindre le niveau de performance d'une promotion interne. Quand un senior part, on ne perd pas juste de l'output. On perd la personne qui faisait grandir les trois prochains mid-levels.

L'investissement : protéger le temps des seniors pour le mentorat et le travail stratégique. Ne pas céder à la tentation de « faire utiliser l'IA aux seniors pour qu'ils produisent plus de code individuel » au détriment de leur contribution la plus précieuse : faire progresser les gens autour d'eux. Dans mon équipe, les plus gros gains de productivité IA sont venus de seniors qui ont utilisé les outils pour libérer du temps pour les revues d'architecture et le partage de connaissance. Pas de ceux qui les ont utilisés pour écrire plus de code eux-mêmes.

### Principe 2 : Restructurer l'apprentissage des juniors

Redéfinir les niveaux ne sert à rien si les ingénieurs ne développe plus de vraies compétences à chaque pallier. Les travaux de Matt Beane, que j'ai cités dans la partie 1, identifient trois conditions pour le développement des compétences : le défi, la complexité et le lien humain. L'IA perturbe les trois. La solution n'est pas d'interdire l'IA, c'est mettre en place les conditions d'apprentissage même en sa présence.

**La friction délibérée.** Désigner des projets ou des sprints spécifiques où les juniors travaillent sans assistance IA, ou bien résolvent d'abord le problème eux-mêmes avant de comparer leur solution à ce que l'IA produit. C'est comme la formation en chirurgie : observation, puis pratique supervisée, puis autonomie. Chaque étape exige une compétence démontrée avant de passer à la suivante. Le travail manuel construit le modèle mental qui rend le travail automatisé efficace.

Ce sera le plus difficile à faire accepter. Les ingénieurs qui sont devenus rapides avec l'IA verront la friction délibérée comme un impôt sur la productivité, un peu comme si on leur demandait de creuser une tranchée à la cuillère alors qu'il y a une pelleteuse juste à côté. Ils n'auront pas tort sur le ressenti. Mais les travaux de Beane sont clairs : le développement des compétences exige la confrontation à de vrais problèmes, pas la simple exposition à des solutions. Quand je vois des juniors livrer des PRs qu'ils ne sont pas capables de relire sérieusement, je mesure le coût de cette confrontation manquée. Les sprints sans IA, c'est l'expérimentation que je prévois de lancer prochainement. Je ne sais pas encore si l'équipe adhérera. Mais si l'alternative, c'est une génération d'ingénieurs rapides qui ne comprennent rien, la friction mérite d'être testée.

**L'IA comme tuteur, pas comme exécutant.** Former les juniors à utiliser l'IA en mode exploration plutôt qu'en mode génération. Le prompt n'est pas « corrige ça », c'est « explique pourquoi ça pourrait échouer sous une charge importante ». Pas « écris ça pour moi », mais « quels sont les compromis entre ces trois approches ? »

La différence est concrète. Un junior qui prompte « écris un rate limiter pour cette API » obtient du code fonctionnel et n'apprend rien. Le même junior qui prompte « j'hésite entre un token bucket et une sliding window pour le rate limiting, quels sont les modes de défaillance de chacun sous un trafic avec des pics d'activité ? » obtient des compromis qu'il doit évaluer lui-même. Même outil. Résultat radicalement différent pour sa progression. Le même outil qui court-circuite l'apprentissage peut l'approfondir, selon la façon dont on l'utilise.

**Le trio programming.** Le modèle classique gagne un troisième participant : l'outil IA. Le junior pilote, le senior navigue, l'IA génère. Le rôle du senior n'est pas d'écrire du code ni de dicter. C'est de poser des questions : « Pourquoi l'IA a-t-elle proposé cette approche ? Que se passerait-il si on changeait cette contrainte ? Où est-ce que ça peut casser ? » L'IA fournit la matière première. Le senior fournit le cadre de jugement. Le junior développe les deux.

### Principe 3 : Mesurer la montée en compétences, pas seulement l'output

Un chiffre qui devrait interpeller tout engineering leader : le rapport DORA 2025 montre que malgré 90 % d'adoption de l'IA dans les équipes sondées, l'IA est corrélée à une baisse de 1,5 % de vélocité de livraison et une réduction de 7,2 % de la stabilité du code livré. L'étude Upwork 2024 raconte la même histoire côté humain : parmi les utilisateurs IA les plus productifs, 88 % déclarent être en situation de burnout, et ils sont deux fois plus susceptibles de démissionner. Les métriques d'output disaient que tout allait bien. Les gens et les systèmes se dégradaient en dessous.

C'est un scénario qui devient trop courant. Pendant les premières semaines après avoir adopté l'IA, tous les dashboards passent au vert. Les PRs sont mergées plus vite, le temps de cycle de développement baisse, la fréquence de déploiement grimpe. Et puis un incident de production survient, un incident qui aurait dû être détecté en review. On découvre que le reviewer faisait en moyenne 15 PRs par jour et que « les PR générées par l'IA finissent par toute se ressembler ». A ce moment là, les métriques d'output masquent un problème de compétences.

J'ai arrêté de faire confiance aux métriques d'output seules. Voici ce que j'ai ajouté :

**Qualité des code reviews.** Mesurer si les reviews permetent de détecter des vrais problèmes ou si on se contente d'approuver machinalement. En taguant les commentaires de review comme « cosmétique », « bug » ou « question de design », le ratio vous indiquera si les reviews sont substantielles ou de façade.

**Profondeur de résolution des incidents.** Quand les ingénieurs répondent à un incident, est-ce qu'ils suivent un runbook ou contribuent à l'analyse de la cause ? Vous pouvez noter si le post-mortem incluait une cause identifiée de manière autonome par l'ingénieur ou si il a du faire appel à un senior. La tendance sur plusieurs trimestres en dit bien plus sur la progression qu'un graphique de vélocité de sprint.

**Participation aux décisions d'architecture.** Est-ce que les mid-levels contribuent aux ADR ? Est-ce qu'ils soulèvent des compromis auxquels l'équipe n'avait pas pensé ? J'ai commencé à exiger au moins un relecteur mid-level sur chaque ADR. Pas comme un point de contrôle, mais comme un levier de progression. La qualité de leurs commentaires est devenue un de mes signaux les plus fiables pour évaluer la maturité d'une promotion.

**Patterns d'utilisation de l'IA.** Les ingénieurs qui utilisent l'IA principalement en mode génération (« écris ça pour moi ») progressent différemment de ceux qui l'utilisent en mode exploration (« explique-moi ça », « compare ces approches », « qu'est-ce qui pourrait mal tourner ici »). Pas besoin de surveiller les prompts individuels, mais on peut construire des normes d'équipe qui poussent vers un usage exploratoire. Certaines équipes d'OpenAI livrent la prompt avec la PR, permettant à leurs reviewer de mesurer *comment* ils ont travaillé avec l'IA, pas seulement ce qu'ils livraient.

## Par où commencer : un plan à 90 jours

Si tout ça vous semble faire beaucoup, c'est normal. Mais l'alternative est ne rien faire et espérer que vos seniors restent. Ça coûte plus cher. On s'en rend généralement compte au moment de recevoir la lettre de démission.

### Jours 1-30 : Écouter et auditer

Commencez par vos équipes, pas par vos process. Lancez un sondage anonyme. Pas sur la satisfaction vis-à-vis de l'IA, mais sur la progression. Demandez : *Est-ce que vous avez le sentiment de développer de nouvelles compétences ? Est-ce que vous comprenez la stratégie IA ? Est-ce que vous voyez un chemin de carrière ici ?*

Ensuite, positionnez chaque membre de votre équipe sur votre grille de niveaux. Pour chacun, répondez à deux questions : où en est-il aujourd'hui ? Où en serait-il si l'IA n'existait pas ? L'écart vous indique dans quelle mesure l'IA a accéléré l'output plutôt que le développement.

### Jours 31-60 : Piloter avec une équipe

Prenez une squad et lancez un « sprint d'apprentissage » : un vrai projet avec des contraintes IA structurées. Pas sans IA, mais avec une IA intentionnelle. Associez juniors et seniors avec le modèle à trois. Mesurez la compréhension, pas la vélocité : le junior peut-il expliquer le système qu'il vient de construire ? Peut-il le débugger sans assistance IA ? Peut-il articuler pourquoi cette approche a été choisie plutôt qu'une autre ?

Documentez ce que vous apprenez. Vous aurez besoin de ces données pour justifier un passage à l'échelle.

### Jours 61-90 : Rendre visible ce qui est invisible

Ajoutez une métrique de compétence à votre framework d'évaluation existant. Ne révolutionnez pas tout, rendez juste une chose mesurable : qualité des code reviews, profondeur de résolution des incidents, ou participation aux décisions d'architecture. Le simple fait de mesurer change les comportements. Et ça envoie un signal à votre équipe : on valorise la progression, pas seulement l'output.

Au jour 90, vous aurez les données de votre sondage, les enseignements de votre pilote, et une nouvelle métrique en production. C'est suffisant pour construire une feuille de route pour l'année suivante et pour changer la conversation avec votre direction sur ce que « stratégie IA » veut vraiment dire.

## Ce que je n'ai pas encore résolu

L'objection naturelle à tout ce que je viens de décrire, c'est « on ne peut pas se permettre de ralentir quand les concurrents livrent plus vite avec l'IA ». Je pense que ce raisonnement est à l'envers. Vos concurrents livrent plus vite aujourd'hui en consommant leur futur. Ils optimisent pour le trimestre au détriment de la décennie. Je n'ai pas dix ans de données pour le prouver. J'ai une conviction, des signaux précoces, et le schéma historique de chaque vague technologique précédente où les entreprises qui ont investi dans leurs collaborateurs ont surperformé celles qui ont optimisé uniquement pour l'output.

Ce que je continue d'observer : est-ce que le modèle de pair programming à trois tiendra quand les outils IA s'amélioreront, ou devra-t-il évoluer à nouveau dans un an ? Comment mesurer la montée en compétences sans la transformer en surveillance ? Est-ce que la « friction délibérée » survivra au prochain trimestre où la direction demandera pourquoi la vélocité de l'équipe a baissé ?

Je ne sais pas encore. Mais les organisations qui se posent ces questions maintenant, imparfaitement, expérimentalement, seront dans une position fondamentalement différente de celles qui se réveilleront en 2029 en se demandant où sont passés tous leurs ingénieurs seniors.

Ceci est la partie 2 de la série L'échelle brisée. Lire [la partie 1 : L'échelle brisée — L'IA ne tue pas les emplois en ingénierie. Elle tue les carrières.](https://pierremary.com/fr/posts/the-broken-ladder-ai-is-killing-junior-careers)

## Sources

- Upwork / Workplace Intelligence (2024). "From Burnout to Balance: AI-Enhanced Work Models." Enquête auprès de 2 500 travailleurs dans quatre pays.
- Bidwell, M. (2011). "Paying More to Get Less: The Effects of External Hiring versus Internal Mobility." Wharton, Administrative Science Quarterly.
- Bersin, J. Analyse du coût de remplacement d'un employé (1,5 à 2x le salaire annuel). Cité dans les études de Qualtrics.
- Beane, M. (2024). The Skill Code: How to Save Human Ability in an Age of Intelligent Machines. HarperCollins.
- Google Cloud DORA Team (2025). "2025 Accelerate State of DevOps Report." Impact de l'adoption de l'IA sur le débit et la stabilité des livraisons.
- PMC / NIH (2023-2024). Modèles de formation chirurgicale à autonomie progressive.
