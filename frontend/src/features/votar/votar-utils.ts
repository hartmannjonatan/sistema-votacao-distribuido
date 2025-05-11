// Função utilitária que limita o número de caracteres de uma string e adiciona reticências, se necessário
export function limitarTexto(texto?: string, limite = 55): string {
  if (!texto) return "";
  return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
}
