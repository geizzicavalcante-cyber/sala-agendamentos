import "./App.css";          // Import do CSS
import { useState, useEffect } from "react";  // Import do React para useState e useEffect

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
  // Inicializa o estado a partir do localStorage
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    const dados = localStorage.getItem("agendamentos");
    return dados ? JSON.parse(dados) : [
      {
        id: 1,
        cliente: "Maria Silva",
        telefone: "21999998888",
        servico: "Corte e Escova",
        valor: 120,
        profissional: "Ana",
        data: "2025-12-20",
        hora: "14:00",
        status: "Confirmado",
      },
      {
        id: 2,
        cliente: "João Santos",
        telefone: "21988887777",
        servico: "Barba",
        valor: 40,
        profissional: "Carlos",
        data: "2025-12-21",
        hora: "16:30",
        status: "Cancelado",
      },
    ];
  });

  // Campos do formulário
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servico, setServico] = useState("");
  const [valor, setValor] = useState("");
  const [profissional, setProfissional] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  // Salva automaticamente no localStorage sempre que agendamentos mudar
  useEffect(() => {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }, [agendamentos]);

  // Função para adicionar novo agendamento
  function adicionarAgendamento() {
    if (!cliente || !telefone || !servico || !valor || !profissional || !data || !hora) {
      alert("Preencha todos os campos");
      return;
    }

    const novoAgendamento: Agendamento = {
      id: Date.now(),
      cliente,
      telefone,
      servico,
      valor: Number(valor),
      profissional,
      data,
      hora,
      status: "Cancelado",
    };

    setAgendamentos((lista) => [...lista, novoAgendamento]);

    setCliente("");
    setTelefone("");
    setServico("");
    setValor("");
    setProfissional("");
    setData("");
    setHora("");
  }

  // Funções de confirmar e cancelar
  function confirmar(id: number) {
    setAgendamentos((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, status: "Confirmado" } : item
      )
    );
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
      <h1>📅 Agendamentos do Salão</h1>

      <h2>➕ Novo Agendamento</h2>

      <input
        placeholder="Nome da cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <input
        placeholder="Telefone de contato"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />
      <input
        placeholder="Serviço"
        value={servico}
        onChange={(e) => setServico(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor do serviço"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <input
        placeholder="Profissional"
        value={profissional}
        onChange={(e) => setProfissional(e.target.value)}
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />
      <button onClick={adicionarAgendamento}>Adicionar</button>

      <hr />

      <h2>📋 Todos os Agendamentos</h2>

      <ul>
        {agendamentos.map((item) => (
          <li key={item.id} className="agendamento">
            <strong>{item.cliente}</strong>
            <br />
            📞 {item.telefone}
            <br />
            🛎️ {item.servico} — 💰 R$ {item.valor}
            <br />
            👩‍🎨 Profissional: {item.profissional}
            <br />
            📅 {item.data} ⏰ {item.hora}
            <br />
            Status:
            <span
              className={
                item.status === "Confirmado"
                  ? "status-confirmado"
                  : "status-cancelado"
              }
            >
              {" "}{item.status}
            </span>
            <br />
            {/* Botões somem se já confirmado ou cancelado */}
            {item.status !== "Confirmado" && (
              <button
                className="btn-confirmar"
                onClick={() => confirmar(item.id)}
              >
                Confirmar
              </button>
            )}
            {item.status !== "Cancelado" && (
              <button
                className="btn-cancelar"
                onClick={() => cancelar(item.id)}
              >
                Cancelar
              </button>
            )}
          </li>
        ))}
      </ul>

      <h2>✅ Agendamentos Confirmados</h2>

      <ul>
        {agendamentos
          .filter((item) => item.status === "Confirmado")
          .map((item) => (
            <li key={item.id} className="agendamento">
              <strong>{item.cliente}</strong>
              <br />
              📞 {item.telefone}
              <br />
              🛎️ {item.servico} — 💰 R$ {item.valor}
              <br />
              👩‍🎨 Profissional: {item.profissional}
              <br />
              📅 {item.data} ⏰ {item.hora}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

