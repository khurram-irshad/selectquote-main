import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { PageContentTypes, QUOTE_FORM, QUOTE_FORM_FIELDS } from "@constants/app.constant";
import { getEntry } from "src/common/services/api";
import { findCopy } from "@helpers/helper";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { Steps } from "@enums/steps";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formStepSchema5 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";
import { TypeComponent_Quote_Form_Step, TypeComponent_Quote_Form } from "@common/types";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import Layout from "@components/layout";
import { StorageService } from "@common/services/storage";

type FormData = {
  life_current_insurance: string;
  life_current_amount: string;
};

export default function StepFive({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {
  const [isInsured, setIsInsured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const router = useRouter()
  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(formStepSchema5)
  });

  useEffect(() => {
    const storageData = StorageService.getItem('quote_form');

    let queryParams = StorageService.getItem('quote_form_query');
    if (queryParams && queryParams?.currently_insured) {

      setIsInsured(queryParams?.currently_insured === '1');
      reset({
        life_current_insurance: queryParams?.currently_insured === '1' ? '1' : '0',
      })
    } else if (storageData && storageData?.life_current_insurance) {
      const life_current_amount = storageData.life_current_amount;
      const life_current_insurance = storageData.life_current_insurance;
      if (life_current_insurance === '1') {
        setIsInsured(true);
        reset({
          life_current_insurance: life_current_insurance,
          life_current_amount: life_current_amount,

        })
      }
      else {
        reset({
          life_current_insurance: life_current_insurance,
          life_current_amount: null,
        })
      }
    }

  }, []);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    const storageData = StorageService.getItem('quote_form');
    let model = {
      life_current_amount: data.life_current_amount,
      life_current_insurance: data.life_current_insurance
    }
    if (model.life_current_insurance === 'no') {
      model.life_current_amount = null;
    }
    if (storageData) {
      model = {
        ...storageData, ...model,
      }
    }
    StorageService.setItem("quote_form", model);
    router.push('/quote-form/step-6');
  };

  const getQuestionCopy = (field: string) => {
    return findCopy(questionSectionCopy?.fields?.copies, field)
  }
  const getActionCopy = (field: string) => {
    return findCopy(actionCopy?.fields?.copies, field)
  }

  const { header, footer, sections } = quoteForm.fields;
  const questionSectionCopy = step?.fields?.stepCopy?.fields?.sectionsCopy?.find(x => x.fields.sectionName === QUOTE_FORM.QUESTIONS_SECTION);
  const actionCopy = quoteForm?.fields?.copy?.fields?.sectionsCopy?.find(x => x.fields.sectionName === QUOTE_FORM.ACTIONS_SECTION);

  return (
    <Layout page={quoteForm} header={header} footer={footer}>

      <section className="form-page-header">
        <p className="m-0">
          {quoteForm.fields.title}
        </p>
      </section>
      <div className="form-page">
        <section className="form-progress-bar">
          <div className="form-wrapper">
            <p>Progress</p>
            <ProgressBar now={25} />
          </div>
        </section>
        {/* FORM 2 */}
        <div className="form-wrapper">
          <div className="form-sub-title mt-5 mb-3">
            <RichTextRenderer text={getQuestionCopy('QUESTION1')} />
          </div>
          <section className="forms">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul className="form-radio-selectors">
                <li className="form-check">
                  <input
                    type="radio"
                    id="Yes"
                    value="1"
                    onClick={() => setIsInsured(true)}
                    {...register('life_current_insurance')}
                  />
                  <label htmlFor="Yes">  <RichTextRenderer text={getQuestionCopy('OPTION1')} /></label>
                </li>
                <li className="form-check">
                  <input
                    type="radio"
                    id="No"
                    value="0"
                    onClick={() => setIsInsured(false)}
                    {...register("life_current_insurance")}
                  />
                  <label htmlFor="No">  <RichTextRenderer text={getQuestionCopy('OPTION2')} /></label>
                </li>
                <div className="text-center">
                  {errors.life_current_insurance && <p role="alert" className="error-text">{errors.life_current_insurance?.message}</p>}
                </div>
              </ul>
              {isInsured && (
                <div className="sub-form-1">
                  <p className="form-sub-title mt-5 mb-0"> <RichTextRenderer text={getQuestionCopy('QUESTION2')} /></p>
                  <input type="number" className="form-control" {...register('life_current_amount')} />
                  <span className="input-label"> <RichTextRenderer text={getQuestionCopy('FIELD_HINT')} /></span>
                  {errors.life_current_amount && <p role="alert" className="error-text">{errors.life_current_amount?.message}</p>}
                </div>
              )}
              <div className="d-flex  justify-content-center mt-5">
                <div className="d-inline-flex flex-md-row flex-column">
                  <a href="/quote-form/step-4" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
                  <button className="btn btn-secondary-md d-inline order-1 order-md-2" disabled={isLoading} type="submit">
                    {isLoading ? <OvalSpinner /> : <RichTextRenderer text={getActionCopy('NEXT')} />}
                  </button>
                </div>
              </div>
            </form>
          </section>


          <div className="lock-secure text-center d-flex justify-content-center align-items-end my-4">
            <Image
              src={"/images/form/verified-lock-lt-grey-AWS.png"}
              width={30}
              height={30}
              layout="fixed"
              alt="AWS Icon"
            />
            <span className="ms-2">
              <RichTextRenderer text={getActionCopy('SECURE_TEXT')} />
            </span>
          </div>
        </div>
        <BlockRenderer section={sections} page={quoteForm} />

        {/*  */}
      </div>
    </Layout>
  );
}


export const getServerSideProps = async (context) => {
  const quoteForm = await getEntry({
    pageContentType: PageContentTypes.QuoteForm,
    select: QUOTE_FORM_FIELDS,
  }, context);
  const step = await getEntry({
    slug: Steps.Step5,
    pageContentType: PageContentTypes.QuoteFormStep,
  }, context);
  return {
    props: { quoteForm: quoteForm, step: step },
  };
};
