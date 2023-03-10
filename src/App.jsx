import { useState } from "react";

function App() {
  const [id, setId] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [duracao, setDuracao] = useState("");

  const [listaDisciplinas, setListaDisciplinas] = useState([]);

  function addItem(event) {
    event.preventDefault();

    if (disciplina === "" || duracao === "") {
      alert("Preencha todas as informações");
      return;
    }

    if (id) {
      // const item = listaDisciplinas.find((item) => item.id === id);
      const copiaListaDisciplinas = [...listaDisciplinas];

      const index = copiaListaDisciplinas.findIndex((item) => item.id === id)

      copiaListaDisciplinas[index].disciplina = disciplina
      copiaListaDisciplinas[index].duracao = duracao
      
    } else {
      setListaDisciplinas([
        ...listaDisciplinas,
        {
          id: Date.now(),
          disciplina: disciplina,
          duracao: duracao,
        },
      ]);
    }

    setDisciplina("");
    setDuracao("");
    setId("")
  }

  function apagarItem(id) {
    if (confirm("Deseja realmente apagar o item?")) {
      const result = listaDisciplinas.filter((item) => item.id !== id);
      setListaDisciplinas(result);
    }
  }

  function preencheEstados(item) {
    setDisciplina(item.disciplina);
    setDuracao(item.duracao);
    setId(item.id);
  }

  return (
    <div className="App">
      <h1>Cadastro de Disciplina</h1>

      {/* <h2>DISCIPLINA: {disciplina}</h2>
      <h2>CARGA HORÁRIA: {duracao}</h2> */}

      <form onSubmit={addItem}>
        <input
          value={disciplina}
          onChange={(event) => setDisciplina(event.target.value)}
          placeholder="Nome da disciplina"
        />

        <select onChange={(event) => setDuracao(event.target.value)}>
          <option value="">Selecione uma opção</option>
          <option value="40">40 horas</option>
          <option value="60">60 horas</option>
          <option value="80">80 horas</option>
        </select>

        <br />
        <br />
        <input type="submit" value={id? "Salvar" : "Cadastrar"} />
      </form>

      {listaDisciplinas.length > 0 ? (
        <ul>
          {listaDisciplinas.map((item) => (
            <li key={item.id} style={{ border: "1px solid #9999" }}>
              <p>Disciplina: {item.disciplina}</p>
              <p>Duração: {item.duracao} Horas</p>
              <button onClick={() => apagarItem(item.id)}>Apagar</button>
              <button onClick={() => preencheEstados(item.id)}>Editar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum item cadastrado</p>
      )}
    </div>
  );
}

export default App;
