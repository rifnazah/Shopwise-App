import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Field from '../components/Field.jsx'
import { useAuth } from '../auth.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (form.password.length < 8) e.password = 'Use at least 8 characters.'
    else if (!/\d/.test(form.password)) e.password = 'Include at least one number.'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match.'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    setFormError('')
    if (Object.keys(e).length) return
    try {
      register(form)
      navigate('/dashboard')
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={<>Already registered? <Link to="/login">Log in</Link></>}
    >
      <form onSubmit={submit} noValidate>
        {formError && <div className="alert" role="alert">{formError}</div>}
        <Field id="name" name="name" label="Full name" autoComplete="name"
          value={form.name} onChange={change} error={errors.name} />
        <Field id="email" name="email" label="Email" type="email" autoComplete="email"
          value={form.email} onChange={change} error={errors.email} />
        <Field id="password" name="password" label="Password" type="password" autoComplete="new-password"
          value={form.password} onChange={change} error={errors.password} />
        <Field id="confirm" name="confirm" label="Confirm password" type="password" autoComplete="new-password"
          value={form.confirm} onChange={change} error={errors.confirm} />
        <button className="btn" type="submit">Create account</button>
      </form>
    </AuthLayout>
  )
}
