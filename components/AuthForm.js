import { useRouter } from 'next/router'
import styles from '@/styles/authForm.module.css'
import { div } from 'prelude-ls'

const reducer = (state, { paylaod, type }) => {
  switch (type) {
    case type: {
      return { ...state, [type]: paylaod }
    }
  }
}

const handleChange = (dispatch, e) => {
  dispatch({
    type: e.target.name,
    payload: e.target.value,
  })
}

function AuthForm(formItems) {
  const router = useRouter()
  const [state, dispatch] = useDispatch(reducer, {})
  let path
  router.pathname.includes(login) ? (path = 'login') : (path = 'register')

  return (
    <div className={styles.auth}>
      <h1>{path === 'login' ? 'Login' : 'Register'}</h1>
      <form>
        {formItems.map(item => {
          return (
            <div key={item}>
              <label htmlFor={`form-${item}`}>
                {item.slice(0, 1).toUpperCase() + item.slice(1)}
              </label>
              <input
                id={`form-${item}`}
                placeholder={item.slice(0, 1).toUpperCase() + item.slice(1)}
                name={item}
                value={state[item]}
                onChange={handleChange}
              />
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default AuthForm
