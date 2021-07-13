const cookie = require('cookie')

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({
      status: 'fail',
      message: `request method ${req.method} not allowed`,
    })
  }

  res.setHeader(
    'Set-Cookie',
    cookie.serialize(
      'token',
      {},
      {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: new Date(0),
        path: '/',
      }
    )
  )
  res.status(200).json({
    status: 'success',
  })
}
