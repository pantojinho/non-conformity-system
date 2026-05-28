
// Workflow transitions - placeholder for Sprint 6
export const ncTransitions = [
  { from: "aberto", to: "responsavel_definido", role: "qualidade_hse" },
  { from: "responsavel_definido", to: "em_aceite", role: "resolvedor" },
  { from: "em_aceite", to: "em_acao_imediata", role: "resolvedor" },
] as const;
