import React, { useState, useEffect, useMemo, useCallback } from "react";

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState("");

  /**
   * Sempre que realizamos alguma ação, o JS reescreve a funcão novamente,
   * é uma função simples, porém imagina um caso de uma função mais complexa..
   * porisso, para evitar processamento desnecessário utilizamos o hooks => useCallback
   *
   *  function handleAdd() {
        setTech([...tech, newTech]);
        setNewTech("");
      }

      sendo assim, ela so vai ser recriada quando a [newTech e tech] foram alterados!
   */
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech("");
  }, [newTech, tech]);

  useEffect(() => {
    const storageTech = localStorage.getItem("tech");

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tech", JSON.stringify(tech));
  }, [tech]);

  const techSize = useMemo(() => tech.length, [tech]); // só irá executar quando o 'tech' mudar seu estado

  return (
    <>
      <ul>
        {tech.map((value, i) => (
          <li key={i}>{value}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias!</strong> <br />
      <input
        type="text"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button onClick={handleAdd}>add</button>
    </>
  );
}

export default App;
