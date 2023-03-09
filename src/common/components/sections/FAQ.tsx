import { Type_FAQ } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React, { useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import { BsChevronDown } from 'react-icons/bs';

const FAQSection = ({ section }: { section: Type_FAQ }) => {
  const { title, list, devices, homePage } = section.fields;
  const desktop = devices?.find(item => item.fields?.type === DeviceType.Desktop);
  const mobile = devices?.find(item => item.fields?.type === DeviceType.Mobile);

  const [activeKey, setActiveKey] = useState([]);
  const isCardActive = (eventKey: string) => {
    return activeKey.includes(eventKey);
  };
  const renderAccodionButton = (eventKey: string) => {
    return (
      <>
        <button className="rounded-circle accordion-symbol wp-container-desktop" style={{ backgroundColor: desktop?.fields?.textColor }}>
          {isCardActive(eventKey) ? "-" : "+"}
        </button>
        <button className="rounded-circle accordion-symbol wp-container-mobile" style={{ backgroundColor: mobile?.fields?.textColor }}>
          {isCardActive(eventKey) ? "-" : "+"}
        </button>
      </>
    );
  };
  const homePageAccordionButton = (eventKey : string ) => {
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
    <div className="faq-model">
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
      ) : ( <div>
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
                style={{ borderLeftColor: isCardActive(item.sys.id) ? '#ed6306' : desktop?.fields?.textColor }}
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
                style={{ borderLeftColor: isCardActive(item.sys.id) ? '#ed6306' : mobile?.fields?.textColor }}
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
      </section>
      </div>) }
    </div>
    
  );
};
export default FAQSection;
