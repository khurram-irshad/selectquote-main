import { Type_FAQ,  } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React, { useState } from "react";
import { Accordion,  Card } from "react-bootstrap";

const FAQSection = ({
  section,
}: {
  section: Type_FAQ;
}) => {
  const { title, list, fullWidth } = section.fields;
  const [activeKey, setActiveKey] = useState([]);
  const isCardActive = (eventKey: string) => {
    return activeKey.includes(eventKey);
  };

  const renderAccodionButton = (eventKey: string) => {
    return (
      <button className="rounded-circle accordion-symbol">
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

  return (
    <section className={`faqs-section ${fullWidth ? "container-fluid px-0" : "container wp-container"}`}>
      <div className="faq-container">
        <h2>{title}</h2>
        <Accordion activeKey={activeKey} className="accordion-card">
          {list.map((item, index) => (
            <Card
              key={index}
              onClick={() => onCardClick(item.sys.id)}
              className={`${
                isCardActive(item.sys.id) ? "card-active" : "card-inactive"
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
  );
};
export default FAQSection;
