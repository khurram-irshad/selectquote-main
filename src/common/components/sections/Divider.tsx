import { DeviceType } from '@common/types/Type_Device';
import { Type_Divider } from '@common/types/Type_Divider'
import React from 'react'

const DividerSection = ({ section }: { section: Type_Divider }) => {
    const { thickBorder, devices } = section.fields;

    const desktop = devices?.find(item => item.fields.type === DeviceType.Desktop);
    const mobile = devices?.find(item => item.fields.type === DeviceType.Mobile);

    return (
        <>
            <div className="wp-container-desktop w-100">
                {!desktop?.fields?.hidden && (
                    <>
                        {!thickBorder && (
                            <hr style={{ margin: desktop?.fields?.margin }} />
                        )}
                        {thickBorder && (
                            <div style={{ margin: desktop?.fields?.margin, borderBottom: `${desktop?.fields?.height} solid ${desktop?.fields?.backgroundColor}` }} >
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="wp-container-mobile-block w-100">
                {!mobile?.fields?.hidden && (
                    <>
                        {!thickBorder && (
                            <hr style={{ margin: mobile?.fields?.margin }} />
                        )}
                        {thickBorder && (
                            <div style={{ margin: mobile?.fields?.margin, borderBottom: `${mobile?.fields?.height} solid ${mobile?.fields?.backgroundColor}` }} />
                        )}
                    </>
                )}
            </div>
        </ >
    )
}

export default DividerSection