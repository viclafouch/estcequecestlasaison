type FaqItem = {
  id: string
  question: string
  answer: string
}

export const FAQ_ITEMS = [
  {
    id: 'presentation',
    question: 'Qu\u2019est-ce que estcequecestlasaison.fr ?',
    answer:
      'estcequecestlasaison.fr est un outil gratuit que j\u2019ai cr\u00e9\u00e9 pour vous aider \u00e0 conna\u00eetre la saisonnalit\u00e9 des fruits et l\u00e9gumes en France m\u00e9tropolitaine. Consultez le calendrier interactif mois par mois pour savoir quels produits sont de saison et faire de meilleurs choix alimentaires.'
  },
  {
    id: 'sources',
    question: 'D\u2019o\u00f9 proviennent les donn\u00e9es\u00a0?',
    answer:
      'Les donn\u00e9es sont issues de sources officielles et reconnues\u00a0: l\u2019APRIFEL (Agence pour la recherche et l\u2019information en fruits et l\u00e9gumes \u2014 aprifel.com), Interfel (Interprofession des fruits et l\u00e9gumes frais \u2014 lesfruitsetlegumesfrais.com), le Minist\u00e8re de l\u2019Agriculture (agriculture.gouv.fr) et l\u2019Anses via la table Ciqual (ciqual.anses.fr) pour les donn\u00e9es nutritionnelles.'
  },
  {
    id: 'fiabilite',
    question: 'Les donn\u00e9es sont-elles fiables\u00a0?',
    answer:
      'Oui, les donn\u00e9es sont crois\u00e9es \u00e0 partir de plusieurs sources officielles fran\u00e7aises pour garantir leur exactitude. Si vous constatez une erreur, n\u2019h\u00e9sitez pas \u00e0 me le signaler via LinkedIn ou GitHub.'
  },
  {
    id: 'indicateurs',
    question: 'Que signifient les indicateurs de saisonnalit\u00e9\u00a0?',
    answer:
      'Pleine saison\u00a0: le produit est au pic de disponibilit\u00e9, avec le meilleur go\u00fbt et le meilleur prix. D\u00e9but ou fin de saison\u00a0: le produit est disponible mais pas \u00e0 son pic, la qualit\u00e9 et le prix peuvent varier. Hors saison\u00a0: le produit n\u2019est pas disponible localement en France.'
  },
  {
    id: 'pourquoi',
    question: 'Pourquoi manger de saison\u00a0?',
    answer:
      'Manger de saison pr\u00e9sente de nombreux avantages\u00a0: un meilleur go\u00fbt car les produits sont r\u00e9colt\u00e9s \u00e0 maturit\u00e9, une valeur nutritionnelle sup\u00e9rieure, des prix plus avantageux gr\u00e2ce \u00e0 l\u2019abondance de l\u2019offre, et un impact environnemental r\u00e9duit avec moins de transport et de stockage.'
  },
  {
    id: 'createur',
    question: 'Qui est derri\u00e8re ce site\u00a0?',
    answer:
      'estcequecestlasaison.fr est un projet cr\u00e9\u00e9 par Victor de la Fouchardi\u00e8re, d\u00e9veloppeur web passionn\u00e9 par l\u2019alimentation de saison. Retrouvez-moi sur LinkedIn\u00a0: linkedin.com/in/victordelafouchardiere'
  },
  {
    id: 'open-source',
    question: 'Le site est-il open source\u00a0?',
    answer:
      'Oui, le code source du site est enti\u00e8rement disponible sur GitHub\u00a0: github.com/viclafouch/estcequecestlasaison. Vous pouvez consulter, utiliser et contribuer au projet librement.'
  },
  {
    id: 'contribuer',
    question: 'Comment contribuer au projet\u00a0?',
    answer:
      'Vous pouvez contribuer au projet via GitHub en ouvrant des issues pour signaler des erreurs ou en proposant des am\u00e9liorations via des pull requests. Toute contribution est la bienvenue\u00a0!'
  },
  {
    id: 'contact',
    question: 'Comment me contacter\u00a0?',
    answer:
      'Vous pouvez me contacter via LinkedIn\u00a0: linkedin.com/in/victordelafouchardiere. Pour les questions techniques ou les suggestions, pr\u00e9f\u00e9rez GitHub\u00a0: github.com/viclafouch/estcequecestlasaison.'
  },
  {
    id: 'application-mobile',
    question: 'Une application mobile est-elle pr\u00e9vue\u00a0?',
    answer:
      'Oui, une application mobile pour iOS et Android est en cours de d\u00e9veloppement. Elle sera 100\u00a0% gratuite, sans publicit\u00e9, et fonctionnera enti\u00e8rement hors-ligne pour consulter la saisonnalit\u00e9 des fruits et l\u00e9gumes o\u00f9 que vous soyez.'
  }
] as const satisfies readonly FaqItem[]
