import { useState } from 'react'

export default function Field({ label, id, error, type = 'text', ...rest }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          type={isPassword && show ? 'text' : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          {...rest}
        />
        {isPassword && (
          <button type="button" className="toggle" onClick={() => setShow((s) => !s)}>
            {show ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && <span id={`${id}-err`} className="error">{error}</span>}
    </div>
  )
}
