import { Type_Header } from "@common/types/Type_Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { NavLink } from "./navLink";
import {
  SessionStorageService,
} from "@common/services/storage";
import {  DEFAULT_PHONE_NUMBER, STORAGE } from "@constants/app.constant";

export default function MainHeader({ header }: { header: Type_Header }) {
  const router = useRouter();
  const {
    logo,
    logoWithTag,
    bannerText,
    menuItems,
  } = header.fields;

  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [slides, setSlides] = useState([]);
  const [childSlides, setChildSlides] = useState([]);
  const [slideNav, setSlideNav] = useState([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_PHONE_NUMBER);
  const [sCode, setScode] = useState('');
  const route = useRouter();

  useEffect(() => {

    const handleStorageChange = () => {
      const storageSiteData = SessionStorageService.getItem(STORAGE.SITE_SESSION_DATA);
      if (storageSiteData) {
        const {
          site_campaign_phone: site_campaign_phone,
        } = storageSiteData
        setPhoneNumber(site_campaign_phone);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {

    const storageSiteData = SessionStorageService.getItem(STORAGE.SITE_SESSION_DATA);
    if (storageSiteData) {
      const {
        site_campaign_phone: site_campaign_phone,
        site_source_code: site_source_code,
      } = storageSiteData
      setPhoneNumber(site_campaign_phone);
      setScode(site_source_code);
    }
  }, [route.query.slug]);

  useEffect(() => { 
      window.onpageshow = function (event) {
        if (window.location.href.includes('search')) {
          const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          setShowSearch(true) 
          if (event.persisted && isSafari) {
            window.location.reload();
          }
        }
      };
},[])

  const path = router.asPath;

  const renderMainLink = (linkData: any) => {
    const { linkUrl, linkText, hyperlink, childItems } = linkData.fields;

    return !childItems?.length ? (
      <a target="_self" href={`${linkUrl}`} rel="noopener noreferrer" onClick={()=>setShowSearch(false)}>
        {linkText}
      </a>
    ) : (
      <NavLink href="#" className="" exact={linkUrl === "/" ? true : false}>
        {linkText}
      </NavLink>
    );
  };

  const renderSubLink = (linkData: any) => {
    const { linkUrl, linkText, hyperlink, parent, childItems } =
      linkData.fields;

    if (hyperlink) {
      return (
        <div>
          <a
            className="basicbtn"
            target="_self"
            href={`${linkUrl}`}
            rel="noopener noreferrer"
            onClick={()=>setShowSearch(false)}
          >
            {linkText}
          </a>
        </div>
      );
    }

    if (!parent) {
      return (
        <div>
          <Link className="basicbtn" href={linkUrl} target="_self" >
            <a target="_self" onClick={()=>setShowSearch(false)}>{linkText}</a>
          </Link>
        </div>
      );
    }

    if (parent) {
      return (
        <div className="dropdown">
          <a target="_self" rel="noopener noreferrer" className="dropbtn">
            {linkText}
          </a>
          <div className="dropdown-content">
            {childItems.map((childItem, key) =>
              renderSubChildLInk(childItem, `subchild${key}`)
            )}
          </div>
        </div>
      );
    }
  };

  const renderSubChildLInk = (linkData: any, key) => {
    const { linkUrl, linkText, hyperlink, parent, childItems } =
      linkData.fields;

    if (hyperlink) {
      return (
        <a
          target="_self"
          href={`${linkUrl}`}
          rel="noopener noreferrer"
          key={key}
          onClick={()=>setShowSearch(false)}
        >
          <div className="anchor-wrap">{linkText}</div>
        </a>
      );
    }

    if (!parent) {
      return (
        <Link href={linkUrl} key={key} target="_self">
          <a target="_self" onClick={()=>setShowSearch(false)}>
            <div className="anchor-wrap">{linkText}</div>
          </a>
        </Link>
      );
    }

    if (parent) {
      return (
        <div className="dropdown" key={key}>
          <a
            target="_self"
            href={`${linkUrl}`}
            rel="noopener noreferrer"
            key={key}
            className="dropbtn"
          >
            <div className="anchor-wrap">{linkText}</div>
          </a>
          <div className="dropdown-content">
            {childItems.map((childItem, key) =>
              renderSubChildLInk(childItem, `subchild${key}`)
            )}
          </div>
        </div>
      );
    }
  };

  const parseSlides = (menus) => {
    let nextMenus = [],
      slide = { data: [] };

    for (let i = 0; i < menus.length; i++) {
      const { linkText, linkUrl, parent, hyperlink, childItems, parentId } =
        menus[i].fields;
      const id = menus[i].sys.id;
      const data = {
        linkText,
        linkUrl,
        parent,
        hyperlink,
        id,
        parentId: parentId || "",
      };

      slide.data.push(data);

      if (parent && !hyperlink && childItems?.length > 0) {
        const insertParent = childItems.map((child) => {
          return { ...child, fields: { ...child.fields, parentId: id } };
        });
        nextMenus = nextMenus.concat(insertParent);
      }
      if (i === menus.length - 1) {
        setSlides([...slides, { ...slide, slideCount: slides.length + 1 }]);
      }
    }

    if (nextMenus.length > 0) {
      setChildSlides(nextMenus);
    }
  };

  const prev = () => {
    setSlideNav(slideNav.filter((_, i) => i != slideNav.length - 1));
  };

  const next = (id) => {
    setSlideNav([...slideNav, id]);
  };

  useEffect(() => {
    parseSlides(menuItems);
  }, [menuItems]);

  useEffect(() => {
    parseSlides(childSlides);
  }, [childSlides]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="content-header w-100 sticky-top">
      {/* Blue Nav Bar */}
      <div className="content-banner d-flex align-items-center justify-content-center gap-2">
        <span className="content-header-text">{bannerText}</span>
        <div className="phone d-flex align-items-center justify-content-center gap-2">
          <div className="phone-icon d-flex align-items-center">
            {path.includes("quote-form") ? (
              <img
                src={"/images/form/form-phone-icon.webp"}
                width={30}
                alt="phone"
              />
            ) : (
              <img
                src={"/images/homepage/phone-icon-mobile.webp"}
                width={15}
                height={20}
                alt="phone"
              />
            )}
          </div>
          <a className="phone-cta" href={`tel:${phoneNumber}`}>
            {phoneNumber}
          </a>
        </div>
      </div>
      {/* Main Nav */}
      <div className="content-main-navbar">
        {screenWidth > 0 && screenWidth > 1023 && (
          <ul className="main-nav d-flex">
            <li>
              <Link href={"/"}>
                <a onClick={()=>setShowSearch(false)}>
                  <img
                    src={logo?.fields?.imageFile?.fields?.file?.url}
                    width={210}
                    alt={logo?.fields?.imageName || "logo"}
                  />
                </a>
              </Link>
            </li>
            {menuItems.map((menuItem, key) => {
              return <li key={`menuItem${key}`}>{renderSubLink(menuItem)}</li>;
            })}
            <li
              className="search-logo"
              onClick={() => {
                setShowMobileMenu(false);
                setShowSearch(!showSearch);
              }}
            >
              <img
                width={24}
                height={24}
                src="/images/content/search.webp"
                alt="search-icon"
              />
            </li>
            <li>
              <a className="free-quote-btn" href="https://life.selectquote.com/quote-form/">
                Get a Quote
              </a>
            </li>
          </ul>
        )}
        {screenWidth > 0 && screenWidth < 1024 && (
          <>
            <div className="container wp-container main-mobile-nav">
              <Link href={"/"}>
                <a onClick={()=>setShowSearch(false)}>
                  <img
                    className="logo"
                    src={logoWithTag?.fields?.imageFile?.fields?.file?.url}
                    width={300}
                    height={62}
                    alt={logoWithTag?.fields?.imageName || "logo"}
                  />
                </a>
              </Link>
              <div className="right-buttons-group">
                <div
                  className="search-logo"
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowSearch(!showSearch);
                  }}
                >
                  <img
                    width={24}
                    height={24}
                    src="/images/content/search.webp"
                    alt="search-icon"
                  />
                </div>
                <div
                  className="burger-logo"
                  onClick={() => {
                    setShowSearch(false);
                    setShowMobileMenu(!showMobileMenu);
                  }}
                ></div>
              </div>
            </div>
            <div className={"mobile-menu " + (showMobileMenu ? "show" : "")}>
              <div className="slides">
                {slides.map((slide, key) => (
                  <div id={`slide${slide.slideCount}`} key={`slideKey${key}`}>
                    <ul>
                      {slide.slideCount !== 1 && (
                        <li>
                          <a
                            href={`#slide${slide.slideCount - 1}`}
                            className="back-btn"
                            onClick={() => prev()}
                          >
                            {slide.slideCount === 2 ? "Back Home" : "Back"}
                          </a>
                        </li>
                      )}

                      {slide.data.map((menuMobileItem, key) => (
                        <li
                          key={`menuMobileItem${key}`}
                          className={
                            (path === menuMobileItem.linkUrl ? "active" : "") +
                            (slideNav[slideNav.length - 1] ===
                              menuMobileItem.parentId || slide.slideCount === 1
                              ? ""
                              : "hidden")
                          }
                        >
                          {renderMainLink({ fields: menuMobileItem })}
                          {!menuMobileItem.hyperlink &&
                            menuMobileItem.parent && (
                              <a
                                href={`#slide${slide.slideCount + 1}`}
                                className="sub-btn"
                                onClick={() => next(menuMobileItem.id)}
                              ></a>
                            )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className={"search-container " + (showSearch ? "show" : "")}>
          <div className="container wp-container position-relative d-flex flex-column align-items-center">
            <div className="close-btn" onClick={() => setShowSearch(false)}>
              <img src="/images/content/close.svg" />
            </div>

             {/* <!-- (3) Main search bar on website --> */}
          <div id="searchfield-container"></div>
          <div id="autocomplete-container"></div>
          {/* <!-- (4) Search results page UI components --> */}
          <div id="tabs"></div>
          <div className="select-wrapper"><div id="select-list"></div></div>
          <div id="searchresults-container"></div>
          <div id="loadmore"></div>

          </div>
        </div>
        
      </div>
    </header>
  );
}
