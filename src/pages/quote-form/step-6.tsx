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
import { formStepSchema6 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";

import { BlockRenderer } from "@components/renderes/BlockRenderer";
import Layout from "@components/layout";
import { TypeComponent_Quote_Form_Step, TypeComponent_Quote_Form } from "@common/types";
import { StorageService } from "@common/services/storage";

type FormData = {
    life_desired_amount: string;
    life_desired_term: string;
};


export default function StepSix({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false)//1
    const [isEditMode, setIsEditMode] = useState(false);//2

    const { register, setValue, handleSubmit, watch, getValues, reset, trigger, formState: { errors, isValid } } = useForm<FormData>({
        resolver: yupResolver(formStepSchema6)
    });
    useEffect(() => {
        const storageData = StorageService.getItem('quote_form');
        if (storageData && storageData.life_desired_amount) {
            setIsEditMode(true)//3
            reset({
                life_desired_amount: storageData.life_desired_amount,
                life_desired_term: storageData.life_desired_term
            })
        }
        const subscription = watch((value, { name, type }) => {
            trigger(name);
        });//4
        return () => subscription.unsubscribe(); //5
    }, []);

    const onSubmit = (data: any) => {
        setIsLoading(true);
        setIsSubmitted(true)//6
        const life_desired_amount = data.life_desired_amount;
        const life_desired_term = data.life_desired_term;

        let model = { life_desired_amount, life_desired_term }
        const storageData = StorageService.getItem('quote_form');
        if (storageData) {
            model = {
                ...storageData, ...model,
            }
        }
        StorageService.setItem("quote_form", model);
        router.push('/quote-form/step-7');
    };

    const getQuestionCopy = (field: string) => {
        return findCopy(questionSectionCopy?.fields?.copies, field)
    }
    const getActionCopy = (field: string) => {
        return findCopy(actionCopy?.fields?.copies, field)
    }

    if (isValid && !isSubmitted && !isEditMode) {//7
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
                        <ProgressBar now={35} />
                    </div>
                </section>

                <div className="form-wrapper">
                    <div className="form-sub-title mt-5 mb-3">
                        <RichTextRenderer text={getQuestionCopy('QUESTION1')} />
                    </div>
                    <section className="forms">
                        <form className="row" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-5 mx-auto">
                                <select className="form-select" {...register('life_desired_amount')}>
                                    <option value="" selected>
                                        Please select</option><option value="25000">
                                        $0 - $49,999</option><option value="75000">
                                        $50,000 - $99,999</option><option value="150000">
                                        $100,000 - $199,999</option><option value="200000">
                                        $200,000 - $299,999</option><option value="300000">
                                        $300,000 - $399,999</option><option value="400000">
                                        $400,000 - $499,999</option><option value="500000">
                                        $500,000 - $599,999</option><option value="600000">
                                        $600,000 - $699,999</option><option value="700000">
                                        $700,000 - $799,999</option><option value="800000">
                                        $800,000 - $899,999</option><option value="900000">
                                        $900,000 - $999,999</option><option value="1000000">
                                        $1,000,000 - $1,499,999</option><option value="1500000">
                                        $1,500,000 - $1,999,999</option><option value="2000000">
                                        $2,000,000 - $4,999,999</option><option value="5000000">
                                        $5,000,000 or greater</option>
                                </select>
                                {errors.life_desired_amount && <p role="alert" className="error-text">{errors.life_desired_amount?.message}</p>}
                            </div>

                            <p className="form-sub-title mt-5 mb-3">
                                <RichTextRenderer text={getQuestionCopy('QUESTION2')} />
                            </p>
                            <div className="col-5 mx-auto">
                                <select className="form-select" {...register('life_desired_term')}>
                                    <option value="" selected>
                                        Please Select
                                    </option>
                                    <option value="Term 10 Years">
                                        10 years
                                    </option>
                                    <option value="Term 15 Years">
                                        15 years
                                    </option>
                                    <option value="Term 20 Years">
                                        20 years
                                    </option>
                                    <option value="Term 30 Years">
                                        30 years
                                    </option>
                                </select>
                                {errors.life_desired_term && <p role="alert" className="error-text">{errors.life_desired_term?.message}</p>}
                            </div>

                            <div className="d-flex  justify-content-center mt-5">
                                <div className="d-inline-flex flex-md-row flex-column">
                                    <a href="/quote-form/step-5" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
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
        slug: Steps.Step6,
        pageContentType: PageContentTypes.QuoteFormStep,
    }, context);
    return {
        props: { quoteForm: quoteForm, step: step },
    };
};
