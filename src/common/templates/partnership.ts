import { StorageService } from "@common/services/storage"

export const buildUserTemplate = (partnerShipModel) => `
    <img src="https://images.ctfassets.net/vr7x4vru4gls/7jsdaiHlxfZvNlRcxtuXXw/80b01324683fa841714ce8e42436345e/SelectQuote_Logo.jpg" width="250"><br/><br/>
    ${partnerShipModel.firstName}, <br/><br/>
    Thank you for sharing your interest in partnering with SelectQuote. A member of our team will be in touch shortly. Below is a copy of your submission.<br/><br/>
    <strong>Name:</strong> ${partnerShipModel.firstName} ${partnerShipModel.lastName}<br/>
    <strong>Company Name:</strong> ${partnerShipModel.companyName} <br/>
    <strong>Title: </strong> ${partnerShipModel.title}<br/>
    <strong>Email: </strong> ${partnerShipModel.email}<br/>
    <strong>Phone: </strong> ${partnerShipModel?.phoneNumber} <br/>
    <strong>Company location: </strong> ${partnerShipModel.city} , ${partnerShipModel.state}<br/>
    <strong>Company employees: </strong> ${partnerShipModel.radiooption}<br/>
    <strong>Company insurance coverage: </strong> ${partnerShipModel.radiooption1} ${partnerShipModel.others}<br/>
    <strong>Company Acord Certificate: </strong> ${partnerShipModel.radiooption2} ${partnerShipModel.others1} <br/>
    <strong>Insurance verticals call: </strong> ${partnerShipModel.insuranceverticals} ${partnerShipModel.checkboxinput} <br/>
    <strong>Currently lead type(s) offer: </strong> ${partnerShipModel.leadtype} ${partnerShipModel.checkboxinput1} <br/>
    <strong>Primary sources leads: </strong> ${partnerShipModel.primarysources} ${partnerShipModel.checkboxinput2} <br/>
    <strong>Daily average volume by insurance vertical and lead type: </strong> ${partnerShipModel.volume} <br/>
    <strong>Call center detail: </strong> ${partnerShipModel.canswer} <br/>
    <strong>Majority of your sources: </strong> ${partnerShipModel.radiooption3} <br/>
    <strong>Changes to your sources: </strong> ${partnerShipModel.radiooption4} <br/>
    <strong>General pricing range by lead type: </strong> ${partnerShipModel.lanswer} <br/>
    <strong>Api key for data posting: </strong> ${partnerShipModel.radiooption5} <br/>
    <strong>Routing system/softwre(s): </strong> ${partnerShipModel.sanswer} <br/>
    <strong>Filter calls: </strong> ${partnerShipModel.ganswer} <br/>
    <strong>Specified amount of calls by day and/or hour : </strong> ${partnerShipModel.danswer} <br/>
    <strong>Majority of your traffic: </strong> ${partnerShipModel.uanswer} <br/>
    <strong>Jornaya or Trusted: </strong> ${partnerShipModel.radiooption6} ${partnerShipModel.others3} <br/>
    <strong>Additional Comments: </strong> ${partnerShipModel.comments}
`

export const buildBusinessTemplate = (partnerShipModel) => `
    <img src="https://images.ctfassets.net/vr7x4vru4gls/7jsdaiHlxfZvNlRcxtuXXw/80b01324683fa841714ce8e42436345e/SelectQuote_Logo.jpg" width="250"><br/><br/>
    ${(partnerShipModel.firstName)}, <br/><br/>
    Thank you for sharing your interest in partnering with SelectQuote. A member of our team will be in touch shortly. Below is a copy of your submission.<br/><br/>
    <strong>Name:</strong> ${partnerShipModel.firstName} ${partnerShipModel.lastName}<br/>
    <strong>Company Name:</strong> ${(partnerShipModel.companyName)} <br/>
    <strong>Title: </strong> ${partnerShipModel.title}<br/>
    <strong>Email: </strong> ${(partnerShipModel.email)}<br/>
    <strong>Phone: </strong> ${(partnerShipModel?.phoneNumber)} <br/>
    <strong>Additional Comments:</strong> ${partnerShipModel.comments}
`
