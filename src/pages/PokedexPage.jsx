import { useSelector } from "react-redux";
import useFetch from "../hook/useFetch";
import { useEffect, useRef, useState } from "react";
import PokedexCard from "../components/PokedexCard";
import SelectType from "../components/SelectType";
import "./styles/pokedexpage.css";

const PokedexPage = () => {
  const [visiblePageNumbers, setVisiblePageNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");
  const [logingPokemons, setlogingPokemons] = useState(true);

  const trainer = useSelector((reducer) => reducer.trainer);

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10263";
  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url);
  const cbFilter = (pokemon) => pokemon.name.includes(inputValue);
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

  // PAGINACION
  const [currentPage, setCurrentPage] = useState(1);
  const [residentPerPage, setresidentPerPage] = useState(20);
  const totalCard = pokemons?.results.filter(cbFilter).length;
  const arrayPages = [];
  const quantityPages = Math.ceil(totalCard / residentPerPage);
  for (let i = 1; i <= quantityPages; i++) {
    arrayPages.push(i);
  }
  useEffect(() => {
    setVisiblePageNumbers(arrayPages.slice(0, 4));
  }, [residentPerPage, totalCard]);

  const startCut = currentPage * residentPerPage - residentPerPage;
  const endCut = currentPage * residentPerPage;

  const handleIncrement = () => {
    const incrementPage = currentPage + 1;
    if (currentPage < arrayPages.length) {
      if (
        !visiblePageNumbers.includes(incrementPage) &&
        incrementPage <= arrayPages.length
      ) {
        const starIndex = arrayPages.indexOf(incrementPage) - 3;
        setVisiblePageNumbers(arrayPages.slice(starIndex, starIndex + 4));
      }
      setCurrentPage(incrementPage);
    }
  };
  const handleDecrement = () => {
    const decrementPage = currentPage - 1;
    if (currentPage > 1) {
      if (!visiblePageNumbers.includes(decrementPage) && decrementPage > 0) {
        const starIndex = arrayPages.indexOf(decrementPage);
        setVisiblePageNumbers(arrayPages.slice(starIndex, starIndex + 4));
      }
      setCurrentPage(decrementPage);
    }
  };

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
          <span className="pokedex__span--name">Welcome ¡{trainer}!</span> here
          you could find your favorite pokemon.
        </p>

        <div className="content__form">
          <form className="form" onSubmit={handleSumit}>
            <input className="form__input" type="text" ref={inputSearch} />
            <button className="form__btn">Search</button>
          </form>

          <SelectType setSelectValue={setSelectValue} />
        </div>

        {/* PAGINACION */}
        <ul className="page">
          <li>
            <button className="btn__page" onClick={handleDecrement}>
              &#60;
            </button>
          </li>
          {visiblePageNumbers.map((page) => (
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

          <li>
            <button className="btn__page " onClick={handleIncrement}>
              {">"}
            </button>
          </li>
        </ul>

        <div className="container__card">
          {pokemons?.results
            .filter(cbFilter)
            .map((pokemon) => (
              <PokedexCard key={pokemon.url} url={pokemon.url} />
            ))
            .slice(startCut, endCut)}
        </div>

        <ul className="page">
          <li>
            <button className="btn__page" onClick={handleDecrement}>
              &#60;
            </button>
          </li>
          {visiblePageNumbers.map((page) => (
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
          <li>
            <button
              className="btn__page btn__page--active"
              onClick={handleIncrement}
            >
              {">"}
            </button>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default PokedexPage;
