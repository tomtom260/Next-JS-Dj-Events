import { useReducer } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/authForm.module.css'
import { FaUser } from 'react-icons/fa'

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

const inputType = item => {
  switch (item) {
    case 'password':
    case 'passwordConfirm':
      return 'password'

    case 'email':
      return 'email'
    default:
      return 'text'
  }
}

function AuthForm({ formItems, handleSubmit }) {
  const router = useRouter()

  const initialState = {}
  formItems.forEach(item => {
    initialState[item] = ''
  })

  const [state, dispatch] = useReducer(reducer, initialState)
  let path
  router.pathname.includes('login') ? (path = 'login') : (path = 'register')

  return (
    <div className={styles.auth}>
      <h1>
        <FaUser /> {path === 'login' ? 'Login' : 'Register'}
      </h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(state)
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
          <input
            type='submit'
            className='btn'
            value={path === 'register' ? 'Register' : 'Login'}
          />
        </>
      </form>
    </div>
  )
}

export default AuthForm
