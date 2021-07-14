import AuthForm from '@/components/AuthForm'
import Layout from '@/components/Layout'
import { AuthContext } from '@/context/Auth'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const { login } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    error && toast.error(error)
    setError(null)
  }, [error])

  const handleSubmit = async AuthInfo => {
    if (await login(AuthInfo, setError)) router.push('/accounts/dashboard')
  }

  return (
    <Layout>
      <ToastContainer hideProgressBar />
      <div>
        <AuthForm
          handleSubmit={handleSubmit}
          formItems={['email', 'password']}
        />
      </div>
    </Layout>
  )
}

export default Login
