import React, { useEffect, useState } from 'react'
import Layout from '@components/layout'
import Image from 'next/image'

import {
    PageContentTypes,
    QUOTE_FORM_FIELDS,
} from '@common/constants/app.constant'
import { TypeComponent_Quote_Form } from '@common/types'
import { getEntry } from '@common/services/api'
import { StorageService } from '@common/services/storage'

const iframes = {
    bistrk: '<iframe src="https://www.bistrk.com/?nid=165&advid=1" scrolling="no" frameborder="0" width="1" height="1"></iframe>'
}

export default ({ quoteForm }: { quoteForm: TypeComponent_Quote_Form }) => {
    const { header, footer } = quoteForm.fields
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();

    const IFrame = (props) => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: props.iframe ? props.iframe : '',
                }}
            />
        )
    }

    useEffect(() => {
        let storageData = StorageService.getItem('quote_form');
        if (storageData) {
            const getZip = storageData?.zip;
            const getEmail = storageData?.primary_email;
            const getFirstName = storageData?.firstName;
            const getLastName = storageData?.lastName;
            const getFullName = getFirstName + " " + getLastName;
            const getWeight = storageData?.weight;
            const getPhoneNumber = storageData?.phone;
            const getHomeAddress = storageData?.all_address;
            const getGender = storageData?.gender;
            const getDOB = storageData?.dob;
            const getDesireTerm = storageData?.life_desired_term;
            const getFaceAmmount = storageData?.life_desired_amount;
            const getIsSmoker = storageData?.life_cigarette_smoker;
            const getRisk = storageData?.life_sports_high_risk;
            const getDUI = storageData?.life_auto_violation;
            const getIsInsured = storageData?.life_current_insurance;
            const height = storageData?.height?.split("-");
            const conditions = storageData?.life_preexisting_conditions?.split(",");
            const feet = parseInt(height[0]) * 12;
            const inch = parseInt(height[1]);
            const getTotalInches = feet + inch;

            let data = {
                zip: getZip,
                email: getEmail,
                contact: getFullName,
                phone: getPhoneNumber,
                address: getHomeAddress,
                gender: getGender,
                birth_date: getDOB,
                height: getTotalInches,
                weight: getWeight,
                tobacco: parseInt(getIsSmoker),
                high_risk: parseInt(getRisk),
                dui: parseInt(getDUI),
                currently_insured: parseInt(getIsInsured),
                coverage_type: getDesireTerm,
                coverage_amount: getFaceAmmount,
                major_condition_alcohol_drug_abuse: 0,
                major_condition_asthma: 0,
                major_condition_clinical_depression: 0,
                major_condition_high_cholesterol: 0,
                major_condition_high_blood_pressure: 0,
                major_condition_diabetes: 0,
                major_condition_cancer: 0,
                major_condition_heart_disease: 0
            }
            const preConditions = {
                al: "major_condition_alcohol_drug_abuse",
                as: "major_condition_asthma",
                de: "major_condition_clinical_depression",
                ch: "major_condition_high_cholesterol",
                bl: "major_condition_high_blood_pressure",
                di: "major_condition_diabetes",
                ca: "major_condition_cancer",
                he: "major_condition_heart_disease"
            }
            for (let i = 0; i < conditions.length; i++) {
                if (preConditions[conditions[i]]) {
                    data[preConditions[conditions[i]]] = 1
                }
            }
            let dataString = JSON.stringify(data);
            var finalData = dataString.replace(/\\/g, "");
            console.log(data);
            const renderScript = document.createElement("script");
            renderScript.innerHTML = `var MediaAlphaExchange = {
          data: ${finalData},
          placement_id: "MwB_8wVGoNoG0msYMAPB0CouQI7M1A",
          sub_1: "confirmation-y",
          type: "ad_unit",
          version: 17,
        };MediaAlphaExchange__load('mediaalpha_placeholder');`;
            var aScript = document.createElement("script");
            aScript.type = "text/javascript";
            aScript.src = "//insurance.mediaalpha.com/js/serve.js";
            aScript.async = true;
            document.head.appendChild(aScript);
            aScript.onload = function () {
                document.head.appendChild(renderScript);
            };
            console.log(finalData);
        }

    }, []);

    useEffect(() => {
        let storageData = StorageService.getItem('quote_form');
        if (storageData) {
            var email = storageData?.primary_email;
            var fname = storageData?.firstName;
            setEmail(email);
            setFirstName(fname);
        }
    }, []);
    const handleFormReset = () => {
        localStorage.clear();
        window.location.href = '/quote-form';
    }

    return (
        <Layout page={quoteForm} header={header} footer={footer}>
            <IFrame iframe={iframes['bistrk']} />
            <noscript>
                <img
                    src="https://www.bistrk.com/?nid=165&advid=1"
                    style={{ display: 'none', height: 1, width: 1 }}
                />
            </noscript>
            <section className="confirmation-y d-flex flex-column align-items-center justify-content-center">
                <div className="thank-you container wp-container d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="confirmation-message">
                        <h1>Thank you, {firstName}!! Your quote is being processed.</h1>
                        <p>
                            A SelectQuote licensed life insurance agent is
                            reviewing your application and will call you in the
                            next 15 minutes to discuss your application and
                            provide an accurate quote. If after-hours, we will
                            call you on the next business day.
                        </p>
                    </div>
                    <div className="process-overview">
                        <div className="process-images d-flex flex-row">
                            <div className="box">
                                <Image
                                    src="/images/form/desktop-computer-icon.png"
                                    height={92}
                                    width={112}
                                />
                            </div>

                            <div className="box">
                                <Image
                                    src="/images/form/orange-mobile-phone-icon.png"
                                    height={138}
                                    width={150}
                                />
                            </div>

                            <div className="box">
                                <Image
                                    src="/images/form/handheld-phone-icon.png"
                                    height={110}
                                    width={104}
                                />
                            </div>
                        </div>
                        <div>
                            <Image
                                src="/images/form/full-bar.jpg"
                                height={51}
                                width={890}
                            />
                        </div>
                        <div className="process-text d-flex flex-row">
                            <div className="box">
                                <p>Quote Requested</p>
                            </div>
                            <div className="box">
                                <p>
                                    Please answer your phone to complete your
                                    free quote
                                </p>
                            </div>
                            <div className="box">
                                <p>Get Your Quote</p>
                            </div>
                        </div>
                    </div>
                    <div className="quote-information">
                        <p>
                            Reference Number:{' '}
                            <span className="reference-number">N/A</span>
                        </p>
                        <p>
                            A confirmation email was sent to:{' '}
                            <span className="confirmation-email">{email}</span>
                        </p>
                        <p>
                            <span
                                onClick={handleFormReset}
                                className="click-here"
                            >
                                Click Here
                            </span>
                            <span>
                                {' '}
                                to start a new quote for someone else over the
                                age of 18.
                            </span>
                        </p>
                    </div>
                </div>
                <div className="call-immediately d-flex flex-column align-items-center justify-content-center">
                    <p>
                        Can’t wait? Call now and we’ll process your application
                        immediately.
                    </p>
                    <a href="tel:1-855-244-1993">1-855-244-1993</a>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const quoteForm = await getEntry(
        {
            pageContentType: PageContentTypes.QuoteForm,
            select: QUOTE_FORM_FIELDS,
        },
        context
    )

    return {
        props: { quoteForm: quoteForm },
    }
}
