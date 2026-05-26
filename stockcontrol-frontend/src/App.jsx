import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import './App.css'

const API_URL = 'http://localhost:5284/api'
const TOKEN_KEY = 'stockcontrol_token'

function createApi(token) {
  return axios.create({
    baseURL: API_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
}

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data } = await createApi().post('/auth/login', { email, password })
      onLogin(data)
      navigate('/', { replace: true })
    } catch (err) {
      const message =
        err.response?.data?.message ?? 'Nao foi possivel entrar. Confira seus dados.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="login-title">
        <div>
          <p className="eyebrow">StockControl</p>
          <h1 id="login-title">Entrar no sistema</h1>
          <p className="support-text">
            Acesse com seu email e senha para gerenciar produtos e movimentacoes.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
              minLength={6}
              required
            />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </section>
    </main>
  )
}

function DashboardPage({ auth, onLogout }) {
  const api = useMemo(() => createApi(auth.token), [auth.token])
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get('/products')
        setProducts(data)
      } catch {
        setError('Nao foi possivel carregar os produtos agora.')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [api])

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">StockControl</p>
          <h1>Produtos</h1>
        </div>
        <div className="user-actions">
          <span>{auth.name || auth.email}</span>
          <button type="button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </header>

      <section className="products-section" aria-live="polite">
        {isLoading && <p className="muted">Carregando produtos...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && products.length === 0 && (
          <p className="muted">Nenhum produto cadastrado ainda.</p>
        )}
        {products.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Preco</th>
                  <th>Qtd.</th>
                  <th>Min.</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                      {Number(product.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.minQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

function App() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    const user = localStorage.getItem('stockcontrol_user')
    return token ? { token, ...(user ? JSON.parse(user) : {}) } : null
  })

  function handleLogin(data) {
    const nextAuth = {
      token: data.token,
      name: data.name,
      email: data.email,
    }

    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem('stockcontrol_user', JSON.stringify(nextAuth))
    setAuth(nextAuth)
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem('stockcontrol_user')
    setAuth(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute token={auth?.token}>
              <DashboardPage auth={auth} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
