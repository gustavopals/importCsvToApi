// Função de exemplo para converter uma linha CSV para JSON (ajuste conforme necessário)
export function convertCsvToJson(csvLine) {
  const [descricao, repairPn, codigoEtiqueta, modelo] = csvLine.split(";");
  return {
    descricao,
    repairPn,
    codigoEtiqueta,
    modelo,
  };
}
