import { parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const cookie = req.headers.cookie;
  let accessToken;
  if (cookie) {
    const cookies = parse(cookie);
    accessToken = cookies.accessToken;
  } else {
    accessToken = null;
  }

  console.log("Access Token from cookies:", accessToken);

  return res.status(200).json({ accessToken });
}
