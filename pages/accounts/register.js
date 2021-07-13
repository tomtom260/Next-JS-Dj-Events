import AuthForm from '@/components/AuthForm'

function Login() {
  return (
    <div>
      <AuthForm
        formItems={['username', 'email', 'password', 'passwordConfirm']}
      />
    </div>
  )
}

export default Login
