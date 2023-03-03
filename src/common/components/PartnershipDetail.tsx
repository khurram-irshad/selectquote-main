import { partnershipDetailSchema } from "@common/schema/schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormTextField } from "@components/TextInput";
import { appService } from "@common/services/app.service";
import {
  buildBusinessTemplate,
  buildUserTemplate,
} from "@common/templates/partnership";
import { FileUploader } from "react-drag-drop-files";
const PartnershipDetail = () => {
    const [isEmailSentFund, setIsEmailSentFund] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [radioValue, setRadioValue] = useState('');
  
    const { control, handleSubmit, reset } = useForm({
      resolver: yupResolver(partnershipDetailSchema),
    });
    const fileTypes = ["PNG", "JFIF", "JPEG", "PJP", "JPG", "PPT", "PPTX", "PDF", "JPE", "POT", "PPS"];
    const [uploadedFileName, setUploadedFileName] = useState<any>(null);
  
    const onSubmit = async (event: any) => {
        const email = JSON.parse(localStorage.getItem('email'))
        debugger
      try {
        const userEmailResponse = await appService.sendPartnership({
          toEmail: email,
          fromEmail: "donotreply@selectquote.com",
          subject: "Thank you for contacting SelectQuote",
          body: buildUserTemplate(event),
          attachment: imagePath,
          ...event,
        });
  
        const businessEmailResponse = await appService.sendPartnership({
          toEmail: "partnerships@selectquoteventures.com",
          fromEmail: "donotreply@selectquoteventures.com",
          subject: "SelectQuote Partnerships Inquiry",
          attachment: imagePath,
          body: buildBusinessTemplate(event),
          ...event,
        });
        if (
          userEmailResponse.status === 200 &&
          businessEmailResponse.status === 200
        ) {
          setIsEmailSentFund(true);
        }
        await appService.deleteImg(imagePath);
      } catch (error) {
        console.log(error);
      }
    };
    const uploadFile = async (e) => {
      const uploadedFile = e[0];
      if (uploadedFile.size <= 1500000) {
        setFile(uploadedFile);
      } else {
        alert("File size must be less than 1.5 MB");
        return;
      }
      const fileName = uploadedFile?.name;
      // Set the name of the uploaded file in state
      setUploadedFileName(fileName);
      setIsUploading(true);
      try {
        const formData = new FormData();
        if (imagePath.length) {
          await appService.deleteImg(imagePath);
          setImagePath("");
        }
        formData.append("img", e[0]);
        const {
          data: { filepath },
        } = await appService.uploadImg(formData);
        setImagePath(filepath);
      } catch (err) {
        console.log(err);
      }
      setIsUploading(false);
    };

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                
            {isEmailSentFund ? (
              <p style={{ color: "#646464" }}>
                Thank you for sahring you interest in partnering with
                SelectQuote. A member of our team will be in touch shortly.
              </p>
            ) : (
            <>

                <div className="row mt-4">
                    <label className="form-label" style={{ color: "#646446", marginBottom: "45px" }}>
                        <b>Where is this comapny located?*</b>
                    </label>
                    <div className="comapny-located">
                        <UseFormTextField control={control} name="city" width="100%" placeholder="city " height="50px" />
                    </div>
                    <div className="comapny-located">
                        <UseFormTextField control={control} name="state" width="100%" placeholder="state " height="50px" />
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446"}}>
                            <b>How  many employees does your company have?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li className="radio-list">
                            </li>
                            <li className="radio-list">
                                <UseFormTextField
                            control={control} 
                            name = "others"
                            width="100%"
                            height="50px"
                            type="radio"/>
                                <label htmlFor="26-50" style={{ color: "#646446", borderRadius: "30px" }}>26-50</label>
                            </li>
                            <li className="radio-list">
                                <input type="radio" value="51-100" name="radioOption2" />
                                <label htmlFor="51-100" style={{ color: "#646446", borderRadius: "30px" }}>51-100</label>
                            </li>
                            <li className="radio-list">
                                <input type="radio" value="100ormore" name="radioOption4" />
                                <label htmlFor="100 or more" style={{ color: "#646446", borderRadius: "30px" }}>100 or more</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Does your comapny have insurance coverage?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li className="radio-list">
                                <input type="radio" value="yes" name="radio-option-insurance" />                                <label htmlFor="yes" style={{ color: "#646446", borderRadius: "30px" }}>Yes</label>
                            </li>
                            <li className="radio-list">
                                <input type="radio" value="no" name="radio-option-insurance1" />
                                <label htmlFor="no" style={{ color: "#646446", borderRadius: "30px" }}>No</label>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 other-field">
                        <button className="other-button">Others</button>
                        <UseFormTextField
                            placeholder="Enter text here"
                            control={control}
                            border= "none"
                            outline= "none" 
                            name = "others"
                            width="100%"
                            height="50px"/>
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Can your comapny provide an Acord Certificate?*</b> (General Liability, Erros & Omissions, and/ or Cyber Protection)
                        </label>
                        <ul className="custom-radio">
                            <li className="radio-list">
                                <input type="radio" value="yes" name="radio-option-accord" />
                                <label htmlFor="yes" style={{ color: "#646446", borderRadius: "30px" }}>Yes</label>
                            </li>
                            <li className="radio-list">
                                <input type="radio" value="no" name="radio-option-accord" />
                                <label htmlFor="no" style={{ color: "#646446", borderRadius: "30px" }}>No</label>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 other-field">
                        <button className="other-button">Others</button>
                        <UseFormTextField
                            placeholder="Enter text here"
                            control={control}
                            border= "none"
                            outline= "none" 
                            name = "others1"
                            width="100%"
                            height="50px"/>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" }}>
                        <b>What insurance verticals are you selling call/leads in?*</b> (Select all that apply)
                    </label>
                    <div className="checkbox-list">
                        <div className="check-list">
                            <label htmlFor="checkbox1" style={{ color: "#646464" }}><input type="checkbox" id="checkbox1" name="checkbox1" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Medicare</label>
                            <label htmlFor="checkbox2" style={{ color: "#646464" }}><input type="checkbox" id="checkbox2" name="checkbox2" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />FE</label>
                            <label htmlFor="checkbox3" style={{ color: "#646464" }}><input type="checkbox" id="checkbox3" name="checkbox3" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Term</label>
                        </div>
                        <div className="check-list" style={{ width: "55.5%" }}>
                            <label htmlFor="checkbox4" style={{ color: "#646464" }}><input type="checkbox" id="checkbox4" name="checkbox4" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Home</label>
                            <label htmlFor="checkbox5" style={{ color: "#646464" }}><input type="checkbox" id="checkbox5" name="checkbox5" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Auto</label>
                        </div>
                        <div className="check-list-other">
                            <label htmlFor="checkbox6" style={{ color: "#646464" }}><input type="checkbox" id="checkbox6" name="checkbox6" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Other</label>
                            <input type="text" id="line-input" name="line-input" className="other-line-input" style={{ border: "none", borderBottom: "1px solid #646464", outline: "none", background: "transparent", marginBottom: "13px", marginLeft: "5px", color: "#646464" }}></input>
                        </div>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" }}>
                        <b>What lead type(s) do you currently offer?*</b>
                    </label>
                    <div className="checkbox-list">
                        <div className="check-list">
                            <label htmlFor="checkbox1" style={{ color: "#646464" }}><input type="checkbox" id="checkbox1" name="checkbox1" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Transfers</label>
                            <label htmlFor="checkbox2" style={{ color: "#646464" }}><input type="checkbox" id="checkbox2" name="checkbox2" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Inbounds</label>
                            <label htmlFor="checkbox3" style={{ color: "#646464" }}><input type="checkbox" id="checkbox3" name="checkbox3" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Data</label>
                            <label htmlFor="checkbox3" style={{ color: "#646464" }}><input type="checkbox" id="checkbox3" name="checkbox3" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Clicks</label>
                        </div>
                        <div className="check-list-other">
                            <label htmlFor="checkbox4" style={{ color: "#646464" }}><input type="checkbox" id="checkbox4" name="checkbox4" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Other</label>
                            <input type="text" id="line-input" className="other-line-input" name="line-input" style={{ border: "none", borderBottom: "1px solid #646464", outline: "none", background: "transparent", marginBottom: "13px", marginLeft: "5px", color: "#646464" }}></input>
                        </div>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" }}>
                        <b>What are the primary sources of these leads?*</b>
                    </label>
                    <div className="checkbox-list">
                        <div className="check-list">
                            <label htmlFor="checkbox1" style={{ color: "#646464" }}><input type="checkbox" id="checkbox1" name="checkbox1" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Websites</label>
                            <label htmlFor="checkbox2" style={{ color: "#646464" }}><input type="checkbox" id="checkbox2" name="checkbox2" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />TV</label>
                            <label htmlFor="checkbox3" style={{ color: "#646464" }}><input type="checkbox" id="checkbox3" name="checkbox3" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Radio</label>
                            <label htmlFor="checkbox3" style={{ color: "#646464" }}><input type="checkbox" id="checkbox3" name="checkbox3" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Direct Mail</label>
                        </div>
                        <div className="check-list" style={{ width: "38.8%" }}>
                            <label htmlFor="checkbox4" style={{ color: "#646464" }}><input type="checkbox" id="checkbox4" name="checkbox4" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Social</label>
                            <label htmlFor="checkbox5" style={{ color: "#646464" }}><input type="checkbox" id="checkbox5" name="checkbox5" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Data</label>
                        </div>
                        <div className="check-list-other">
                            <label htmlFor="checkbox6" style={{ color: "#646464" }}><input type="checkbox" id="checkbox6" name="checkbox6" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Other</label>
                            <input type="text" id="line-input" name="line-input" className="other-line-input" style={{ border: "none", borderBottom: "1px solid #646464", outline: "none", background: "transparent", marginBottom: "13px", marginLeft: "5px", color: "#646464" }}></input>
                        </div>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>What is your daily average volume by insurance vertical and lead type and how does this vary by season?*</b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="volume" width="100%" placeholder="Volume " height="50px" />
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>Do you work with a Call Center? Is this an owned and operated call center? Where is it located? Is the Customer data stored in the United States?* </b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="canswer" width="100%" placeholder="Your answer " height="50px" />
                    </div>
                </div>
                <div className="row" style={{marginTop: "100px"}}>
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446"}}>
                            <b>Are the majority of your sources (sites,ads, etc.) owned and operated or 3rd party?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="OwnedOperated" name="radio-option" />
                                <label htmlFor="OwnedOperated" style={{ color: "#646446", borderRadius: "30px" }}>Owned & Operated</label>
                            </li>
                            <li>
                                <input type="radio" id="3rdParty" name="radio-option" />
                                <label htmlFor="3rdParty" style={{ color: "#646446", borderRadius: "30px" }}>3rd Party</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Can you make changes to your sources?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="yes" name="radio-option" />
                                <label htmlFor="yes" style={{ color: "#646446", borderRadius: "30px" }}>yes</label>
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="no" name="radio-option" />
                                <label htmlFor="no" style={{ color: "#646446", borderRadius: "30px" }}>no</label>
                            </li>
                            <li>
                                <input type="radio" id="maybe" name="radio-option" />
                                <label htmlFor="maybe" style={{ color: "#646446", borderRadius: "30px" }}>maybe</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>What is your general pricing range by lead type?* </b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="lanswer" width="100%" placeholder="Your answer " height="50px" />
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Can you implement an API key  for data posting?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="yes" name="radio-option" />
                                <label htmlFor="yes" style={{ color: "#646446", borderRadius: "30px" }}>yes</label>
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="no" name="radio-option" />
                                <label htmlFor="no" style={{ color: "#646446", borderRadius: "30px" }}>no</label>
                            </li>
                            <li>
                                <input type="radio" id="maybe" name="radio-option" />
                                <label htmlFor="maybe" style={{ color: "#646446", borderRadius: "30px" }}>maybe</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>What call routing system/softwre(s) do you currently use?* </b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="sanswer" width="100%" placeholder="Your answer " height="50px" />
                    </div>
                </div>
                <div className="row" style={{marginTop: "100px"}}>
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>Are you able to filter calls by age/geographical area/states/zip codes?* </b> (List all that apply)
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="ganswer" width="100%" placeholder="Your answer " height="50px" />
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>Are you able to send a specified amount of calls by day and/or hour?* </b>(i.e if we give you a maximum number
                        of calls per day of the week/set schedule, etc.)
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="danswer" width="100%" placeholder="Your answer " height="50px" />
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446", marginBottom: "45px" }}>
                        <b>Is the majority of your traffic U65 or 065, if both what is the split between both?* </b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="uanswer" width="100%" placeholder="Your answer " height="50px" />
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Do you use jornaya or Trusted Form?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="yes" name="radio-option" />
                                <label htmlFor="yes" style={{ color: "#646446", borderRadius: "30px" }}>Yes</label>
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="no" name="radio-option" />
                                <label htmlFor="no" style={{ color: "#646446", borderRadius: "30px" }}>No</label>
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="N/A" name="radio-option" />
                                <label htmlFor="N/A" style={{ color: "#646446", borderRadius: "30px" }}>N/A</label>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 other-field">
                        <button className="other-button">Others</button>
                        <UseFormTextField
                            placeholder="Enter text here"
                            control={control}
                            border= "none"
                            outline= "none" 
                            name = "others3"
                            width="100%"
                            height="50px"/>
                    </div>
                </div>

                <div className="row top-space">
                    <div className="col">
                        <label style={{ marginBottom: "15px", color: "#646464" }}><b>Additional Comments</b></label>
                        <UseFormTextField
                            control={control}
                            type="textarea"
                            name="comments"
                            width="100%"
                            height="100px"
                            placeholder="Enter text here"
                        />
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label style={{ color: "#646464" }}>Add Attachments</label>
                        <div id="fileupload">
                            <FileUploader handleChange={uploadFile}  types={fileTypes} multiple="false"
                                label={`Drop a file here or click to upload\nMaximum upload size: 1.5MB`} maxSize={1500000} style={{ whiteSpace: 'pre-line' }} />
                            {uploadedFileName && <p>{uploadedFileName}</p>}
                        </div>
                    </div>
                </div>
                <div className="mt-4 button-container">
                    <button
                        className="action-btn btn-border submit-button"
                        type="submit"
                        onClick= {()=>(handleSubmit(onSubmit))}
                        style={{
                            color: "#ffff",
                            backgroundColor: "rgb(244, 123, 32)",
                            width: "15%"
                        }}
                        disabled={isUploading}
                    >
                        submit
                    </button>
                </div>
            </>
            )}     
            </form>
        </div>
    )
}

export default PartnershipDetail