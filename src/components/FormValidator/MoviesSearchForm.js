import * as Yup from "yup";

const MoviesSearchFormSchema = Yup.object().shape({
  request: Yup.string()
    .max(30, "Длина запроса не более 30 символов")
});

export default MoviesSearchFormSchema;