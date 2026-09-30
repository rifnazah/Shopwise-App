import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import Field from '../components/Field.jsx'
import { useAuth } from '../auth.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Enter your password.'
    setErrors(next)
    setFormError('')
    if (Object.keys(next).length) return
    try {
      login(form)
      navigate('/dashboard')
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your store."
      footer={<>New here? <Link to="/register">Create an account</Link></>}
    >
      <form onSubmit={submit} noValidate>
        {formError && <div className="alert" role="alert">{formError}</div>}
        <Field id="email" name="email" label="Email" type="email" autoComplete="email"
          value={form.email} onChange={change} error={errors.email} />
        <Field id="password" name="password" label="Password" type="password" autoComplete="current-password"
          value={form.password} onChange={change} error={errors.password} />
        <button className="btn" type="submit">Log in</button>
      </form>
    </AuthLayout>
  )
}
