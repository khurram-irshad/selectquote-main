export default function handler(req, res) {
    const { cpage } = req.query
    res.setPreviewData({})
    if (process.env.NODE_ENV === 'production')
        res.redirect(cpage)
    else {
        const cookies = res.getHeader('Set-Cookie') as string[];
        res.setHeader('Set-Cookie', cookies.map((cookie) => cookie.replace('Secure;', '').replace('SameSite=None', 'SameSite=Lax')))
        res.redirect(cpage)
    }
}
