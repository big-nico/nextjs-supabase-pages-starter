// pages/api/protected-route.ts
import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

function stringOrFirstString(item: string | string[] | undefined) {
  return Array.isArray(item) ? item[0] : item;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).appendHeader("Allow", "GET").end();
    return;
  }

  // Get the user code from the query string
  const queryParams = req.query;
  const code = stringOrFirstString(queryParams.code);
  let next = "/";

  console.log("code", code);
  console.log("queryParams", queryParams);

  if (code) {
    const supabase = createClient(req, res);
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      next = "/private";
    }
  }
  res.redirect(next);
}
