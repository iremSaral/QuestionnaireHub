import * as yup from 'yup'

export const createSurveyScheme=yup.object().shape({
    title:yup.string().max(20).required(),
    description:yup.string().max(45).required(),
 //  date:yup.date().required(),
})