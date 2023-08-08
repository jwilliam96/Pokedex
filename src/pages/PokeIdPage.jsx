import { Link, useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
import { useEffect } from "react";
import "./styles/pokeIdpage.css";
import "../components/styles/Pokecard.css";
import PokeStats from "./PokeStats";

const PokeIdPage = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  const [pokemon, getSinglePokemon] = useFetch(url);

  const colorName = pokemon?.types[0]?.type.name;

  useEffect(() => {
    getSinglePokemon();
  }, [id]);

  return (
    <article className="pokeid-content">
      <header>
        <header className="pokeid_header">
          <Link to="/pokedex">
            <img className="pokeid_img_title" src="imageTitle.png" alt="" />
          </Link>
          <img className="pokeid_img_fondo" src="pokepageImg.png" alt="" />
        </header>
      </header>

      <section className="pokeid__section">
        <header className="pokeid__header">
          <img
            className="card__header_img"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </header>
        <span className={`pokeid__id ${colorName}-color`}>#{pokemon?.id}</span>
        <h1 className={`pokeid__name ${colorName}-color`}>{pokemon?.name}</h1>
        <ul className="pokeid__ul_caract">
          <li>
            <span className="pokeid__caract_span">Weight</span>
            <div className="pokeid__caract_num">{pokemon?.weight}</div>
          </li>
          <li>
            <span className="pokeid__caract_span">Aeight</span>
            <div className="pokeid__caract_num">{pokemon?.height}</div>
          </li>
        </ul>

        <article className="pokeid-info">
          <section className="pokeid__info__section">
            <h2 className="pokeid__info_title">Type</h2>
            <ul className="pokeid__info_ul">
              <li className="pokeid__info_li pokeid__info--activeOne">
                {pokemon?.types[0]?.type.name}
              </li>
              {pokemon?.types[1]?.type.name && (
                <li className="pokeid__info_li pokeid__info--activeTwo">
                  {pokemon?.types[1]?.type.name}
                </li>
              )}
            </ul>
          </section>

          <section className="pokeid__info__section">
            <h2 className="pokeid__info_title">Abilities</h2>
            <ul className="pokeid__info_ul">
              <li className="pokeid__info_li">
                {pokemon?.abilities[0]?.ability.name}
              </li>
              <li className="pokeid__info_li">
                {pokemon?.abilities[1]?.ability.name}
              </li>
            </ul>
          </section>
        </article>
      </section>
      <section className="pokeid_stat">
        <h2 className="pokeid__stat_name">Stats</h2>
        {pokemon?.stats?.map((poken) => (
          <PokeStats key={poken?.stat?.url} pokemon={poken} />
        ))}
        <h3 className="move__title">Movements</h3>
        <ul className="pokeid__move">
          {pokemon?.moves.map((move) => (
            <li className="move__list" key={move?.move.url}>
              {move?.move.name}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default PokeIdPage;
