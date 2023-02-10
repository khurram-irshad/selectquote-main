import { Type_FAQ } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React, { useState , useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";

const FAQSection = ({ section }: { section: Type_FAQ }) => {
  const { title, list, fullWidth, color } = section.fields;
  const [activeKey, setActiveKey] = useState([]);
  const isCardActive = (eventKey: string) => {
    return activeKey.includes(eventKey);
  };

  const renderAccodionButton = (eventKey: string) => {
    return (
      <button className="rounded-circle accordion-symbol" style={{ backgroundColor: color }}>
        {isCardActive(eventKey) ? "-" : "+"}
      </button>
    );
  };

  const onCardClick = (eventKey) => {
    setActiveKey((prevState) =>
      prevState.includes(eventKey)
        ? prevState.filter((key) => key !== eventKey)
        : [...prevState, eventKey]
    );
  };
  useEffect(() => {
    onCardClick(list[0].sys.id)
    },[1])

  return (
    <div className="faq-model">
      <section
        className={`faqs-section-desktop ${fullWidth ? "container-fluid px-0" : ""}`}
      >
        <div className="faq-container">
          <h2>{title}</h2>
          <Accordion activeKey={activeKey} className="accordion-card">
            {list.map((item, index) => (
              <Card
                key={index}
                style={{borderLeftColor:isCardActive(item.sys.id) ? '#ed6306': color  }}
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
        className={`faqs-section-mobile ${fullWidth ? "container-fluid px-0" : ""}`}
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
      </section>
    </div>
  );
};
export default FAQSection;
