/* eslint-disable import/no-anonymous-default-export */
import fs from 'fs'
import path from 'path'

export default (req, res) => {
  if (req.method === 'GET') {
    const events = fs.readFileSync(
      path.join(process.cwd(), '/pages/api/events/data.json')
    )
    return res.status(200).json(events)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({
      status: 'fail',
      message: `method ${req.method} is not allowed`,
    })
  }
}
