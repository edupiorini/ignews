/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {


    const users = [
        { id: 1, name: 'Eduardo' },
        { id: 2, name: 'Melissa' },
        { id: 3, name: 'Laura' },
    ]

    return response.json(users)

}