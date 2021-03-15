import * as Yup from "yup";

const ProfileFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Не менее 2 символов")
    .max(30, "Не более 30 символов")
    .required("Имя обязательно"),
  email: Yup.string()
    .email("Некорректный email адрес")
    .required("Email обязателен")
});

export default ProfileFormSchema;
