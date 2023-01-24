
import React from "react";
import _ from "lodash";
import ColumnSection from "./Column";
import { Type_MultiColumn } from "@common/types";
import { ComponentContentTypes } from "@common/constants/app.constant";

interface MultiColumnSectionProps {
  section: Type_MultiColumn;
  child?: boolean;
}

const MultiColumnSection = ({
  section,
  child = false,
}: MultiColumnSectionProps) => {
  const {
    columns,
    direction,
    justifyContent,
    columnPerRow,
    alignItems,
    fullWidth,
    padding,
    backgroundColor,
  } = section.fields;
  return (
    <div className="multi-column-section">
      <section className="multi-column-desktop">
        <div
          className={`d-flex flex-column ${fullWidth ? "container-fluid px-0" : ""
            } `}
          style={{
            justifyContent: `${justifyContent}`,
            backgroundColor: `${backgroundColor}`,
          }}
        >
        <div
          className={`d-flex flex-wrap  ${!child ? "container wp-container" : ""
            } ${direction == "Horizontal" ? "flex-row" : "flex-column"} `}
          style={{ alignItems: alignItems }}
        >
          {columns.map((item) => (
            <div
              key={item.sys.id}
              className={`d-flex`}
              style={{
                padding: `${padding}`,
                justifyContent: `${justifyContent}`,
                width: `${item.sys.contentType?.sys.id ===
                  ComponentContentTypes.MultiColumn && !item.fields.widthPercentage
                  ? 100 / Number(columnPerRow)
                  : item.fields.widthPercentage
                  }%`,
              }}
            >
              <div key={section.sys.id} style={{ width: "100%" }}>
                {item.sys.contentType?.sys.id ===
                  ComponentContentTypes.MultiColumn ? (
                  <MultiColumnSection section={item} child={true} />
                ) : (
                  <div style={{ padding: item?.fields.padding,height:'100%' }}>
                    <ColumnSection section={item} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>
      <section className="multi-column-mobile">
          <div
            className={`d-flex flex-column ${fullWidth ? "container-fluid px-0" : ""
              } `}
            style={{
              justifyContent: `${justifyContent}`,
              backgroundColor: `${backgroundColor}`,
            }}
          >
            <div
              className={`flex-wrap  ${!child ? "container wp-container" : ""
                } ${direction == "Horizontal" ? "flex-row" : "flex-column"} `}
              style={{ alignItems: alignItems }}
            >
              {columns.map((item) => (
                <div
                  key={item.sys.id}
                  className={`d-flex`}
                  style={{
                    padding: `${padding}`,
                    justifyContent: `${justifyContent}`,
                    width: "100%",
                  }}
                >
                  <div key={section.sys.id} style={{ width: "100%" }}>
                    {item.sys.contentType?.sys.id ===
                      ComponentContentTypes.MultiColumn ? (
                      <MultiColumnSection section={item} child={true} />
                    ) : (
                      <div style={{ padding: item?.fields.padding }}>
                        <ColumnSection section={item} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultiColumnSection;
