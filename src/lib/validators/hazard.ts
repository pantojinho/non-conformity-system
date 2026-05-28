
import { z } from "zod";

export const hazardFormSchema = z.object({
  descricao: z.string().min(10, "Descrição é obrigatória"),
  categoria: z.enum(["seguranca", "saude", "meio_ambiente", "security"]),
  risco: z.enum(["baixo", "medio", "alto"]),
});

export type HazardFormInput = z.infer<typeof hazardFormSchema>;
