import { NextApiHandler } from "next";
import fs from "fs"

const handler: NextApiHandler = async (req, res) => {
    fs.unlink(req.body.filepath, err => {
        console.log(err)
    })
    res.status(200).json({ deleted: "ok" })
}
export default handler;
