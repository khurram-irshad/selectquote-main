export const buildUserTemplate = (model) => `
    <img src="https://images.ctfassets.net/vr7x4vru4gls/7jsdaiHlxfZvNlRcxtuXXw/80b01324683fa841714ce8e42436345e/SelectQuote_Logo.jpg" width="250"><br/><br/>
    ${model.firstName}, <br/><br/>
    Thank you for sharing your interest in partnering with SelectQuote. A member of our team will be in touch shortly. Below is a copy of your submission.<br/><br/>
    <strong>Name:</strong> ${JSON.parse(localStorage.getItem('firstName'))} ${JSON.parse(localStorage.getItem('lastName'))}<br/>
    <strong>Company Name:</strong> ${JSON.parse(localStorage.getItem('companyName'))} <br/>
    <strong>Title: </strong> ${JSON.parse(localStorage.getItem('title'))}<br/>
    <strong>Email: </strong> ${JSON.parse(localStorage.getItem('email'))}<br/>
    <strong>Phone: </strong> ${JSON.parse(localStorage.getItem('phoneNumber'))} <br/>
    
<strong>Additional Comments:</strong> ${model.comments}
`

export const buildBusinessTemplate = (model) => `
    <img src="https://images.ctfassets.net/vr7x4vru4gls/7jsdaiHlxfZvNlRcxtuXXw/80b01324683fa841714ce8e42436345e/SelectQuote_Logo.jpg" width="250"><br/><br/>
    ${model.firstName}, <br/><br/>
    Thank you for sharing your interest in partnering with SelectQuote. A member of our team will be in touch shortly. Below is a copy of your submission.<br/><br/>
    <strong>Name:</strong> ${model.firstName} ${model.lastName}<br/>
    <strong>Company Name:</strong> ${model.companyName} <br/>
    <strong>Title: </strong> ${model.title}<br/>
    <strong>Email: </strong> ${model.email}<br/>
    <strong>Phone: </strong> ${model.phoneNumber} <br/>
    <strong>Additional Comments:</strong> ${model.comments}
`
