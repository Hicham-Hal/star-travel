// Replace with the agency's real number: international format, no "+" and no leading 0
// e.g. 0555 12 34 56 -> 213555123456
export const WA_NUMBER = '213000000000'
export const wa = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export const SERVICES = [
  ['🎫', "Billets d'avion", 'Vols nationaux et internationaux, au meilleur tarif disponible.'],
  ['🕋', 'Omra et Hajj', 'Packages complets : vol, hébergement, transferts et accompagnement.'],
  ['🛂', 'Assistance visa', 'Constitution du dossier, rendez-vous et suivi de votre demande.'],
  ['🏨', 'Hôtels et séjours', 'Réservation d\'hôtels et voyages organisés vers vos destinations favorites.'],
]

export const DEST = {
  istanbul: {
    cls: 't1', code: 'IST', name: 'Istanbul', sub: 'Séjours et circuits',
    tag: "Entre Europe et Asie, à environ 3 h 30 d'Alger.",
    facts: [['Vol depuis Alger', '≈ 3 h 30'], ['Monnaie', 'Livre turque (TRY)'], ['Meilleure période', 'Avril – juin, sept. – oct.']],
    posts: [
      { t: 'Istanbul 5 jours : vol + hôtel', x: 'Vol, hôtel en centre-ville et transferts inclus. Départs chaque semaine selon disponibilités.' },
      { t: 'Visa Turquie : vérifiez votre âge', x: 'Depuis juin 2026, les moins de 15 ans et les plus de 50 ans voyagent sans visa. Les autres : nous nous occupons du dossier.' },
    ],
    need: [
      ['Passeport biométrique', 'En cours de validité (6 mois minimum conseillés).'],
      ["Visa selon l'âge", "Moins de 15 ans ou plus de 50 ans : pas de visa (90 jours maximum). De 15 à 50 ans : visa nécessaire, l'agence vous accompagne. Règle en vigueur depuis le 20 juin 2026."],
      ["Billet retour et réservation d'hôtel", "Souvent demandés à l'arrivée."],
      ['Allocation touristique', 'À demander à votre banque avant le départ.'],
      ['Assurance voyage', 'Fortement conseillée.'],
    ],
  },
  omra: {
    cls: 't2', code: 'MED', name: 'Omra', sub: 'La Mecque et Médine',
    tag: 'Un voyage organisé de bout en bout, de la préparation au retour.',
    facts: [['Vol depuis Alger', '≈ 4 h 30 à 5 h'], ['Monnaie', 'Riyal saoudien (SAR)'], ['Hébergement', 'La Mecque et Médine']],
    posts: [
      { t: 'Omra : prochains départs', x: 'Packages avec vol, hébergement près des lieux saints, transferts et accompagnateur. Places limitées.' },
      { t: "Réunion d'information avant le départ", x: 'Rites, programme, documents à préparer : toutes vos questions avant de partir.' },
    ],
    need: [
      ['Passeport biométrique', 'En cours de validité (6 mois minimum conseillés).'],
      ['Visa Omra', "Obtenu par l'agence agréée. Chaque saison a des dates limites d'entrée et de sortie en Arabie saoudite."],
      ["Photos d'identité récentes", 'Format biométrique.'],
      ['Vaccin méningite (ACWY)', "Recommandé. Nous vérifions l'exigence en vigueur avant votre départ."],
      ['Mineurs', "Autorisation parentale et pièces d'état civil."],
    ],
  },
  dubai: {
    cls: 't3', code: 'DXB', name: 'Dubaï', sub: 'Vols et hôtels',
    tag: 'Villes futuristes, plages et désert, pour une escapade ou des vacances.',
    facts: [['Vol depuis Alger', '≈ 7 h (avec escale selon la compagnie)'], ['Monnaie', 'Dirham (AED)'], ['Meilleure période', 'Novembre – mars']],
    posts: [
      { t: 'Dubaï 6 jours : vol + hôtel', x: 'Visites, désert et temps libre. Programme modifiable selon vos envies.' },
      { t: "Visa Émirats : on s'occupe du dossier", x: 'Envoyez vos documents, nous gérons la demande de A à Z.' },
    ],
    need: [
      ['Passeport biométrique', 'En cours de validité (6 mois minimum).'],
      ['Visa Émirats', "Demande effectuée par l'agence : copie du passeport et photo."],
      ['Billet retour et hôtel réservé', "Justificatifs demandés pour le visa et à l'arrivée."],
      ['Allocation touristique', 'À demander à votre banque avant le départ.'],
      ['Assurance voyage', 'Fortement conseillée.'],
    ],
  },
  tunisie: {
    cls: 't4', code: 'TUN', name: 'Tunisie', sub: 'Séjours en famille',
    tag: "Mer, soleil et hôtels all inclusive, à une heure d'avion.",
    facts: [['Vol depuis Alger', '≈ 1 h'], ['Monnaie', 'Dinar tunisien (TND)'], ['Meilleure période', 'Mai – juin, septembre']],
    posts: [
      { t: 'Séjours à Hammamet, Sousse et Djerba', x: 'Formules demi-pension et all inclusive. Dates et hôtels selon disponibilités.' },
      { t: 'Formules famille', x: 'Chambres communicantes et tarifs enfants dans plusieurs hôtels.' },
    ],
    need: [
      ['Passeport en cours de validité', 'Pas de visa pour les Algériens.'],
      ['Mineurs', "Autorisation parentale si l'enfant voyage sans ses deux parents."],
      ["Réservation d'hôtel", 'Conseillée pour la présentation à la frontière.'],
      ['Allocation touristique', 'À demander à votre banque avant le départ.'],
      ['Assurance voyage', 'Conseillée.'],
    ],
  },
}

// Agency details shown on the contact page. Replace with the real ones.
export const AGENCY = {
  phone: '0X XX XX XX XX',
  address: 'Bouira, Algérie (adresse exacte à ajouter)',
  hours: 'Dimanche – jeudi, 9h – 17h',
  // Exact street address, or "latitude,longitude" copied from Google Maps
  mapQuery: 'Star Travel Agency, Bouira, Algérie',
}