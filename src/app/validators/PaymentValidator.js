import * as yup from "yup";

const paymentSchema = yup.object().shape({
  orderId: yup
    .number()
    .required("O ID do pedido é obrigatório.")
    .positive("O ID do pedido deve ser válido."),
  method: yup
    .string()
    .required("O método de pagamento é obrigatório.")
    .oneOf(
      ["credit", "debit", "cash", "pix"],
      "Método inválido. Valores aceitos: credit, debit, cash, pix",
    ),
});

const paymentStatusSchema = yup.object().shape({
  status: yup
    .string()
    .required("O status é obrigatório.")
    .oneOf(
      ["pending", "confirmed", "canceled"],
      "Status inválido. Valores aceitos: pending, confirmed, canceled",
    ),
});

export { paymentSchema, paymentStatusSchema };
