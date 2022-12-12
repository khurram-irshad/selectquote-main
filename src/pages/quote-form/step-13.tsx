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
import { formStepSchema13 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import { TypeComponent_Quote_Form_Step, TypeComponent_Quote_Form } from "@common/types";
import { StorageService } from "@common/services/storage";

type FormData = {
    primary_email: string;
};
export default function StepThirteen({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(formStepSchema13)
    });
    useEffect(() => {
        let storageData = StorageService.getItem('quote_form');
        let queryParams = StorageService.getItem('quote_form_query');
        if (queryParams && queryParams?.primary_email) {
            reset({
                primary_email: queryParams?.primary_email,
            })
        } else if (storageData && storageData?.primary_email) {
            reset({
                primary_email: storageData?.primary_email,
            })
        }

    }, []);
    const onSubmit = (data: any) => {
        setIsLoading(true);
        let model = { primary_email: data.primary_email }
        const storageData = StorageService.getItem('quote_form');
        if (storageData) {
            model = {
                ...storageData, ...model,
            }
        }
        StorageService.setItem("quote_form", model);
        router.push('/quote-form/step-14');
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
                        <ProgressBar now={81} />
                    </div>
                </section>

                <div className="form-wrapper">
                    <p className="form-sub-title mt-5 mb-5">
                        <RichTextRenderer text={getQuestionCopy('QUESTION')} />
                    </p>
                    <section className="forms">
                        <form className="row" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-12 col-md-6 mx-auto">
                                <label className="form-label">
                                    <RichTextRenderer text={getQuestionCopy('EMAIL')} /></label>
                                <input type="email" className="form-control" {...register("primary_email")} />
                                <span className="input-label">
                                    <RichTextRenderer text={getQuestionCopy('FIELD_HINT')} />
                                </span>
                                {errors.primary_email && <p role="alert" className="error-text">{errors.primary_email?.message}</p>}
                            </div>
                            <div className="d-flex  justify-content-center mt-5">
                                <div className="d-inline-flex flex-md-row flex-column">
                                    <a href="/quote-form/step-12" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
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
        slug: Steps.Step13,
        pageContentType: PageContentTypes.QuoteFormStep,
    }, context);
    return {
        props: { quoteForm: quoteForm, step: step },
    };
};

