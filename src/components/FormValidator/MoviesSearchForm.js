import * as Yup from "yup";

const MoviesSearchFormSchema = Yup.object().shape({
  request: Yup.string()
    .min(2, "Длина запроса не менее 2 символов")
    .max(30, "Длина запроса не более 30 символов")
    .required("Запрос обязателен")
});

export default MoviesSearchFormSchema;