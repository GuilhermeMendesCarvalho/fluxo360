
import { useState } from "react";

export default function SimuladorPreco() {
  const [form, setForm] = useState({
    custoProduto: 0,
    taxaComissao: 0,
    frete: 0,
    imposto: 0,
    custoAdicional: 0,
    margem: 0,
    precoDesejado: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const {
    custoProduto,
    taxaComissao,
    frete,
    imposto,
    custoAdicional,
    margem,
    precoDesejado
  } = form;

  const totalCustosFixos = custoProduto + frete + custoAdicional;
  const percentualComissao = precoDesejado * (taxaComissao / 100);
  const percentualImposto = precoDesejado * (imposto / 100);
  const precoIdeal =
    (totalCustosFixos / (1 - (taxaComissao + imposto + margem) / 100)).toFixed(2);

  const lucroValor = precoDesejado - (totalCustosFixos + percentualComissao + percentualImposto);
  const margemReal = precoDesejado
    ? ((lucroValor / precoDesejado) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Simulador de Preço</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "custoProduto", label: "Custo do Produto" },
          { name: "frete", label: "Frete (R$)" },
          { name: "custoAdicional", label: "Custo Adicional (R$)" },
          { name: "taxaComissao", label: "Comissão (%)" },
          { name: "imposto", label: "Imposto (%)" },
          { name: "margem", label: "Margem Desejada (%)" },
          { name: "precoDesejado", label: "Preço Desejado (opcional)" }
        ].map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="number"
              step="0.01"
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </form>

      <div className="mt-6 bg-gray-50 p-4 rounded shadow-inner">
        <p><strong>Total de Custos Fixos:</strong> R$ {totalCustosFixos.toFixed(2)}</p>
        <p><strong>Preço Ideal com Margem:</strong> R$ {precoIdeal}</p>
        {precoDesejado > 0 && (
          <>
            <p><strong>Lucro com Preço Desejado:</strong> R$ {lucroValor.toFixed(2)}</p>
            <p><strong>Margem Real:</strong> {margemReal}%</p>
          </>
        )}
      </div>
    </div>
  );
}
