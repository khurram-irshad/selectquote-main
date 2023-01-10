import { Type_Tabs } from '@common/types/Type_Tabs'
import React, { useEffect, useState }   from 'react'
const TabsSection = ({ section }: { section: Type_Tabs }) => {
    const { items} = section.fields;
    const [filter, setFilter] = useState([]);
    const handleClick = filter => {
        const data = masterData.filter( (item) => item.id.includes(filter))
        setFilter(data)

    }
    
    useEffect(() => {
        handleClick("10");
    }, []);

    const masterData = [

        { 
        "id" : "10",
        "Age / Sex" :  "25-Year Old Female",
        "$250,000 Coverage Amount" : "$8.60",
        "$500,000 Coverage Amount" : "$11.05",
        "$1M Coverage Amount" : "$15.29"
        },
        { 
        "id" : "10",
        "Age / Sex" :  "25-Year Old Female",
        "$250,000 Coverage Amount" : "$9.96",
        "$500,000 Coverage Amount" : "$13.56",
        "$1M Coverage Amount" : "$18.69"
        },
        { 
        "id" : "10",
        "Age / Sex" :  "25-Year Old Female",
        "$250,000 Coverage Amount" : "$8.98",
        "$500,000 Coverage Amount" : "$11.90",
        "$1M Coverage Amount" : "$17.89"
        },
        {
        "id" : "10", 
        "Age / Sex" :  "25-Year Old Female",
        "$250,000 Coverage Amount" : "$10.25",
        "$500,000 Coverage Amount" : "$10.25",
        "$1M Coverage Amount" : "$20.39"
        },
        { 
        "id" : "15",
        "Age / Sex" :  "25-Year Old Female",
        "$250,000 Coverage Amount" : "$9.70",
        "$500,000 Coverage Amount" : "$11.05",
        "$1M Coverage Amount" : "$15.29"
        },
        { 
        "id" : "15",
        "Age / Sex" :  "25-Year Old Female",
        "$250,000 Coverage Amount" : "$9.96",
        "$500,000 Coverage Amount" : "$13.56",
        "$1M Coverage Amount" : "$18.69"
        },
        { 
        "id" : "15",
        "Age / Sex" :  "25-Year Old Female",
        "$250,000 Coverage Amount" : "$8.98",
        "$500,000 Coverage Amount" : "$11.90",
        "$1M Coverage Amount" : "$17.89"
        },
        {
        "id" : "15", 
        "Age / Sex" :  "25-Year Old Female",
        "$250,000 Coverage Amount" : "$10.25",
        "$500,000 Coverage Amount" : "$10.25",
        "$1M Coverage Amount" : "$20.39"
        }
    ]

    return (
        <>
        <table id="tab">
            <tbody>
                <tr>
                    <td onClick={()=> handleClick("10")} className="active" data-year="10">10 Years</td>
                    <td onClick={()=> handleClick("15")} data-year="15">15 Years</td>
                    <td onClick={()=> handleClick("20")} data-year="20">20 Years</td>
                    <td onClick={()=> handleClick("25")} data-year="25">25 Years</td>
                    <td onClick={()=> handleClick("30")} data-year="30">30 Years</td>
                </tr>
            </tbody>
        </table>
        <table id="tab-data" className="table-display active">
            <tbody>
                <tr>
                    <td colSpan={4}><span>10</span> Year Term Life</td>
                </tr>
                <tr>
                    <th>Age / Sex</th>
                    <th>$250,000 Coverage Amount</th>
                    <th>$500,000 Coverage Amount</th>
                    <th>$1M Coverage Amount</th>
                </tr>
                {filter.map((item , index)=> (  
                <tr key={index}>
                    <td>{item['Age / Sex']}</td>
                    <td>{item['$250,000 Coverage Amount']}</td>
                    <td>{item['$500,000 Coverage Amount']}</td>
                    <td>{item['$1M Coverage Amount']}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </>
    )
    // return (
    //     <Tabs>
    //     {items &&
    //         items.map((item, index) => (
    //             <Tabs key={item.sys.id} title={item.fields.header}>
    //                 <div dangerouslySetInnerHTML={{ __html: item.fields.title }} />
    //             </Tabs>
    //         ))}
    //     </Tabs>
    // )
}

export default TabsSection