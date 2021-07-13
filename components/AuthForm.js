import { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/authForm.module.css'
import { FaUser } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const reducer = (state, { payload, type }) => {
  switch (type) {
    case type: {
      return { ...state, [type]: payload }
    }
  }
}

const handleChange = (dispatch, e) => {
  dispatch({
    type: e.target.name,
    payload: e.target.value,
  })
}

const submitHandler = (AuthInfo, setError) => {
  if (AuthInfo.password !== AuthInfo.passwordConfirm)
    return setError('Passwords do not Match')
  console.log(AuthInfo)
}

const inputType = item => {
  switch (item) {
    case 'password':
    case 'passwordConfim':
      return 'password'

    case 'email':
      return 'email'
    default:
      return 'text'
  }
}

function AuthForm({ formItems }) {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [state, dispatch] = useReducer(reducer, {})
  let path
  router.pathname.includes('login') ? (path = 'login') : (path = 'register')

  useEffect(() => {
    error && toast.error(error)
    setError(null)
  }, [error])

  return (
    <>
      <ToastContainer hideProgressBar />
      <div className={styles.auth}>
        <h1>
          <FaUser /> {path === 'login' ? 'Login' : 'Register'}
        </h1>
        <form
          onSubmit={e => {
            e.preventDefault()
            submitHandler(state, setError)
          }}
        >
          <>
            {formItems.map(item => {
              return (
                <div key={item}>
                  <label htmlFor={`form-${item}`}>
                    {item.slice(0, 1).toUpperCase() + item.slice(1)}
                  </label>
                  <input
                    type={inputType(item)}
                    id={`form-${item}`}
                    placeholder={item.slice(0, 1).toUpperCase() + item.slice(1)}
                    name={item}
                    value={state[item]}
                    onChange={e => handleChange(dispatch, e)}
                  />
                </div>
              )
            })}
            <input type='submit' className='btn' value='Login' />
          </>
        </form>
      </div>
    </>
  )
}

export default AuthForm
