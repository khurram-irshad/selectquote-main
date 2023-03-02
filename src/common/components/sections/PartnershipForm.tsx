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
  const { title, step } = section.fields;

 
  
  return (
    <div className="partnership-form">
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
    </div>
  );
};

export default PartnershipFormSection;
