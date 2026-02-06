import React from 'react'

const formatDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00')
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export default function Table({
  dates,
  selections,
  boardType,
  hotels,
  mealOptions,
  onHotelChange,
  onMealChange,
  isFormComplete,
}) {
  return (
    <div className="table">
      <div className="table-header">
        <div>
          <h2>Daily Configuration</h2>
          <p>Pick a hotel and meals for each day. Board rules are enforced automatically.</p>
        </div>
        <span className="chip">Board: {boardType}</span>
      </div>

      {!isFormComplete && (
        <div className="table-empty">
          <p>Complete the trip configuration to generate daily rows.</p>
        </div>
      )}

      {isFormComplete && dates.length === 0 && (
        <div className="table-empty">
          <p>Add a start date and number of days to see the planner.</p>
        </div>
      )}

      {isFormComplete && dates.length > 0 && (
        <div className="table-grid">
          {dates.map((date) => {
            const selection = selections.find((item) => item.date === date)
            const lunchDisabled =
              boardType === 'NB' || (boardType === 'HB' && selection?.dinner !== 'none')
            const dinnerDisabled =
              boardType === 'NB' || (boardType === 'HB' && selection?.lunch !== 'none')

            return (
              <div key={date} className="table-row">
                <div className="table-date">
                  <p className="table-day">{formatDate(date)}</p>
                  <span>{date}</span>
                </div>

                <label>
                  <span>Hotel</span>
                  <select
                    value={selection?.hotelId || ''}
                    onChange={(event) => onHotelChange(date, event.target.value)}
                  >
                    <option value="">Select hotel</option>
                    {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} · ${hotel.price}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Lunch</span>
                  <select
                    value={selection?.lunch || 'none'}
                    onChange={(event) => onMealChange(date, 'lunch', event.target.value)}
                    disabled={lunchDisabled}
                  >
                    {mealOptions.lunch.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label} · ${option.price}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Dinner</span>
                  <select
                    value={selection?.dinner || 'none'}
                    onChange={(event) => onMealChange(date, 'dinner', event.target.value)}
                    disabled={dinnerDisabled}
                  >
                    {mealOptions.dinner.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label} · ${option.price}
                      </option>
                    ))}
                  </select>
                </label>

                {boardType === 'HB' && (
                  <p className="helper">Half Board: select lunch or dinner only.</p>
                )}
                {boardType === 'NB' && (
                  <p className="helper">No Board: meals are disabled.</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
