import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Layout from "@components/layout";
import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { MOBILE_MASK, PageContentTypes, QUOTE_FORM, QUOTE_FORM_FIELDS } from "@constants/app.constant";
import { findCopy, maskMobile, unmaskMobile } from "@helpers/helper";
import { getEntry } from "src/common/services/api";
import { Steps } from "@enums/steps";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formStepSchema15 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import { TypeComponent_Quote_Form_Step, TypeComponent_Quote_Form } from "@common/types";
import { StorageService } from "@common/services/storage";
import { MyInputMask } from "@components/MyInputMask";

type FormData = {
    phone: string;
};

export default function StepFifteen({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const { handleSubmit, reset,trigger, formState: { errors }, control } = useForm<FormData>({
        resolver: yupResolver(formStepSchema15),

    });

    useEffect(() => {
        let storageData = StorageService.getItem('quote_form');
        let queryParams = StorageService.getItem('quote_form_query');
        if (queryParams && queryParams?.phone) {
            reset({
                phone: maskMobile(queryParams?.phone),
            })
        } else if (storageData && storageData?.phone) {
            reset({
                phone: maskMobile(storageData?.phone),
            })
        }

    }, []);

    const onSubmit = (data: any) => {
        setIsLoading(true);
        let model = { phone: maskMobile(data.phone), }
        const storageData = StorageService.getItem('quote_form');
        if (storageData) {
            model = {
                ...storageData, ...model,
            }
        }
        StorageService.setItem("quote_form", model);
        router.push('/quote-form/step-16');
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
                <div className="form-wrapper">
                    <div className="form-sub-title mt-5 mb-5 pt-3">
                        <RichTextRenderer text={getQuestionCopy('QUESTION')} />
                    </div>
                    <section className="forms">
                        <form className="row" onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-12 col-md-6 mx-auto mb-3 mb-md-3">
                                <label className="form-label">
                                    <RichTextRenderer text={getQuestionCopy('PHONE')} />
                                </label>
                                <MyInputMask control={control} name="phone" mask={MOBILE_MASK} placeholder="" />
                                <span className="input-label"> <RichTextRenderer text={getQuestionCopy('FIELD_HINT')} /></span>
                                {errors.phone && <p role="alert" className="error-text">{errors.phone?.message}</p>}
                                <div className="d-flex  justify-content-center mt-5">
                                    <div className="d-inline-flex flex-md-row flex-column">
                                        <a href="/quote-form/step-14" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
                                        <button className="btn btn-secondary-md d-inline order-1 order-md-2" disabled={isLoading} type="submit">
                                            {isLoading ? <OvalSpinner /> : <RichTextRenderer text={getActionCopy('NEXT')} />}
                                        </button>
                                    </div>

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
                    <div className="row">
                        <div className="col-9 mx-auto">
                            <div className="final_disclaimer">
                                <RichTextRenderer text={getActionCopy('DISCLAIMER_QUOTE')} />
                            </div>

                        </div>
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
        slug: Steps.Step15,
        pageContentType: PageContentTypes.QuoteFormStep,
    }, context);
    return {
        props: { quoteForm: quoteForm, step: step },
    };
};

