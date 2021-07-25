import * as Yup from 'yup'

export const validationSwapSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0, 'The amount has to be more than 0')
    .required('The amount is required'),
  token: Yup.string().required('The token is required').nullable(),
})

export const validationTransferSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0, 'The amount has to be more than 0')
    .required('The amount is required'),
  address: Yup.string().required('The address is required'),
})
