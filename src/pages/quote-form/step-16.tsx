import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from "@components/layout";
import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { PageContentTypes, QUOTE_FORM, QUOTE_FORM_FIELDS } from "@constants/app.constant";
import { getEntry } from "src/common/services/api";
import { findCopy } from "@helpers/helper";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { Steps } from "@enums/steps";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formStepSchema16 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import { TypeComponent_Quote_Form_Step, TypeComponent_Quote_Form } from "@common/types";
import { StorageService } from "@common/services/storage";

type FormData = {
    life_discovered: String;
};

export default function StepSixTeen({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(formStepSchema16)
    });
    useEffect(() => {
        let storageData = StorageService.getItem('quote_form');
        reset({
            life_discovered: storageData?.life_discovered,
        })
    }, []);

    const onSubmit = (data: any) => {
        setIsLoading(true);
        let model = { life_discovered: data.life_discovered }
        const storageData = StorageService.getItem('quote_form');
        if (storageData) {
            model = {
                ...storageData, ...model,
            }
        }
        StorageService.setItem("quote_form", model);
        //Destructure then rename
        const {
            life_desired_amount: faceAmount,
            life_current_insurance: hasExistingInsurance,
            age,
        } = storageData
        /*  Monetization Logic

        if (storageData.age >= 26 && storageData.age <= 50 && storageData.life_desired_amount <= 250000) {
            router.push('/quote-form/confirmation-mon-r');
        }
        else if (storageData.age >= 25 && storageData.age <= 69 && storageData.life_desired_amount >= 300000 && storageData.life_current_insurance === '1') {
            router.push('/quote-form/confirmation-g');
            /confirmation-mon-r/
                Ages 26-50 with requested coverage under $250K
            /confirmation-g, confirmation-r, and confirmation-y
                >= $1.5M Requested Face Amount
                Has Existing Insurance & Age 55 to 69 & >= $300K requested face amount
                Has Existing Insurance & Age 25 to 54   & >= $1M requested face amount
            /confirmation-mon-y/
                Anyone not falling into the above

            Quote form logic (no monetization)
                >= $1.5M Requested Face Amount
                Has Existing Insurance & Age 55 to 69 & >= $300K requested face amount
                 Has Existing Insurance & Age 25 to 54 & >= $1M requested face amount

            TODO: Will determine confirmation-r and confirmation-y logic
        */
        if (faceAmount < 250000 && age >= 26 && age <= 50) {
            router.push('/quote-form/confirmation-mon-r')
        }
        else if (
            faceAmount >= 1500000 ||

            (hasExistingInsurance === '1' &&
                faceAmount >= 300000 &&
                (age >= 55 && age <= 69)) ||

            (hasExistingInsurance === '1' &&
                faceAmount >= 1000000 &&
                (age >= 25 && age <= 54))
        ) {
            router.push('/quote-form/confirmation-g')
            // router.push('/quote-form/confirmation-r')
            // router.push('/quote-form/confirmation-y')
        }
        else {
            router.push('/quote-form/confirmation-mon-y')
        }

        // if (storageData.age >= 26 && storageData.age <= 50 && storageData.life_desired_amount <= 250000) {
        //     router.push('/quote-form/confirmation-mon-r');
        // }
        // else if (storageData.age >= 25 && storageData.age <= 69 && storageData.life_desired_amount >= 300000 && storageData.life_current_insurance === 'yes') {
        //     router.push('/quote-form/confirmation-g');
        // }
        // else if (storageData.life_desired_amount >= 1500000) {
        //     router.push('/quote-form/confirmation-g');
        // }
        // else {
        //     router.push('/quote-form/confirmation-mon-y');
        // }
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
                        <ProgressBar now={93} />
                    </div>
                </section>
                <p className="form-sub-title mt-5 mb-3">
                    <RichTextRenderer text={getQuestionCopy('TITLE')} />
                </p>
                <div className="form-wrapper">
                    <div className="form-sub-title mt-2 mb-5">
                        <RichTextRenderer text={getQuestionCopy('QUESTION1')} />
                    </div>
                    <section className="forms">
                        <form className="row" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-5 mx-auto">
                                <select className="form-select" {...register('life_discovered')}>
                                    <option value="">Please select</option>
                                    <option value="Local broadcast TV or Cable">
                                        Local broadcast TV or Cable</option>
                                    <option value="Streaming TV (Hulu, Sling, Roku, etc.)">
                                        Streaming TV (Hulu, Sling, Roku, etc.)</option>
                                    <option value="Local AM/FM Radio">
                                        Local AM/FM Radio</option>
                                    <option value="Satellite Radio">
                                        Satellite Radio</option>
                                    <option value="Social Media">
                                        Social Media</option>
                                    <option value="Search Engine">
                                        Search Engine</option>
                                    <option value="Podcast">
                                        Podcast</option>
                                    <option value="Word of mouth">
                                        Word of mouth</option>
                                    <option value="Other">
                                        Other</option>
                                    <option value="None of these">
                                        None of these</option>
                                </select>
                                {errors.life_discovered && <p role="alert" className="error-text">{errors.life_discovered?.message}</p>}
                            </div>

                            <div className="d-flex  justify-content-center mt-5">
                                <div className="d-inline-flex flex-md-row flex-column">
                                    <a href="/quote-form/step-15" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
                                    <button className="btn btn-secondary-md d-inline order-1 order-md-2" disabled={isLoading} type="submit">
                                        {isLoading ? <OvalSpinner /> : <RichTextRenderer text={getActionCopy('LASTSTEP')} />}
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
                    <div className="disclaimer">
                        <RichTextRenderer text={getActionCopy('DISCLAIMER')} />
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
        slug: Steps.Step16,
        pageContentType: PageContentTypes.QuoteFormStep,
    }, context);
    return {
        props: { quoteForm: quoteForm, step: step },
    };
};
