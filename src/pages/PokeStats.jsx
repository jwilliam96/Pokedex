import "./styles/pokeStat.css";

const PokeStats = ({ pokemon }) => {
  return (
    <article className="pokeStat">
      <ul className="pokeStat-content">
        <li>{pokemon?.stat.name}</li>
        <li className="pokeStat__base">{pokemon?.base_stat}</li>
      </ul>
      <div className="pokestat__div ">
        <div className={`pokestat__fondo w-[${pokemon?.base_stat}%]`}></div>
      </div>
    </article>
  );
};

export default PokeStats;
