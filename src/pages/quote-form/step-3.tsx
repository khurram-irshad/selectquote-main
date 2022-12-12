import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { PageContentTypes, QUOTE_FORM, QUOTE_FORM_FIELDS } from "@constants/app.constant";
import { findCopy } from "@helpers/helper";
import { getEntry } from "src/common/services/api";
import { Steps } from "@enums/steps";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formStepSchema3 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import Layout from "@components/layout";
import { TypeComponent_Quote_Form, TypeComponent_Quote_Form_Step } from "@common/types";
import {StorageService} from "@common/services/storage";


type FormData = {
  life_height_ft: string;
  life_height_in: string;
  life_weight: string;
};


export default function StepThree({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)//1
  const [isEditMode, setIsEditMode] = useState(false);//2

  const { register, setValue, handleSubmit, watch, getValues, reset, trigger, formState: { errors, isValid } } = useForm<FormData>({
    resolver: yupResolver(formStepSchema3)
  });
  useEffect(() => {
    const storageData = StorageService.getItem('quote_form');
    if (storageData) {
      const weight = storageData.weight;
      if (storageData.height) {
        const height = storageData.height.split("-");
        reset({
          life_height_ft: height[0],
          life_height_in: height[1],
          life_weight: weight,
        })
        setIsEditMode(true)//3
      }

    }
    const subscription = watch((value, { name, type }) => {
      trigger(name);
    });//4
    return () => subscription.unsubscribe(); //5
  }, []);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    setIsSubmitted(true)//6
    const height = data.life_height_ft + "-" + data.life_height_in;
    const weight = data.life_weight;
    const storageData = StorageService.getItem('quote_form');

    let model = { height, weight }
    if (storageData) {
      model = {
        ...storageData, ...model,
      }
    }
    StorageService.setItem("quote_form", model);
    router.push('/quote-form/step-4');
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
 
  if (isValid && !isSubmitted && !isEditMode) {//7
    onSubmit(getValues());
  }

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
            <ProgressBar now={15} />
          </div>
        </section>
        {/* FORM 2 */}
        <div className="form-wrapper">
          <div className="form-sub-title mt-5 mb-3">
            <RichTextRenderer text={getQuestionCopy('QUESTION')} />
          </div>
          <section className="forms">
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-12 col-md-4 pe-auto pe-md-0 mb-2 mb-md-0 ">
                <label className="form-label"><RichTextRenderer text={getQuestionCopy('HEIGHT')} /></label>

                <input type="number" className="form-control" placeholder="ft"  {...register("life_height_ft")} />

                {errors.life_height_ft && <p role="alert" className="error-text">{errors.life_height_ft?.message}</p>}
              </div>
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <label className="form-label">&nbsp;</label>
                <input type="number" className="form-control" placeholder="in"  {...register("life_height_in")} />
                {errors.life_height_in && <p role="alert" className="error-text">{errors.life_height_in?.message}</p>}
              </div>

              <div className="col-12 col-md-4 ps-auto ps-md-0 mb-4 mb-md-0">
                <label className="form-label"><RichTextRenderer text={getQuestionCopy('WEIGHT')} /></label>
                <input type="number" className="form-control" placeholder="lbs" {...register("life_weight")} />

                {errors.life_weight && <p role="alert" className="error-text">{errors.life_weight?.message}</p>}
              </div>
              <div className="d-flex  justify-content-center mt-5">
                <div className="d-inline-flex flex-md-row flex-column">
                  <a href="/quote-form/step-2" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
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
    slug: Steps.Step3,
    pageContentType: PageContentTypes.QuoteFormStep,
  }, context);
  return {
    props: { quoteForm: quoteForm, step: step },
  };
};

