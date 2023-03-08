import { partnershipDetailSchema } from "@common/schema/schema";
import React, { useState , useEffect } from "react";
import { useForm , Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormTextField } from "@components/TextInput";
import { appService } from "@common/services/app.service";
import {
  buildBusinessTemplate,
  buildUserTemplate,
} from "@common/templates/partnership";
import { FileUploader } from "react-drag-drop-files";
import { useRouter } from 'next/router';
import { StorageService } from "@common/services/storage";
import { FILE_TYPES } from "@common/constants/app.constant";
const PartnershipDetail = () => {
    const [isEmailSentFund, setIsEmailSentFund] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState(undefined);
    const [selectedRadio1, setSelectedRadio1] = useState(undefined);
    const [selectedRadio2, setSelectedRadio2] = useState(undefined);
    const router = useRouter();
    useEffect(() => {
        if (!StorageService.getItem('partnerShipModel')?.firstName) {
          // Redirect to the main page
          router.push('/partnerships-intro');
        }
      }, []);
  
    const { control, handleSubmit, reset , getValues } = useForm({
      resolver: yupResolver(partnershipDetailSchema),
    });
    
    const [uploadedFileName, setUploadedFileName] = useState<any>(null);

    const onSubmit = async (event: any) => {
        const partnerShipIntroModel = StorageService.getItem('partnerShipModel');
        const partnerShipDetails = { ...partnerShipIntroModel, ...event };
      try {
        const userEmailResponse = await appService.sendPartnership({
          toEmail: partnerShipDetails.email,
          fromEmail: "donotreply@selectquote.com",
          subject: "Thank you for contacting SelectQuote",
          body: buildUserTemplate(partnerShipDetails),
          attachment: imagePath,
          ...event,
        });
  
        const businessEmailResponse = await appService.sendPartnership({
          toEmail: "partnerships@selectquoteventures.com",
          fromEmail: "donotreply@selectquoteventures.com",
          subject: "SelectQuote Partnerships Inquiry",
          attachment: imagePath,
          body: buildBusinessTemplate(partnerShipDetails),
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
      StorageService.clear()
      if (!StorageService.getItem('model')?.firstName) {
        router.push('/partnerships-intro');
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
                        <b>Where is this company located?*</b>
                    </label>
                    <div className="comapny-located">
                        <UseFormTextField control={control} name="city"  placeholder="city " />
                    </div>
                    <div className="comapny-located">
                        <UseFormTextField control={control} name="state"  placeholder="state " />
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446"}}>
                            <b>How  many employees does your company have?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li className="radio-list">
                            <Controller
                                name="radiooption"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                    <div>
                                        <input type="radio" onChange={onChange} value="1-25" name="radioOption" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>1-25</label>
                                    </div>
                                        {error && <span style={{ color: "red", position: "relative" , bottom: "55%" }}>Please select an option</span>}
                                    </>)}
                                />
                            </li>
                            <li className="radio-list">
                            <Controller
                                name="radiooption"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="26-50" name="radioOption" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>26-50</label>
                                    </>)}
                                />
                            </li>
                            <li className="radio-list">
                            <Controller
                                name="radiooption"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="51-100" name="radioOption" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>51-100</label>
                                    </>)}
                                />
                            </li>
                            <li className="radio-list">
                            <Controller
                                name="radiooption"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="100 or more" name="radioOption" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>100 or more</label>
                                    </>)}
                                />
                            </li>
                            
                        </ul>
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Does your company have insurance coverage?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li className="radio-list">
                            <Controller
                                name="radiooption1"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={(e) => {onChange(e);setSelectedRadio(e.target.value);}} value="Yes" name="radioOption1" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>Yes</label>
                                        {error && <span style={{ color: "red", position: "relative" , bottom: "55%" }}>Please select an option</span>}
                                    </>)}
                                />
                            </li>
                            <li className="radio-list">
                            <Controller
                                name="radiooption1"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={(e) => {onChange(e);setSelectedRadio(e.target.value);}} value="No" name="radioOption1" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>No</label>
                                    </>)}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 other-field">
                        <span className="other-button">Others</span>
                        <UseFormTextField
                            placeholder="Enter text here"
                            control={control}
                            border= "none"
                            outline= "none" 
                            name = "others"
                            width="101.2%"
                            height="50px"
                            defaultValue=""
                            disabled={selectedRadio !== undefined}/>
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Can your company provide an Acord Certificate?*</b> (General Liability, Erros & Omissions, and/ or Cyber Protection)
                        </label>
                        <ul className="custom-radio">
                            <li className="radio-list">
                            <Controller
                                name="radiooption2"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={(e) => {onChange(e);setSelectedRadio1(e.target.value);}} value="Yes" name="radioOption2" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>Yes</label>
                                        {error && <span style={{ color: "red", position: "relative" , bottom: "55%" }}>Please select an option</span>}
                                    </>)}
                                />
                            </li>
                            <li className="radio-list">
                            <Controller
                                name="radiooption2"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={(e) => {onChange(e);setSelectedRadio1(e.target.value);}} value="No" name="radioOption2" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>No</label>
                                    </>)}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 other-field">
                        <span className="other-button">Others</span>
                        <UseFormTextField
                            placeholder="Enter text here"
                            control={control}
                            border= "none"
                            outline= "none" 
                            name = "others1"
                            width="101.2%"
                            defaultValue=""
                            disabled={selectedRadio1 !== undefined}/>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" }}>
                        <b>What insurance verticals are you selling call/leads in?*</b> (Select all that apply)
                    </label>
                    <div className="checkbox-list">
                        <div className="check-list">
                        <label htmlFor="checkbox1" style={{ color: "#646464" , display: "flex" , alignItems: "center" }}><Controller
                        control={control}
                        name="insuranceverticals"
                        render={({ field , fieldState: { error, isDirty }}) => (
                            <>
                            <input
                                {...field}
                                type="checkbox"
                                value="Medicare"
                                name= "insuranceverticals"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["insuranceverticals"] || [];
                                const valueIndex = checkedValues?.indexOf(0);
                                if (e.target.checked) {
                                    checkedValues.push("Medicare");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />
                            {error && <p style={{ color: "red", position: "relative" , bottom: "60%" }}>Please select an option</p>}

                            </>
                        )}
                        />Medicare</label>
                        <Controller
                        control={control}
                        name="insuranceverticals"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="FE"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["insuranceverticals"] || [];
                                const valueIndex = checkedValues?.indexOf(1);
                                if (e.target.checked) {
                                    checkedValues.push("FE");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />FE</label>
                        )}
                        />
                        <Controller
                        control={control}
                        name="insuranceverticals"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Term"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["insuranceverticals"] || [];
                                const valueIndex = checkedValues?.indexOf(2);
                                if (e.target.checked) {
                                    checkedValues.push("Term");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Term</label>
                        )}
                        />
                        </div>
                        <div className="check-list" style={{ width: "55.5%" }}>
                        <Controller
                        control={control}
                        name="insuranceverticals"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Home"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["insuranceverticals"] || [];
                                const valueIndex = checkedValues?.indexOf(3);
                                if (e.target.checked) {
                                    checkedValues.push("Home");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Home</label>
                        )}
                        />
                        <Controller
                        control={control}
                        name="insuranceverticals"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Auto"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["insuranceverticals"] || [];
                                const valueIndex = checkedValues?.indexOf(4);
                                if (e.target.checked) {
                                    checkedValues.push("Auto");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Auto</label>
                        )}
                        />
                        </div>
                        <div className="check-list">
                        <Controller
                        control={control}
                        name="insuranceverticals"
                        render={({ field, formState }) => (
                            <>
                                <label style={{width: "10%"}}>
                                <input
                                    {...field}
                                    type="checkbox"
                                    value=""
                                    style={{ width: "30px", height: "40px", position: "relative", 
                                    display: "inline-block", verticalAlign: "middle", marginRight: "10px", }}
                                    onChange={(e) => {
                                    const checkedValues = getValues()["insuranceverticals"] || [];
                                    const valueIndex = checkedValues?.indexOf(4);
                                    if (e.target.checked) {
                                        checkedValues.push("Auto");
                                    } else {
                                        checkedValues.splice(valueIndex, 1);
                                    }
                                    field.onChange(checkedValues);
                                    }}
                                />Others</label>
                                <UseFormTextField control={control} name="checkboxinput" className="other-line-input" />
                            </>
                        )}
                        
                        />
                        </div>
                        

                        {/* <div className="check-list-other">
                            <label htmlFor="checkbox" style={{ color: "#646464" }}><input type="checkbox"  name="checkboxinput" defaultValue="" style={{ width: "30px", height: "40px", position: "relative", display: "inline-block", verticalAlign: "middle", marginRight: "10px" }} />Other</label>
                            <input type="text" id="line-input" name="line-input" className="other-line-input" style={{ border: "none", borderBottom: "1px solid #646464", outline: "none", background: "transparent", marginBottom: "13px", marginLeft: "5px", color: "#646464" }}></input>
                        </div> */}
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" }}>
                        <b>What lead type(s) do you currently offer?*</b>
                    </label>
                    <div className="checkbox-list">
                        <div className="check-list">
                        <Controller
                        control={control}
                        name="leadtype"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Transfers"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["leadtype"] || [];
                                const valueIndex = checkedValues?.indexOf(0);
                                if (e.target.checked) {
                                    checkedValues.push("Transfers");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Transfers</label>
                        )}
                        />
                        <Controller
                        control={control}
                        name="leadtype"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Inbounds"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["leadtype"] || [];
                                const valueIndex = checkedValues?.indexOf(1);
                                if (e.target.checked) {
                                    checkedValues.push("Inbounds");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Inbounds</label>
                        )}
                        />

                        <Controller
                        control={control}
                        name="leadtype"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Data"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["leadtype"] || [];
                                const valueIndex = checkedValues?.indexOf(2);
                                if (e.target.checked) {
                                    checkedValues.push("Data");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Data</label>
                        )}
                        />
                        <Controller
                        control={control}
                        name="leadtype"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Clicks"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["leadtype"] || [];
                                const valueIndex = checkedValues?.indexOf(3);
                                if (e.target.checked) {
                                    checkedValues.push("Data");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Clicks</label>
                        )}
                        />
                        </div>
                        <div className="check-list">
                        <Controller
                        control={control}
                        name="insuranceverticals"
                        render={({ field, formState }) => (
                            <>
                                <label style={{width: "10%"}}>
                                <input
                                    {...field}
                                    type="checkbox"
                                    value=""
                                    style={{ width: "30px", height: "40px", position: "relative", 
                                    display: "inline-block", verticalAlign: "middle", marginRight: "10px", }}
                                    onChange={(e) => {
                                    const checkedValues = getValues()["insuranceverticals"] || [];
                                    const valueIndex = checkedValues?.indexOf(4);
                                    if (e.target.checked) {
                                        checkedValues.push("Auto");
                                    } else {
                                        checkedValues.splice(valueIndex, 1);
                                    }
                                    field.onChange(checkedValues);
                                    }}
                                />Others</label>
                                <UseFormTextField control={control} name="checkboxinput1" className="other-line-input" />
                            </>
                        )}
                        
                        />
                        </div>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" }}>
                        <b>What are the primary sources of these leads?*</b>
                    </label>
                    <div className="checkbox-list">
                        <div className="check-list">
                        <Controller
                        control={control}
                        name="primarysources"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Websites"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["primarysources"] || [];
                                const valueIndex = checkedValues?.indexOf(0);
                                if (e.target.checked) {
                                    checkedValues.push("Data");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Websites</label>
                        )}
                        />
                        <Controller
                        control={control}
                        name="primarysources"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Tv"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["primarysources"] || [];
                                const valueIndex = checkedValues?.indexOf(1);
                                if (e.target.checked) {
                                    checkedValues.push("Data");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Tv</label>
                        )}
                        />
                            <Controller
                        control={control}
                        name="primarysources"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Radio"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["primarysources"] || [];
                                const valueIndex = checkedValues?.indexOf(2);
                                if (e.target.checked) {
                                    checkedValues.push("Data");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Radio</label>
                        )}
                        />
                        <Controller
                        control={control}
                        name="primarysources"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Direct Mail"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["primarysources"] || [];
                                const valueIndex = checkedValues?.indexOf(3);
                                if (e.target.checked) {
                                    checkedValues.push("Data");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Direct Mail</label>
                        )}
                        />
                        </div>
                        <div className="check-list" style={{ width: "38.8%" }}>
                        <Controller
                        control={control}
                        name="primarysources"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Social"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["primarysources"] || [];
                                const valueIndex = checkedValues?.indexOf(4);
                                if (e.target.checked) {
                                    checkedValues.push("Data");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Social</label>
                        )}
                        />
                        <Controller
                        control={control}
                        name="primarysources"
                        render={({ field, formState }) => (
                            <label>
                            <input
                                {...field}
                                type="checkbox"
                                value="Data"
                                style={{ width: "30px", height: "40px", position: "relative", 
                                display: "inline-block", verticalAlign: "middle", marginRight: "10px" }}
                                onChange={(e) => {
                                const checkedValues = getValues()["primarysources"] || [];
                                const valueIndex = checkedValues?.indexOf(5);
                                if (e.target.checked) {
                                    checkedValues.push("Data");
                                } else {
                                    checkedValues.splice(valueIndex, 1);
                                }
                                field.onChange(checkedValues);
                                }}
                            />Data</label>
                        )}
                        />
                        </div>
                        <div className="check-list">
                        <Controller
                        control={control}
                        name="insuranceverticals"
                        render={({ field, formState }) => (
                            <>
                                <label style={{width: "10%"}}>
                                <input
                                    {...field}
                                    type="checkbox"
                                    value=""
                                    style={{ width: "30px", height: "40px", position: "relative", 
                                    display: "inline-block", verticalAlign: "middle", marginRight: "10px", }}
                                    onChange={(e) => {
                                    const checkedValues = getValues()["insuranceverticals"] || [];
                                    const valueIndex = checkedValues?.indexOf(4);
                                    if (e.target.checked) {
                                        checkedValues.push("Auto");
                                    } else {
                                        checkedValues.splice(valueIndex, 1);
                                    }
                                    field.onChange(checkedValues);
                                    }}
                                />Others</label>
                                <UseFormTextField control={control} name="checkboxinput2" className="other-line-input" />
                            </>
                        )}
                        />
                        </div>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>What is your daily average volume by insurance vertical and lead type and how does this vary by season?*</b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="volume"  placeholder="Volume "  />
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>Do you work with a Call Center? Is this an owned and operated call center? Where is it located? Is the Customer data stored in the United States?* </b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="canswer" placeholder="Your answer " />
                    </div>
                </div>
                <div className="row" style={{marginTop: "100px"}}>
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446"}}>
                            <b>Are the majority of your sources (sites,ads, etc.) owned and operated or 3rd party?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li style={{ marginBottom: "10px" }}>
                            <Controller
                                name="radiooption3"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="Owned & Operated" name="radioOption3" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>Owned & Operated</label>
                                        {error && <span style={{ color: "red", position: "relative" , bottom: "55%" }}>Please select an option</span>}
                                        
                                    </>)}
                                />
                            </li>
                            <li>
                            <Controller
                                name="radiooption3"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="3rd Party" defaultValue="" name="radioOption3" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>3rd Party</label>
                                    </>)}
                                />
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
                            <Controller
                                name="radiooption4"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="Yes" name="radioOption4" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>Yes</label>
                                        {error && <span style={{ color: "red", position: "relative" , bottom: "55%" }}>Please select an option</span>}
                                    </>)}
                                />
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                            <Controller
                                name="radiooption4"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="No" name="radioOption4" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>No</label>
                                    </>)}
                                />
                            </li>
                            <li>
                            <Controller
                                name="radiooption4"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="maybe" name="radioOption4" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>maybe</label>
                                    </>)}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>What is your general pricing range by lead type?* </b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="lanswer" placeholder="Your answer " />
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Can you implement an API key  for data posting?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li style={{ marginBottom: "10px" }}>
                            <Controller
                                name="radiooption5"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="Yes" name="radioOption5" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>Yes</label>
                                        {error && <span style={{ color: "red", position: "relative" , bottom: "55%" }}>Please select an option</span>}
                                    </>)}
                                />
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                                <input type="radio" id="No" name="radio-option" />
                                <Controller
                                name="radiooption5"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="No" name="radioOption5" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>No</label>
                                    </>)}
                                />
                            </li>
                            <li>
                            <Controller
                                name="radiooption5"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={onChange} value="maybe" name="radioOption5" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>maybe</label>
                                    </>)}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>What call routing system/softwre(s) do you currently use?* </b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="sanswer"  placeholder="Your answer "  />
                    </div>
                </div>
                <div className="row" style={{marginTop: "100px"}}>
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>Are you able to filter calls by age/geographical area/states/zip codes?* </b> (List all that apply)
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="ganswer"  placeholder="Your answer " />
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446" , marginBottom: "45px"}}>
                        <b>Are you able to send a specified amount of calls by day and/or hour?* </b>(i.e if we give you a maximum number
                        of calls per day of the week/set schedule, etc.)
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="danswer"  placeholder="Your answer "  />
                    </div>
                </div>
                <div className="row top-space">
                    <label className="form-label" style={{ color: "#646446", marginBottom: "45px" }}>
                        <b>Is the majority of your traffic U65 or 065, if both what is the split between both?* </b>
                    </label>
                    <div className="col">
                        <UseFormTextField control={control} name="uanswer"  placeholder="Your answer "  />
                    </div>
                </div>
                <div className="row top-space">
                    <div className="col">
                        <label className="form-label" style={{ color: "#646446" }}>
                            <b>Do you use jornaya or Trusted Form?*</b>
                        </label>
                        <ul className="custom-radio">
                            <li style={{ marginBottom: "10px" }}>
                            <Controller
                                name="radiooption6"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={(e) => {onChange(e);setSelectedRadio2(e.target.value);}} value="Yes" name="radioOption6" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>Yes</label>
                                    </>)}
                                />
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                            <Controller
                                name="radiooption6"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={(e) => {onChange(e);setSelectedRadio2(e.target.value);}} value="No" name="radioOption6" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>No</label>
                                    </>)}
                                />
                            </li>
                            <li style={{ marginBottom: "10px" }}>
                            <Controller
                                name="radiooption6"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                                    <>
                                        <input type="radio" onChange={(e) => {onChange(e);setSelectedRadio2(e.target.value);}} value="N/A" name="radioOption6" />
                                        <label style={{ color: "#646446", borderRadius: "30px" }}>N/A</label>
                                    </>)}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 other-field">
                        <span className="other-button">Others</span>
                        <UseFormTextField
                            placeholder="Enter text here"
                            control={control}
                            border= "none"
                            outline= "none" 
                            name = "others3"
                            width="101.2%"
                            defaultValue=""
                            disabled={selectedRadio2 !== undefined}/>
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
                            <FileUploader handleChange={uploadFile}  types={FILE_TYPES} multiple="false"
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