import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrainerG } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";
import "./styles/homepage.css";

const HomePage = () => {
  const trainer = useSelector((reducer) => reducer.trainer);

  const inputTrainer = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // otra manera para capturar un evento es:
    // e.target.inputTrainer.value
    dispatch(setTrainerG(inputTrainer.current.value));
    navigate("/pokedex");
  };

  return (
    <article className="homepage">
      <section className="homepage__section">
        <header className="homepage__header">
          <img className="homepage__img" src="imageTitle.png" alt="" />
        </header>

        <h1 className="homepage_title">¡Hola entrenador!</h1>
        <p className="home_mensanger">Para poder comenzar, escribe tu nombre</p>

        <form className="homepage_form" onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            className="homepage_input"
            id="inputTrainer"
            ref={inputTrainer}
            type="text"
          />
          <button className="homepage_btn">Comenzar</button>
        </form>
      </section>

      <footer className="homepage_footer">
        <img className="homepage_img_footer" src="imgfooter.png" alt="" />
      </footer>
    </article>
  );
};

export default HomePage;
