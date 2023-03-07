import { StorageService } from "@common/services/storage"

export const buildUserTemplate = (model) => `
    <img src="https://images.ctfassets.net/vr7x4vru4gls/7jsdaiHlxfZvNlRcxtuXXw/80b01324683fa841714ce8e42436345e/SelectQuote_Logo.jpg" width="250"><br/><br/>
    ${model.firstName}, <br/><br/>
    Thank you for sharing your interest in partnering with SelectQuote. A member of our team will be in touch shortly. Below is a copy of your submission.<br/><br/>
    <strong>Name:</strong> ${model.firstName} ${model.lastName}<br/>
    <strong>Company Name:</strong> ${model.companyName} <br/>
    <strong>Title: </strong> ${model.title}<br/>
    <strong>Email: </strong> ${model.email}<br/>
    <strong>Phone: </strong> ${model.phoneNumber} <br/>
    <strong>Company location: </strong> ${model.city} , ${model.state}<br/>
    <strong>Company employees: </strong> ${model.radiooption}<br/>
    <strong>Company insurance coverage: </strong> ${model.radiooption1} ${model.others}<br/>
    <strong>Company Acord Certificate: </strong> ${model.radiooption2} ${model.others1} <br/>
    <strong>Insurance verticals call: </strong> ${model.insuranceverticals} ${model.checkboxinput} <br/>
    <strong>Currently lead type(s) offer: </strong> ${model.leadtype} ${model.checkboxinput1} <br/>
    <strong>Primary sources leads: </strong> ${model.primarysources} ${model.checkboxinput2} <br/>
    <strong>Daily average volume by insurance vertical and lead type: </strong> ${model.volume} <br/>
    <strong>Call center detail: </strong> ${model.canswer} <br/>
    <strong>Majority of your sources: </strong> ${model.radiooption3} <br/>
    <strong>Changes to your sources: </strong> ${model.radiooption4} <br/>
    <strong>General pricing range by lead type: </strong> ${model.lanswer} <br/>
    <strong>Api key for data posting: </strong> ${model.radiooption5} <br/>
    <strong>Routing system/softwre(s): </strong> ${model.sanswer} <br/>
    <strong>Filter calls: </strong> ${model.ganswer} <br/>
    <strong>Specified amount of calls by day and/or hour : </strong> ${model.danswer} <br/>
    <strong>Majority of your traffic: </strong> ${model.uanswer} <br/>
    <strong>Jornaya or Trusted: </strong> ${model.radiooption6} ${model.others3} <br/>
    <strong>Additional Comments: </strong> ${model.comments}
`

export const buildBusinessTemplate = (model) => `
    <img src="https://images.ctfassets.net/vr7x4vru4gls/7jsdaiHlxfZvNlRcxtuXXw/80b01324683fa841714ce8e42436345e/SelectQuote_Logo.jpg" width="250"><br/><br/>
    ${(StorageService.getItem('model').firstName)}, <br/><br/>
    Thank you for sharing your interest in partnering with SelectQuote. A member of our team will be in touch shortly. Below is a copy of your submission.<br/><br/>
    <strong>Name:</strong> ${(StorageService.getItem('model').firstName)} ${(StorageService.getItem('model').lastName)}<br/>
    <strong>Company Name:</strong> ${(StorageService.getItem('model').companyName)} <br/>
    <strong>Title: </strong> ${(StorageService.getItem('model').title)}<br/>
    <strong>Email: </strong> ${(StorageService.getItem('model').email)}<br/>
    <strong>Phone: </strong> ${(StorageService.getItem('model')?.phoneNumber)} <br/>
    <strong>Additional Comments:</strong> ${model.comments}
`
