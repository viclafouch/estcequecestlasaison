type FaqItem = {
  value: string
  question: string
  answer: string
}

export type { FaqItem }

export const FAQ_ITEMS = [
  {
    value: 'what-is-season',
    question: "C'est quoi un fruit ou légume de saison ?",
    answer:
      "Un fruit ou légume de saison est un produit qui pousse naturellement à une période donnée de l'année, sans recours à des serres chauffées. Consommer de saison, c'est profiter de produits plus savoureux, moins chers et avec un impact environnemental réduit."
  },
  {
    value: 'data-source',
    question: "D'où viennent les données ?",
    answer:
      'Les données sont basées sur les calendriers de saisonnalité officiels en France métropolitaine, croisés avec plusieurs sources (ADEME, interfel.com, marchés de producteurs). Elles couvrent 80 fruits et légumes courants.'
  },
  {
    value: 'how-it-works',
    question: "Comment fonctionne l'app ?",
    answer:
      "L'application fonctionne entièrement hors-ligne. Toutes les données sont embarquées directement dans l'app, aucune connexion internet n'est nécessaire. Vous pouvez consulter les produits de saison n'importe où, n'importe quand."
  },
  {
    value: 'peak-vs-partial',
    question: 'Que signifient les couleurs des badges ?',
    answer:
      "Le vert indique la pleine saison : le produit est au meilleur de sa production. L'orange signifie début ou fin de saison : le produit commence à arriver ou va bientôt disparaître des étals. Le gris indique que le produit est hors saison."
  }
] as const satisfies readonly FaqItem[]
