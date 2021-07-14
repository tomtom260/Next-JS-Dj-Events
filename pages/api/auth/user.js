import { API_URL } from '@/config/index'
import cookie from 'cookie'

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({
      status: 'fail',
      message: `Invalid Http Method ${req.method}`,
    })
  }

  if (!req.headers.cookie) {
    return res.status(403).json({
      status: 'fail',
      message: 'Forbidden',
    })
  }
  const { token } = cookie.parse(req.headers.cookie)

  const strapiRes = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await strapiRes.json()
  if (!strapiRes.ok) {
    return res.status(403).json({
      status: 'fil',
      message: 'Forbidden',
    })
  }

  res.status(200).json({
    status: 'success',
    user,
  })
}
