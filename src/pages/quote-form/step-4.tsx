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
import { formStepSchema4 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import Layout from "@components/layout";
import { TypeComponent_Quote_Form_Step, TypeComponent_Quote_Form } from "@common/types";
import { StorageService } from "@common/services/storage";
import { HttpService } from "@common/services/http";

type FormData = {
  zip: string;
  state: string;
  city: string;
};

export default function StepFour({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {
  const [zipData, setZipData] = useState('');
  const [stateData, setStateData] = useState('');
  const [cityData, setCityData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const router = useRouter()

  const { register, setError, clearErrors, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(formStepSchema4)
  });
  useEffect(() => {
    const storageData = StorageService.getItem('quote_form');
    let queryParams = StorageService.getItem('quote_form_query');
    if (queryParams && queryParams?.zip) {
      reset({
        zip: queryParams?.zip,
      })
      searchState(queryParams?.zip)
    } else if (storageData && storageData?.zip) {
      const { zip, state, city } = storageData;
      setStateData(state);
      setCityData(city);
      reset({
        zip: zip,
      })
    }

  }, []);

  const searchState = (value) => {
    if (!value || value?.length < 5) {
      setIsButtonDisabled(true);
      setError("zip", { message: "Please enter a valid zip code" });
      setStateData(null);
      return;
    };
    HttpService.get(`https://api.zippopotam.us/us/${value}`)
      .then(response => {
        clearErrors("zip");
        setIsButtonDisabled(false);
        const responseStateData = response?.data?.places[0].state;
        const responseCityData = response?.data?.places[0]["place name"];
        setStateData(responseStateData);
        setCityData(responseCityData);
      }).catch(error => {
        if (error.response?.status === 404) {
          setIsButtonDisabled(true);
          setError("zip", { message: "Please enter a valid zip code" });
          setStateData(null);
        }
      })
  }

  const onSubmit = (data: any) => {
    setIsLoading(true);

    let model = {
      zip: data.zip,
      city: cityData,
      state: stateData
    }

    const storageData = StorageService.getItem('quote_form');
    const { age } = storageData

    if (storageData) {
      model = {
        ...storageData, ...model,
      }
    }

    if (
        stateData === 'South Dakota' ||
        (stateData === 'New York' && age >= 76)
    ) {
        router.push('/quote-form/confirmation-invalid')
    }

    StorageService.setItem("quote_form", model);
    router.push('/quote-form/step-5');
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
            <ProgressBar now={20} />
          </div>
        </section>
        <div className="form-wrapper">

          <div className="form-sub-title mt-5 mb-3">
            <RichTextRenderer text={getQuestionCopy('QUESTION')} />
          </div>
          <section className="forms">
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-12 col-md-5 mx-auto">
                <div className="col-12 mx-auto mb-4">
                  <label className="form-label">
                    <RichTextRenderer text={getQuestionCopy('ZIP')} /></label><span>*</span>
                  <input type="number" className="form-control"
                    {...register('zip', {
                      onChange: (event) => {
                        searchState(event.target.value);
                      },
                    })}
                  />
                  {errors.zip && <p role="alert" className="error-text">{errors.zip?.message}</p>}
                </div>
                <div className="col-12 mx-auto mb-5">
                  <label className="form-label">

                    <RichTextRenderer text={getQuestionCopy('STATE')} /></label>
                  <div className="state-container">
                    {stateData}
                  </div>
                </div>
              </div>
              <div className="d-flex  justify-content-center mt-4">
                <div className="d-inline-flex flex-md-row flex-column">
                  <a href="/quote-form/step-3" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
                  <button className="btn btn-secondary-md d-inline order-1 order-md-2" disabled={isLoading || isButtonDisabled} type="submit">
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
    slug: Steps.Step4,
    pageContentType: PageContentTypes.QuoteFormStep,
  }, context);
  return {
    props: { quoteForm: quoteForm, step: step },
  };
};
