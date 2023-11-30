import * as yup from 'yup';

export const registerScheme=yup.object().shape({
    name:yup.string().max(45).required(),
    surname:yup.string().max(45).required(),
    phone:yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(12).required()
})
