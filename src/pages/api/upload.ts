import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import fs from "fs/promises"
import path from "path";
export const config  = {
    api: {
        bodyParser: false
    }
}

const readFile  = (
    req: NextApiRequest
): Promise<{fields: formidable.Fields, files: formidable.Files}> => {
    try {
        const options: formidable.Options = {}
        options.uploadDir = path.join(process.cwd(), "/public/images")
        options.filename =  (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        }
        const form = formidable(options)
        return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if(err) reject(err)
                resolve({fields, files})
            })
        })
    } catch (err) {
        console.log(err)
    }
}
const handler: NextApiHandler = async (req, res) => {
    try {
        fs.readdir(path.join(process.cwd() + "/public", "/images"))
    } catch (err) {
        await fs.mkdir(path.join(process.cwd() + "public", "images"))
    }
    
    const {files: {img: {filepath}}}  = await readFile(req)
    res.json({filepath: filepath})
}
export default handler;
