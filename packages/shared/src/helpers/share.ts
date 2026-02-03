type GetShareTextParams = {
  produceName: string
  isInSeason: boolean
  siteDomain: string
}

export function getShareText({
  produceName,
  isInSeason,
  siteDomain
}: GetShareTextParams) {
  if (isInSeason) {
    return `Savais-tu que ${produceName} est de saison en ce moment ? Découvre les fruits et légumes de saison sur ${siteDomain}`
  }

  return `Découvre quand commence la saison de ${produceName} sur ${siteDomain}`
}
