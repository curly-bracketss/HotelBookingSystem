import React from 'react'

export default function Form({
  citizenship,
  destination,
  startDate,
  days,
  boardType,
  minStartDate,
  countries,
  destinations,
  boardTypes,
  onCitizenshipChange,
  onDestinationChange,
  onStartDateChange,
  onDaysChange,
  onBoardTypeChange,
  validationMessages,
}) {
  return (
    <form className="search-form" onSubmit={(event) => event.preventDefault()}>
      <div className="form-header">
        <div>
          <p className="form-eyebrow">Trip setup</p>
          <h2>Plan your hotel stay</h2>
          <p>Adjust your itinerary details, then configure hotels and meals per day.</p>
        </div>
        <div className="form-badges">
          <span>Secure checkout</span>
          <span>24/7 support</span>
        </div>
      </div>

      {validationMessages.length > 0 && (
        <div className="form-alert">
          <p>Required to continue:</p>
          <ul>
            {validationMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-grid">
        <label className="field">
          <span>Citizenship</span>
          <select value={citizenship} onChange={(event) => onCitizenshipChange(event.target.value)}>
            <option value="">Select citizenship</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Start date</span>
          <input
            type="date"
            value={startDate}
            min={minStartDate}
            onChange={(event) => onStartDateChange(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Number of days</span>
          <input
            type="number"
            min="1"
            max="14"
            value={days}
            onChange={(event) => onDaysChange(event.target.value)}
          />
          <small>1-14 days</small>
        </label>

        <label className="field">
          <span>Destination country</span>
          <select value={destination} onChange={(event) => onDestinationChange(event.target.value)}>
            <option value="">Select destination</option>
            {destinations.map((place) => (
              <option key={place.id} value={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="field">
        <legend>Board type</legend>
        <div className="radio-group">
          {boardTypes.map((board) => (
            <label key={board.id} className="radio">
              <input
                type="radio"
                name="board-type"
                value={board.id}
                checked={boardType === board.id}
                onChange={(event) => onBoardTypeChange(event.target.value)}
              />
              <span>{board.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-actions">
        <button className="search-button" type="button">
          Search stays
        </button>
      </div>
    </form>
  )
}
