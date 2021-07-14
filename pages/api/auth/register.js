const { API_URL } = require('@/config/index')
const cookie = require('cookie')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({
      status: 'fail',
      message: `Access Method ${req.method} not allowed`,
    })
  }

  const { email, username, password } = req.body

  const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  })
  const newUser = await strapiRes.json()

  if (!strapiRes.ok) {
    return res.status(400).json({
      status: 'fail',
      message: newUser.message[0].messages[0].message,
    })
  }

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', newUser.jwt, {
      sameSite: 'lax',
      httpOnly: 'true',
      strict: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 7 * 24,
      path: '/',
    })
  )

  res.status(200).json({
    status: 'success',
    newUser: newUser.user,
  })
}
