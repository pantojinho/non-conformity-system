
import { z } from "zod";

export const complaintFormSchema = z.object({
  cliente: z.string().min(1, "Cliente é obrigatório"),
  descricao: z.string().min(10, "Descrição é obrigatória"),
});

export type ComplaintFormInput = z.infer<typeof complaintFormSchema>;
