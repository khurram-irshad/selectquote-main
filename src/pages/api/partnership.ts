import { emailService } from "@common/services/email.service"

const handler = async (req, res) => {
    const response = await emailService.send(req.body)
    res.status(200).json({ name: 'John Doe' })
}
export default handler;