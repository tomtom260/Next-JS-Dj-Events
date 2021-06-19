/* eslint-disable import/no-anonymous-default-export */
import events from './data.json'

export default (req, res) => {
  console.log(req)
  if (req.method === 'GET') {
    const { 0: event } = events.filter(evt => {
      return evt.slug === req.query.slug
    })
    return res.status(200).json(event)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({
      status: 'fail',
      message: `method ${req.method} is not allowed`,
    })
  }
}
