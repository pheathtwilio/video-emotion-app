import type { NextApiRequest, NextApiResponse } from 'next'
import { jwt } from 'twilio'

const { AccessToken } = jwt;
const VideoGrant = AccessToken.VideoGrant;

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const { roomName } = req.body

  if (!roomName) {
    res.status(400).json({ error: 'Room name is required' })
    return
  }

  try {
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_API_KEY!,
      process.env.TWILIO_API_SECRET!,
      {identity: `user-${Math.random().toString(36).substring(7)}`}
    )

    // Generate a unique identity
    token.identity = `user-${Math.random().toString(36).substring(7)}`

    // Add a Video grant to the token
    const videoGrant = new VideoGrant({ room: roomName })
    token.addGrant(videoGrant)

    res.status(200).json({ token: token.toJwt() })
  } catch (err) {
    console.error('Error generating Twilio token:', err)
    res.status(500).json({ error: 'Failed to generate Twilio token' })
  }
}