import { useState } from "react";
import "./App.css";

type Agendamento = {
  servico: string;
  profissional: string;
  data: string;
  horario: string;
  cliente: string;
  contato: string;
  valor: string;
};

function App() {
  const [servico, setServico] = useState("");
  const [profissional, setProfissional] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [cliente, setCliente] = useState("");
  const [contato, setContato] = useState("");
  const [valor, setValor] = useState("");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  function agendar() {
    if (
      !servico ||
      !profissional ||
      !data ||
      !horario ||
      !cliente ||
      !contato ||
      !valor
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const novoAgendamento: Agendamento = {
      servico,
      profissional,
      data,
      horario,
      cliente,
      contato,
      valor,
    };

    setAgendamentos([...agendamentos, novoAgendamento]);

    setServico("");
    setProfissional("");
    setData("");
    setHorario("");
    setCliente("");
    setContato("");
    setValor("");
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Doce Beleza Salão</h1>
        <p>Agende seu horário com facilidade</p>
      </header>

      <div className="servicos">
        <button onClick={() => setServico("Cabeleireiro")}>Cabeleireiro</button>
        <button onClick={() => setServico("Manicure")}>Manicure</button>
        <button onClick={() => setServico("Sobrancelha")}>Sobrancelha</button>
      </div>

      {servico && (
        <div className="formulario">
          <h3>Dados do Agendamento</h3>

          <div className="campo">
            <label>Serviço</label>
            <input value={servico} disabled />
          </div>

          <div className="campo">
            <label>Profissional</label>
            <select
              value={profissional}
              onChange={(e) => setProfissional(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Ana">Ana</option>
              <option value="Bruna">Bruna</option>
              <option value="Carla">Carla</option>
            </select>
          </div>

          <div className="linha">
            <div className="campo">
              <label>Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>Horário</label>
              <select
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>

          <h3>Dados da Cliente</h3>

          <div className="campo">
            <label>Nome da Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Contato</label>
            <input
              type="text"
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Valor do Serviço (R$)</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          <button className="btn" onClick={agendar}>
            Confirmar Agendamento
          </button>
        </div>
      )}

      {agendamentos.length > 0 && (
        <div className="lista">
          <h2>Agendamentos</h2>
          {agendamentos.map((item, index) => (
            <div className="card" key={index}>
              <p><strong>Cliente:</strong> {item.cliente}</p>
              <p><strong>Contato:</strong> {item.contato}</p>
              <p><strong>Serviço:</strong> {item.servico}</p>
              <p><strong>Profissional:</strong> {item.profissional}</p>
              <p><strong>Data:</strong> {item.data}</p>
              <p><strong>Horário:</strong> {item.horario}</p>
              <p className="valor">R$ {item.valor}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
