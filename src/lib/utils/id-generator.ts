
export function generateId(prefix: string, sequence: number): string {
  return `${prefix}-${String(sequence).padStart(6, "0")}`;
}
