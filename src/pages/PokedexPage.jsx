import { useSelector } from "react-redux";
import useFetch from "../hook/useFetch";
import { useEffect, useRef, useState } from "react";
import PokedexCard from "../components/PokedexCard";
import SelectType from "../components/SelectType";
import "./styles/pokedexpage.css";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState();
  const [selectValue, setSelectValue] = useState("allPokemons");
  const [logingPokemons, setlogingPokemons] = useState(true);

  const trainer = useSelector((reducer) => reducer.trainer);

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=300";
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
    setlogingPokemons(false);
    setSelectValue("allPokemons");
  };

  const cbFilter = (pokemon) => pokemon.name.includes(inputValue);

  // PAGINACION
  const [currentPage, setCurrentPage] = useState(1);
  const RESIDENT_PER_PAGE = 20;
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
    <article className="pokedex__article">
      <header className="header">
        <img className="header__img--title" src="imageTitle.png" alt="" />
        <img className="header__img--fondo" src="pokepageImg.png" alt="" />
      </header>

      <section className="section">
        <p className="pokedex__copy">
          <span className="pokedex__span--name">Bienvenido ¡{trainer}!</span>{" "}
          Aquí podras encontrar tu pokemon favorito
        </p>

        <div className="content__form">
          <form className="form" onSubmit={handleSumit}>
            <input className="form__input" type="text" ref={inputSearch} />
            <button className="form__btn">Search</button>
          </form>

          <SelectType setSelectValue={setSelectValue} />
        </div>
        <ul className="page">
          {arrayPages.map((page) => (
            <li
              onClick={() => setCurrentPage(page)}
              className={` page__list ${
                page === currentPage && "page__list--active"
              }`}
              key={page}
            >
              {page}
            </li>
          ))}
        </ul>

        <div className="container__card">
          {(logingPokemons &&
            pokemons?.results
              .slice(startCut, endCut)
              .map((pokemon) => (
                <PokedexCard key={pokemon.url} url={pokemon.url} />
              ))) ||
            pokemons?.results
              .filter(cbFilter)
              .slice(startCut, endCut)
              .map((pokemon) => (
                <PokedexCard key={pokemon.url} url={pokemon.url} />
              ))}
        </div>
        <ul className="page">
          {arrayPages.map((page) => (
            <li
              onClick={() => setCurrentPage(page)}
              className={` page__list ${
                page === currentPage && "page__list--active"
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
