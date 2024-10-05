// pages/api/voter/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const INFO_API_URL = "http://84.247.186.84:9011/voter/information";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const response = await axios.get(`${INFO_API_URL}?number=${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching voter details:", error);
        res.status(500).json({ error: "Failed to fetch voter details" });
    }
}
