import React from "react";
import _ from "lodash";
import ColumnSection from "./Column";
import { Type_MultiColumn } from "@common/types";
import { ComponentContentTypes } from "@common/constants/app.constant";
import { DeviceType } from "@common/types/Type_Device";
import { Direction } from "@common/enums/direction";
import { useGlobalContext } from "src/context";
import { getDirection, isDesktop, isMobile } from "@common/helpers/helper";

interface MultiColumnSectionProps {
  section: Type_MultiColumn;
}

const RenderColumn = ({ parent, item }: { parent: MultiColumnSectionProps, item: any }) => {
  const { section } = parent;
  const {
    columnPerRow,
    tabletMode
  } = section.fields;
  const { screenMode, isTabView } = useGlobalContext();
  const desktop = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);
  const tablet = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Tablet);

  return <>
    {(isDesktop(screenMode) && (!tabletMode || !isTabView) && !desktop?.fields?.hidden) && (
      <div
        key={`desktop-${item.sys.id}`}
        className={`${desktop?.fields?.flexWrap ? desktop?.fields?.flexWrap : 'flex-wrap'}`}
        style={{
          width: `${item.sys.contentType?.sys.id ===
            ComponentContentTypes.MultiColumn &&
            !desktop?.fields?.widthPercentage
            ? 100 / Number(columnPerRow)
            : desktop?.fields?.widthPercentage
            }%`,
          display: desktop?.fields?.display ? desktop?.fields?.display : 'flex',
          justifyContent: `${desktop?.fields?.justifyContent}`,
          alignItems: desktop?.fields?.alignItems,
          float: desktop?.fields?.float,
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
    {(tabletMode && isTabView) && (
      <div
        key={`tablet-${item.sys.id}`}
        className={`${tablet?.fields?.flexWrap ? tablet?.fields?.flexWrap : 'flex-wrap'}`}
        style={{
          width: `${tablet?.fields?.widthPercentage}%`,
          display: tablet?.fields?.display ? tablet?.fields?.display : 'flex',
          justifyContent: `${tablet?.fields?.justifyContent}`,
          alignItems: tablet?.fields?.alignItems,
          float: tablet?.fields?.float,
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
    {(isMobile(screenMode) && (!tabletMode || !isTabView) && !mobile?.fields?.hidden) && (

      <div
        className={`${mobile?.fields?.flexWrap ? mobile?.fields?.flexWrap : 'flex-wrap'}`}
        key={`mobile-${item.sys.id}`}
        style={{
          width: `${item.sys.contentType?.sys.id ===
            ComponentContentTypes.MultiColumn &&
            !mobile?.fields?.widthPercentage
            ? 100 / Number(columnPerRow)
            : mobile?.fields?.widthPercentage
            }%`,
          display: mobile?.fields?.display ? mobile?.fields?.display : 'flex',
          justifyContent: `${mobile?.fields?.justifyContent}`,
          alignItems: mobile?.fields?.alignItems,
          float: mobile?.fields?.float,
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
    tabletMode
  } = section.fields;
  const { screenMode, isTabView } = useGlobalContext();

  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);
  const tablet = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Tablet);


  return (
    <>
      {(isDesktop(screenMode) && (!tabletMode || !isTabView)) && (
        <section className="w-100 h-100" style={{
          padding: desktop?.fields?.padding,
          margin: desktop?.fields?.margin,
          borderRadius: desktop?.fields?.borderRadius,
          backgroundPosition: "left center",
          backgroundColor: `${desktop?.fields?.backgroundColor}`,
          boxShadow: desktop?.fields?.boxShadow,
          maxWidth: desktop?.fields?.maxWidth
        }}>
          <div
            className={`${desktop?.fields?.flexWrap ? 'flex-' + desktop?.fields?.flexWrap : 'flex-wrap'} w-100 
        ${getDirection(desktop?.fields?.direction)}
        ${desktop?.fields?.separater ? "border-r " : ""}
            }`}
            style={{
              display: desktop?.fields?.display ? desktop?.fields?.display : 'flex',
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
      {(tabletMode && isTabView) && (
        <section className="h-100" style={{
          width: `${tablet?.fields?.widthPercentage}% !important`,
          padding: tablet?.fields?.padding,
          margin: tablet?.fields?.margin,
          borderRadius: tablet?.fields?.borderRadius,
          backgroundPosition: "left center",
          backgroundColor: `${tablet?.fields?.backgroundColor}`,
          boxShadow: tablet?.fields?.boxShadow,
        }}>
          <div
            className={` flex-wrap 
        ${tablet?.fields?.direction == Direction.Horizontal ? "flex-row" : "flex-column"}
        ${tablet?.fields?.separater ? "border-r " : ""}
            }`}
            style={{
              display: tablet?.fields?.display ? tablet?.fields?.display : 'flex',
              alignItems: tablet?.fields?.alignItems,
              justifyContent: `${tablet?.fields?.justifyContent}`,
            }}
          >
            {columns.map((item) => (
              <RenderColumn key={`tablet-col-${item.sys.id}`} parent={{ section }} item={item} />
            ))}
          </div>
        </section>

      )}

      {(isMobile(screenMode) && (!tabletMode || !isTabView)) && (
        <section className="w-100" style={{
          padding: mobile?.fields?.padding,
          margin: mobile?.fields?.margin,
          backgroundColor: `${mobile?.fields?.backgroundColor}`,
          backgroundImage: `url(https:${backgroundImage?.fields?.imageFile?.fields?.file?.url})`,
          borderRadius: mobile?.fields?.borderRadius,
          boxShadow: mobile?.fields?.boxShadow
        }}>
          <div
            className={`flex-wrap w-100 
            ${mobile?.fields?.separater ? "border-b" : ""}
            ${getDirection(mobile?.fields?.direction)}`}
            style={{
              display: mobile?.fields?.display ? mobile?.fields?.display : 'flex',
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
