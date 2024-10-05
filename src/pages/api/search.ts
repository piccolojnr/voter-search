import type { NextApiRequest, NextApiResponse } from 'next';

const SEARCH_API_URL = 'http://84.247.186.84:9200/voters/_search';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, from, size } = req.query;

    try {
        const response = await fetch(`${SEARCH_API_URL}?pretty=true&q=fullName:${query}&from=${from}&size=${size}`);
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching voters:', error);
        res.status(500).json({ message: 'Failed to fetch voters' });
    }
}
