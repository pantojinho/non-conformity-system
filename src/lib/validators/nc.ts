
import { z } from "zod";

export const ncFormSchema = z.object({
  pais: z.enum(["brasil", "argentina"]),
  descricao: z.string().min(10, "Descrição é obrigatória"),
  risco: z.enum(["baixo", "medio", "alto"]),
});

export type NCFormInput = z.infer<typeof ncFormSchema>;
