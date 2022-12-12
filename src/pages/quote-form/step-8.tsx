import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { findCopy } from "@helpers/helper";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { getEntry } from "src/common/services/api";
import { PageContentTypes, QUOTE_FORM, QUOTE_FORM_FIELDS } from "@constants/app.constant";
import { Steps } from "@enums/steps";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { formStepSchema8 } from "@common/schema/schema";
import { OvalSpinner } from "@common/components/loaders/OvalSpinner";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import Layout from "@components/layout";
import { TypeComponent_Quote_Form_Step, TypeComponent_Quote_Form } from "@common/types";
import { StorageService } from "@common/services/storage";

type FormData = {
    life_preexisting_conditions: string;
};


export default function StepEight({ step, quoteForm }: { step: TypeComponent_Quote_Form_Step, quoteForm: TypeComponent_Quote_Form }) {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(formStepSchema8)
    });
    useEffect(() => {
        let storageData = StorageService.getItem('quote_form');
        if (storageData.life_preexisting_conditions) {
            const returnedConditions = storageData.life_preexisting_conditions.split(",");
            reset({
                life_preexisting_conditions: returnedConditions,
            })
        }
    }, []);

    const onSubmit = (data: any) => {
        setIsLoading(true);
        let fetchedConditions = data.life_preexisting_conditions.join();
        let model = { life_preexisting_conditions: fetchedConditions }
        const storageData = StorageService.getItem('quote_form');
        if (storageData) {
            model = {
                ...storageData, ...model,
            }
        }
        StorageService.setItem("quote_form", model);
        router.push('/quote-form/step-9');
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
                        <ProgressBar now={50} />
                    </div>
                </section>

                <div className="form-wrapper">
                    <div className="form-sub-title mt-5 mb-3">
                        <RichTextRenderer text={getQuestionCopy('QUESTION')} />
                    </div>
                    <section className="forms">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ul className="form-checkbox-selectors">
                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION1')}
                                            value="al"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION1')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION1')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION2')}
                                            value="ch"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION2')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION2')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION3')}
                                            value="as"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION3')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION3')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION4')}
                                            value="de"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION4')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION4')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION5')}
                                            value="bl"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION5')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION5')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION6')}
                                            value="di"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION6')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION6')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION7')}
                                            value="ca"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION7')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION7')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION8')}
                                            value="he"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION8')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION8')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION9')}
                                            value="sl"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION9')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION9')} />
                                        </label>
                                    </div>
                                </li>

                                <li>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id={getQuestionCopy('OPTION10')}
                                            value="no"
                                            {...register("life_preexisting_conditions")}
                                        />
                                        <label htmlFor={getQuestionCopy('OPTION10')}>
                                            <RichTextRenderer text={getQuestionCopy('OPTION10')} />
                                        </label>
                                    </div>
                                </li>
                                <div className="text-center">
                                    {errors.life_preexisting_conditions && <p role="alert" className="error-text">{errors.life_preexisting_conditions?.message}</p>}
                                </div>
                            </ul>
                            <div className="d-flex  justify-content-center mt-5">
                                <div className="d-inline-flex flex-md-row flex-column">
                                    <a href="/quote-form/step-7" className="btn btn-transparent-md order-2 order-md-1">  <RichTextRenderer text={getActionCopy('BACK')} /></a>
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
        slug: Steps.Step8,
        pageContentType: PageContentTypes.QuoteFormStep,
    }, context);
    return {
        props: { quoteForm: quoteForm, step: step },
    };
};
