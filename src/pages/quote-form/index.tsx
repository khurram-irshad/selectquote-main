import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { findCopy } from "@helpers/helper";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { getEntry } from "src/common/services/api";
import { DAYS_ARRAY, MONTH_ARRY, PageContentTypes, QUOTE_FORM, QUOTE_FORM_FIELDS } from "@constants/app.constant";
import { Steps } from "@enums/steps";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formStepSchema1 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import Layout from "@components/layout";
import { TypeComponent_Quote_Form, TypeComponent_Quote_Form_Step } from "@common/types";
import moment from "moment";
import { StorageService } from "@common/services/storage";

type FormData = {
  birthMonth: string;
  birthDate: string;
  birthYear: string;
};

export default function StepOne({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);

  const { register, watch, handleSubmit, reset, trigger, formState: { errors, isValid, touchedFields }, getValues } = useForm<FormData>({
    resolver: yupResolver(formStepSchema1)
  });

  useEffect(() => {
    const queryParams: any = router.query;
    if (Object.keys(queryParams).length > 0) {
      StorageService.setItem('quote_form_query', queryParams);
      StorageService.removeItem('quote_form');
    }
    let storageData = StorageService.getItem('quote_form');
    if (queryParams?.date_of_birth) {
      const dob = queryParams?.date_of_birth?.split("/");
      reset({
        birthDate: dob[0],
        birthMonth: dob[1],
        birthYear: dob[2],
      })
      setIsEditMode(true)
    } else if (storageData && storageData?.dob) {
      const dob = storageData?.dob?.split("-");
      reset({
        birthYear: dob[0],
        birthMonth: dob[1],
        birthDate: dob[2],
      })
      setIsEditMode(true)
    }

    const subscription = watch((value, { name, type }) => {
      trigger(name);
    });
    return () => subscription.unsubscribe();
  }, []);

  const getDate = (data) => {
    return data.birthYear + "-" + data.birthMonth + "-" + data.birthDate;
  }

  const onSubmit = async (data: any) => {
    var dob = getDate(data);
    var mydate = new Date(data.birthYear, data.birthMonth - 1, data.birthDate);
    const isValidDoB = moment(new Date()).isSameOrAfter(mydate);
    if (!isValidDoB) {
      return;
    };
    setIsLoading(true);
    setIsSubmitted(true)

    const age = moment().diff(mydate, 'years');
    let storageData = StorageService.getItem('quote_form');
    let model = { dob, age }
    if (storageData) {
      model = {
        ...storageData, ...model,
      }
    }
    StorageService.setItem("quote_form", model);
    router.push('/quote-form/step-2');
  };

  const getQuestionCopy = (field: string) => {
    return findCopy(questionSectionCopy?.fields?.copies, field)
  }
  const getActionCopy = (field: string) => {
    return findCopy(actionCopy?.fields?.copies, field)
  }
  if (isValid && !isSubmitted && !isEditMode) {
    onSubmit(getValues());
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
            <ProgressBar now={0} />
          </div>
        </section>

        <div className="form-wrapper">
          <h1 className="form-title">
            {step?.fields?.title}
          </h1>
          <div className="form-sub-title mb-4">
            <RichTextRenderer text={getQuestionCopy('QUESTION')} />
          </div>
          <section className="forms">

            <form className="row" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-12 col-md-4 pe-auto pe-md-0 mb-4 mb-md-0 ">
                <label className="form-label"><RichTextRenderer text={getQuestionCopy('MONTH')} /></label>
                <select placeholder="MM" className={`form-select ${errors.birthMonth ? "form-error" : ""}`} {...register("birthMonth")}>
                  <option value=""></option>
                  {MONTH_ARRY.map(item => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
                {errors.birthMonth && <p role="alert" className="error-text">{errors.birthMonth?.message}</p>}
              </div>
              <div className="col-12 col-md-4 mb-4 mb-md-0">
                <label className="form-label"><RichTextRenderer text={getQuestionCopy('DAY')} /></label>

                <select placeholder="MM"
                  className={`form-select ${errors.birthDate ? "form-error" : ""}`}
                  {...register("birthDate")}>
                  <option value=""></option>
                  {DAYS_ARRAY.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>

                {errors.birthDate && <p role="alert" className="error-text">{errors.birthDate?.message}</p>}
              </div>

              <div className="col-12 col-md-4 ps-auto ps-md-0 mb-4 mb-md-0">
                <label className="form-label"><RichTextRenderer text={getQuestionCopy('YEAR')} /></label>
                <input
                  type="number"
                  className={`form-control ${errors.birthYear ? "form-error" : ""}`}
                  placeholder="YYYY"
                  {...register("birthYear")}
                />
                {errors.birthYear && <p role="alert" className="error-text">{errors.birthYear?.message}</p>}
              </div>
              <div className="d-flex justify-content-center mt-5">
                <button type="submit" className="btn btn-secondary-md d-inline"
                  disabled={isLoading}>
                  {isLoading ? <OvalSpinner /> : <RichTextRenderer text={getActionCopy('NEXT')} />}
                </button>
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
    slug: Steps.Step1,
    pageContentType: PageContentTypes.QuoteFormStep,
  }, context);
  return {
    props: { quoteForm: quoteForm, step: step },
  };
};
