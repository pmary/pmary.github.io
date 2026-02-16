---
layout: post
title:  "L'échelle brisée : L'IA ne tue pas les emplois en ingénierie. Elle tue les carrières."
date:   2026-02-16 08:00:40
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-02-16-the-broken-ladder-ai-is-killing-junior-careers/header-illustration.png'
description: "Pourquoi les prédictions les plus bruyantes sur l'IA passent à côté de la vraie menace, et ce que les données montrent réellement sur l'avenir des talents techniques."
---
<img src="/assets/posts/2026-02-16-the-broken-ladder-ai-is-killing-junior-careers/header-illustration.png" alt="L'échelle brisée : L'IA ne tue pas les emplois en engineering. Elle tue les carrières." class="grid-fig" />

## L'affirmation qui a lancé mille et une tribunes enflammées

Il y a quelques jours, Mustafa Suleyman, le directeur IA de Microsoft, a déclaré au Financial Times que « la plupart, sinon la totalité, des tâches professionnelles » seraient « entièrement automatisées par une IA d'ici 12 à 18 mois ».

Suleyman dirige la division IA d'une entreprise qui a investi plus de 13 milliards de dollars dans OpenAI. Quand il dit que chaque tâche qui s'effectue dans un bureau sera automatisée dans 18 mois, il ne fait pas une prédiction scientifique. Il vend. Et il n'est pas le seul à le faire. Le PDG d'Anthropic déclare de son côté que l'IA va supprimer 50 % des emplois juniors. Le PDG de Ford prédit qu'elle réduira de moitié l'emploi des cols blancs. Chaque prédiction émane de quelqu'un dont la fortune est directement corrélée au fait que les gens croient que l'IA est plus transformatrice qu'elle ne l'est actuellement.

Ces affirmations n'ont rien de nouveau. En 2013, des chercheurs d'Oxford prédisaient que 47 % des emplois américains étaient à « haut risque » d'automatisation. Ce chiffre a façonné une décennie de débat politique. Neuf ans plus tard, l'économie américaine avait pourtant créé 16 millions d'emplois. 
Par ailleurs, l'analyse la plus rigoureuse à ce jour, celle de Daron Acemoglu du MIT (lauréat du prix Nobel 2024), estime qu'environ 5 % seulement des tâches seront affectées de manière rentable par l'IA au cours de cette décennie, soit une hausse du PIB d'environ 1 % sur dix ans.

Donc quand Suleyman dit 18 mois, il serait plus réaliste de multiplier par cinq ou dix et de réduire le périmètre de 90 %. Mais même cette version modeste et réaliste de l'impact de l'IA suffit à créer une véritable crise. Seulement, pas celle dont tout le monde parle.

## Ce qui se passe vraiment : les données dont personne ne parle

Je dirige une équipe de Platform Engineering de 11 personnes réparties dans trois pays. Nous gérons le SRE, le DevSecOps, le CI/CD, le FinOps, le release management et l'expérience développeur. Je pilote le déploiement des outils d'IA dans l'ensemble de notre organisation d'ingénierie de 75 personnes. Les gains de productivité sont réels et significatifs.

Je suis loin d'être un sceptique de l'IA. J'ai déployé ces outils. Je le referais.

Mais je suis aussi aux premières loges pour observer quelque chose que les données macro commencent à confirmer, et ce n'est pas l'élimination massive des emplois que Suleyman promet. C'est quelque chose de plus insidieux.

### L'effondrement des postes junior

Le fait le plus marquant dans l'impact de l'IA sur l'emploi ne porte pas sur le nombre total de postes, mais sur qui est recruté.

Le Digital Economy Lab de Stanford, en analysant des millions de fiches de paie ADP, a constaté que l'emploi des développeurs logiciels âgés de 22 à 25 ans a chuté de près de 20 % depuis fin 2022. Pile au moment où les outils d'IA générative sont devenus grand public. Pour ces mêmes rôles, l'emploi des travailleurs plus âgés et plus expérimentés a en fait augmenté de 6 à 9 % sur la même période.

La récession n'est pas générale. Elle est ciblée.

SignalFire a relevé une baisse de 50 % des prises de poste pour les personnes ayant moins d'un an d'expérience dans les grandes entreprises tech. Le Burning Glass Institute a constaté que les offres d'emploi exigeant trois ans d'expérience ou moins sont passées de 43 % en 2018 à 28 % en 2024. Mais voici le détail crucial : le nombre total d'offres dans le domaine est resté stable. Le recrutement de profils seniors est resté constant. Les entreprises ne recrutent pas moins de monde. Elles sautent purement et simplement les jeunes diplômés.

Et voici le chiffre qui devrait empêcher les engineering leaders de dormir : une enquête de 2024 de la Hult International Business School auprès de 1 600 employeurs et travailleurs américains a révélé que 37 % des managers préfèrent utiliser l'IA plutôt que d'embaucher un jeune diplômé. Les managers optent pour l'outil qui n'a pas besoin de formation initiale.

### La compression des profils intermédiaires

L'histoire des juniors est déjà suffisamment dramatique. Mais c'est au niveau intermédiaire que la prochaine vague frappe.

L'analyse de l'Indeed Hiring Lab (juillet 2025) sur le gel des recrutements tech aux États-Unis a révélé que les baisses étaient « particulièrement marquées parmi les emplois situés au milieu du spectre salarial tech » : les rôles de développeurs spécialisés (Android, Java, .NET, iOS et développeurs web). Tous ont vu leurs offres d'emploi chuter de plus de 60 % par rapport à début 2020. Ce ne sont pas des postes de junior. Ce sont les rôles de milieu de carrière qui constituent le cœur de la plupart des organisations tech.
Les offres d'emploi d'ingénieur logiciel dans leur ensemble ont chuté de 49 %.
Pendant ce temps, les offres en machine learning, le rôle senior-spécialiste par excellence, étaient en hausse de 59 % par rapport à leur niveau pré-pandémie.

Le mécanisme est simple. Microsoft a rapporté que 30 % de son code est désormais généré par l'IA. Les tâches qui caractérisent le travail d'ingénierie de niveau intermédiaire (traduire des exigences en implémentations, écrire du code d'intégration, déboguer des problèmes inter-services, produire de la documentation) sont précisément des tâches qui relèvent du pattern-matching et de traduction de spécifications en code, ce que les LLM font très bien. Le volume de travail de niveau intermédiaire se contracte, même si la complexité de ce qui reste augmente.

À tous les niveaux, ce phénomène est accéléré par une stratégie silencieuse de « non-remplacement ». Le PDG de Klarna a annoncé que l'entreprise avait totalement cessé de recruter en 2023, laissant l'attrition naturelle de 15 à 20 % par an réduire l'effectif de 5 000 à 3 500. Aucun licenciement nécessaire. Salesforce a déclaré à CNBC avoir déployé des agents IA qui « ont éliminé le besoin de remplacer les postes d'ingénieurs support ». Une enquête 2025 de la Federal Reserve Bank de New York a quantifié le phénomène plus largement : alors que seulement 1 % des entreprises de services ont signalé des licenciements liés à l'IA, 12 % ont déclaré que l'IA les avait amenées à recruter moins. L'écart entre ces chiffres est dû au non-remplacement systématique. Cela ne fait pas les gros titres, mais cumulé sur trois à cinq ans, la pyramide des talents est remodelée.

### La distinction entre automatisation des tâches et élimination des emplois

C'est là que les optimistes se trompent : l'essentiel de ce qui se passe relève de l'automatisation des tâches, pas de l'élimination des emplois. Un essai contrôlé randomisé de référence d'Erik Brynjolfsson et de ses collègues, étudiant des agents de support client, a montré que les outils d'IA augmentaient la productivité de 14 % en moyenne, avec les gains les plus importants (34 %) chez les travailleurs les moins expérimentés. Les agents n'ont pas été licenciés. Ils traitaient plus de cas, plus vite.

Une étude du BCG sur des consultants utilisant GPT-4 a trouvé des dynamiques similaires : les consultants accomplissaient 12 % de tâches en plus, 25 % plus vite, avec une qualité supérieure de 40 %. Là encore, aucun emploi supprimé. Juste un rendement supérieur par personne.

Ça semble être une bonne nouvelle, et à bien des égards ça l'est. Mais il y a un effet de second ordre dont presque personne ne parle : **si l'IA rend chaque travailleur restant plus productif, vous avez besoin de moins de travailleurs au total pour maintenir le même niveau de production. Et les travailleurs que vous ne recrutez pas sont de manière disproportionnée ceux qui se trouvent en bas de la courbe d'expérience**.

L'effet net est un marché du travail qui emploie toujours beaucoup d'ingénieurs, mais de plus en plus sélectivement les plus expérimentés.

## L'échelle brisée : pourquoi c'est une vraie crise

La vraie menace de l'IA n'est pas le chômage de masse. Acemoglu a probablement raison de dire que l'impact global sera modeste et étalé sur une décennie. La vraie menace est que **l'IA détruit systématiquement le mécanisme par lequel les ingénieurs développent leur expertise**.

### Comment les ingénieurs deviennent naturellement compétents

Chaque carrière d'ingénieur suit un arc prévisible. Vous commencez par faire un travail légèrement trop difficile pour vous, aux côtés de quelqu'un qui l'a déjà fait, sur des problèmes qui ont une vraie valeur. Vous déboguez du code que vous n'avez pas écrit. Vous livrez des fonctionnalités dans des systèmes que vous ne comprenez pas entièrement. Vous êtes réveillé à 3 heures du matin par un incident de production et vous apprenez, sous pression, comment les systèmes distribués échouent dans la vraie vie.

Matt Beane, professeur assistant à l'UC Santa Barbara et chercheur associé à Stanford et au MIT, a passé une décennie à étudier exactement cette dynamique. Ses recherches, publiées dans des revues comme Administrative Science Quarterly et Harvard Business Review, ont abouti à son livre The Skill Code. Sa conclusion centrale est que le développement des compétences nécessite trois composantes : le défi (un travail qui vous pousse à vous dépasser), la complexité (l'exposition au chaos des vrais problèmes) et la connexion (travailler aux côtés de quelqu'un de plus expérimenté).

L'automatisation sape systématiquement ces trois composantes.

L'exemple le plus parlant de Beane vient de la chirurgie robotique. Une résidente en chirurgie entre au bloc, installe son patient, branche le robot, puis s'assied dans un coin à regarder un écran pendant que le chirurgien titulaire opère depuis la console. Le patient reçoit d'excellents soins. Les indicateurs d'efficacité de l'hôpital sont au beau fixe. La résidente n'apprend presque rien sur la façon d'opérer.

Le parallèle avec l'ingénierie logicielle est saisissant. Un développeur junior demande de l'aide à un LLM, obtient un code bien structuré, le livre, ferme le ticket. La vélocité du sprint augmente. L'ingénieur n'a jamais développé le modèle mental expliquant pourquoi ce code fonctionne, quels compromis il implique, ou comment il se comportera dans des conditions que l'IA n'a pas anticipées. Le ticket est fermé plus vite. L'apprentissage n'a pas eu lieu.

Dans mon organisation, nous utilisons une échelle d'ingénierie à cinq niveaux (E1 à E5) qui mesure la progression selon quatre dimensions : excellence technique, livraison et impact, leadership et influence, innovation et stratégie. Au niveau E1, un ingénieur « apprend » et « suit ». Au niveau E3, il « maîtrise » et « mentor ». Au niveau E5, il « innove » et « anticipe ».

Le référentiel en lui-même n'a rien de spécial. La plupart des organisations tech en ont une version similaire. Ce qui compte, c'est le mécanisme par lequel quelqu'un passe d'un niveau au suivant.

Chaque transition sur cette échelle requiert de l'expérience accumulée en faisant un travail légèrement au-delà de vos capacités actuelles. Un E1 apprend à déboguer en déboguant. Un E2 apprend l'architecture système en livrant des fonctionnalités dans des systèmes qu'il ne maîtrise pas encore totalement. Un E3 gagne le titre de « senior » non pas par l'ancienneté mais en accumulant suffisamment d'expérience sur des incidents de production, en négociant des compromis architecturaux et en apprenant de ses échecs pour développer son jugement.

Les outils d'IA peuvent accélérer chacune de ces transitions. Mais ils peuvent aussi les court-circuiter entièrement. Et le court-circuit ressemble exactement à une accélération, jusqu'au moment précis où vous avez besoin du jugement qui ne s'est jamais formé.

### Le problème du pipeline

Si les entreprises continuent de réduire les recrutements de premier échelon (et les données montrent massivement que c'est le cas), le pipeline se rétrécit par le bas. Si l'IA gère le travail formateur qui reste pour les juniors encore recrutés, ceux-ci développent moins d'expertise. Si le travail de niveau intermédiaire se contracte à mesure que l'IA prend en charge davantage de ces tâches, les ingénieurs de niveau intermédiaire font face à une progression de carrière plus lente et un développement de compétences plus faible.

D'ici 2028 à 2030, les organisations se disputeront un bassin décroissant d'ingénieurs seniors qui comprennent réellement pourquoi les choses fonctionnent, et pas seulement comment prompter quelque chose qui les fait fonctionner. Brynjolfsson a parfaitement capturé cela dans l'étude de Stanford : les travailleurs expérimentés sont protégés parce qu'ils possèdent un savoir tacite et une intuition, des ficelles du métier apprises par l'expérience qui ne sont écrites nulle part et n'existent pas dans les données d'entraînement des LLM.

Ce savoir tacite doit bien venir de quelque part. Il vient d'années à faire le job. Le travail fastidieux, frustrant, sans glamour que l'IA automatise désormais.

C'est ce que j'appelle se tirer une balle dans le pied. Les entreprises consomment l'investissement dans le développement des talents juniors pour capter des gains de productivité IA à court terme. La vélocité du sprint est excellente ce trimestre. Pendant ce temps, le pipeline de talents se tarit.

Et la plus cruelle des ironies : les organisations qui réduisent le plus vite les juniors pour capter ces gains seront celles les plus durement frappées par la pénurie de seniors. Elles ont économisé sur les semences. Maintenant il n'y a plus rien à récolter.

### Ce n'est pas un problème théorique

Les signaux sont déjà visibles dans les données de rémunération. Les chiffres du Bureau of Labor Statistics montrent que le développeur logiciel au 90e percentile gagne désormais 211 450 $, soit 2,6 fois le salaire au 10e percentile de 79 850 $. Cet écart se creuse considérablement dans les grandes entreprises où la rémunération totale des ingénieurs seniors et staff dépasse régulièrement 400 000 $.
Pendant ce temps, le recrutement de juniors s'est effondré : l'analyse 2025 de Ravio sur la tech européenne a montré que les taux de recrutement P1 et P2 ont chuté de 73 % sur un an, contre une baisse globale de seulement 7 %.
Et le Global AI Jobs Barometer de PwC rapporte que les rôles nécessitant des compétences en IA obtiennent désormais une prime salariale de 56 %, plus du double de la prime de 25 % d'un an auparavant, tandis que les salaires moyens en ingénierie logicielle n'ont progressé que de 1,6 %.

C'est le marché qui intègre le prix de l'échelle brisée. Les juniors deviennent moins valorisés parce que leur principal livrable, le code, est désormais abondant et bon marché. Les seniors deviennent plus valorisés parce que leur principal atout, le jugement, est rare et le devient de plus en plus.

Si vous managez des ingénieurs, c'est la question stratégique des cinq prochaines années. Non pas parce que l'IA va éliminer votre équipe. Mais parce que dans cinq ans, quand vous devrez remplacer un architecte senior qui part, l'ingénieur de niveau intermédiaire qui aurait dû être prêt pour ce rôle n'aura pas développé l'expérience nécessaire pour l'occuper. Et il n'y aura personne d'autre.

## Ce que cela signifie pour les leaders de la tech

Le débat sur l'IA et les carrières d'ingénieurs a été dominé par deux extrêmes : les Suleyman qui promettent une transformation totale en 18 mois, et les sceptiques qui insistent que rien n'a changé. Les deux ont tort, et les deux discours sont dangereux.

Ce qui se passe réellement est plus subtil et plus lourd de conséquences. L'IA n'élimine pas les emplois d'ingénieurs. Elle élimine le processus par lequel les ingénieurs deviennent bons dans leur métier.

Les entreprises qui reconnaissent ce risque et traitent l'adoption de l'IA comme un défi de développement de carrière, et pas seulement comme un levier de productivité, construiront un avantage compétitif. Non pas parce que leurs outils sont meilleurs. Tout le monde aura les mêmes outils. Mais parce que leurs équipes seront plus solides.

L'échelle se brise. La question est de savoir si vous le remarquerez avant que les barreaux ne cèdent sous les pieds de vos équipes.

La réponse n'est pas d'arrêter d'utiliser l'IA. C'est d'arrêter d'optimiser pour le résultat dont vous avez besoin aujourd'hui. Et de commencer à optimiser pour la capacité dont vous aurez besoin dans cinq ans.

Dans la Partie 2, je je détaillerai ce que les engineering leaders peuvent faire concrètement.

## Sources

- Acemoglu, D. (2024). "The Simple Macroeconomics of AI." NBER Working Paper 32487. Publié dans Economic Policy, Vol. 40(121), 2025.
- Beane, M. (2024). The Skill Code: How to Save Human Ability in an Age of Intelligent Machines. HarperCollins.
- Brynjolfsson, E. et al. (2023). "Generative AI at Work." NBER Working Paper 31161.
- Frey, C.B. & Osborne, M. (2013/2017). "The Future of Employment: How Susceptible Are Jobs to Computerisation?"
- Suleyman, M. (2026). Interview avec le Financial Times, 12 février.
- Amodei, D. (2025). Interview avec Axios sur l'IA et le déplacement des emplois de premier échelon, 28 mai 2025.
- Farley, J. (2025). Déclarations au Aspen Ideas Festival, 27 juin 2025.
- Stanford Digital Economy Lab (2025). Document de travail sur l'IA générative et l'emploi en début de carrière, analyse des données de paie ADP.
- SignalFire (2025). Analyse du recrutement de premier échelon dans les grandes entreprises tech.
- Burning Glass Institute (2024). Analyse des données de recrutement dans les domaines exposés à l'IA.
- Bureau of Labor Statistics. Données d'emploi par profession, 2023-2025.
- IEEE Spectrum (2025). "AI Shifts Expectations for Entry Level Jobs."
- CNBC (2025). "AI is not just ending entry-level jobs. It's the end of the career ladder as we know it."
- Forrester (2025). Rapport sur l'adoption de l'IA et l'impact sur la main-d'œuvre.
- Siemiatkowski, S. (2025). Déclarations du PDG de Klarna sur le gel du recrutement lié à l'IA et la réduction des effectifs. CNBC, 14 mai 2025 ; Bloomberg TV, décembre 2024.
- Salesforce (2025). Déclarations du porte-parole sur le déploiement d'Agentforce et la politique de non-remplacement. CNBC, octobre 2025.
- Abel, J.R. et al. (2025). "Are Businesses Scaling Back Hiring Due to AI?" Federal Reserve Bank of New York, Liberty Street Economics, septembre 2025.
- Bernard, B. (2025). "The US Tech Hiring Freeze Continues." Indeed Hiring Lab, 30 juillet 2025.
- Workplace Intelligence / Hult International Business School (2024). Enquête auprès de 1 600 employeurs et travailleurs américains sur l'IA et le recrutement des diplômés, octobre 2024.
- Dell'Acqua, F. et al. (2023). "Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality." Harvard Business School Working Paper 24-013.
- Bureau of Labor Statistics (2024). Occupational Employment and Wage Statistics, Software Developers (SOC 15-1252), mai 2024.
- Ravio (2025). "The Tech Job Market in 2025." Analyse des taux de recrutement de premier échelon (P1/P2).
- PwC (2025). "Global AI Jobs Barometer." Analyse de la prime salariale liée aux compétences en IA.
