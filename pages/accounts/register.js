import { useState, useEffect, useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthForm from '@/components/AuthForm'
import { AuthContext } from '@/context/Auth'
import { useRouter } from 'next/router'

function Register() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const { register } = useContext(AuthContext)

  const handleSubmit = async (setError, AuthInfo) => {
    if (AuthInfo.password !== AuthInfo.passwordConfirm)
      return setError('Passwords do not Match')
    if (await register(AuthInfo, setError)) router.push('/accounts/dashboard')
  }

  useEffect(() => {
    error && toast.error(error)
    setError(null)
  }, [error])

  return (
    <>
      <ToastContainer hideProgressBar />
      <div>
        <AuthForm
          handleSubmit={handleSubmit.bind(null, setError)}
          formItems={['email', 'username', 'password', 'passwordConfirm']}
        />
      </div>
    </>
  )
}

export default Register
