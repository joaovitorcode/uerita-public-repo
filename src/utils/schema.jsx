import * as yup from 'yup'

const signUp = yup.object({
  name: yup.string().min(3).max(15).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const signIn = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(15).required(),
})

const recover = yup.object({
  email: yup.string().email().required(),
})

const changePassword = yup.object({
  password: yup.string().min(8).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
})

const writePost = yup.object({
  title: yup.string().min(1).max(150).required(),
  body: yup.string().min(1).max(10000).required(),
})

const publicData = yup.object({
  name: yup.string().min(3).max(15),
  identity: yup.string().min(3).max(15),
  bio: yup.string().min(1).max(150),
})

const privateData = yup.object({
  password: yup.string().min(8).max(15),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
  email: yup.string().email(),
  confirmEmail: yup.string().oneOf([yup.ref('email'), null]),
})

const reportModal = yup.object({
  reference: yup.string().min(40).max(55).required(),
  note: yup.string().min(1).max(1000).required(),
})

export const schema = {
  signUp,
  signIn,
  recover,
  changePassword,
  writePost,
  publicData,
  privateData,
  reportModal,
}
