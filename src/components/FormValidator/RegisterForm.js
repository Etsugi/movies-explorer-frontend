import * as Yup from "yup";

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Не менее 2 символов")
    .max(30, "Не более 30 символов")
    .required("Имя обязательно"),
  email: Yup.string()
    .email("Некорректный email адрес")
    .required("Email обязателен"),
  password: Yup.string()
    .min(8, "Длина пароля не менее 8 символов")
    .max(20, "Длина пароля не более 20 символов")
    .required("Пароль обязателен")
});

export default RegisterFormSchema;
