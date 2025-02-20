import { Type_Tabs } from "@common/types/Type_Tabs";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React, { useEffect, useState } from "react";
import TableSection from "./Table";

const TabsSection = ({ section }: { section: Type_Tabs }) => {
  const { items } = section.fields;
  const [selectedTab, setselectedTab] = useState<any>(items[0]);
  const [isActive, setIsActive] = useState(null);

  const handleClick = (index: number) => {
    const data = items[index];
    setIsActive(index);
    setselectedTab(data);
  };

  const handleTabChange = (e: any) => {
    handleClick(Number(e.target.value))
  }

  useEffect(() => {
    setIsActive(0);
    setselectedTab(items[0]);
  }, []);
  return (
    <>
    <div className=" desktop-tab">
      <table id="tab">
          <tbody>
            <tr>
              {/* <td onClick={() => handleClick("10")} className="active" data-year="10">10 Years</td> */}
              {items.map((value, index) => (
                <td
                  key={`tab-${index}`}
                  className={`${isActive == index && "active"}`}
                  onClick={() => handleClick(index)}
                  data-year="30"
                >
                  {value.fields.header}
                </td>
              ))}
            </tr>
          </tbody>
      </table>
      <div className="head-title">{selectedTab?.fields?.title}</div>
      <TableSection section={selectedTab?.fields?.content} />

    </div>
    <div className="mobile-tab">
      <div className="mobile-dropdown">
          <select onChange={handleTabChange} style={{width: "100%" , padding: "10px 0 10px 10px" , color: "#4e4e4e" , fontSize: "16px" , fontWeight: "700" , border: "1px solid #646464"}}>
            {items.map((value, index) => (
                    <option 
                      key={`tab-${index}`}
                      className={`${isActive == index && "active"}`}
                      data-year="30"
                      value={index}
                    >
                      {value.fields.header}
                    </option>
                
                ))}
          </select>
      </div>
      <div className="head-title">{selectedTab?.fields?.title}</div>
      <TableSection section={selectedTab?.fields?.content} />
    </div>
    </>
  );
};

export default TabsSection;
