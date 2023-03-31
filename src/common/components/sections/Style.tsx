import { Type_Style } from "@common/types/Type_Style";
import React, { useEffect } from "react";

const StyleSection = ({ section }: { section: Type_Style }) => {
  const margin = section?.fields?.margin;

  useEffect(() => { 
    setTimeout(() => {
        if (window.location.href.includes('page_anchor=')) {
          const targetId = window.location.href.replace(/.*\=/, "");
          const el = document.getElementById(targetId)
          el.scrollIntoView({
            behavior: 'smooth',
          })
        }
     
    }, 500)
  }, [])

  return <div style={{ margin: margin }}></div>;
};

export default StyleSection;
