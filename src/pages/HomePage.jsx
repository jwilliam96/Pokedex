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
    <article className="homepage-container">
      <header>
        <img className="homepage_img" src="imageTitle.png" alt="" />
      </header>

      <section>
        <h1 className="homepage_title">¡Hola entrenador!</h1>
        <p className="home_p">Para poder comenzar, escribe tu nombre</p>
      </section>

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

      <footer className="homepage_footer">
        <img className="homepage_img_footer" src="imgfooter.png" alt="" />
      </footer>
    </article>
  );
};

export default HomePage;
