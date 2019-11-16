import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // Criação de states com useState, uma para cada variável
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  // Substitui funções criadas numa classe
  const handleAdd = useCallback(() => {
    setTechs([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  // Executa ao iniciar a aplicação. (Igual ComponentDidMout)
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTechs(JSON.parse(storageTech));
    }
  }, []);

  // Executa ao atualizar algum valor, no caso o array 'tech'. (Igual ComponentDidUpdate)
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(techs));
  }, [techs]);

  // Diminui o processamento para o cálculo de um state ou variável
  const techSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <strong>Voce tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
