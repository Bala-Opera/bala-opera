import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlaiceholder } from "plaiceholder";
import { bucket } from '../../config/server';

const STATUS_CODES = {
  OK: 200,
  BAD_INPUT: 400,
  METHOD_NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
}

// Local Example: http://localhost:3000/api/blur-image?issue=0&file=helen.jpeg&quality=32
// Production Example: https://balaopera.com/api/blur-image?issue=0&file=helen.jpeg&quality=32

export default async function handler(
  request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    try {
      const { query } = request
      const { issue, file, quality } = query
      
      if (!issue || !file)
      return response.status(STATUS_CODES.BAD_INPUT).json({ error: 'Invalid input; required fields: issue, file' })
      
      let size = parseInt(quality as string)
      if (size < 4 || size > 64)
        size = 32 // default to middle

      const src = `${bucket}/images/issues/${issue}/${file}`
      const { base64 } = await getPlaiceholder(src, { size });
      return response.status(STATUS_CODES.OK).json({ data: base64 })
    } catch {
      return response
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "There was an issue converting the image" })
    }
  } else {
    return response.status(STATUS_CODES.METHOD_NOT_ALLOWED).json({ error: 'Unsupported method' })
  }
}
