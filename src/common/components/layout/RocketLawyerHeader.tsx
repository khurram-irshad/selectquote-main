import { Type_RocketLayerHeader } from '@common/types/Type_RocketLayerHeader'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useGlobalContext } from "src/context";
import { isDesktop, isMobile } from '@common/helpers/helper';

const RocketLawyerHeader = ({ header }: { header: Type_RocketLayerHeader }) => {
  const { screenMode } = useGlobalContext();
  const {
    primaryNumber,
    secondaryNumber
  } = header.fields;
  
  return (
    <div>
      <div className="content-main-navbar">
      {isDesktop(screenMode) && (
        <ul className="main-nav d-flex rocket-section-nav">
          <li className='right-border'>
            <Link href={"/"}>
              <a>
                <img
                  src={header?.fields?.appLogo?.fields?.imageFile?.fields?.file?.url}
                  width={254}
                  height={54}
                />
              </a>
            </Link>
            
          </li>
          <li className="rocket-logo right-border">
            <Link href={"/"}>
              <a className='rocket-logo-link'>
                <img
                  src={header?.fields?.rocketLawyerLogo?.fields?.imageFile?.fields?.file?.url}
                  width={210}
                  height={35}
                />
              </a>
            </Link>
          </li>
          <div className="phone d-flex align-items-center justify-content-center rocket-phone">
            <div className="phone-icon d-flex align-items-center phone-number-container">
                <img
                  className='rocket-tel-icon'
                  src={"/images/homepage/rocket-tel-icon.svg"}
                  width={15}
                  height={20}
                  alt="phone"
                />
                <a className="rocket-number" href={`tel:${primaryNumber}`}>
                  {primaryNumber}
                </a>
            </div>
              <a className="rocket-secondery-number" href={`tel:${secondaryNumber}`}>
                {secondaryNumber}
              </a>
          </div>
        </ul>
    )}
    {isMobile(screenMode) && (
      <>
        <div className="container wp-container main-mobile-nav d-flex justify-content-center">
          <Link href={"/"}>
            <div className='right-border-mobile'>
              <a>
                <img
                  src={header?.fields?.appLogo?.fields?.imageFile?.fields?.file?.url}
                  width={139}
                  height={29}
                />
              </a>
            </div>
          </Link>
          <Link href={"/"}>
            <a className='rocket-mobile-logo'>
              <img
                src={header?.fields?.rocketLawyerLogo?.fields?.imageFile?.fields?.file?.url}
                width={145}
                height={25}
                />
            </a>
          </Link>
        </div>
        <div className="rocket-content-banner d-flex align-items-center justify-content-center">
        <div className="phone-icon d-flex align-items-center phone-number-mobile-container">
                <img
                  src={"/images/homepage/phone-icon-mobile.webp"}
                  width={15}
                  height={20}
                  alt="phone"
                />
                <a className="rocket-number-mobile" href={`tel:${primaryNumber}`}>
                  {primaryNumber}
                </a>
            </div>
              <a className="rocket-secondery-number-mobile" href={`tel:${secondaryNumber}`}>
                {secondaryNumber}
              </a>
        </div>
      </>
    )}
    </div>
  </div>
  )
}

export default RocketLawyerHeader