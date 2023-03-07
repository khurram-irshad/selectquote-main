import { REGEX } from "@common/constants/app.constant";
import * as yup from "yup";

export const partnershipSchema = yup.object().shape({
    firstName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    companyName: yup.string().required('This field is required'),
    email: yup.string().required('This field is required').matches(REGEX.EMAIL, "Please enter a valid email"),
    title: yup.string().required('This field is required'),
    phoneNumber: yup.string().required('This field is required'),
    
});
export const partnershipDetailSchema = yup.object().shape({
    comments: yup.string(),
    attachment: yup.string(),
    city : yup.string().required('This field is required'),
    state : yup.string().required('This field is required'),
    volume: yup.string().required('This field is required'),
    canswer: yup.string().required('This field is required'),
    lanswer: yup.string().required('This field is required'),
    sanswer: yup.string().required('This field is required'),
    ganswer: yup.string().required('This field is required'),
    danswer: yup.string().required('This field is required'),
    uanswer: yup.string().required('This field is required'),
    radiooption: yup.string().required('This field is required'),
    radiooption1: yup.string().required('This field is required'),
    radiooption2: yup.string().required('This field is required'),
    radiooption3: yup.string().required('This field is required'),
    radiooption4: yup.string().required('This field is required'),
    radiooption5: yup.string().required('This field is required'),
})
export const foundationSchema = yup.object().shape({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name.'),
    email: yup.string().required('Please enter your email address.').matches(REGEX.EMAIL, "Please enter a valid email address"),
    phoneNumber: yup.string().required('Please enter your phone number.'),
    organizationName: yup.string().required('Please enter your organization name.'),
    organizationWesbsite: yup.string().required('Please enter your organization website.'),
    organizationAddress: yup.string().required('Please enter your organization address.'),
    organizationStatement: yup.string().required('Please enter your organization mission statement.'),
    organizationOverview: yup.string().required('Please provide organization over view.'),
    organizationDescription: yup.string().required('Please enter your organization description.'),
    program: yup.string().required('This field cannot be blank.'),
    amount: yup.string().required('This field cannot be blank.'),
    IRS: yup.string().required('Please enter your organization IRS EIN.'),
    reference: yup.string().required('Please enter your third party reference.'),
    boardOfDirector: yup.string().required('Please enter your board directors.'),
    staffInvolved: yup.string().required('This field cannot be blank.'),
    attachment : yup.string(),
});
