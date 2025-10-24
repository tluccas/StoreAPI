import * as yup from "yup";

const cartItemSchema = yup.object().shape({
  productId: yup
    .number()
    .required("O ID do produto é obrigatório.")
    .positive("O ID do produto deve ser válido."),
  quantity: yup
    .number()
    .required("A quantidade é obrigatória.")
    .positive("A quantidade deve ser maior que zero.")
    .integer("A quantidade deve ser um número inteiro."),
});

export { cartItemSchema };
