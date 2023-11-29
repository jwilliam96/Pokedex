import { Link, useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
import { useEffect } from "react";
import "./styles/pokeIdpage.css";
import "./styles/pokeidPage_Colors.css";
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
      <section
        className={`pokeid__section mt-20 lg:mt-36 ${pokemon?.types[0]?.type.name}-border`}
      >
        <figure className={`pokeid__header h-32 ss:h-40 lg:h-64 `}>
          <img
            className="card__header_img w-1/2 ss:w-[35%]"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />

          <div className={`div__header ${pokemon?.types[0]?.type.name}`} />
        </figure>
        <div className="div__section-primary">
          <span
            className={`pokeid__id font-bold text-2xl md:text-4xl ${colorName}-color`}
          >
            #{pokemon?.id}
          </span>

          <div className="text-2xl my-8 sm:flex w-full items-center sm:gap-6">
            <div className="hidden h-[2px] border-2 w-full rounded-md sm:block" />
            <h1
              className={`capitalize font-bold text-2xl md:text-6xl text-center ${colorName}-color`}
            >
              {pokemon?.name}
            </h1>
            <div className="hidden h-[2px] border-2 w-full rounded-md sm:block" />
          </div>

          <ul className="pokeid__ul_caract text-2xl">
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
                <li className="pokeid__info_li bg-[#5b9793] text-white rounded-sm">
                  {pokemon?.types[0]?.type.name}
                </li>
                {pokemon?.types[1]?.type.name && (
                  <li className="pokeid__info_li bg-[#6c3d9a] text-white rounded-sm">
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
                <li className="pokeid__info_li ">
                  {pokemon?.abilities[1]?.ability.name}
                </li>
              </ul>
            </section>
          </article>

          <section className="pokeid_stat">
            <div className="flex items-center gap-4">
              <h2 className="font-bold text-2xl sm:text-4xl">Stats</h2>
              <div className="h-[4px] bg-[#b3b2b2] w-full rounded-md" />
              <img
                className="w-[60px] sm:w-[89px] sm:h-[89px]"
                src="/pokebola.svg"
                alt=""
              />
            </div>
            {pokemon?.stats?.map((poken) => (
              <PokeStats key={poken?.stat?.url} pokemon={poken} />
            ))}
          </section>
        </div>
      </section>

      <section
        className={`pokeid__section my-28 h-96 overflow-scroll md:h-[500px]  `}
      >
        <div className="w-[90%] m-auto md:w-[80%]">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-2xl sm:text-4xl py-10">Movements</h2>
            <div className="h-[4px] bg-[#b3b2b2] w-full rounded-md" />
            <img
              className="w-[60px] sm:w-[89px] sm:h-[89px]"
              src="/pokebola.svg"
              alt=""
            />
          </div>

          <ul className="pokeid__move mx-4">
            {pokemon?.moves.map((move) => (
              <li
                className="text-xl  bg-[#E5E5E5] px-6 rounded-full"
                key={move?.move.url}
              >
                {move?.move.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
};

export default PokeIdPage;
