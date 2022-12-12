import React from 'react'
export default () => {
    return <div className='suggestion-list'>
        <div className='partner card shadow d-flex flex-column flex-md-row rounded border-0'>
            <div className='featured-icon'>
                <img src="/images/form/yellow-star.png" alt="yellow star" />
            </div>
            <div className='partner-img-container d-flex align-items-center justify-content-center'>
                <img
                    className='partner-img'
                    src='/images/form/ethos.png'
                    alt='ethoslife-image'
                />
            </div>
            <div className='partner-content w-100'>
                <p className='partner-headline'>
                    Protect Your Family w/ Life Insurance in Minutes. No Exams 100% Online
                </p>
                <p className='partner-url'>
                    www.ethoslife.com
                </p>
                <ul className='partner-description'>
                    <li>No medical exams, no pushy salespeople, or hassles</li>
                    <li>100% online application - only talk to an agent if you want to</li>
                    <li>Apply in minutes from the comfort of your own home.</li>
                    <li>Protect your family for years with an affordable monthly payment</li>
                    <li>Policies from top-rated carriers. “Excellent” customer rating on Trustpilot</li>
                </ul>
            </div>
            <div className='partner-button-container d-flex align-items-center justify-content-center'>
                <button>
                    View My Quote
                </button>
            </div>
        </div>

        <div className='partner card shadow d-flex flex-column flex-md-row rounded border-0'>
        <div className='featured-icon'>
                <img src="/images/form/yellow-star.png" alt="yellow star" />
            </div>
            <div className='partner-img-container d-flex align-items-center justify-content-center'>
                <img
                    className='partner-img'
                    src='/images/form/trustage.gif'
                    alt='trustage-image'
                />
            </div>
            <div className='partner-content w-100'>
                <p className='partner-headline'>
                    Protect without breaking the budget
                </p>
                <p className='partner-url'>
                    TruStage.com
                </p>
                <ul className='partner-description'>
                    <li>Rates start at $4.80 a month,15¢ a day</li>
                    <li>Options for each budget, payment plans</li>
                    <li>We’ll help you find the best price</li>
                    <li>Get a price quote without obligation</li>
                </ul>
            </div>
            <div className='partner-button-container d-flex align-items-center justify-content-center'>
                <button>
                    View My Quote
                </button>
            </div>
        </div>

        <div className='partner card shadow d-flex flex-column flex-md-row rounded border-0'>
        <div className='featured-icon'>
                <img src="/images/form/yellow-star.png" alt="yellow star" />
            </div>
            <div className='partner-img-container d-flex align-items-center justify-content-center'>
                <img
                    className='partner-img'
                    src='/images/form/aigdirect.png'
                    alt='aigdirect-image'
                />
            </div>
            <div className='partner-content w-100'>
                <p className='partner-headline'>
                    Get $250,000 of Term Life Coverage for as Low as $13/Month opens a new window
                </p>
                <p className='partner-url'>
                    www.aigdirect.com
                </p>
                <ul className='partner-description'>
                    <li>Save up to 45% on your term life policy</li>
                    <li>Get a free, no-obligation term life insurance quote</li>
                    <li>Over 88 million customers worldwide rely on AIG</li>
                    <li>It can take 2 minutes or less to request your term life quote</li>
                </ul>
            </div>
            <div className='partner-button-container d-flex align-items-center justify-content-center'>
                <button>
                    View My Quote
                </button>
            </div>
        </div>

        <div className='partner card shadow d-flex flex-column flex-md-row rounded border-0'>
        <div className='featured-icon'>
                <img src="/images/form/yellow-star.png" alt="yellow star" />
            </div>
            <div className='partner-img-container d-flex align-items-center justify-content-center'>
                <img
                    className='partner-img'
                    src='/images/form/navymutual.png'
                    alt='navymutual-image'
                />
            </div>
            <div className='partner-content w-100'>
                <p className='partner-headline'>
                    Financial protection for those who protect the rest of us. opens a new window
                </p>
                <p className='partner-url'>
                    www.navymutual.org
                </p>
                <ul className='partner-description'>
                    <li>Navy Mutual provides affordable life insurance coverage to current, former servicemembers and their families.</li>
                    <li>Apply for up to $1.5 million in life insurance.</li>
                    <li>Choose between temporary and permanent coverage.</li>
                    <li>Affordable policies can supplement SGLI or replace VGLI.</li>
                    <li>Let us help create a safety net for your family.</li>
                </ul>
            </div>
            <div className='partner-button-container d-flex align-items-center justify-content-center'>
                <button>
                    View My Quote
                </button>
            </div>
        </div>
    </div>
}

/* TODO: convert to a dynamic component in future (after POC?) */