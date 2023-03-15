// import { Type_TrustPilot } from '@common/types/Type_TrustPilot'
import React from 'react'
import SectionTrustPilot from './TrustPilot'

export const RocketLawyerSection = () => {
    const section = { fields: { type: "Carousel" } } as Type_TrustPilot;

    return (
        <div>
            <div className='main-copy'>
                <p className='title top-copy'>Make sure your loved ones are protected with SelectQuote, a trusted partner of Rocket Lawyer.</p>
                <p>Buying life insurance can seem intimidating, but with the cost of everything on the rise, it’s important to make sure your loved ones are protected financially. And did you know life insurance rates are actually decreasing? In just minutes, we can find the insurance you need at a price you can afford—with some policies less than $1/day.</p>
                <p>Life insurance can play a significant role in your estate plans, which is why SelectQuote and Rocket Lawyer are working together to make sure you have the right coverage for your needs. Get a free quote today at 1-XXX-XXX-XXXX.
                </p>
            </div>
            <div className='why-selectquote'>
                <div className='copy-container'>
                <p className='title text-center'>Why SelectQuote?</p>
                <p className='text-center'>At SelectQuote, we’re dedicated to helping you find the right coverage with the right carrier at the right price.
                    </p>
                    <div className='multi-column'>
                        <div>
                        <img
                            width={106}
                            height={106}
                            src="/images/content/piggybank.png"
                            alt="search-icon"
                        />
                          <p>Life insurance starting as low as $1/day**</p>
                        </div>
                        <div>
                        <img
                            width={106}
                            height={106}
                            src="/images/content/handheart.png"
                            alt="search-icon"
                        /> 
                          <p>Helped millions of families find the right life insurance for 35+ years</p>
                        </div>
                        <div>
                        <img
                            width={106}
                            height={106}
                            src="/images/content/handshake.png"
                            alt="search-icon"
                        /> 
                          <p>Work with some of the nation’s most trusted insurance carriers</p>
                        </div>
                    </div>
                </div>  
                <div className='cta-container'>
                    <button>Get a Free Quote</button>
                </div>

            </div>
            <div className='trust-pilot'>
            <SectionTrustPilot section={section} />
            </div>

            <div className='help'>
                <p className='title'>We can help with all your insurance needs.</p>
                <p>Whether it’s your family, your home or your health, we can help you protect the things in life that matter most.
                </p>
                <div className='help-column'>
                    <div> <img
                            width={200}
                            height={100}
                            src="/images/content/auto-home-icon.png"
                            alt="search-icon"
                    />
                        <p className='product-title'>Auto & Home Insurance</p>
                        <p>We’ll work to find the best price available rates in your area.</p>
                        <button>Get a Free Quote</button>
                    </div>
                    <div className='medical'>
                        <img
                            width={200}
                            height={100}
                            src="/images/content/medicare-icon.png"
                            alt="search-icon"
                        /> 
                        <p className='product-title'>Medicare Insurance</p>
                        <p>Find the perfect plan to fill your healthcare needs.</p>
                        <button>Get a Free Quote</button>
                    </div>
                </div>
            </div>
            
        </div>

    )
}
