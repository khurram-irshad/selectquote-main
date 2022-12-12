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

    const [zip, setZipCode] = useState()

    const IFrame = (props) => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: props.iframe ? props.iframe : '',
                }}
            />
        )
    }

    const handleFormReset = () => {
        localStorage.clear()
        window.location.href = '/quote-form'
    }

    useEffect(() => {
        const storageData = StorageService.getItem('quote_form')

        if (storageData) {
            setZipCode(storageData?.life_discovered)

            const renderScript = document.createElement('script')
            const params = {
                data: {
                    zip: zip
                },
                placement_id: 'HFdCKnGbnBkGGB7z7vb6QJRWmWydwA',
                sub_1: 'test sub id',
                type: 'ad_unit',
                version: 17
            }

            renderScript.innerHTML = `
                var MediaAlphaExchange = ${JSON.stringify(params)}
                MediaAlphaExchange__load('mediaalpha_placeholder')
            `
                
            const aScript = document.createElement('script')

            aScript.type = 'text/javascript'
            aScript.src = '//insurance.mediaalpha.com/js/serve.js'
            aScript.async = true
            document.head.appendChild(aScript)
            aScript.onload = function () {
                document.head.appendChild(renderScript)
            }
        }
    }, [])

    return (
        <Layout page={quoteForm} header={header} footer={footer}>
            <IFrame iframe={iframes['bistrk']} />
            <noscript>
                <img
                    src="https://www.bistrk.com/?nid=165&advid=1"
                    style={{ display: 'none', height: 1, width: 1 }}
                />
            </noscript>
            <section className="confirmation-invalid d-flex flex-column align-items-center justify-content-center">
                <div className="container wp-container d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="confirmation-message">
                        <h1>
                            Unfornately, SelectQuote does not sell life
                            insurance in your area at this time
                        </h1>
                    </div>
                    <div id="mediaalpha_placeholder" className="w-100"></div>
                    <div className="quote-information">
                        <p>
                            If you are looking for life insurance in other
                            state, please continue with the button below
                        </p>
                        <a className="free-quote-btn" onClick={handleFormReset}>
                            Get Free Quote
                        </a>
                    </div>
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
