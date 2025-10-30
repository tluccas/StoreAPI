import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório."),
  email: yup
    .string()
    .email("Formato de e-mail inválido.")
    .required("O e-mail é obrigatório."),
  password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  passwordConfirmation: yup
    .string()
    .when("password", (password, field) =>
      password
        ? field
            .required("A confirmação da senha é obrigatória.")
            .oneOf([yup.ref("password")])
        : field,
    ),
  role: yup.string().optional(),
});

const userUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  email: yup.string().email("Formato de e-mail inválido.").optional(),
  oldPassword: yup.string().min(6),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .when("oldPassword", (oldPassword, field) =>
      oldPassword ? field.required() : field,
    ),
  passwordConfirmation: yup
    .string()
    .when("password", (password, field) =>
      password
        ? field
            .required("Password confirmation é obrigatória.")
            .oneOf([yup.ref("password")])
        : field,
    ),
  role: yup.string().optional(),
});

const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formato de e-mail inválido.")
    .required("Insira o e-mail."),
  password: yup.string().required("Insira a senha"),
});

export { userSchema, userUpdateSchema, userLoginSchema };
