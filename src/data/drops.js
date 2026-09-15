export const drops = [
  {
    id: '2026-06',
    name: 'Quiet Hours',
    color: 'stone',
    stickerSet: 'Stars + waves',
    shapes: ['star', 'wave'],
    images: ['/images/pack-stone.jpg', '/images/lifestyle-leggings.jpg', '/images/lifestyle-apply.jpg'],
    description:
      'The first club colour was Stone — daylight quiet, night-bright. A set for people who wanted the graphic without the shout.',
    releaseDate: '2026-06-01',
    stockInitial: 80,
    active: false,
  },
  {
    id: '2026-07',
    name: 'After Swim',
    color: 'sky',
    stickerSet: 'Circles + bars',
    shapes: ['circle', 'pill'],
    images: ['/images/pack-sky.jpg', '/images/lifestyle-collar.jpg', '/images/pack-lineup.jpg'],
    description:
      'Sky on collars, bottles and frames. A July set made for late swims, warm asphalt and the ride home.',
    releaseDate: '2026-07-01',
    stockInitial: 80,
    active: false,
  },
  {
    id: '2026-08',
    name: 'Heat Line',
    color: 'sunset',
    stickerSet: 'Bars + waves',
    shapes: ['pill', 'wave'],
    images: ['/images/pack-sunset.jpg', '/images/pack-lineup.jpg', '/images/sticker-detail.jpg'],
    description:
      'Sunset held the last of the summer light. Bars for straps. Waves for anything that already had a curve.',
    releaseDate: '2026-08-01',
    stockInitial: 80,
    active: false,
  },
  {
    id: '2026-09',
    name: 'Night Signal',
    color: 'lime',
    stickerSet: 'Bars + stars',
    shapes: ['pill', 'star'],
    images: ['/images/pack-lime.jpg', '/images/hero-dusk.jpg', '/images/hero-cycle.jpg'],
    description:
      'September’s exclusive is Lime — the colour that reads as a mark, not a warning. Bars for the commute. Stars for the jacket you already wear.',
    releaseDate: '2026-09-01',
    stockInitial: 90,
    active: true,
  },
  {
    id: '2026-10',
    name: 'Pulse',
    color: 'pink',
    stickerSet: 'Bangs + circles',
    shapes: ['bang', 'circle'],
    images: ['/images/pack-pink.jpg', '/images/lifestyle-cycle.jpg', '/images/pack-lineup.jpg'],
    description:
      'October arrives in Neon Pink. Punctuation for frames and bags — the next exclusive, once Night Signal closes.',
    releaseDate: '2026-10-01',
    stockInitial: 90,
    active: false,
  },
]

export function getDrop(id) {
  return drops.find((d) => d.id === id)
}

export function getCurrentDrop(now = new Date()) {
  const released = drops
    .filter((d) => parseDropDate(d.releaseDate) <= now)
    .sort((a, b) => parseDropDate(b.releaseDate) - parseDropDate(a.releaseDate))
  const live = released.find((d) => d.active) || released[0]
  return live || null
}

export function getArchiveDrops(now = new Date()) {
  const current = getCurrentDrop(now)
  return drops
    .filter((d) => parseDropDate(d.releaseDate) <= now && d.id !== current?.id)
    .sort((a, b) => parseDropDate(b.releaseDate) - parseDropDate(a.releaseDate))
}

export function getUpcomingDrop(now = new Date()) {
  return drops
    .filter((d) => parseDropDate(d.releaseDate) > now)
    .sort((a, b) => parseDropDate(a.releaseDate) - parseDropDate(b.releaseDate))[0] || null
}

function parseDropDate(value) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}
