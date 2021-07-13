import { useState, useEffect, useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthForm from '@/components/AuthForm'
import { AuthContext } from '@/context/Auth'

function Register() {
  const [error, setError] = useState(null)
  const { register } = useContext(AuthContext)

  const handleSubmit = (setError, AuthInfo) => {
    if (AuthInfo.password !== AuthInfo.passwordConfirm)
      return setError('Passwords do not Match')
    register(AuthInfo)
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
          formItems={['username', 'email', 'password', 'passwordConfirm']}
        />
      </div>
    </>
  )
}

export default Register
