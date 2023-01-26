import { Type_Header } from "@common/types/Type_Header";
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/router";
import Link from "next/link";
import { NavLink } from "./navLink";

export default function MainHeader({ header }: { header: Type_Header }) {
  const router = useRouter();
  const {
    logo,
    logoWithTag,
    contactNumber,
    bannerText,
    menuItems,
    primaryButtonText,
  } = header.fields;

  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [slides, setSlides] = useState([]);
  const [childSlides, setChildSlides] = useState([]);
  const [slideNav, setSlideNav] = useState([]);
  const [screenWidth, setScreenWidth] = useState(0);

  const path = router.asPath;

  const renderMainLink = (linkData: any) => {
    const { linkUrl, linkText, hyperlink } = linkData.fields;
    return hyperlink ? (
      <a target="_self" href={`${linkUrl}`} rel="noopener noreferrer">
        {linkText}
      </a>
    ) : (
      <NavLink
        href={linkUrl}
        className=""
        exact={linkUrl === "/" ? true : false}
      >
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
          >
            {linkText}
          </a>
        </div>
      );
    }

    if (!parent) {
      return (
        <div>
          <Link className="basicbtn" href={linkUrl} target="_self">
            <a target="_self">{linkText}</a>
          </Link>
        </div>
      );
    }

    if (parent) {
      return (
        <div className="dropdown">
          <a href="#" className="dropbtn">
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
        >
          <div className="anchor-wrap">{linkText}</div>
        </a>
      );
    }

    if (!parent) {
      return (
        <Link href={linkUrl} key={key} target="_self">
          <a target="_self">
            <div className="anchor-wrap">{linkText}</div>
          </a>
        </Link>
      );
    }

    if (parent) {
      return (
        <div className="dropdown" key={key}>
          <a href="#" className="dropbtn">
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
          <a className="phone-cta" href={`tel:${contactNumber}`}>
            {contactNumber}
          </a>
        </div>
      </div>
      <div className="content-main-navbar">
        {screenWidth > 0 && screenWidth > 1023 && (
          <ul className="main-nav d-flex">
            <li>
              <Link href={"/"}>
                <a>
                  <img
                    src={logo?.fields?.imageFile?.fields?.file?.url}
                    width={190}
                    alt={logo?.fields?.imageName || "logo"}
                  />
                </a>
              </Link>
            </li>
            {menuItems.map((menuItem, key) => (
              <li key={`menuItem${key}`}>{renderMainLink(menuItem)}</li>
            ))}
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
          </ul>
        )}
        {screenWidth > 0 && screenWidth < 1024 && (
          <>
            <div className="container wp-container main-mobile-nav">
              <div
                className="burger-logo"
                onClick={() => {
                  setShowSearch(false);
                  setShowMobileMenu(!showMobileMenu);
                }}
              ></div>
              <Link href={"/"}>
                <a>
                  <img
                    className="logo"
                    src={logoWithTag?.fields?.imageFile?.fields?.file?.url}
                    width={300}
                    height={62}
                    alt={logoWithTag?.fields?.imageName || "logo"}
                  />
                </a>
              </Link>
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
            <div className="inputs-container">
              <div className="input-container position-relative">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search !== "" && (
                  <div className="clear-btn" onClick={() => setSearch("")}>
                    <img src="/images/content/close.svg" />
                  </div>
                )}
              </div>
              <Dropdown>
                <Dropdown.Toggle className="w-100 d-flex justify-content-between align-items-center dropdown-btn text-capitalize">
                  {filter === "all" ? "All results" : filter}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100 dropdown-content">
                  <Dropdown.Item
                    className={filter === "all" ? "selected" : ""}
                    onClick={() => setFilter("all")}
                  >
                    All results
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={filter === "action 1" ? "selected" : ""}
                    onClick={() => setFilter("action 1")}
                  >
                    Action 1
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={filter === "action 2" ? "selected" : ""}
                    onClick={() => setFilter("action 2")}
                  >
                    Another 2
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={filter === "action 3" ? "selected" : ""}
                    onClick={() => setFilter("action 3")}
                  >
                    Action 3
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="search-results">
              <div className="label">
                180 results <b>{filter}</b>
              </div>
              <div className="search-item d-flex align-items-center">
                <img
                  src="/images/content/paying-taxes.webp"
                  alt="paying-taxes"
                  width={98}
                  height={98}
                />
                <div className="details">
                  <h2>
                    <a href="#">
                      Questions to Ask When Buying Life Insurance | SelectQuote
                    </a>
                  </h2>
                  <p>
                    There are many factors to consider when shopping for life
                    insurance and finding the right policy. When buying life
                    insurance you should ask questions like. There are many
                    factors to consider when shopping for life insurance and
                    finding the right policy. When buying life insurance you
                    should ask questions like......
                  </p>
                </div>
              </div>
              <div className="search-item d-flex align-items-center">
                <img
                  src="/images/content/paying-taxes.webp"
                  alt="paying-taxes"
                  width={98}
                  height={98}
                />
                <div className="details">
                  <h2>
                    <a href="#">
                      Questions to Ask When Buying Life Insurance | SelectQuote
                    </a>
                  </h2>
                  <p>
                    There are many factors to consider when shopping for life
                    insurance and finding the right policy. When buying life
                    insurance you should ask questions like. There are many
                    factors to consider when shopping for life insurance and
                    finding the right policy. When buying life insurance you
                    should ask questions like......
                  </p>
                </div>
              </div>
              <div className="search-item d-flex align-items-center">
                <img
                  src="/images/content/paying-taxes.webp"
                  alt="paying-taxes"
                  width={98}
                  height={98}
                />
                <div className="details">
                  <h2>
                    <a href="#">
                      Questions to Ask When Buying Life Insurance | SelectQuote
                    </a>
                  </h2>
                  <p>
                    There are many factors to consider when shopping for life
                    insurance and finding the right policy. When buying life
                    insurance you should ask questions like. There are many
                    factors to consider when shopping for life insurance and
                    finding the right policy. When buying life insurance you
                    should ask questions like......
                  </p>
                </div>
              </div>
            </div>
            <div className="no-result text-center">
              No search results with keyword <b>{search}</b>
            </div>
          </div>
        </div>
      </div>
      {screenWidth > 0 && screenWidth > 1023 && (
        <div className="content-sub-navbar">
          {!!menuItems.length && (
            <>
              <ul>
                {menuItems?.[0].fields?.childItems.map((childItem, key) => (
                  <li key={`subMenu${key}`}>{renderSubLink(childItem)}</li>
                ))}
              </ul>
              <a className="free-quote-btn" href="/quote-form">
                {primaryButtonText || "Get a Quote"}
              </a>
            </>
          )}
        </div>
      )}
    </header>
  );
}
