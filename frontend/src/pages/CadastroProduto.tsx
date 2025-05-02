import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

type Atributo = {
  nome: string;
  valor: string;
};

export default function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [atributos, setAtributos] = useState<Atributo[]>([{ nome: '', valor: '' }]);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const adicionarAtributo = () => {
    setAtributos([...atributos, { nome: '', valor: '' }]);
  };

  const atualizarAtributo = (index: number, campo: keyof Atributo, valor: string) => {
    const novos = [...atributos];
    novos[index][campo] = valor;
    setAtributos(novos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/produtos/completo', {
        nome,
        descricao,
        variacoes: [
          {
            preco: parseFloat(preco),
            atributos
          }
        ]
      });
      setMensagem('Produto com variação cadastrado com sucesso!');
      setNome('');
      setDescricao('');
      setPreco('');
      setAtributos([{ nome: '', valor: '' }]);
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao cadastrar produto com variação.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Cadastro de Produto com Variações</h2>
        <button onClick={() => navigate('/produto')} className="text-blue-600 underline">Voltar</button>
      </div>
      {mensagem && <p className="mb-4 text-blue-600">{mensagem}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)} className="border p-2 rounded" required />
        <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} className="border p-2 rounded" rows={3} />
        <input type="number" placeholder="Preço da variação" value={preco} onChange={e => setPreco(e.target.value)} className="border p-2 rounded" required />

        <h3 className="font-semibold mt-4">Atributos da Variação</h3>
        {atributos.map((attr, index) => (
          <div key={index} className="flex gap-2">
            <input type="text" placeholder="Nome (ex: Armazenamento)" value={attr.nome} onChange={e => atualizarAtributo(index, 'nome', e.target.value)} className="border p-2 rounded w-1/2" />
            <input type="text" placeholder="Valor (ex: 256GB)" value={attr.valor} onChange={e => atualizarAtributo(index, 'valor', e.target.value)} className="border p-2 rounded w-1/2" />
          </div>
        ))}
        <button type="button" onClick={adicionarAtributo} className="bg-gray-300 text-sm py-1 px-3 rounded hover:bg-gray-400 self-start">+ Adicionar atributo</button>
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Cadastrar Produto</button>
      </form>
    </div>
  );
}
