import React, { useEffect } from "react";
import useFetch from "../hook/useFetch";
import "./styles/selectype.css";

const SelectType = ({ setSelectValue }) => {
  const urlTypes = "https://pokeapi.co/api/v2/type";

  const [pokemonsType, getAllType] = useFetch(urlTypes);

  useEffect(() => {
    getAllType();
  }, []);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <select className="selectype" onChange={handleChange}>
      <option value="allPokemons">All Pokemons</option>
      {pokemonsType?.results.map((type) => (
        <option key={type.url} value={type.url}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

export default SelectType;
