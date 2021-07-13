const { API_URL } = require('@/config/index')
import cookie from 'cookie'

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({
      status: 'error',
      message: `Invalid Http Method ${req.method}`,
    })
  }

  const { password, email: identifier } = req.body
  const strapiRes = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  })

  const user = await strapiRes.json()

  if (!strapiRes.ok) {
    return res.status(400).json({
      status: 'error',
      message: user.data[0].messages[0].message,
    })
  }

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', user.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      maxAge: 60 * 60 * 7 * 24,
      path: '/',
    })
  )
  res.status(200).json({
    status: 'success',
    user,
  })
}
