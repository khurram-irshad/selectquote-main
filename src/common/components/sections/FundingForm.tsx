import { Type_Form } from "@common/types/Type_Form";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormTextField } from "@components/TextInput";
import { MyInputMask } from "@components/MyInputMask";
import { FILE_TYPES, MOBILE_MASK } from "@common/constants/app.constant";
import { appService } from "@common/services/app.service";
import { foundationSchema } from "@common/schema/schema";
import { FileUploader } from "react-drag-drop-files";
import { fundBusinessTemplate, fundUserTemplate } from "@common/templates/fundingform";
import { useGlobalContext } from "src/context";
import { isDesktop } from "@common/helpers/helper";

const FundingFormSection = ({ section }: { section: Type_Form }) => {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [imagePath, setImagePath] = useState("")
  const [isUploading , setIsUploading] = useState(false)
  const [file, setFile] = useState(null);
  const { title } = section.fields;
  const [uploadedFileName, setUploadedFileName] = useState<any>(null);
  const { screenMode, isTabView } = useGlobalContext();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(foundationSchema),
  });

  const onSubmit = async (event: any) => {
    try {
      const userEmailResponse = await appService.sendFoundation({
        toEmail: event.email,
        fromEmail: 'donotreply@selectquote.com',
        subject: 'Thank you for contacting SelectQuote',
        body: fundUserTemplate(event),
        attachment: imagePath,
        ...event
      })
      const businessEmailResponse = await appService.sendFoundation({
        toEmail: 'sqcommunity@selectquote.com',
        fromEmail: 'donotreply@selectquote.com',
        subject: 'SelectQuote Partnerships Inquiry',
        body: fundBusinessTemplate(event),
        attachment: imagePath,
        ...event
      })
      if(userEmailResponse.status === 200 && businessEmailResponse.status === 200) {
        setIsEmailSent(true)
      }
      await appService.deleteImg(imagePath)
    }
    
    catch(error) {
      console.log(error)
    }
  }
  const uploadFileForFund = async (e) => {
    const uploadedFile = e[0];
    if (uploadedFile.size <= 1500000) {
      setFile(uploadedFile);
    } else {
      alert('File size must be less than 1.5 MB');
      return;
    }
    const fileName = uploadedFile?.name;
    // Set the name of the uploaded file in state
    setUploadedFileName(fileName);
    setIsUploading(true)
    try {
      const formData = new FormData()
      if(imagePath.length){
        await appService.deleteImg(imagePath)
        setImagePath("")
      }
      formData.append("img", e[0])
      const {data: {filepath}} = await appService.uploadImg(formData)
      setImagePath(filepath)
    } catch (err) {
      console.log(err)
    }
    setIsUploading(false)
  }

  return (

    <div className="pt-5 pb-5">
    {isDesktop(screenMode)?<div className="desktop-form" id="foundation-form">
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <RichTextRenderer text={title.fields.content} />
          {isEmailSent ?
            <p style={{color: "#646464" }}>
              Thank you for sahring you interest in partnering with SelectQuote. A member of our team will be in touch shortly.
            </p>
            :
            <>
              <div className="row">
                <div className="col">
                  <label className="form-label">First Name <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='firstName' width= "100%"/>
                </div>
                <div className="col">
                  <label className="form-label">Last Name <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='lastName' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Email <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='email' width= "100%"/>
                </div>
                <div className="col">
                  <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='phoneNumber' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization Name <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='organizationName' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization Website <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='organizationWesbsite' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization Address <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='organizationAddress' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization Mission Statement <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='organizationStatement' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please provide an overview of your organization, including history,
                    current programs and activities, and any accomplishments from the
                    last three years <span className="asterick-color">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='organizationOverview' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <p>Please provide a brief description of your proposal, including:</p>
                <div className="col">
                  <ul>
                    <li>Problem or need which you seek to address</li>
                    <li>Purpose, objectives, and key anticipated outcomes</li>
                    <li>Individuals or communities served</li>
                  </ul>
                </div>
                <div className="col">
                  <ul>
                    <li>Budget/amount of funding requested</li>
                    <li>Overview of how funds will be spent</li>
                    <li>Timeline</li>
                  </ul>
                </div>
                <div>
                <UseFormTextField placeholder="" control={control} name='organizationDescription' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please specify the needs and/or program this grant will directly
                    support. <span className="text-danger">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='program' width= "100%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please list how much money you're requesting. <span className="text-danger">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='amount' width= "100%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Will there be any partners in this proposal?
                  </label>
                  <ul className="custom-radio">
                  <li>
                    <input type="radio" id="yes" name="radio-option" />
                    <label htmlFor="yes">Yes</label>
                  </li>
                    <li>
                      <input type="radio" id="no" name="radio-option" />
                      <label htmlFor="no">No</label>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization IRS EIN Number <span className="text-danger">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='IRS' width= "100%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please provide a third-party reference <span className="text-danger">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='reference' width= "100%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please list your Board of Directors: <span className="text-danger">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='boardOfDirector' width= "100%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please list name and title of any key staff involved with this
                    project: <span className="asterick-color">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='staffInvolved' width= "100%"/>
                </div>
              </div>

              <div className="row mt-4">
                <label className="form-label">Please attach the following:</label>
                <div className="col">
                  <ul>
                    <li>Cash flow statement</li>
                    <li>Audited financial statements</li>
                    <li>Current operating budget</li>
                  </ul>
                </div>
                <div className="col">
                  <ul>
                    <li>Annual Report</li>
                    <li>
                      Any supplementary documents which you feel will be essential to
                      the review committee
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  {/* <label>Add Attachments</label> */}
                  <div id="fileupload">
                  <FileUploader handleChange={uploadFileForFund} name="file" types={FILE_TYPES} multiple= "true" 
                      label={`Drop a file here or click to upload\nMaximum upload size: 1.5MB`} maxSize= {1500000} style={{ whiteSpace: 'pre-line' }}>
                        {uploadedFileName && <p>{uploadedFileName}</p>}
                  </FileUploader>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="button-container">
                <button type="submit" className="action-btn btn-border"  style={{ color: "#ffffff", backgroundColor: "#F47B20" }} disabled={isUploading}> 
                      Apply Now
                </button>
                </div>
              </div>
          </>
      }    
      </form>
    </div>:
    <div className="mobile-form" id="foundation-form">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <RichTextRenderer text={title.fields.content} />
          {isEmailSent ?
            <p style={{color: "#646464" }}>
              Thank you for sahring you interest in partnering with SelectQuote. A member of our team will be in touch shortly.
            </p>
            :
            <>
              <div className="row">
                <div className="row">
                  <label className="form-label">First Name <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='firstName' width= "100%"/>
                </div>
                <div className="row mt-4">
                  <label className="form-label">Last Name <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='lastName' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="row">
                  <label className="form-label">Email <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='email' width= "100%"/>
                </div>
                <div className="row mt-4">
                  <label className="form-label">Phone Number <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='phoneNumber' width= "100%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization Name <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='organizationName' width= "94%" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization Website <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='organizationWesbsite'  width= "94%" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization Address <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='organizationAddress'  width= "94%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization Mission Statement <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='organizationStatement'  width= "94%" />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please provide an overview of your organization, including history,
                    current programs and activities, and any accomplishments from the
                    last three years <span className="asterick-color">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='organizationOverview' width= "94%"/>
                </div>
              </div>
              <div className="row mt-4">
                <p>Please provide a brief description of your proposal, including:</p>
                <div className="row mt-5">
                  <ul>
                    <li>Problem or need which you seek to address</li>
                    <li>Purpose, objectives, and key anticipated outcomes</li>
                    <li>Individuals or communities served</li>
                  </ul>
                </div>
                <div className="row">
                  <ul>
                    <li>Budget/amount of funding requested</li>
                    <li>Overview of how funds will be spent</li>
                    <li>Timeline</li>
                  </ul>
                </div>
                <div>
                <UseFormTextField placeholder="" control={control} name='organizationDescription' width= "94%"/>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please specify the needs and/or program this grant will directly
                    support. <span className="asterick-color">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='program' width= "94%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please list how much money you're requesting. <span className="asterick-color">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='amount' width= "94%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="row">
                  <label className="form-label">
                    Will there be any partners in this proposal?
                  </label>
                  <ul className="custom-radio col pb-1 radio-align">
                    <li>
                      <input type="radio" id="yes" name="radio-option" />
                      <label htmlFor="yes">Yes</label>
                    </li>
                    <li>
                      <input type="radio" id="no" name="radio-option" />
                      <label htmlFor="no">No</label>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">Organization IRS EIN Number <span className="asterick-color">*</span></label>
                  <UseFormTextField placeholder="" control={control} name='IRS' width= "94%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please provide a third-party reference <span className="asterick-color">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='reference' width= "94%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please list your Board of Directors: <span className="asterick-color">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='boardOfDirector' width= "94%"/>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label className="form-label">
                    Please list name and title of any key staff involved with this
                    project: <span className="asterick-color">*</span>
                  </label>
                  <UseFormTextField placeholder="" control={control} name='staffInvolved' width= "94%"/>
                </div>
              </div>

              <div className="row mt-4">
                <label className="form-label">Please attach the following:</label>
                <div className="row mt-4">
                  <ul>
                    <li>Cash flow statement</li>
                    <li>Audited financial statements</li>
                    <li>Current operating budget</li>
                  </ul>
                </div>
                <div className="row">
                  <ul>
                    <li>Annual Report</li>
                    <li>
                      Any supplementary documents which you feel will be essential to
                      the review committee
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  {/* <label>Add Attachments</label> */}
                  <div id="fileupload">
                  <FileUploader handleChange={uploadFileForFund} name="file" types={FILE_TYPES} multiple= {false} 
                      label={`Drop a file here or click to upload\nMaximum upload size: 1.5MB`} maxSize={1500000} style={{ whiteSpace: 'pre-line' }}/>
                      {uploadedFileName && <p>{uploadedFileName}</p>}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="button-container">
                <button type="submit" className="action-btn btn-border"  style={{ color: "#ffffff", backgroundColor: "#F47B20" }} disabled={isUploading}> 
                      Apply Now
                </button>
                </div>
              </div>
          </>
      }    
      </form>
    </div>}
    </div>
  );
};

export default FundingFormSection;
