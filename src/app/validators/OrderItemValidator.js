import * as yup from "yup";

const orderItemSchema = yup.object().shape({
  orderId: yup
    .number()
    .required("O ID do pedido é obrigatório.")
    .positive("O ID do pedido deve ser um número positivo."),
  productId: yup
    .number()
    .required("O ID do produto é obrigatório.")
    .positive("O ID do produto deve ser um número positivo."),
  quantity: yup
    .number()
    .required("A quantidade é obrigatória.")
    .positive("A quantidade deve ser maior que zero.")
    .integer("A quantidade deve ser um número inteiro."),
  price: yup
    .number()
    .required("O preço é obrigatório.")
    .positive("O preço deve ser um número positivo."),
});

const orderItemUpdateSchema = yup.object().shape({
  quantity: yup
    .number()
    .positive("A quantidade deve ser maior que zero.")
    .integer("A quantidade deve ser um número inteiro."),
  price: yup.number().positive("O preço deve ser um número positivo."),
});

export { orderItemSchema, orderItemUpdateSchema };
