import React from "react";
import _ from "lodash";
import ColumnSection from "./Column";
import { Type_MultiColumn } from "@common/types";
import { ComponentContentTypes } from "@common/constants/app.constant";
import { DeviceType } from "@common/types/Type_Device";
import { Direction } from "@common/enums/direction";
import { useGlobalContext } from "src/context";
import { isDesktop, isMobile } from "@common/helpers/helper";

interface MultiColumnSectionProps {
  section: Type_MultiColumn;
}

const RenderColumn = ({ parent, item }: { parent: MultiColumnSectionProps, item: any }) => {
  const { section } = parent;
  const {
    columnPerRow,
  } = section.fields;
  const { screenMode } = useGlobalContext();
  const desktop = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);

  return <>
    {isDesktop(screenMode) && (
      <div
        key={`desktop-${item.sys.id}`}
        className={`d-flex`}
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
          <MultiColumnSection section={item} />
        ) : (
          <ColumnSection section={item} />
        )}
      </div>
    )}
    {isMobile(screenMode) && (

      <div
        key={`mobile-${item.sys.id}`}
        className={`d-flex`}
        style={{
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
          <MultiColumnSection section={item} />
        ) : (
          <ColumnSection section={item} />
        )}
      </div>
    )}
  </>
}
const MultiColumnSection = ({
  section,
}: MultiColumnSectionProps) => {
  const {
    columns,
    backgroundImage,
  } = section.fields;
  const { screenMode } = useGlobalContext();

  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);

  return (
    <>
      {isDesktop(screenMode) && (
        <section className="d-flex w-100 h-100" style={{
          padding: desktop?.fields?.padding,
          margin: desktop?.fields?.margin,
          borderRadius: desktop?.fields?.borderRadius,
          backgroundPosition: "left center",
          backgroundColor: `${desktop?.fields?.backgroundColor}`,
        }}>
          <div
            className={`d-flex flex-wrap  w-100 
        ${desktop?.fields?.direction == Direction.Horizontal ? "flex-row" : "flex-column"}
        ${desktop?.fields?.separater ? "border-r " : ""}
            }`}
            style={{
              alignItems: desktop?.fields?.alignItems,
              justifyContent: `${desktop?.fields?.justifyContent}`,
            }}
          >
            {columns.map((item) => (
              <RenderColumn key={`dekstop-col-${item.sys.id}`} parent={{ section }} item={item} />
            ))}
          </div>
        </section>

      )}

      {isMobile(screenMode) && (
        <section className="d-flex w-100" style={{
          padding: mobile?.fields?.padding,
          margin: mobile?.fields?.margin,
          backgroundColor: `${mobile?.fields?.backgroundColor}`,
          backgroundImage: `url(https:${backgroundImage?.fields?.imageFile?.fields?.file?.url})`,
          borderRadius: mobile?.fields?.borderRadius,
        }}>
          <div
            className={`d-flex flex-wrap w-100 
            ${mobile?.fields?.separater ? "border-b" : ""}
            ${mobile?.fields?.direction === Direction.Horizontal ? "flex-row" : "flex-column"}`}
            style={{
              justifyContent: `${mobile?.fields?.justifyContent}`,
              alignItems: mobile?.fields?.alignItems,
            }}
          >
            {columns.map((item) => (
              <RenderColumn key={`mobile-col-${item.sys.id}`} parent={{ section }} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default MultiColumnSection;
