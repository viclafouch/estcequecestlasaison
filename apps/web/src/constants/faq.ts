type FaqItem = {
  id: string
  question: string
  answer: string
}

export const FAQ_ITEMS = [
  {
    id: 'presentation',
    question: "Qu'est-ce que estcequecestlasaison.fr ?",
    answer:
      "estcequecestlasaison.fr est un outil gratuit que j'ai créé pour vous aider à connaître la saisonnalité des fruits et légumes en France métropolitaine. Consultez le calendrier interactif mois par mois pour savoir quels produits sont de saison et faire de meilleurs choix alimentaires."
  },
  {
    id: 'sources',
    question: "D'où proviennent les données\u00a0?",
    answer:
      "Les données sont issues de sources officielles et reconnues\u00a0: l'APRIFEL (Agence pour la recherche et l'information en fruits et légumes — aprifel.com), Interfel (Interprofession des fruits et légumes frais — lesfruitsetlegumesfrais.com), le Ministère de l'Agriculture (agriculture.gouv.fr) et l'Anses via la table Ciqual (ciqual.anses.fr) pour les données nutritionnelles."
  },
  {
    id: 'fiabilite',
    question: 'Les données sont-elles fiables\u00a0?',
    answer:
      "Oui, les données sont croisées à partir de plusieurs sources officielles françaises pour garantir leur exactitude. Si vous constatez une erreur, n'hésitez pas à me le signaler via LinkedIn ou GitHub."
  },
  {
    id: 'indicateurs',
    question: 'Que signifient les indicateurs de saisonnalité\u00a0?',
    answer:
      "Pleine saison\u00a0: le produit est au pic de disponibilité, avec le meilleur goût et le meilleur prix. Début ou fin de saison\u00a0: le produit est disponible mais pas à son pic, la qualité et le prix peuvent varier. Hors saison\u00a0: le produit n'est pas disponible localement en France."
  },
  {
    id: 'pourquoi',
    question: 'Pourquoi manger de saison\u00a0?',
    answer:
      "Manger de saison présente de nombreux avantages\u00a0: un meilleur goût car les produits sont récoltés à maturité, une valeur nutritionnelle supérieure, des prix plus avantageux grâce à l'abondance de l'offre, et un impact environnemental réduit avec moins de transport et de stockage."
  },
  {
    id: 'createur',
    question: 'Qui est derrière ce site\u00a0?',
    answer:
      "estcequecestlasaison.fr est un projet créé par Victor de la Fouchardière, développeur web passionné par l'alimentation de saison. Retrouvez-moi sur LinkedIn\u00a0: linkedin.com/in/victordelafouchardiere"
  },
  {
    id: 'open-source',
    question: 'Le site est-il open source\u00a0?',
    answer:
      'Oui, le code source du site est entièrement disponible sur GitHub\u00a0: github.com/viclafouch/estcequecestlasaison. Vous pouvez consulter, utiliser et contribuer au projet librement.'
  },
  {
    id: 'contribuer',
    question: 'Comment contribuer au projet\u00a0?',
    answer:
      'Vous pouvez contribuer au projet via GitHub en ouvrant des issues pour signaler des erreurs ou en proposant des améliorations via des pull requests. Toute contribution est la bienvenue\u00a0!'
  },
  {
    id: 'contact',
    question: 'Comment me contacter\u00a0?',
    answer:
      'Vous pouvez me contacter via LinkedIn\u00a0: linkedin.com/in/victordelafouchardiere. Pour les questions techniques ou les suggestions, préférez GitHub\u00a0: github.com/viclafouch/estcequecestlasaison.'
  },
  {
    id: 'application-mobile',
    question: 'Une application mobile est-elle prévue\u00a0?',
    answer:
      'Oui, une application mobile pour iOS et Android est en cours de développement. Elle sera 100\u00a0% gratuite, sans publicité, et fonctionnera entièrement hors-ligne pour consulter la saisonnalité des fruits et légumes où que vous soyez.'
  }
] as const satisfies readonly FaqItem[]
