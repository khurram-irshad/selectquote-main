import { REGEX } from "@common/constants/app.constant";
import * as yup from "yup";


export const formStepSchema1 = yup.object().shape({
    birthMonth: yup.string().required("This field cannot be blank."),
    birthDate: yup.string().required("This field cannot be blank."),
    birthYear: yup.number()
    .typeError('This field cannot be blank.')
    .required("This field cannot be blank.")
    .min(1900, 'Year must be greater than or equal to 1900')
    .max(2004, 'To submit a request, you must be 18 years of age or older.'),
});

export const formStepSchema2 = yup.object().shape({
    gender: yup.string().required("This field cannot be blank.").nullable(),
});

export const formStepSchema3 = yup.object().shape({
    life_height_ft: yup.number().typeError('This field cannot be blank.').required("This field cannot be blank.").min(4, "Please enter a number between 4 and 7.").max(8, "Please enter a number between 4 and 7."),
    life_height_in: yup.number().typeError('This field cannot be blank.').required("This field cannot be blank.").min(0, "Please enter a number between 0 and 11.").max(11, "Please enter a number between 0 and 11."),
    life_weight: yup.number().typeError('This field cannot be blank.').required("This field cannot be blank.").min(100, "Value must be greater than or equal 100"),
});

export const formStepSchema4 = yup.object().shape({
    zip: yup.string().required('This field cannot be blank.').min(5, 'Please provide a valid zip code.').max(5, 'Please provide a valid zip code.'),
});

export const formStepSchema5 = yup.object().shape({
    life_current_insurance: yup.string().required("This field cannot be blank.").nullable(),
    life_current_amount: yup.string().when("life_current_insurance", {
        is: 'yes',
        then: yup.string().required("This field cannot be blank.").matches(REGEX.POSITIVE_NUMBER, 'Value must be greater than zero').nullable(),
    }),
});

export const formStepSchema6 = yup.object().shape({
    life_desired_amount: yup.string().required("This field cannot be blank."),
    life_desired_term: yup.string().required('This field cannot be blank.'),

});

export const formStepSchema7 = yup.object().shape({
    life_cigarette_smoker: yup.string().required("This field cannot be blank.").nullable(),
});

export const formStepSchema8 = yup.object().shape({
    life_preexisting_conditions: yup.array().required("This field cannot be blank.").nullable(),
});

export const formStepSchema9 = yup.object().shape({
    life_auto_violation: yup.string().required("This field cannot be blank.").nullable(),
});

export const formStepSchema10 = yup.object().shape({
    life_sports_high_risk: yup.string().required("This field cannot be blank.").nullable(),
});

export const formStepSchema11 = yup.object().shape({
    life_family_history: yup.string().required("This field cannot be blank.").nullable(),
});

export const formStepSchema12 = yup.object().shape({
    firstName: yup.string().required("This field cannot be blank."),
    lastName: yup.string().required("This field cannot be blank."),
});

export const formStepSchema13 = yup.object().shape({
    primary_email: yup.string().required("This field cannot be blank.").matches(REGEX.EMAIL, 'Please enter your email address in this format: yourname@example.com'),
});

export const formStepSchema14 = yup.object().shape({
    all_address: yup.string().required("This field cannot be blank."),
    zip: yup.string().required('This field cannot be blank.').min(5, 'Please provide a valid zip code.').max(5, 'Please provide a valid zip code.'),
});

export const formStepSchema15 = yup.object().shape({
    phone: yup.string().required("This field cannot be blank.").transform(value => value.replace(REGEX.PHONE, '')).min(10, 'This phone number is invalid.').max(10, 'This phone number is invalid.'),
});

export const formStepSchema16 = yup.object().shape({
    life_discovered: yup.string(),
});

export const partnershipSchema = yup.object().shape({
    firstName: yup.string().required('First name is required.'),
    lastName: yup.string().required('Last name is required.'),
    companyName: yup.string().required('Company name is required.'),
    email: yup.string().required('Email is required.').matches(REGEX.EMAIL, "Please enter a valid email"),
    title: yup.string().required('Title is required.'),
    phoneNumber: yup.string().required('Phone number is required.'),
    comments: yup.string(),
});
