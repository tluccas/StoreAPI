import * as yup from "yup";

const orderSchema = yup.object().shape({
  userId: yup
    .number()
    .required("O ID do usuário é obrigatório.")
    .positive("O ID do usuário deve ser válido."),
  items: yup
    .array()
    .required("Os itens do pedido são obrigatórios.")
    .min(1, "Pelo menos um item é necessário.")
    .of(
      yup.object().shape({
        productId: yup
          .number()
          .required("O ID do produto é obrigatório.")
          .positive("O ID do produto deve ser válido."),
        quantity: yup
          .number()
          .required("A quantidade é obrigatória.")
          .positive("A quantidade deve ser maior que zero.")
          .integer("A quantidade deve ser um número inteiro."),
        price: yup
          .number()
          .required("O preço é obrigatório.")
          .positive("O preço deve ser um valor positivo."),
      }),
    ),
});

const orderStatusSchema = yup.object().shape({
  status: yup
    .string()
    .required("O status é obrigatório.")
    .oneOf(
      ["pending", "paid", "shipped", "delivered", "canceled"],
      "Status inválido. Valores aceitos: pending, paid, shipped, delivered, canceled",
    ),
});

export { orderSchema, orderStatusSchema };
