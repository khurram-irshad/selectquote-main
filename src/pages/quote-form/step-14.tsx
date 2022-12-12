import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from "@components/layout";

import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { PageContentTypes, QUOTE_FORM, QUOTE_FORM_FIELDS } from "@constants/app.constant";
import { findCopy } from "@helpers/helper";
import { getEntry } from "src/common/services/api";
import { Steps } from "@enums/steps";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formStepSchema14 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";

import { BlockRenderer } from "@components/renderes/BlockRenderer";
import { TypeComponent_Quote_Form_Step, TypeComponent_Quote_Form } from "@common/types";
import { HttpService } from "@common/services/http";
import { StorageService } from "@common/services/storage";

type FormData = {
    all_address: string;
    zip: string;
    state: string;
    city: string;
};

export default function StepFourTeen({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {

    const router = useRouter()
    const [zipData, setZipData] = useState('');
    const [stateData, setStateData] = useState('');
    const [cityData, setCityData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const { register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(formStepSchema14)
    });

    useEffect(() => {
        const storageData = StorageService.getItem('quote_form');
        const { zip, state, city, all_address } = storageData;
        setStateData(state);
        setCityData(city);
        setStateData(state);
        setCityData(city);
        reset({
            all_address,
            zip
        })
    }, []);

    const searchState = (value) => {
        if (!value || value?.length < 5) {
            setIsButtonDisabled(true);
            setError("zip", { message: "Please enter a valid zip code" });
            setStateData(null);
            setCityData(null);
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
            state: stateData,
            all_address: data.all_address
        }
        const storageData = StorageService.getItem('quote_form');
        if (storageData) {
            model = {
                ...storageData, ...model,
            }
        }
        StorageService.setItem("quote_form", model);
        router.push('/quote-form/step-15');
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
                        <ProgressBar now={87} />
                    </div>
                </section>
                <div className="form-wrapper">
                    <p className="form-sub-title mt-5 mb-5">
                        <RichTextRenderer text={getQuestionCopy('QUESTION')} />
                    </p>
                    <section className="forms">
                        <form className="row" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-12 mx-auto mb-3 mb-md-5">
                                <label className="form-label">
                                    <RichTextRenderer text={getQuestionCopy('STREET')}
                                    /></label>
                                <input type="text" className="form-control"
                                    {...register('all_address')} />
                                {errors.all_address && <p role="alert" className="error-text">{errors.all_address?.message}</p>}
                            </div>

                            <div className="col-12 col-md-6 pe-1 mb-3 mb-md-0 mx-auto">
                                <label className="form-label">
                                    <RichTextRenderer text={getQuestionCopy('CITY')} /></label>
                                <div className="state-container">
                                    {cityData}
                                </div>
                            </div>

                            <div className="col-12 col-md-3 pe-1 mb-3 mb-md-0 mx-auto">
                                <label className="form-label">
                                    <RichTextRenderer text={getQuestionCopy('STATE')} /></label>
                                <div className="state-container">
                                    {stateData}
                                </div>

                            </div>

                            <div className="col-12 col-md-3 mb-3 mb-md-0 mx-auto">
                                <label className="form-label">
                                    <RichTextRenderer text={getQuestionCopy('ZIP')} /></label>
                                <input type="number" className="form-control"
                                    {...register('zip', {
                                        onChange: (event) => {
                                            searchState(event.target.value);
                                        },
                                    })}
                                />
                                {errors.zip && <p role="alert" className="error-text">{errors.zip?.message}</p>}

                            </div>
                            <div className="d-flex  justify-content-center mt-4">
                                <div className="d-inline-flex flex-md-row flex-column">
                                    <a href="/quote-form/step-13" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
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
        slug: Steps.Step14,
        pageContentType: PageContentTypes.QuoteFormStep,
    }, context);
    return {
        props: { quoteForm: quoteForm, step: step },
    };
};

