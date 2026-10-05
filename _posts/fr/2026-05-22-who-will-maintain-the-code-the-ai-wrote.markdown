---
layout: post
title:  "Qui maintiendra le code écrit par l'IA ?"
date:   2026-05-22 08:00:00
categories: engineering leadership ai
comments: true
image: '/assets/posts/2026-05-22-who-will-maintain-the-code-the-ai-wrote/header-illustration.jpg'
description: "La question ressemble à une provocation, mais elle a une réponse structurelle, et cette réponse est inquiétante."
---
<img src="/assets/posts/2026-05-22-who-will-maintain-the-code-the-ai-wrote/header-illustration.jpg" alt="Qui maintiendra le code écrit par l'IA ?" class="grid-fig" />

Quand un développeur génère une contribution par IA, il se produit quelque chose qui ne se produisait pas lorsqu'il l'écrivait à la main. Le code entre dans le dépôt, mais le modèle mental qui lui permettrait de le déboguer à 3 heures du matin en urgence n'entre pas dans sa tête. L'artefact est là. La compréhension, non. À l'échelle d'une équipe, d'un trimestre, d'une base de code, vous obtenez une dette d'un genre nouveau : du code que les propriétaires sont incapables de maintenir.

On pourrait être tenté de le voir comme un problème de qualité de code. L'IA écrit du code bâclé ? Les relecteurs devraient être plus attentifs, l'outillage va s'améliorer. Ce serait porter des œillères. Le vrai problème est structurel : **la génération de code par IA crée de la dette de maintenance à un rythme qui dépasse celui auquel l'industrie produit des ingénieurs capables de la rembourser, et l'écart se creusera jusqu'à devenir la contrainte dominante des systèmes logiciels de la prochaine décennie.** Dans [un précédent essai](https://pierremary.com/fr/posts/the-programmer-tombstone), j'avançais que le logiciel fait face à une crise de reproduction, pas à une crise de remplacement. Ce texte suit le mécanisme opérationnel par lequel cette crise se manifeste en premier lieu : l'asymétrie de maintenance, et ceux à qui elle laisse la note.

## L'asymétrie génération-compréhension

Écrire du code était autrefois le coût dominant de la production logicielle et, par conséquent, le mécanisme principal par lequel les ingénieurs construisaient leur modèle mental des systèmes dont ils avaient la charge. On ne pouvait pas livrer un module sans en intérioriser la structure, parce que l'acte de le taper, de se tromper, de le réécrire et de le voir échouer en préproduction, c'était faire entrer la structure dans sa tête. L'artefact et le modèle se construisaient ensemble.

La génération par IA les dissocie. L'artefact arrive en quelques secondes ; le modèle prend toujours autant de temps, des heures, voire des jours. Et lorsque l'artefact passe les quality gates (il compile, les tests sont verts, il se lit bien), rien n'impose à l'ingénieur d'intérioriser le modèle. Le travail du relecteur, tel qu'il est défini aujourd'hui, consiste à vérifier que le code respecte toutes les contraintes, pas à démontrer qu'il pourrait le réécrire dans l'urgence. Ce sont deux niveaux d'attente différents, et l'industrie a discrètement revu ses attentes à la baisse.

La mesure directe la plus nette de cet écart vient de l'essai randomisé publié par Anthropic en janvier 2026 (Shen et Tamkin, « How AI Impacts Skill Formation », arXiv:2601.20245). Cinquante-deux ingénieurs, majoritairement juniors, devaient apprendre Trio, une bibliothèque Python asynchrone qu'ils ne connaissaient pas. Le groupe assisté par IA a obtenu en moyenne 50 % au quiz de compréhension post-tâche ; le groupe codant à la main, 67 %. Dix-sept points d'écart, un *d* de Cohen de 0,74, avec le déficit le plus marqué sur les questions de débogage. Le gain de temps apporté par l'IA était d'environ deux minutes par tâche, non significatif statistiquement. L'artefact est arrivé plus vite ; le modèle est arrivé moins robuste, et particulièrement faible sur la capacité à maintenir le code. Anthropic s'attend explicitement à ce que l'impact du codage agentique sur l'acquisition de compétences soit « plus prononcé » que ce que son essai a mesuré. C'est ce qui se rapproche le plus, dans l'industrie, d'un aveu par un laboratoire de pointe que ses propres outils interfèrent avec la production de mainteneurs compétents.

Addy Osmani, dans *O'Reilly Radar* plus tôt cette année, a baptisé le phénomène « dette de compréhension » et relayé l'observation de terrain la plus révélatrice que j'aie lue, due à Margaret-Anne Storey : une équipe d'étudiants dont le projet avait été essentiellement implémenté par IA s'est heurtée à un mur au bout de sept semaines. Ils ne pouvaient plus réaliser la moindre modification sans casser quelque chose d'inattendu, car personne ne pouvait expliquer pourquoi les décisions de conception avaient été prises. « La théorie du système s'était évaporée. » Le remède consiste à ralentir, lire le code, se demander ce qu'on aurait fait autrement. Cette discipline ne survit malheureusement pas à la pression des deadlines, et elle ne passe pas à l'échelle dans une équipe où la pile de code review grossit de plus en plus vite.

## Les modes de défaillance sont exactement ceux qui exigent des seniors

Savoir si le code généré par IA échoue plus souvent que le code écrit par un humain est une question empirique aux données contradictoires. Ce qui est plus clair, c'est que le mode de défaillance est différent. Les problèmes se concentrent à des points de l'architecture logicielle que le générateur a statistiquement peu de chances de regarder : interactions entre systèmes, hypothèses implicites sur l'état à l'exécution, dépendances d'ordre entre services, cas limites absents des données d'entraînement mais qu'on rencontre souvent autour de 2 heures du matin pendant les vacances.

Un exemple concret tiré de ma propre expérience. Un refactoring suggéré par une IA sur un cache en lecture placé devant un service très sollicité. Le diff était propre. Le raisonnement du modèle, dans la description de la PR, était que la clé de cache était « sur-spécifiée » et qu'un tuple plus petit réduirait la cardinalité des clés sans changer le comportement. La CI était verte, la review a pris moins d'une heure. Deux semaines plus tard, nous avons découvert que le service servait parfois des données périmées lors d'un type précis de transition d'état. L'IA avait éliminé le composant de la clé dont le seul rôle était de distinguer l'état d'avant de l'état d'après lors de cette transition. Le cas n'était pas dans la suite de tests parce qu'il était assez rare pour que personne n'ait pensé à en écrire un. Nous avions laissé un commentaire de trois lignes juste au-dessus de la structure de la clé disant, en substance : *ne pas toucher sans avoir lu le post-mortem de 2022*. Le modèle ne l'avait pas pris en compte. Le relecteur ne l'avait pas lu.

Le diagnostic a pris un après-midi et s'est déroulé en trois étapes : remarquer que les réponses périmées corrélaient avec la transition et non avec la charge, se souvenir que nous avions renforcé la clé de cache justement pour nous prémunir contre cette classe de bug trois ans plus tôt, et lire le code environnant pour confirmer que le composant « superflu » de la clé était délibérément porteur. Le refactoring était correct sur l'artefact et faux sur le système. Localement cohérent, globalement fragile. Un junior qui aurait suivi la logique du modèle serait arrivé à « la clé est sur-spécifiée, en voici une version plus propre » et se serait arrêté là, sans jamais comprendre pourquoi la sur-spécification était nécessaire. Cette bibliothèque de patterns, *ça ressemble à une race condition que j'ai vue en 2019, ça sent l'invalidation de cache, c'est la troisième fois que je vois des retries échouer sur une clé d'idempotence dérivée d'un timestamp*, c'est ce qui manque à l'IA et ce que l'ingénieur qui a accepté du code généré sans aller plus loin n'a jamais construit.

L'*AI Engineering Report 2026* de Faros AI agrège deux ans de télémétrie sur 22 000 développeurs et 4 000 équipes. Il compare les périodes de plus faible et de plus forte adoption de l'IA au sein de ces organisations. Entre ces périodes, il montre que :
- les incidents par PR sont 242,7 % plus élevés
- le temps médian de relecture d'une PR est 441 % plus long
- le taux de fusion sans relecture est 31 % plus élevé
- l'écart de bugs par développeur est passé de 9 % dans le rapport 2025 à 54 % en 2026. 

Faros vend de l'outillage d'observabilité de l'ingénierie, donc lisez ces chiffres avec le recul nécessaire. Et la comparaison porte sur des régimes d'adoption, pas sur du code écrit par IA comparé à du code écrit par des humains : elle mesure ce qui arrive au delivery quand le volume produit par IA augmente, ce qui est précisément la question de cet essai, mais elle ne tranche pas la question de savoir si un commit IA précis est pire qu'un commit humain. L'enquête DORA 2025, auprès d'environ 5 000 ingénieurs, va dans la même direction et est basée sur un jeu de données indépendant : l'adoption de l'IA corrèle désormais positivement avec la vélocité du delivery, renversant la situation de 2024, mais la relation négative avec la stabilité persiste. La vélocité s'améliore. La stabilité empire. La première se rattrape, la seconde non.

## Le pipeline qui produisait des mainteneurs est la branche que l'on est en train de couper

> Les ingénieurs juniors ressentent la douleur du mauvais code. Les agents, non. Cette friction est la pédagogie. Supprimez-la en supprimant l'écriture, et vous supprimez le processus d'apprentissage.

La cohorte qui, dans l'ancien monde, aurait bâti sa capacité de diagnostic en maintenant son propre mauvais code génère aujourd'hui du nouveau code IA à la place. L'apprentissage par lequel la boucle de friction construit le jugement d'un senior est court-circuité au moment précis où le système en a le plus besoin. Les juniors qui lancent l'agent avant de lire le manuel, qui résolvent le ticket en un prompt et envoient le code en relecture sans comprendre ce qu'impliquent les choix de l'outil, ne sont pas paresseux. Ils répondent rationnellement à une structure d'incitation qui récompense le volume de tickets livrés, pas la qualité des modèles intériorisés.

Émettre un diagnostic, en radiologie comme en ingénierie, se fait de la même manière : il s'agit de réduire un espace d'hypothèses en discernant des modèles qui s'écartent de la situation de référence apprise. Une capacité qui se construit en faisant le travail sans le modèle jusqu'à l'avoir bien intégré. Que se passe-t-il quand ce travail est partiellement substitué ? Une étude de 2023 de Chassagnon et ses collègues à l'hôpital Cochin (*European Radiology*) donne des éléments de réponse. Huit internes en radiologie ont lu des radiographies thoraciques en trois phases : une première fois pour établir une base de référence, puis une seconde avec l'IA en second lecteur pour la moitié de la cohorte, enfin sans IA pour tout le monde. Pendant la phase assistée, le groupe IA a significativement surpassé le groupe témoin. Une fois l'IA retirée, la différence a entièrement disparu : sensibilité, spécificité et exactitude étaient statistiquement indiscernables. La conclusion des auteurs adresse directement la question de la maintenance : l'IA a amélioré la performance pendant l'usage mais « ne peut pas être utilisée seule comme outil d'apprentissage ». L'étude est modeste, et un suivi mené à Brescia en 2025 est plus positif. Mais ce résultat nul et clair sur ce que produit réellement l'apprentissage assisté par IA est la meilleure preuve disponible.

Les données du marché du travail racontent la même histoire. « Canaries in the Coal Mine? » de Brynjolfsson, Chandar et Chen (Stanford Digital Economy Lab, août 2025, révisé en 2026) montre que l'effectif des développeurs américains ayant entre 22 et 25 ans a chuté de près de 20 % dans les données de paie ADP entre le pic d'octobre 2022 et juillet 2025, tandis que le nombre de développeurs plus âgés restait stable. Le *State of Talent Report 2025* de SignalFire nous apprend que les jeunes diplômés représentent 7 % des embauches des grandes entreprises tech, en baisse de 25 % par rapport à 2023 et de plus de 50 % par rapport à l'avant-pandémie.

La conséquence est un effet de concentration visible pour quiconque dirige une organisation d'ingénierie. La charge de maintenance retombe sur un nombre décroissant d'ingénieurs qui comprennent encore la base de code. L'enquête Stack Overflow 2025 saisit la fracture : parmi les développeurs expérimentés, la cohorte qui fait l'essentiel de la maintenance en production, seuls 2,6 % déclarent une forte confiance en ce que l'IA produit, tandis que 20 % expriment une forte défiance, l'écart le plus large de toute l'enquête entre cohortes. Les seniors qui font un travail soigneux se noient ; ceux qui laissent passer sans contrôle sont récompensés pour leur débit. Dans ces conditions, les relecteurs consciencieux finissent par capituler ou par partir, et la base de code perd ses derniers lecteurs. Je le constate dans ma propre organisation et j'entends la même histoire chez mes pairs ; les chiffres de Faros sur le temps de relecture et les fusions sans relecture en sont la mesure publique la plus proche.

## Les contre-arguments qui méritent d'être pris au sérieux

L'objection la plus forte est que les modèles combleront eux-mêmes l'écart de maintenance. Le raisonnement à long contexte progresse, la compréhension multi-fichiers progresse, les benchmarks de débogage deviennent obsolètes. Le temps que la cohorte senior actuelle parte à la retraite, les modèles liront les bases de code aussi bien que les seniors. C'est possible, et cela mérite qu'on s'y attarde. GitHub représente pratiquement toutes les données d'entraînement disponibles. Les données d'entraînement pour la maintenance, le processus par lequel un senior réduit un espace d'hypothèses et se souvient de quel déploiement corrélait avec quel symptôme, ont jusqu'à récemment vécu principalement dans nos têtes humaines. C'est en train de changer : les sessions de codage agentique, les fils de discussion de PR et les post-mortems sont exactement les traces que les laboratoires collectent désormais à grande échelle. Mais les benchmarks qui suggèrent que l'écart se referme sont moins pertinents qu'il n'y paraît. Les meilleurs systèmes dépassent désormais 80 % sur SWE-bench Verified, contre 1,96 % pour le meilleur modèle sur le benchmark original de 2023. Pourtant, une étude de contamination de 2026 (SWE-ABS, arXiv:2603.00520) a montré que 19,71 % des cas que les trente meilleurs agents avaient marqués « résolus » étaient sémantiquement incorrects : des patches qui passent des tests incomplets sans corriger le problème. Sur SWE-Bench Pro, plus difficile, le meilleur système chute de 78,80 % à 45,89 %. Les modèles sont seulement bons pour produire des patches qui satisfont les tests dont ils ont connaissance. La maintenance est une discipline qui consiste à trouver des défaillances que les tests n'avaient pas anticipées, et c'est exactement l'écart que les benchmarks sont le moins capables de mesurer.

Une thèse voisine veut que, même si les modèles ne peuvent pas maintenir seuls, ils rendent les seniors restants assez rapides pour absorber la charge. L'essai randomisé de METR de juillet 2025 (arXiv:2507.09089) a donné Cursor et Claude à seize développeurs open source expérimentés pour réaliser 246 tâches dans leurs propres dépôts (des bases de code matures). Les développeurs prédisaient une accélération de 24 % et, après coup, croyaient en avoir obtenu 20 %. Ils ont été 19 % *plus lents*, et le ralentissement était le plus marqué chez ceux qui connaissaient le mieux leur code : les seniors. Le suivi de METR en février 2026 a compliqué le tableau : les développeurs d'origine qui sont revenus mesuraient toujours 18 % de ralentissement, une nouvelle cohorte ressortait à –4 % avec un intervalle de confiance de –15 % à +9 %, et METR concluait que les participants étaient « probablement davantage accélérés » qu'en 2025 mais que les effets de sélection empêchaient désormais le dispositif de mesurer l'effet de façon fiable. Disons-le honnêtement, le résultat de 2025 démontre que l'IA a ralenti des seniors. La mise à jour de 2026 dit que le protocole de l'expérience n'est plus fiable. Aucune des deux études ne dit que l'IA donne aux seniors restants le multiplicateur qui leur permettrait d'absorber la charge.

Le contre-argument de la continuité est plus solide : tout logiciel a toujours eu des parties plus ou moins maîtrisées. COBOL fait toujours tourner les banques, la charge n'a rien de nouveau, l'IA change seulement qui la porte. Et c'est en partie vrai selon moi. Mais le code non maintenu d'autrefois s'accumulait sur des décennies, borné par la vitesse à laquelle des humains pouvaient l'écrire. En avril 2026, Sundar Pichai chiffrait la part de code nouveau généré par IA chez Google à 75 %, contre 25 % fin 2024 ; Satya Nadella donnait 20 à 30 % pour Microsoft un an plus tôt ; Dario Amodei a déclaré que Claude écrit de l'ordre de 90 % du code d'Anthropic, chiffre nuancé ailleurs en « 70, 80, 90 % ». Bien que ces chiffres soient à prendre avec des pincettes, il faut bien reconnaître que le code généré par IA s'accumule à un rythme bien supérieur au précédent. Et se dire que les tests attrapent les régressions, c'est de la confiance mal placée. SWE-ABS montre des IA produisant des patches qui passent des tests faibles tout en étant faux. La dette générée par IA se cache derrière une CI verte jusqu'à ce que le comportement dérive au-delà de ce que la suite couvre, et personne ne s'en aperçoit à temps. COBOL offre aussi une lecture plus sombre de la correction par le marché : ses mainteneurs sont rares et porteurs du système de paiement depuis vingt-cinq ans sans jamais avoir obtenu la prime de rareté qui aurait dû reconstituer la cohorte. Les pénuries de capacité de maintenance peuvent durer des décennies sans correction efficace.

Le contre-argument « le marché s'en charge », les salaires des seniors montent, les candidats affluent, l'équilibre se rétablit, suppose un cycle de correction plus court que celui sur lequel les dégâts se produisent. Un ingénieur met dix ans à devenir un senior chevronné. Le code généré par IA s'accumule en quelques trimestres. Les échelles de temps n'ont rien à voir. Au sein même de l'industrie de l'IA, le rachat de ce qui restait de Windsurf par Cognition en juillet 2025 est révélateur. Après que Google en avait débauché la direction pour 2,4 milliards de dollars, l'opération a été structurée autour de la rétention : chaque employé restant a reçu un vesting intégralement accéléré, et les cliffs ont été levés. Car la propriété intellectuelle sans les détenteurs de la connaissance institutionnelle était insuffisante. Les fusions-acquisitions commencent à traiter la capacité de maintenance, pas le code, comme la contrainte dominante. Si les entreprises IA se comportent ainsi quand elles fixent le prix, le contre-argument du marché qui s'équilibre tout seul tombe à l'eau.

## Les conséquences sont déjà là

Plusieurs implications sont lisibles dès maintenant. Le taux d'incidents en production est l'indicateur principal, et là où il est mesuré, il se dégrade. Le temps moyen de rétablissement est la métrique qui identifiera les organisations qui ont gardé leurs capacités de maintenance de celles qui les ont perdues. Mais pour le moment presque personne ne publie de données ventilées entre zones de code à forte et à faible densité d'IA. Le risque de bus factor se concentre sur des individus nommés dont le départ dégrade ces indicateurs. Les entreprises vont se séparer en deux groupes. Celles qui ont les seniors, et celles qui ne les ont pas. Une vraie industrie à deux vitesses. Et la due diligence commencera à poser la question que la plupart des acquéreurs ne savent pas encore poser : non pas « qui a écrit ce code » mais « qui, nommément, pourrait le réécrire si nécessaire ».

Si vous dirigez une organisation d'ingénierie, voici les questions qu'il vaut la peine de se poser :

- **Quelle est la tendance du Mean Time To Recover (MTTR) sur les zones de code à forte densité d'IA par rapport aux autres, et quels ingénieurs absorbent cette charge ?**

- **Quel pourcentage de votre base de code appartient à quelqu'un qui serait incapable de la réécrire de zéro ?**

- **Où se concentre votre risque de bus factor, et quel est votre plan de succession si cette personne part dans les six prochains mois ?**

- **Quelle part du temps d'ingénierie de ce trimestre a été allouée à maintenir du code que personne dans l'équipe ne comprenait vraiment au moment de sa livraison, et cette part augmente-t-elle ?**

La question du titre était rhétorique, mais sa réponse ne l'est pas. L'asymétrie de maintenance est la crise de reproduction vue à l'échelle de la base de code. Sur la trajectoire actuelle, les gens qui maintiendront le code écrit par l'IA sont les mêmes qui savaient déjà maintenir du code avant que l'IA existe, et ils sont moins nombreux chaque année. Les conséquences arrivent sur un horizon plus court que le cycle de correction du marché du travail, ce qui signifie que la correction, quand elle viendra, se traduira par des défaillances et non par des embauches. De quel côté votre organisation se trouvera se décide maintenant, dans les décisions d'effectifs, les décisions d'outillage et le choix de laisser faire, ou non, l'érosion silencieuse de la compréhension du code.

---

## Sources

### Acquisition de compétences et compréhension

- Shen, J. H. & Tamkin, A. (28 janvier 2026). « How AI Impacts Skill Formation ». Anthropic. arXiv:2601.20245.
- Osmani, A. (février 2026). « Comprehension Debt: The Hidden Cost of AI-Generated Code ». *O'Reilly Radar*.
- Storey, M.-A., citée dans Osmani (2026).

### Télémétrie de production et stabilité

- Faros AI (avril 2026). *AI Engineering Report 2026: The Acceleration Whiplash*.
- Faros AI (juillet 2025). *The AI Productivity Paradox Report*.
- DORA / Google Cloud (2024). *Accelerate State of DevOps Report*.
- DORA / Google Cloud (2025). *State of AI-Assisted Software Development*.

### Essais randomisés sur la productivité

- Becker, J., Rush, N., Barnes, E., & Rein, D. (juillet 2025). « Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity ». METR. arXiv:2507.09089.
- Becker, J., Rush, N., Cunningham, T., Rein, D., & Mahamud, K. (24 février 2026). « We are Changing our Developer Productivity Experiment Design ». Blog METR.

### Benchmarks

- Yu, B., Cao, Y., et al. (février 2026). « SWE-ABS: Adversarial Benchmark Strengthening Exposes Inflated Success Rates on Test-based Benchmark ». arXiv:2603.00520.
- Jimenez, C., et al. (octobre 2023). « SWE-bench: Can Language Models Resolve Real-World GitHub Issues? » arXiv:2310.06770. SWE-bench Verified : OpenAI (août 2024).
- Scale AI, classement SWE-Bench Pro.

### Sentiment des développeurs

- Stack Overflow Developer Survey (2025).

### Marché du travail

- Brynjolfsson, E., Chandar, B., & Chen, R. (août 2025 ; révisé 2026). « Canaries in the Coal Mine? Six Facts About the Recent Employment Effects of Artificial Intelligence ». Stanford Digital Economy Lab.
- SignalFire (20 mai 2025). *2025 State of Talent Report*.

### Analogie d'apprentissage dans un autre champ

- Chassagnon, G., Billet, N., Rutten, C., et al. (novembre 2023). « Learning from the machine: AI assistance is not an effective learning tool for resident education in chest x-ray interpretation ». *European Radiology* 33(11):8241–8250.
- Savardi, M., et al. (janvier 2025). « Upskilling or deskilling? Measurable role of an AI-supported training for radiology residents ». *Insights into Imaging*.

### Fusions-acquisitions et valeur de la connaissance institutionnelle

- Blog Cognition AI (14 juillet 2025). « Cognition acquires Windsurf ».

### Part de code générée par IA

- Pichai, S. (22 avril 2026). Billet de blog Google ; appel de résultats Alphabet T3 2024 pour le chiffre de 25 %.
- Nadella, S. (29 avril 2025), Meta LlamaCon.
- Amodei, D. (15 octobre 2025), Dreamforce ; Redwood Research, « Is 90% of code at Anthropic being written by AIs? » (octobre 2025) pour le chiffre nuancé.