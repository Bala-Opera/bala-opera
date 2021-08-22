import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const STATUS_CODES = {
  OK: 200,
  BAD_INPUT: 400,
  METHOD_NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
}
const SPREADSHEET_ID = '1BfEjXQlbBhFhf4X9OBf3HjK0OFO71bpK_6hh2y_Zcy4'

export default async function handler(
  request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    if (!request.body.email) {
      return response.status(STATUS_CODES.BAD_INPUT).json({ error: "Please enter an email" })
    }
    try {
      const { email } = request.body
      const mailingList = new GoogleSpreadsheet(SPREADSHEET_ID)
      await authorizeSpreadsheet(mailingList)
      await addToMailingList(mailingList, email)
      return response.status(STATUS_CODES.OK).json(
        { data: "Successfully added to Bala Opera's mailing list" })
    } catch {
      return response
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "There was an issue writing to the mailing list" })
    }
  } else {
    return response.status(STATUS_CODES.METHOD_NOT_ALLOWED).json({ error: 'Unsupported method' })
  }
}

const authorizeSpreadsheet = async (mailingList: GoogleSpreadsheet) => {
  await mailingList.useServiceAccountAuth({
    client_email: process.env.MAILING_LIST_EMAIL,
    private_key: process.env.MAILING_LIST_PRIVATE_KEY,
  })
  await mailingList.loadInfo()
}

const addToMailingList = async (mailingList: GoogleSpreadsheet, email: string) => {
  const sheet = mailingList.sheetsByIndex[0]
  const timestamp = new Date(Date.now())
  const formattedTimestamp = `${timestamp.toDateString()} ${timestamp.toTimeString()}`
  await sheet.addRow({ Email: email, Timestamp: formattedTimestamp })
}