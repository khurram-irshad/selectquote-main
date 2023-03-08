
import React from 'react'
import { UseFormTextField } from "@components/TextInput";
import { MyInputMask } from "@components/MyInputMask";
import { MOBILE_MASK } from "@common/constants/app.constant";
import { partnershipSchema } from "@common/schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { StorageService } from '@common/services/storage';

const PartnershipIntro = () => {
    const router = useRouter();
    
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(partnershipSchema),
    });

    const onSubmit = (event: any) => {
        // Store the form data in the localStorage
        StorageService.setItem('partnerShipModel' , event)
        router.push('/partnerships-detail');
    };
    
    return (
        <div>
            <div className="partnership-form">
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row intro-fields">
                        <div className="col">
                            <UseFormTextField control={control} name="firstName"  placeholder="First Name *" />
                        </div>
                        <div className="col">
                            <UseFormTextField control={control} name="lastName"  placeholder="Last Name *" />
                        </div>
                    </div>
                    <div className="row intro-fields">
                        <div className="col">
                            <UseFormTextField control={control} name="companyName"  placeholder="Company Name *" />
                        </div>
                    </div>
                    <div className="row intro-fields">
                        <div className="col">
                            <UseFormTextField control={control} name="title"  placeholder="Your Title *" />
                        </div>
                    </div>
                    <div className="row intro-fields">
                        <div className="col">
                            <UseFormTextField control={control} name="email"  placeholder="Email *" height="50px" />
                        </div>
                        <div className="col">
                            <MyInputMask
                                control={control}
                                defaultValue={""}
                                name="phoneNumber"
                                mask={MOBILE_MASK}
                                placeholder="Phone Number *"
                                height="50px"

                            />
                        </div>
                    </div>
                    
                    <div className="mt-4 button-container">
                        <button
                            className="action-btn btn-border submit-button"
                            type="submit"
                            style={{
                                color: "#ffff",
                                backgroundColor: "rgb(244, 123, 32)",
                                width: "15%"
                            }}
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PartnershipIntro