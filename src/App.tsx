import { useState, useEffect } from "react";
import "./App.css";

type Agendamento = {
  id: number;
  cliente: string;
  telefone: string;
  servico: string;
  valor: number;
  profissional: string;
  data: string;
  hora: string;
  status: "Confirmado" | "Cancelado";
};

function App() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    const dados = localStorage.getItem("agendamentos");
    return dados ? JSON.parse(dados) : [];
  });

  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState("");
  const [valor, setValor] = useState("");
  const [profissional, setProfissional] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }, [agendamentos]);

  function adicionarAgendamento() {
    if (
      !cliente ||
      !telefone ||
      !servico ||
      !valor ||
      !profissional ||
      !data ||
      !hora
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const novo: Agendamento = {
      id: Date.now(),
      cliente,
      telefone,
      servico,
      valor: Number(valor),
      profissional,
      data,
      hora,
      status: "Confirmado",
    };

    setAgendamentos((lista) => [...lista, novo]);

    setCliente("");
    setTelefone("");
    setServico("");
    setValor("");
    setProfissional("");
    setData("");
    setHora("");
  }

  function cancelar(id: number) {
    setAgendamentos((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, status: "Cancelado" } : item
      )
    );
  }

  return (
    <div className="container">
      <h1>📅 Doce Beleza Salão</h1>

      <div className="formulario">
        <input placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
        <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <input placeholder="Serviço" value={servico} onChange={(e) => setServico(e.target.value)} />
        <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
        <input placeholder="Profissional" value={profissional} onChange={(e) => setProfissional(e.target.value)} />
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />

        <button onClick={adicionarAgendamento}>Adicionar</button>
      </div>

      <h2>Agendamentos</h2>
      {agendamentos.map((item) => (
        <div key={item.id} className="card">
          <strong>{item.cliente}</strong>
          <p>📞 {item.telefone}</p>
          <p>🛎️ {item.servico} — 💰 R$ {item.valor}</p>
          <p>👩‍🎨 {item.profissional}</p>
          <p>📅 {item.data} ⏰ {item.hora}</p>
          <p>Status: {item.status}</p>

          {item.status !== "Cancelado" && (
            <button onClick={() => cancelar(item.id)}>Cancelar</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
