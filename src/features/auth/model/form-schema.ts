import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().email('Некорректный формат электронной почты').required('Обязательное поле'),
  password: yup.string().required('Обязательное поле').min(6, 'Минимальная длина - 6 символов'),
});

export const registerSchema = yup.object().shape({
  username: yup.string().email('Некорректный формат электронной почты').required('Обязательное поле'),
  password: yup.string().required('Обязательное поле').min(6, 'Минимальная длина - 6 символов'),
});