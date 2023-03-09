import React from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Type_AgentReview } from "@common/types/Type_AgentReview";

const AgentReviewSection = ({ section }: { section: Type_AgentReview }) => {
  let aboutSection = <></>;
  const { agent, status, lastReviewDate, backgroundColor, fullWidth } =
    section.fields;

  const agentName = agent.fields.name;
  const pageAnchor = agentName.toLowerCase().replace(/\s/g, "-");

  aboutSection = (
    <section
      className={`about-section ${fullWidth ? "container-fluid px-0" : ""}`}
    >
      <div className="agent-review ">
        <Image
          src="/images/content/orange-checkmark-icon.png"
          alt="orange-checkmark-icon"
          width={20}
          height={17}
        />
        <span className="mx-2">{status}</span>
        <Image
          src="/images/content/info-icon-orange.png"
          alt="orange-checkmark-icon"
          width={20}
          height={20}
        />
        <span className="mx-2">by</span>
        <a
          href={`https://www.selectquote.com/life-insurance-agent-review-panel/?page_anchor=${pageAnchor}`}
        >
          {agentName}
        </a>
        <span className="mx-2">
          last reviewed {format(parseISO(lastReviewDate), "MMMM yyyy")}
        </span>
      </div>
    </section>
  );

  return aboutSection;
};

export default AgentReviewSection;
