import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Instruction from "../components/Instruction";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import {
  faVolumeUp,
  faCheck,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import useStore from "../../store";
import img1 from "../../assets/img/caras/avatar_neutro.webp";
import Audio1 from "../../assets/audio/M1_Slide 8.mp3";
import "../slides/styles/SeDiceHerramientaManualOMecanica.css";

function SeDiceHerramientaManualOMecanica() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const question = {
    text: "Estás tomando el curso de:",
    options: [
      { text: "Uso seguro de EPP", correct: false },
      { text: "Uso seguro de herramientas mecánicas", correct: true },
      { text: "Uso seguro de herramientas automáticas", correct: false },
    ],
  };

  const feedbackTexts = {
    correct: `Estás tomando el curso sobre el uso seguro de herramientas mecánicas, que es clave para realizar trabajos seguros y eficientes en la operación. Sigue aprendiendo para aplicar estas prácticas en tu día a día.`,
    incorrect: `¡Inténtalo de nuevo! La opción seleccionada no es la correcta.`,
  };

  const handleAnswerSelect = (optionIndex) => {
    if (!isDisabled) {
      setSelectedOption(optionIndex);
      setShowWarning(false);
      setShowFeedback(false);
    }
  };

  const validateAnswer = () => {
    if (selectedOption === "") {
      setShowWarning(true);
      return;
    }

    const isAnswerCorrect = question.options[selectedOption].correct;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    setIsDisabled(true);
    setShowWarning(false);
  };

  const resetTrivia = () => {
    setSelectedOption("");
    setIsCorrect(null);
    setIsDisabled(false);
    setShowWarning(false);
    setShowFeedback(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Left Column */}
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-4 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div
          className="display-mobile flex flex-col justify-center items-center md:px-16"
          style={{
            position: isMobile ? "static" : "relative",
            top: isMobile ? "0" : "0",
          }}
        >
          <div className="text-center">
            <Title>Pensemos…</Title>
            <Subtitle>¿Se dice Herramienta Manual o Mecánica?</Subtitle>
          </div>
          <div className="w-[40%]">
            <img src={img1} alt="Trivia Image" className="trivia-image mb-0" />
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            Buena pregunta !! Las herramientas usadas en obras o en operaciones
            de campo, y que son manipuladas por la fuerza humana se llaman
            HERRAMIENTAS MECÁNICAS. Estas pueden estar clasificadas en a)
            Manuales y b) No manuales. En concreto, una herramienta MANUAL es un
            objeto, elaborado con el fin de facilitar la realización de una
            tarea mecánica, la cual requiere una aplicación correcta de energía
            humana.
          </Paragraph>
          <div style={{ marginTop: "10px" }}>
            <Button
              icon={faVolumeUp}
              roundedFull={true}
              onClick={handleOpenModal}
              className="validate-button"
            >
              Escucha
            </Button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-2 bg-white md:w-1/2 w-full px-6 md:pr-20 flex mx-auto justify-center items-center">
        <div className="center-content flex flex-col justify-center items-center">
          <Instruction arrow="down" theme="light">
            Contesta la trivia correctamente y mira el contenido secreto
          </Instruction>
          <div className="preguntas_01 w-full max-w-2xl">
            <div className="ctItem">
              <Paragraph
                theme="light"
                justify={isMobile ? "justify" : "justify"}
              >
                <strong>Pregunta: </strong>
                {question.text}
              </Paragraph>
              <div>
                {question.options.map((option, index) => (
                  <p
                    key={index}
                    className={`
                      ${selectedOption === index ? "act" : ""}
                      ${isDisabled && selectedOption === index ? (option.correct ? "true" : "false") : ""}
                      rounded-lg p-3 mb-2 flex justify-between cursor-pointer transition-colors
                    `}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {String.fromCharCode(97 + index)}. {option.text}
                  </p>
                ))}
              </div>
              <div className="flex flex-col items-center">
                {showWarning && (
                  <h3 className="text-secondary-color font-bold mb-2">
                    Por favor, selecciona una opción antes de validar.
                  </h3>
                )}
                <div className="button-container">
                  <Button
                    icon={faCheck}
                    roundedFull={true}
                    onClick={validateAnswer}
                    disabled={isDisabled}
                    className="validate-button"
                  >
                    Validar
                  </Button>
                  <Button
                    icon={faRepeat}
                    roundedFull={true}
                    onClick={resetTrivia}
                    className="reset-button"
                  >
                    Reiniciar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {showFeedback && (
            <div className="feedback-container mt-4">
              <Paragraph
                theme="light"
                justify={isMobile ? "justify" : "justify"}
              >
                <strong className={isCorrect ? "text-success" : "text-error"}>
                  {isCorrect ? "Correcto: " : "Incorrecto: "}
                </strong>
                {isCorrect ? feedbackTexts.correct : feedbackTexts.incorrect}
              </Paragraph>
            </div>
          )}
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Escucha otra definición:"
      >
        <Paragraph theme="light">
          Llamamos herramientas de mano, o manuales, a todos aquellos
          utensilios, generalmente hechos de madera, plástico u otros
          materiales, útiles para ejecutar de manera sencilla tareas
          constructivas o de reparación.
        </Paragraph>
        <div className="audio-container">
          <audio controls className="media-espanol">
            <source src={Audio1} type="audio/mpeg" />
          </audio>
        </div>
      </ModalDialog>
    </div>
  );
}

export default SeDiceHerramientaManualOMecanica;
