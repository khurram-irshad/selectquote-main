import React from "react";
import _ from "lodash";
import ColumnSection from "./Column";
import { Type_MultiColumn } from "@common/types";
import { ComponentContentTypes } from "@common/constants/app.constant";
import { DeviceType } from "@common/types/Type_Device";

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
    backgroundImage,
    borderLeft,
    borderRight,
  } = section.fields;

  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);


  return (
    <div >
      <section className="wp-container-desktop " style={{
        padding: desktop?.fields?.padding,
        margin: desktop?.fields?.margin,
        backgroundPosition: "left center",
        backgroundImage: `url(https:${backgroundImage?.fields?.imageFile?.fields?.file?.url})`,
        backgroundColor: `${desktop?.fields?.backgroundColor}`,
      }}>
        <div
          className={`d-flex flex-column ${borderRight ? "border-r" : ""} ${fullWidth ? "container-fluid px-0" : ""
            } `}
          style={{
            justifyContent: `${justifyContent}`,
          }}
        >
          <div
            className={`d-flex flex-wrap ${!child ? "container wp-container" : ""
              } ${direction == "Horizontal" ? "flex-row" : "flex-column"} `}
            style={{
              alignItems: alignItems,
              justifyContent: `${justifyContent}`,
            }}
          >
            {columns.map((item) => (
              <div
                key={item.sys.id}
                className={`d-flex`}
                style={{
                  padding: `${padding}`,
                  justifyContent: `${justifyContent}`,
                  width: `${item.sys.contentType?.sys.id ===
                    ComponentContentTypes.MultiColumn &&
                    !item.fields.widthPercentage
                    ? 100 / Number(columnPerRow)
                    : item.fields.widthPercentage
                    }%`,
                }}
              >
                <div
                  key={section.sys.id}
                  style={{ width: "100%", justifyContent: `${justifyContent}` }}
                  className={`d-flex`}
                >

                  {item.sys.contentType?.sys.id ===
                    ComponentContentTypes.MultiColumn ? (
                    <MultiColumnSection section={item} child={true} />
                  ) : (
                    <ColumnSection section={item} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="wp-container-mobile" style={{ padding: mobile?.fields?.padding, margin: mobile?.fields?.margin, backgroundColor: `${desktop?.fields?.backgroundColor}` }}>
        <div
          className={`d-flex flex-column ${fullWidth ? "container-fluid px-0" : ""
            } `}
          style={{
            justifyContent: `${justifyContent}`,
            backgroundColor: `${backgroundColor}`,
          }}
        >
          <div
            className={`flex-wrap  ${!child ? "container wp-container" : ""} ${direction == "Horizontal" ? "flex-row" : "flex-column"
              } `}
            style={{ alignItems: alignItems }}
          >
            {columns.map((item) => (
              <div key={item.sys.id} className={`d-flex`}>
                {item.sys.contentType?.sys.id ===
                  ComponentContentTypes.MultiColumn ? (
                  <MultiColumnSection section={item} child={true} />
                ) : (
                  <div >
                    <ColumnSection section={item} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultiColumnSection;
