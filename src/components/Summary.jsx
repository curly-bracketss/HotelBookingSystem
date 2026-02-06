import React from 'react'

export default function Summary({
  citizenship,
  destination,
  startDate,
  days,
  boardType,
  dates,
  pricing,
  grandTotal,
  formatDate,
  isFormComplete,
}) {
  return (
    <div className="summary">
      <div className="summary-header">
        <h2>Summary & Pricing</h2>
        <p>Review your configuration, daily selections, and total cost.</p>
      </div>

      {!isFormComplete && (
        <div className="summary-empty">
          <p>Complete the trip configuration to view the summary.</p>
        </div>
      )}

      {isFormComplete && (
        <>
          <section className="summary-section">
            <h3>Configuration Summary</h3>
            <div className="summary-grid">
              <div>
                <span>Citizenship</span>
                <strong>{citizenship}</strong>
              </div>
              <div>
                <span>Destination</span>
                <strong>{destination || 'Not selected'}</strong>
              </div>
              <div>
                <span>Dates</span>
                <strong>
                  {formatDate(startDate)} · {days} day{Number(days) > 1 ? 's' : ''}
                </strong>
              </div>
              <div>
                <span>Board Type</span>
                <strong>{boardType}</strong>
              </div>
            </div>
          </section>

          <section className="summary-section">
            <h3>Daily Selections</h3>
            <div className="summary-list">
              {dates.map((date) => {
                const day = pricing.find((item) => item.date === date)
                if (!day) return null
                return (
                  <div key={date} className="summary-item">
                    <div>
                      <strong>{formatDate(date)}</strong>
                      <p>Hotel: {day.hotel}</p>
                    </div>
                    <div>
                      <p>Lunch: {day.lunch}</p>
                      <p>Dinner: {day.dinner}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="summary-section">
            <h3>Total Price Calculation</h3>
            <div className="price-table">
              <div className="price-row header">
                <span>Date</span>
                <span>Hotel</span>
                <span>Meals</span>
                <span>Total</span>
              </div>
              {pricing.map((day) => (
                <div key={day.date} className="price-row">
                  <span>{formatDate(day.date)}</span>
                  <span>
                    {day.hotel} · ${day.hotelPrice}
                  </span>
                  <span>
                    {day.lunchPrice + day.dinnerPrice > 0
                      ? `$${day.lunchPrice + day.dinnerPrice}`
                      : 'No meals'}
                  </span>
                  <span>${day.total}</span>
                </div>
              ))}
              <div className="price-row total">
                <span>Grand Total</span>
                <span></span>
                <span></span>
                <span>${grandTotal}</span>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
