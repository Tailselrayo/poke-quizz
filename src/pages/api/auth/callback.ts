import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

const handler : NextApiHandler = async (req, res) => {
    const {code} = req.query;
    if (code) {
        const supabase = createPagesServerClient({req,res})
        await supabase.auth.exchangeCodeForSession(String(code))
    }
    console.log(req,res)
    res.redirect("/")
}

export default handler