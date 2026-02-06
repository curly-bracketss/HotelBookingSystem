import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Form from './components/Form.jsx'
import Table from './components/Table.jsx'
import Summary from './components/Summary.jsx'
import heroImage from './assets/hotel.jpg'
import {
  applyMealChange,
  BOARD_TYPES,
  buildPricing,
  CITIZENSHIPS,
  DESTINATIONS,
  ensureSelections,
  getDestinationName,
  HOTELS_BY_DESTINATION,
  MEAL_OPTIONS,
  formatDate,
  getDates,
} from '../service/Data.jsx'

function App() {
  const today = new Date().toISOString().slice(0, 10)
  const [citizenship, setCitizenship] = useState('')
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [days, setDays] = useState(3)
  const [boardType, setBoardType] = useState('FB')
  const [dailySelections, setDailySelections] = useState([])

  const dateList = useMemo(() => getDates(startDate, Number(days)), [startDate, days])
  const hotels = destination ? HOTELS_BY_DESTINATION[destination] : []
  const destinationName = destination ? getDestinationName(destination) : ''

  useEffect(() => {
    if (startDate && startDate < today) {
      setStartDate(today)
    }
  }, [startDate, today])

  const isFormComplete = Boolean(citizenship && destination && startDate && days > 0 && boardType)

  useEffect(() => {
    setDailySelections((prev) => ensureSelections(prev, dateList, boardType, hotels))
  }, [dateList, boardType, destination])

  const updateMeal = (date, field, value) => {
    setDailySelections((prev) =>
      prev.map((item) => {
        if (item.date !== date) return item
        return applyMealChange(item, boardType, field, value)
      })
    )
  }

  const updateHotel = (date, value) => {
    setDailySelections((prev) =>
      prev.map((item) => (item.date === date ? { ...item, hotelId: value } : item))
    )
  }

  const pricing = buildPricing(dailySelections, hotels, MEAL_OPTIONS)

  const grandTotal = pricing.reduce((sum, item) => sum + item.total, 0)

  const validationMessages = [
    !citizenship && 'Select your citizenship.',
    !destination && 'Choose a destination country.',
    !startDate && 'Pick a start date.',
    startDate && startDate < today && 'Start date cannot be in the past.',
    (!days || days < 1) && 'Number of days must be at least 1.',
  ].filter(Boolean)

  return (
    <div className="app-shell">
      <Navbar />

      <div className="content-shell">
        <aside className="sidebar">
          <div className="sidebar-section">
            <p className="sidebar-title">Services</p>
            <button className="sidebar-item active" type="button">
              Hotels
            </button>
            <button className="sidebar-item" type="button">
              Flights
            </button>
            <button className="sidebar-item" type="button">
              Trains
            </button>
            <button className="sidebar-item" type="button">
              Airport transfers
            </button>
            <button className="sidebar-item" type="button">
              Tours & tickets
            </button>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-title">Rewards</p>
            <div className="sidebar-card">
              <p>Join Triply Rewards to unlock member-only pricing.</p>
              <button className="outline-button" type="button">Join now</button>
            </div>
          </div>
        </aside>

        <main className="main">
          <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1>Your journey starts here</h1>
              <p>Book stays with transparent pricing, curated meals, and flexible daily planning.</p>
              <div className="hero-tags">
                <span>Secure payments</span>
                <span>Fast support</span>
                <span>Real-time pricing</span>
              </div>
            </div>

            <div className="tab-row">
              <button className="tab active" type="button">Hotels</button>
              <button className="tab" type="button">Flights</button>
              <button className="tab" type="button">Trains</button>
              <button className="tab" type="button">Transfers</button>
            </div>

            <div className="search-card">
              <Form
                citizenship={citizenship}
                destination={destination}
                startDate={startDate}
                days={days}
                boardType={boardType}
                minStartDate={today}
                countries={CITIZENSHIPS}
                destinations={DESTINATIONS}
                boardTypes={BOARD_TYPES}
                onCitizenshipChange={setCitizenship}
                onDestinationChange={setDestination}
                onStartDateChange={setStartDate}
                onDaysChange={setDays}
                onBoardTypeChange={setBoardType}
                validationMessages={validationMessages}
              />
            </div>
          </section>

          <section className="content-grid">
            <div className="panel">
              <Table
                dates={dateList}
                selections={dailySelections}
                boardType={boardType}
                hotels={hotels}
                mealOptions={MEAL_OPTIONS}
                onHotelChange={updateHotel}
                onMealChange={updateMeal}
                isFormComplete={isFormComplete}
              />
            </div>

            <div className="panel">
              <Summary
                citizenship={citizenship}
                destination={destinationName}
                startDate={startDate}
                days={days}
                boardType={boardType}
                dates={dateList}
                selections={dailySelections}
                pricing={pricing}
                grandTotal={grandTotal}
                formatDate={formatDate}
                isFormComplete={isFormComplete}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
