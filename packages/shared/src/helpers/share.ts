export const SITE_DOMAIN = 'estcequecestlasaison.fr'

type GetShareTextParams = {
  produceName: string
  isInSeason: boolean
  siteDomain?: string
}

export function getShareText({
  produceName,
  isInSeason,
  siteDomain = SITE_DOMAIN
}: GetShareTextParams) {
  if (isInSeason) {
    return `Savais-tu que ${produceName} est de saison en ce moment ? Découvre les fruits et légumes de saison sur ${siteDomain}`
  }

  return `Découvre quand commence la saison de ${produceName} sur ${siteDomain}`
}
