import * as yup from "yup";

const productSchema = yup.object().shape({
  name: yup.string().required("O nome do produto é obrigatório."),
  description: yup.string().optional(),
  price: yup
    .number()
    .required("O preço é obrigatório.")
    .positive("O preço deve ser um valor positivo."),
  stock: yup
    .number()
    .required("O estoque é obrigatório.")
    .integer("O estoque deve ser um número inteiro.")
    .min(0, "O estoque não pode ser negativo."),
  categoryId: yup
    .number()
    .required("A categoria é obrigatória.")
    .positive("O ID da categoria deve ser válido."),
  image: yup.string().optional(),
});

const productUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  description: yup.string().optional(),
  price: yup
    .number()
    .optional()
    .positive("O preço deve ser um valor positivo."),
  stock: yup
    .number()
    .optional()
    .integer("O estoque deve ser um número inteiro.")
    .min(0, "O estoque não pode ser negativo."),
  categoryId: yup
    .number()
    .optional()
    .positive("O ID da categoria deve ser válido."),
  image: yup.string().optional(),
});

const productStockSchema = yup.object().shape({
  stock: yup
    .number()
    .required("O estoque é obrigatório.")
    .integer("O estoque deve ser um número inteiro.")
    .min(0, "O estoque não pode ser negativo."),
});

export { productSchema, productUpdateSchema, productStockSchema };
