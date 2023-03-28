import { Type_FAQ } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React, { useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import { BsChevronDown } from 'react-icons/bs';

const FAQSection = ({ section }: { section: Type_FAQ }) => {
  const { title, list, devices, homePage, tableAlternate } = section.fields;
  const desktop = devices?.find(item => item.fields?.type === DeviceType.Desktop);
  const mobile = devices?.find(item => item.fields?.type === DeviceType.Mobile);

  const [activeKey, setActiveKey] = useState([]);
  const isCardActive = (eventKey: string) => {
    return activeKey.includes(eventKey);
  };
  const renderAccodionButton = (eventKey: string) => {
    return (
      <>
        <button className="rounded-circle accordion-symbol wp-container-desktop" style={{background: isCardActive(eventKey) ? desktop?.fields?.textColor : desktop?.fields?.textColor}}>
          {isCardActive(eventKey) ? "-" : "+"}
        </button>
        <button className="rounded-circle accordion-symbol wp-container-mobile" style={{background: isCardActive(eventKey) ? mobile?.fields?.textColor : mobile?.fields?.textColor}}>
          {isCardActive(eventKey) ? "-" : "+"}
        </button>
      </>
    );
  };
  const homePageAccordionButton = (eventKey: string) => {
    return (
      <>
        {isCardActive(eventKey) ? <BsChevronDown /> : <BsChevronDown />}
      </>
    )
  }
  const onCardClick = (eventKey) => {
    setActiveKey((prevState) =>
      prevState.includes(eventKey)
        ? prevState.filter((key) => key !== eventKey)
        : [...prevState, eventKey]
    );
  };
  useEffect(() => {
    onCardClick(list[0].sys.id)
  }, [1])

  return (
    <div className="accordian-model">
      {homePage ? (
        <div id="homepage-faq">
          <section
            style={{ padding: desktop?.fields?.padding, margin: desktop?.fields?.margin }}
            className={`wp-container-desktop faqs-section-desktop  ${desktop?.fields?.fullWidth ? "container-fluid px-0" : ""}`}
          >
            <div className="faq-container">
              <h2>{title}</h2>
              <Accordion activeKey={activeKey} className="accordion-card">
                {list.map((item, index) => (
                  <Card
                    key={index}
                    onClick={() => onCardClick(item.sys.id)}
                    className={`${isCardActive(item.sys.id) ? "card-active" : "card-inactive"
                      }`}
                  >
                    <Card.Header>
                      <div className="faq-title">
                        <span className="header-title">
                          <RichTextRenderer text={item.fields.question} />
                        </span>
                        {homePageAccordionButton(item.sys.id)}
                      </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={item.sys.id}>
                      <Card.Body>
                        <RichTextRenderer text={item.fields.answer} />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </div>
          </section>
          <section
            style={{ padding: mobile?.fields?.padding, margin: mobile?.fields?.margin }}
            className={`wp-container-mobile faqs-section-mobile `}
          >
            <div className="faq-container">
              <h2>{title}</h2>
              <Accordion activeKey={activeKey} className="accordion-card">
                {list.map((item, index) => (
                  <Card
                    key={index}
                    onClick={() => onCardClick(item.sys.id)}
                    className={`${isCardActive(item.sys.id) ? "card-active" : "card-inactive"
                      }`}
                  >
                    <Card.Header>
                      <div className="faq-title">
                        <span className="header-title">
                          <RichTextRenderer text={item.fields.question} />
                        </span>
                      </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={item.sys.id}>
                      <Card.Body>
                        <RichTextRenderer text={item.fields.answer} />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </div>
          </section>
        </div>
      ) : (<div>
        {!desktop?.fields?.hidden && (<section
          style={{ padding: desktop?.fields?.padding, margin: desktop?.fields?.margin }}
          className={`wp-container-desktop faqs-section-desktop  ${desktop?.fields?.fullWidth ? "container-fluid px-0" : ""}`}
        >
          <div className="faq-container">
            <h2>{title}</h2>
            <Accordion activeKey={activeKey} className="accordion-card">
              {list.map((item, index) => (
                <Card
                  key={index}
                  onClick={() => onCardClick(item.sys.id)}
                  className={`${isCardActive(item.sys.id) ? "card-active" : "card-inactive"
                    }`}
                >
                  <Card.Header>
                    <div className="faq-title">
                      <span className="header-title">
                        <RichTextRenderer text={item.fields.question} />
                      </span>
                      {renderAccodionButton(item.sys.id)}
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey={item.sys.id}>
                    <Card.Body>
                      <RichTextRenderer text={item.fields.answer} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </div>
        </section>)}
        {!mobile?.fields?.hidden && (
<section
          style={{ padding: mobile?.fields?.padding, margin: mobile?.fields?.margin }}
          className={`wp-container-mobile faqs-section-mobile `}
        >
          <div className="faq-container">
            <h2>{title}</h2>
            <Accordion activeKey={activeKey} className="accordion-card">
              {list.map((item, index) => (
                <Card
                  key={index}
                  onClick={() => onCardClick(item.sys.id)}
                  className={`${isCardActive(item.sys.id) ? "card-active" : "card-inactive"
                    }`}
                >
                  <Card.Header>
                    <div className="faq-title">
                      <span className="header-title">
                        <RichTextRenderer text={item.fields.question} />
                      </span>
                      {renderAccodionButton(item.sys.id)}
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey={item.sys.id}>
                    <Card.Body>
                      <div className="faq-sub-title">
                            <span className="header-sub-title">
                              <p>
                                <strong>What This Coverage Protects...</strong>
                              </p>
                            </span>
                      </div>
                      <RichTextRenderer text={item.fields.answer} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </div>
        </section>)}
      </div>)}
    </div>

  );
};
export default FAQSection;
