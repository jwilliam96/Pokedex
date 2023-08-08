import { useSelector } from "react-redux";
import useFetch from "../hook/useFetch";
import { useEffect, useRef, useState } from "react";
import PokedexCard from "../components/PokedexCard";
import SelectType from "../components/SelectType";
import "./styles/pokedexpage.css";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState();

  const [selectValue, setSelectValue] = useState("allPokemons");

  const trainer = useSelector((reducer) => reducer.trainer);

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=500";
  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url);

  useEffect(() => {
    if (selectValue === `allPokemons`) {
      getAllPokemons();
    } else {
      getPokemonsByType(selectValue);
    }
  }, [selectValue]);

  const inputSearch = useRef();

  const handleSumit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
  };

  const cbFilter = (pokemon) => pokemon.name.includes(inputValue);

  // PAGINACION
  const [currentPage, setCurrentPage] = useState(1);
  const RESIDENT_PER_PAGE = 28;
  const arrayPages = [];
  const quantityPages = Math.ceil(pokemons?.results.length / RESIDENT_PER_PAGE);
  for (let i = 1; i <= quantityPages; i++) {
    arrayPages.push(i);
  }
  const startCut = currentPage * RESIDENT_PER_PAGE - RESIDENT_PER_PAGE;
  const endCut = currentPage * RESIDENT_PER_PAGE;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectValue]);

  return (
    <article className="pokedex-container">
      <header className="pokedex_header">
        <img className="pokedex_img_title" src="imageTitle.png" alt="" />
        <img className="pokedex_img_fondo" src="pokepageImg.png" alt="" />
      </header>

      <section className="pokedex-section">
        <p className="pokedex_p">
          <span className="pokedex_span_name">Bienvenido ¡{trainer}!</span> Aquí
          podras encontrar tu pokemon favorito
        </p>

        <div className="content__form">
          <form className="pokedex_form" onSubmit={handleSumit}>
            <input className="pokedex_input" type="text" ref={inputSearch} />
            <button className="pokedex_btn">Search</button>
          </form>

          <SelectType setSelectValue={setSelectValue} />
        </div>

        <div className="pokedex_contentcard">
          {pokemons?.results
            .filter(cbFilter)
            .slice(startCut, endCut)
            .map((pokemon) => (
              <PokedexCard key={pokemon.url} url={pokemon.url} />
            ))}
        </div>
        <ul className="flex gap-4 justify-center py-4">
          {arrayPages.map((page) => (
            <li
              onClick={() => setCurrentPage(page)}
              className={`p-3 rounded-md cursor-pointer ${
                page === currentPage && "bg-green-800 text-white font-bold"
              }`}
              key={page}
            >
              {page}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default PokedexPage;
