import React from 'react'
import { Oval } from 'react-loader-spinner'

export const OvalSpinner = () => {
    return (
        <Oval
            height={20}
            width={39}
            color="#fff"
            wrapperStyle={{}}
            wrapperClass="p-0"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#fff"
            strokeWidth={2}
            strokeWidthSecondary={2}

        />
    )
}