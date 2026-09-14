export const COLORS = [
  { id: 'lime', name: 'Lime', hex: '#C8FF3D' },
  { id: 'sky', name: 'Sky', hex: '#3EC8FF' },
  { id: 'sunset', name: 'Sunset', hex: '#FF6B1A' },
  { id: 'stone', name: 'Stone', hex: '#C9C6C0' },
  { id: 'pink', name: 'Neon Pink', hex: '#FF4BA3' },
  { id: 'black', name: 'Black', hex: '#1A1A1A' },
]

export const products = [
  {
    id: 'lime-pack',
    name: 'Lime Pack',
    subtitle: 'Mix set · 12 pieces',
    type: 'colour',
    color: 'lime',
    price: 18,
    image: '/images/pack-lime.jpg',
    gallery: ['/images/pack-lime.jpg', '/images/lifestyle-apply.jpg', '/images/lifestyle-leggings.jpg'],
    shapes: ['star', 'circle', 'wave', 'pill'],
    description:
      'A graphic mix of stars, bars, circles and waves in high-voltage lime. Stick it. Iron it. Wear it after dark.',
  },
  {
    id: 'sky-pack',
    name: 'Sky Pack',
    subtitle: 'Mix set · 12 pieces',
    type: 'colour',
    color: 'sky',
    price: 18,
    image: '/images/pack-sky.jpg',
    gallery: ['/images/pack-sky.jpg', '/images/lifestyle-collar.jpg', '/images/hero-cycle.jpg'],
    shapes: ['star', 'circle', 'wave', 'pill'],
    description:
      'Clear cyan that reads like jewellery on black nylon. Built for commutes, collars, and late rides.',
  },
  {
    id: 'sunset-pack',
    name: 'Sunset Pack',
    subtitle: 'Mix set · 12 pieces',
    type: 'colour',
    color: 'sunset',
    price: 18,
    image: '/images/pack-sunset.jpg',
    gallery: ['/images/pack-sunset.jpg', '/images/hero-dusk.jpg', '/images/lifestyle-run.jpg'],
    shapes: ['star', 'circle', 'wave', 'pill'],
    description:
      'Warm orange that holds its own at golden hour and still flashes white when headlights hit.',
  },
  {
    id: 'stone-pack',
    name: 'Stone Pack',
    subtitle: 'Mix set · 12 pieces',
    type: 'colour',
    color: 'stone',
    price: 18,
    image: '/images/pack-stone.jpg',
    gallery: ['/images/pack-stone.jpg', '/images/lifestyle-leggings.jpg', '/images/lifestyle-run.jpg'],
    shapes: ['star', 'circle', 'wave', 'pill'],
    description:
      'Quiet silver-grey in daylight. Full retro-reflective punch after dusk. The stealth favourite.',
  },
  {
    id: 'pink-pack',
    name: 'Neon Pink Pack',
    subtitle: 'Mix set · 12 pieces',
    type: 'colour',
    color: 'pink',
    price: 18,
    image: '/images/pack-pink.jpg',
    gallery: ['/images/pack-pink.jpg', '/images/lifestyle-cycle.jpg', '/images/hero-cycle.jpg'],
    shapes: ['star', 'circle', 'wave', 'bang'],
    description:
      'Hot pink punctuation for frames, bags and jackets. Loud in the day, brighter in the beam.',
  },
  {
    id: 'black-pack',
    name: 'Black Pack',
    subtitle: 'Mix set · 12 pieces',
    type: 'colour',
    color: 'black',
    price: 18,
    image: '/images/pack-black.jpg',
    gallery: ['/images/pack-black.jpg', '/images/lifestyle-apply.jpg', '/images/hero-dusk.jpg'],
    shapes: ['star', 'circle', 'wave', 'pill'],
    description:
      'Matte black until light finds it. Then it goes silver. For people who want the graphic, not the hi-vis.',
  },
  {
    id: 'star-set',
    name: 'Star Set',
    subtitle: '4 four-point stars',
    type: 'shape',
    color: 'lime',
    price: 14,
    image: '/images/lifestyle-leggings.jpg',
    gallery: ['/images/lifestyle-leggings.jpg', '/images/lifestyle-apply.jpg', '/images/pack-lime.jpg'],
    shapes: ['star'],
    description:
      'Four-point stars as a graphic mark on tights, jackets and bags. Choose a colour. Repeat as you like.',
  },
  {
    id: 'bar-set',
    name: 'Bar Set',
    subtitle: '6 vertical bars',
    type: 'shape',
    color: 'lime',
    price: 14,
    image: '/images/hero-dusk.jpg',
    gallery: ['/images/hero-dusk.jpg', '/images/lifestyle-run.jpg', '/images/pack-lime.jpg'],
    shapes: ['pill'],
    description:
      'Slim bars for straps, heels and seams. The commute classic — still a fashion line, not a safety stripe.',
  },
  {
    id: 'night-run-kit',
    name: 'Night Run Kit',
    subtitle: 'Bars + stars · 10 pieces',
    type: 'kit',
    color: 'stone',
    price: 24,
    image: '/images/lifestyle-run.jpg',
    gallery: ['/images/lifestyle-run.jpg', '/images/lifestyle-leggings.jpg', '/images/pack-stone.jpg'],
    shapes: ['pill', 'star'],
    description:
      'A tight edit for shoes, tights and jackets. Stone by default, colour-switchable. Made for movement after six.',
  },
]

export const getProduct = (id) => products.find((p) => p.id === id)
export const getColor = (id) => COLORS.find((c) => c.id === id)
