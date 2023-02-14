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

const RenderColumn = ({ parent, item }: { parent: MultiColumnSectionProps, item: any }) => {
  const { section, child } = parent;
  const {
    columnPerRow,
  } = section.fields;
  const desktop = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);
  return <>
    <div
      key={item.sys.id}
      className={`d-flex wp-container-desktop`}
      style={{
        width: `${item.sys.contentType?.sys.id ===
          ComponentContentTypes.MultiColumn &&
          !desktop?.fields?.widthPercentage
          ? 100 / Number(columnPerRow)
          : desktop?.fields?.widthPercentage
          }%`,
        justifyContent: `${desktop?.fields?.justifyContent}`,
        alignItems: desktop?.fields?.alignItems,
      }}
    >
      {item.sys.contentType?.sys.id ===
        ComponentContentTypes.MultiColumn ? (
        <MultiColumnSection section={item} child={true} />
      ) : (
        <ColumnSection section={item} />
      )}
    </div>
    <div
      key={item.sys.id}
      className={`d-flex wp-container-mobile`}
      style={{
        //display: mobile?.fields?.hidden ? mobile?.fields?.hidden : 'block',
        width: `${item.sys.contentType?.sys.id ===
          ComponentContentTypes.MultiColumn &&
          !mobile?.fields?.widthPercentage
          ? 100 / Number(columnPerRow)
          : mobile?.fields?.widthPercentage
          }%`,
        justifyContent: `${mobile?.fields?.justifyContent}`,
        alignItems: mobile?.fields?.alignItems,
      }}
    >
      {item.sys.contentType?.sys.id ===
        ComponentContentTypes.MultiColumn ? (
        <MultiColumnSection section={item} child={true} />
      ) : (
        <ColumnSection section={item} />
      )}
    </div>
  </>
}
const MultiColumnSection = ({
  section,
  child = false,
}: MultiColumnSectionProps) => {
  const {
    columns,
    backgroundImage,
    borderRight,
  } = section.fields;

  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);
  console.log(desktop?.fields?.fullWidth)
  return (
    <>
      <section className="wp-container-desktop d-flex w-100" style={{
        padding: desktop?.fields?.padding,
        margin: desktop?.fields?.margin,
        backgroundPosition: "left center",
        backgroundImage: `url(https:${backgroundImage?.fields?.imageFile?.fields?.file?.url})`,
        backgroundColor: `${desktop?.fields?.backgroundColor}`,
      }}>
        <div
          className={`d-flex flex-wrap 
        ${desktop?.fields?.direction == "Horizontal" ? "flex-row" : "flex-column"}
        ${borderRight ? "border-r" : ""}
        ${!child ? "container wp-container" : "w-100"} 
       
            }`}
          style={{
            alignItems: desktop?.fields?.alignItems,
            justifyContent: `${desktop?.fields?.justifyContent}`,
          }}
        >
          {columns.map((item) => (
            <RenderColumn parent={{ section, child }} item={item} />
          ))}
        </div>
      </section>
      <section className="wp-container-mobile" style={{ backgroundColor: `${mobile?.fields?.backgroundColor}` }}>
        <div
          className={`d-flex flex-wrap ${mobile?.fields?.fullWidth ? "container-fluid px-0" : ""}
          ${!child ? "container wp-container" : ""}
          ${mobile?.fields?.direction == "Horizontal" ? "flex-row" : "flex-column"}`}
          style={{
            backgroundColor: `${mobile?.fields?.backgroundColor}`,
            padding: mobile?.fields?.padding,
            margin: mobile?.fields?.margin,
            justifyContent: `${mobile?.fields?.justifyContent}`,
            alignItems: mobile?.fields?.alignItems,
          }}
        >
          {columns.map((item) => (
            <RenderColumn parent={{ section, child }} item={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MultiColumnSection;
