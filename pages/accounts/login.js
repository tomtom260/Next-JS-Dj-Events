import AuthForm from '@/components/AuthForm'
import { AuthContext } from '@/context/Auth'
import { useContext } from 'react'

function Login() {
  const { login } = useContext(AuthContext)

  const handleSubmit = AuthInfo => {
    login(AuthInfo)
  }

  return (
    <div>
      <AuthForm handleSubmit={handleSubmit} formItems={['email', 'password']} />
    </div>
  )
}

export default Login
