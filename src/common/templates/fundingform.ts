export const fundUserTemplate = (model) => `
    <img src="https://images.ctfassets.net/vr7x4vru4gls/7jsdaiHlxfZvNlRcxtuXXw/80b01324683fa841714ce8e42436345e/SelectQuote_Logo.jpg" width="250"><br/><br/>
    ${model.firstName}<br/><br/>
    Thank you for sharing your interest in partnering with SelectQuote. A member of our team will be in touch shortly. Below is a copy of your submission.<br/><br/>
    <strong>Name:</strong> ${model.firstName} ${model.lastName}<br/>
    <strong>Email:</strong> ${model.email}<br/>
    <strong>Phone:</strong> ${model.phoneNumber} <br/>
    <strong>Organization Name:</strong> ${model.organizationName} <br/>
    <strong>Organization Website: </strong> ${model.organizationWesbsite}<br/>
    <strong>Organization Address: </strong> ${model.organizationAddress}<br/>
    <strong>Organization Mission Statement: </strong> ${model.organizationStatement}<br/>
    <strong>Organization History: </strong> ${model.organizationOverview}<br/>
    <strong>Objectives: </strong> ${model.organizationDescription}<br/>
    <strong>Organization Grant: </strong> ${model.amount}<br/>
    <strong>Requested Finances: </strong>${model.program}<br/>
    <strong>IRS EIN Number : </strong> ${model.IRS}<br/>
    <strong>Third Party Reference : </strong> ${model.reference}<br/>
    <strong>Board of Directors: </strong> ${model.boardOfDirector}<br/>
<strong>Key Staff: </strong> ${model.staffInvolved}<br/>
`

export const fundBusinessTemplate = (model) => `
    <img src="https://images.ctfassets.net/vr7x4vru4gls/7jsdaiHlxfZvNlRcxtuXXw/80b01324683fa841714ce8e42436345e/SelectQuote_Logo.jpg" width="250"><br/><br/>
    ${model.firstName}<br/><br/>
    Thank you for sharing your interest in partnering with SelectQuote.<br/><br/>
    <strong>Name:</strong> ${model.firstName} ${model.lastName}<br/>
    <strong>Email: </strong> ${model.email}<br/>
    <strong>Phone: </strong> ${model.phoneNumber} <br/>
    <strong>Organization Name:</strong> ${model.organizationName}  <br/>
    <strong>Organization Website: </strong> ${model.organizationWesbsite}<br/>
    <strong>Organization Address: </strong> ${model.organizationAddress}<br/>
    <strong>Organization Mission Statement: </strong> ${model.organizationStatement}<br/>
    <strong>Organization History: </strong> ${model.organizationOverview}<br/>
    <strong>Objectives: </strong> ${model.organizationDescription}<br/>
    <strong>Organization Grant: </strong>  ${model.amount} <br/>
    <strong>Requested Finances: </strong>${model.program} <br/>
    <strong>IRS EIN Number : </strong> ${model.IRS}<br/>
    <strong>Third Party Reference : </strong> ${model.reference}]<br/>
    <strong>Board of Directors: </strong> ${model.boardOfDirector}<br/>
<strong>Key Staff: </strong> ${model.staffInvolved}<br/>
`
