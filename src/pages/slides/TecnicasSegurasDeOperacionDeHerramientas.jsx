import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import useStore from "../../store";
import {
  faRepeat,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import Loader from "../components/Loader";
import "../slides/styles/TecnicasSegurasDeOperacionDeHerramientas.css";

function TecnicasSegurasDeOperacionDeHerramientas() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", ""]);
  const [isValidated, setIsValidated] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionResults, setQuestionResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const videoRef = useRef(null);
  const [results, setResults] = useState({ correct: 0, total: 3 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const questions = [
    {
      question:
        "¿Antes de utilizar herramientas eléctricas, es suficiente con usar solo gafas de protección?'",
      options: [
        { text: "Verdadero", correct: false },
        { text: "Falso", correct: true },
      ],
      correctFeedback:
        "Es importante usar no solo gafas de protección, sino también otros equipos de protección personal adecuados para cada herramienta eléctrica, como guantes, protección auditiva y mascarilla cuando sea necesario.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "¿Es recomendable usar anillos, relojes y pulseras mientras se trabaja con herramientas manuales, ya que no interfieren en la actividad?",
      options: [
        { text: "Verdadero", correct: false },
        { text: "Falso", correct: true },
      ],
      correctFeedback:
        "No es recomendable usar joyas mientras se trabaja con herramientas manuales, ya que pueden engancharse en las partes móviles de las herramientas o en los materiales, causando lesiones o accidentes.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "¿Inspeccionar diariamente el estado de las herramientas es una práctica esencial para garantizar la seguridad en el trabajo?",
      options: [
        { text: "Verdadero", correct: true },
        { text: "Falso", correct: false },
      ],
      correctFeedback:
        "La inspección diaria de las herramientas es crucial para identificar cualquier daño o desgaste que pueda comprometer la seguridad. Esto ayuda a prevenir accidentes y asegura que las herramientas funcionen correctamente.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ];

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleOptionChange = (option) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = option;
    setSelectedAnswers(newSelectedAnswers);
    setWarningMessage("");
  };

  const handleValidate = () => {
    if (selectedAnswers[currentQuestion]) {
      const isCorrect =
        selectedAnswers[currentQuestion] ===
        (questions[currentQuestion].options[1].correct ? "b" : "a");
      setQuestionResults((prev) => {
        const newResults = [...prev];
        newResults[currentQuestion] = isCorrect ? 1 : 0;
        return newResults;
      });
      setShowFeedback(true);
      setIsValidated(true);
    } else {
      setWarningMessage("Debes seleccionar una opción para continuar.");
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setIsValidated(false);
    } else {
      setResults({
        correct: questionResults.reduce((a, b) => a + b, 0),
        total: questions.length,
      });
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers(["", "", ""]);
    setIsValidated(false);
    setCurrentQuestion(0);
    setShowQuestions(true);
    setWarningMessage("");
    setShowFeedback(false);
    setQuestionResults([]);
    setShowResults(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const checkTime = () => {
        if (video.duration - video.currentTime <= 5 && !showQuestions) {
          setShowQuestions(true);
        }
      };
      video.addEventListener("timeupdate", checkTime);
      return () => video.removeEventListener("timeupdate", checkTime);
    }
  }, [showQuestions]);

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      <div className="md:flex-1 h-auto md:h-screen bg-dark-color md:w-2/5 w-full py-6 px-12 flex flex-col justify-center items-center">
        <div className="text-center">
          <Title>Aprendamos…</Title>
          <Subtitle>Técnicas seguras en operación de herramientas</Subtitle>
        </div>
        <Instruction arrow="down" theme="dark">
          Haz clic para ejecutar el video-caso
        </Instruction>
        <div style={{ position: "relative" }}>
          {isLoading && <Loader theme="dark" />}
          <iframe
            src="https://iframe.mediadelivery.net/embed/369366/e9c4ff99-63b7-445f-8d47-8765b7b16ba0?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
            loading="lazy"
            ref={videoRef}
            className="w-[90vw] md:w-[23vw] h-[80vh]"
            style={{
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.5s ease-in-out",
            }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen={true}
            onLoad={handleVideoLoad}
          ></iframe>
        </div>
      </div>

      <div className="md:flex-2 bg-white md:w-3/5 w-full flex flex-col px-6 md:pl-[14px] md:items-start justify-center items-center">
        <div className="flex flex-col items-center md:w-[90%]">
          <div className="flex justify-center w-full">
            <Instruction arrow="down" theme="light">
              ¡Sigamos con la historia!
            </Instruction>
          </div>
          <Paragraph theme="light" justify="center">
            Ahora ayuda un poco a Andy contestando estas preguntas con relación
            al video:
          </Paragraph>

          {showQuestions && !showResults && (
            <div className="preguntas_01">
              <div className="ctItem fixed-size-question-box">
                <Paragraph
                  theme="light"
                  justify={isMobile ? "justify" : "left"}
                >
                  <strong>Pregunta {currentQuestion + 1}: </strong>
                  {questions[currentQuestion].question}
                </Paragraph>
                <div>
                  {questions[currentQuestion].options.map((option, index) => (
                    <p
                      key={index}
                      className={`
                        ${selectedAnswers[currentQuestion] === (index === 0 ? "a" : "b") ? "act" : ""}
                        ${
                          isValidated &&
                          selectedAnswers[currentQuestion] ===
                            (index === 0 ? "a" : "b")
                            ? option.correct
                              ? "true"
                              : "false"
                            : ""
                        }
                      `}
                      onClick={() =>
                        handleOptionChange(index === 0 ? "a" : "b")
                      }
                    >
                      {index === 0 ? "A" : "B"}. {option.text}
                    </p>
                  ))}
                </div>
                {warningMessage && (
                  <p className="text-secondary-color font-bold text-center mt-2">
                    {warningMessage}
                  </p>
                )}
                <div className="flex justify-center mt-0">
                  <Button
                    bold={false}
                    icon={isValidated ? faArrowRight : faCheck}
                    roundedFull={true}
                    onClick={isValidated ? handleNext : handleValidate}
                    disabled={!selectedAnswers[currentQuestion]}
                  >
                    {isValidated
                      ? currentQuestion === questions.length - 1
                        ? "Finalizar"
                        : "Siguiente"
                      : "Validar"}
                  </Button>
                </div>
              </div>
              {showFeedback && (
                <div className="feedback-container ctItem mt-4">
                  <Paragraph
                    theme="light"
                    justify={isMobile ? "justify" : "left"}
                  >
                    <strong
                      style={{
                        color:
                          questionResults[currentQuestion] === 1
                            ? "#4CAF50"
                            : "#F44336",
                      }}
                    >
                      {questionResults[currentQuestion] === 1
                        ? "Correcto: "
                        : "Incorrecto: "}
                    </strong>
                    {questionResults[currentQuestion] === 1
                      ? questions[currentQuestion].correctFeedback
                      : questions[currentQuestion].incorrectFeedback}
                  </Paragraph>
                </div>
              )}
            </div>
          )}

          {showResults && (
            <div className="resultado-container">
              <p className="text-secondary-color font-bold">Resultados:</p>
              <div className="results-list">
                {questionResults.map((result, index) => (
                  <Paragraph key={index} theme="light">
                    <br /> El resultado de la pregunta {index + 1} es:{" "}
                    <span
                      className={result === 1 ? "text-success" : "text-error"}
                    >
                      {result}/1 respuestas correctas
                    </span>
                  </Paragraph>
                ))}
                <Paragraph theme="light">
                  <br /> Tus respuestas correctas son {results.correct} de{" "}
                  {results.total} (
                  {((results.correct / results.total) * 100).toFixed(0)}%)
                </Paragraph>
              </div>
              <Button
                bold={false}
                icon={faRepeat}
                roundedFull={true}
                onClick={handleRestart}
              >
                Reiniciar Actividad
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TecnicasSegurasDeOperacionDeHerramientas;
