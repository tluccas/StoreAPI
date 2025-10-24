import * as yup from "yup";

const categorySchema = yup.object().shape({
  name: yup.string().required("O nome da categoria é obrigatório."),
  description: yup.string().optional(),
});

const categoryUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  description: yup.string().optional(),
});

export { categorySchema, categoryUpdateSchema };
