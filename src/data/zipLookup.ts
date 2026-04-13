export type ZipStatus = 'live' | 'coming_soon' | 'unserved'

export interface ZipEntry {
  status: ZipStatus
  city: string
  county: string
}

// Florida ZIP lookup table
// live = NMB pilot territories
// coming_soon = South Florida expansion ring (Miami-Dade + Broward)
// Everything else = unserved → demand signal
export const ZIP_LOOKUP: Record<string, ZipEntry> = {
  // ── LIVE: North Miami Beach ──────────────────────────────
  '33160': { status: 'live',         city: 'North Miami Beach', county: 'Miami-Dade' },
  '33162': { status: 'live',         city: 'North Miami Beach', county: 'Miami-Dade' },

  // ── COMING SOON: Adjacent NMB ────────────────────────────
  '33161': { status: 'coming_soon',  city: 'North Miami',       county: 'Miami-Dade' },
  '33138': { status: 'coming_soon',  city: 'Miami Shores',      county: 'Miami-Dade' },
  '33141': { status: 'coming_soon',  city: 'Miami Beach',       county: 'Miami-Dade' },
  '33154': { status: 'coming_soon',  city: 'Surfside / Bal Harbour', county: 'Miami-Dade' },

  // ── COMING SOON: Miami-Dade ──────────────────────────────
  '33139': { status: 'coming_soon',  city: 'South Beach',       county: 'Miami-Dade' },
  '33140': { status: 'coming_soon',  city: 'Mid-Beach',         county: 'Miami-Dade' },
  '33132': { status: 'coming_soon',  city: 'Downtown Miami',    county: 'Miami-Dade' },
  '33131': { status: 'coming_soon',  city: 'Brickell',          county: 'Miami-Dade' },
  '33130': { status: 'coming_soon',  city: 'Coconut Grove',     county: 'Miami-Dade' },
  '33133': { status: 'coming_soon',  city: 'Coconut Grove',     county: 'Miami-Dade' },
  '33134': { status: 'coming_soon',  city: 'Coral Gables',      county: 'Miami-Dade' },
  '33146': { status: 'coming_soon',  city: 'Coral Gables',      county: 'Miami-Dade' },
  '33143': { status: 'coming_soon',  city: 'South Miami',       county: 'Miami-Dade' },
  '33176': { status: 'coming_soon',  city: 'Kendall',           county: 'Miami-Dade' },
  '33155': { status: 'coming_soon',  city: 'Westchester',       county: 'Miami-Dade' },
  '33165': { status: 'coming_soon',  city: 'Miami (West)',      county: 'Miami-Dade' },
  '33174': { status: 'coming_soon',  city: 'Miami (West)',      county: 'Miami-Dade' },
  '33175': { status: 'coming_soon',  city: 'Fountainebleau',    county: 'Miami-Dade' },
  '33125': { status: 'coming_soon',  city: 'Little Havana',     county: 'Miami-Dade' },
  '33126': { status: 'coming_soon',  city: 'Miami (NW)',        county: 'Miami-Dade' },
  '33127': { status: 'coming_soon',  city: 'Wynwood / Edgewater', county: 'Miami-Dade' },
  '33128': { status: 'coming_soon',  city: 'Downtown Miami',    county: 'Miami-Dade' },
  '33129': { status: 'coming_soon',  city: 'Miami',             county: 'Miami-Dade' },
  '33135': { status: 'coming_soon',  city: 'Little Havana',     county: 'Miami-Dade' },
  '33136': { status: 'coming_soon',  city: 'Miami',             county: 'Miami-Dade' },
  '33137': { status: 'coming_soon',  city: 'Miami',             county: 'Miami-Dade' },
  '33142': { status: 'coming_soon',  city: 'Miami',             county: 'Miami-Dade' },
  '33144': { status: 'coming_soon',  city: 'Miami',             county: 'Miami-Dade' },
  '33145': { status: 'coming_soon',  city: 'Miami',             county: 'Miami-Dade' },
  '33147': { status: 'coming_soon',  city: 'Miami',             county: 'Miami-Dade' },
  '33150': { status: 'coming_soon',  city: 'Miami',             county: 'Miami-Dade' },
  '33157': { status: 'coming_soon',  city: 'Cutler Bay',        county: 'Miami-Dade' },
  '33158': { status: 'coming_soon',  city: 'Palmetto Bay',      county: 'Miami-Dade' },
  '33173': { status: 'coming_soon',  city: 'Kendale Lakes',     county: 'Miami-Dade' },
  '33177': { status: 'coming_soon',  city: 'Cutler Bay',        county: 'Miami-Dade' },
  '33180': { status: 'coming_soon',  city: 'Aventura',          county: 'Miami-Dade' },
  '33181': { status: 'coming_soon',  city: 'North Miami',       county: 'Miami-Dade' },
  '33183': { status: 'coming_soon',  city: 'Kendall',           county: 'Miami-Dade' },
  '33186': { status: 'coming_soon',  city: 'Kendall',           county: 'Miami-Dade' },
  '33187': { status: 'coming_soon',  city: 'Kendall',           county: 'Miami-Dade' },
  '33189': { status: 'coming_soon',  city: 'Perrine',           county: 'Miami-Dade' },
  '33190': { status: 'coming_soon',  city: 'Homestead',         county: 'Miami-Dade' },
  '33193': { status: 'coming_soon',  city: 'Kendall',           county: 'Miami-Dade' },
  '33194': { status: 'coming_soon',  city: 'Sweetwater',        county: 'Miami-Dade' },

  // ── COMING SOON: Broward County ──────────────────────────
  '33004': { status: 'coming_soon',  city: 'Dania Beach',       county: 'Broward' },
  '33009': { status: 'coming_soon',  city: 'Hallandale Beach',  county: 'Broward' },
  '33010': { status: 'coming_soon',  city: 'Hialeah',           county: 'Miami-Dade' },
  '33012': { status: 'coming_soon',  city: 'Hialeah',           county: 'Miami-Dade' },
  '33013': { status: 'coming_soon',  city: 'Hialeah',           county: 'Miami-Dade' },
  '33014': { status: 'coming_soon',  city: 'Miami Lakes',       county: 'Miami-Dade' },
  '33016': { status: 'coming_soon',  city: 'Hialeah',           county: 'Miami-Dade' },
  '33018': { status: 'coming_soon',  city: 'Hialeah Gardens',   county: 'Miami-Dade' },
  '33019': { status: 'coming_soon',  city: 'Hollywood',         county: 'Broward' },
  '33020': { status: 'coming_soon',  city: 'Hollywood',         county: 'Broward' },
  '33021': { status: 'coming_soon',  city: 'Hollywood',         county: 'Broward' },
  '33023': { status: 'coming_soon',  city: 'Pembroke Park',     county: 'Broward' },
  '33024': { status: 'coming_soon',  city: 'Pembroke Pines',    county: 'Broward' },
  '33025': { status: 'coming_soon',  city: 'Miramar',           county: 'Broward' },
  '33026': { status: 'coming_soon',  city: 'Pembroke Pines',    county: 'Broward' },
  '33027': { status: 'coming_soon',  city: 'Miramar',           county: 'Broward' },
  '33029': { status: 'coming_soon',  city: 'Miramar',           county: 'Broward' },
  '33060': { status: 'coming_soon',  city: 'Pompano Beach',     county: 'Broward' },
  '33062': { status: 'coming_soon',  city: 'Pompano Beach',     county: 'Broward' },
  '33063': { status: 'coming_soon',  city: 'Coconut Creek',     county: 'Broward' },
  '33064': { status: 'coming_soon',  city: 'Pompano Beach',     county: 'Broward' },
  '33068': { status: 'coming_soon',  city: 'Margate',           county: 'Broward' },
  '33069': { status: 'coming_soon',  city: 'Pompano Beach',     county: 'Broward' },
  '33071': { status: 'coming_soon',  city: 'Coral Springs',     county: 'Broward' },
  '33073': { status: 'coming_soon',  city: 'Coconut Creek',     county: 'Broward' },
  '33076': { status: 'coming_soon',  city: 'Parkland',          county: 'Broward' },
  '33309': { status: 'coming_soon',  city: 'Fort Lauderdale',   county: 'Broward' },
  '33311': { status: 'coming_soon',  city: 'Fort Lauderdale',   county: 'Broward' },
  '33312': { status: 'coming_soon',  city: 'Fort Lauderdale',   county: 'Broward' },
  '33314': { status: 'coming_soon',  city: 'Fort Lauderdale',   county: 'Broward' },
  '33315': { status: 'coming_soon',  city: 'Fort Lauderdale',   county: 'Broward' },
  '33316': { status: 'coming_soon',  city: 'Fort Lauderdale',   county: 'Broward' },
  '33317': { status: 'coming_soon',  city: 'Plantation',        county: 'Broward' },
  '33319': { status: 'coming_soon',  city: 'Tamarac',           county: 'Broward' },
  '33322': { status: 'coming_soon',  city: 'Sunrise',           county: 'Broward' },
  '33324': { status: 'coming_soon',  city: 'Davie',             county: 'Broward' },
  '33325': { status: 'coming_soon',  city: 'Weston',            county: 'Broward' },
  '33326': { status: 'coming_soon',  city: 'Weston',            county: 'Broward' },
  '33328': { status: 'coming_soon',  city: 'Davie',             county: 'Broward' },
  '33330': { status: 'coming_soon',  city: 'Southwest Ranches', county: 'Broward' },
  '33331': { status: 'coming_soon',  city: 'Weston',            county: 'Broward' },
  '33334': { status: 'coming_soon',  city: 'Fort Lauderdale',   county: 'Broward' },
  '33388': { status: 'coming_soon',  city: 'Plantation',        county: 'Broward' },
  '33394': { status: 'coming_soon',  city: 'Fort Lauderdale',   county: 'Broward' },
}

export function lookupZip(zip: string): ZipEntry {
  const entry = ZIP_LOOKUP[zip.trim()]
  if (entry) return entry
  // Any 5-digit Florida zip not in the table is unserved
  return { status: 'unserved', city: 'your area', county: 'Florida' }
}

// Copy config per status — controls form headline, CTA, and success message
export const ZIP_STATUS_COPY = {
  live: {
    eyebrow:     'WE\'RE BOOKING IN YOUR AREA',
    headline:    'Secure Your Spot.',
    subhead:     'NORTH MIAMI BEACH // EARLY ACCESS',
    cta:         'CLAIM MY EARLY ACCESS SPOT',
    successH:    'You\'re on the list.',
    successBody: 'We\'ll notify you the moment we\'re taking appointments in your area.',
  },
  coming_soon: {
    eyebrow:     'COMING TO YOUR AREA SOON',
    headline:    'Get First Access.',
    subhead:     '{city} // COMING SOON',
    cta:         'NOTIFY ME WHEN WE\'RE BOOKING',
    successH:    'You\'re first in line.',
    successBody: 'You\'ll be the first to know when ClearScope launches in {city}.',
  },
  unserved: {
    eyebrow:     'YOU\'RE THE FIRST IN YOUR AREA',
    headline:    'Put Your Area on the Map.',
    subhead:     '{city} // NOT YET SERVED',
    cta:         'FLAG MY AREA AS HIGH DEMAND',
    successH:    'Your ZIP is on our radar.',
    successBody: 'We track every unserved signup. When enough demand builds in {city}, it becomes our next market.',
  },
} as const
