import { partnershipSchema } from "@common/schema/schema";
import { Type_Form } from "@common/types/Type_Form";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormTextField } from "@components/TextInput";
import { MyInputMask } from "@components/MyInputMask";
import { MOBILE_MASK } from "@common/constants/app.constant";
import { appService } from "@common/services/app.service";
import {
  buildBusinessTemplate,
  buildUserTemplate,
} from "@common/templates/partnership";
import { FileUploader } from "react-drag-drop-files";
import PartnershipIntro from "@components/PartnershipIntro";
import PartnershipDetail from "@components/PartnershipDetail";

const PartnershipFormSection = ({ section }: { section: Type_Form }) => {
  const [isEmailSentFund, setIsEmailSentFund] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const { title, step } = section.fields;

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(partnershipSchema),
  });
  const fileTypes = ["PNG", "JFIF", "JPEG", "PJP", "JPG", "PPT", "PPTX", "PDF", "JPE", "POT", "PPS"];
  const [uploadedFileName, setUploadedFileName] = useState<any>(null);

  const onSubmit = async (event: any) => {
    try {
      const userEmailResponse = await appService.sendPartnership({
        toEmail: event.email,
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
  console.log(section.fields)
  return (
    <div className="partnership-form">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="partnership-form-dekstop">
          <div>
            <RichTextRenderer text={title} />
            {isEmailSentFund ? (
              <p style={{ color: "#646464" }}>
                Thank you for sahring you interest in partnering with
                SelectQuote. A member of our team will be in touch shortly.
              </p>
            ) : (
              <div >
                {step === 'Intro' && <PartnershipIntro />}
                {step === 'Detail' && <PartnershipDetail />}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PartnershipFormSection;
