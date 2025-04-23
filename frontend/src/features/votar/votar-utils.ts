export function limitarTexto(texto?: string, limite = 55): string {
  if (!texto) return "";
  return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
}
