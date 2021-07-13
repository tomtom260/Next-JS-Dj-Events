import AuthForm from '@/components/AuthForm'

function Login() {
  return (
    <div>
      <AuthForm formItems={['email', 'password']} />
    </div>
  )
}

export default Login
