export const CITIZENSHIPS = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'United Arab Emirates',
  'Japan',
]

export const DESTINATIONS = [
  { id: 'es', name: 'Spain' },
  { id: 'it', name: 'Italy' },
  { id: 'th', name: 'Thailand' },
  { id: 'pt', name: 'Portugal' },
]

export const BOARD_TYPES = [
  { id: 'FB', label: 'Full Board (Lunch + Dinner)' },
  { id: 'HB', label: 'Half Board (Lunch or Dinner)' },
  { id: 'NB', label: 'No Board (Meals not included)' },
]

export const HOTELS_BY_DESTINATION = {
  es: [
    { id: 'es-coast', name: 'Costa Azul Resort', price: 140 },
    { id: 'es-heritage', name: 'Heritage Plaza Hotel', price: 125 },
    { id: 'es-boutique', name: 'Seville Boutique House', price: 110 },
  ],
  it: [
    { id: 'it-lake', name: 'Lakeview Palazzo', price: 165 },
    { id: 'it-terrace', name: 'Terrace Roma', price: 150 },
    { id: 'it-olive', name: 'Olive Grove Inn', price: 120 },
  ],
  th: [
    { id: 'th-river', name: 'River Lotus Retreat', price: 95 },
    { id: 'th-sky', name: 'Bangkok Skyline Hotel', price: 110 },
    { id: 'th-sands', name: 'Phuket Sands Villa', price: 135 },
  ],
  pt: [
    { id: 'pt-harbor', name: 'Lisbon Harbor Stay', price: 130 },
    { id: 'pt-cliff', name: 'Cliffline Algarve', price: 145 },
    { id: 'pt-vine', name: 'Vineyard Estate', price: 115 },
  ],
}

export const MEAL_OPTIONS = {
  lunch: [
    { id: 'none', label: 'No lunch', price: 0 },
    { id: 'standard', label: 'Standard lunch', price: 18 },
    { id: 'local', label: 'Local tasting lunch', price: 28 },
  ],
  dinner: [
    { id: 'none', label: 'No dinner', price: 0 },
    { id: 'standard', label: 'Standard dinner', price: 24 },
    { id: 'chef', label: "Chef's table dinner", price: 38 },
  ],
}

export const formatDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00')
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export const getDates = (startDate, days) => {
  if (!startDate || !days) return []
  const start = new Date(startDate + 'T00:00:00')
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date.toISOString().slice(0, 10)
  })
}

export const getDestinationName = (destinationId) =>
  DESTINATIONS.find((place) => place.id === destinationId)?.name || ''

export const ensureSelections = (previousSelections, dateList, boardType, hotels) => {
  const previousMap = new Map(previousSelections.map((item) => [item.date, item]))
  const validHotelIds = new Set(hotels.map((hotel) => hotel.id))

  return dateList.map((date) => {
    const existing = previousMap.get(date)
    const base = existing
      ? { ...existing }
      : { date, hotelId: '', lunch: 'none', dinner: 'none' }

    if (!validHotelIds.has(base.hotelId)) {
      base.hotelId = ''
    }

    if (boardType === 'NB') {
      base.lunch = 'none'
      base.dinner = 'none'
    }

    if (boardType === 'HB' && base.lunch !== 'none' && base.dinner !== 'none') {
      base.dinner = 'none'
    }

    return base
  })
}

export const applyMealChange = (selection, boardType, field, value) => {
  const next = { ...selection, [field]: value }

  if (boardType === 'HB') {
    if (field === 'lunch' && value !== 'none') {
      next.dinner = 'none'
    }
    if (field === 'dinner' && value !== 'none') {
      next.lunch = 'none'
    }
  }

  if (boardType === 'NB') {
    next.lunch = 'none'
    next.dinner = 'none'
  }

  return next
}

export const buildPricing = (selections, hotels, mealOptions) =>
  selections.map((selection) => {
    const hotel = hotels.find((item) => item.id === selection.hotelId)
    const lunch = mealOptions.lunch.find((item) => item.id === selection.lunch)
    const dinner = mealOptions.dinner.find((item) => item.id === selection.dinner)

    const hotelPrice = hotel ? hotel.price : 0
    const lunchPrice = lunch ? lunch.price : 0
    const dinnerPrice = dinner ? dinner.price : 0
    const total = hotelPrice + lunchPrice + dinnerPrice

    return {
      date: selection.date,
      hotel: hotel ? hotel.name : 'No hotel selected',
      hotelPrice,
      lunch: lunch ? lunch.label : 'No lunch',
      lunchPrice,
      dinner: dinner ? dinner.label : 'No dinner',
      dinnerPrice,
      total,
    }
  })
