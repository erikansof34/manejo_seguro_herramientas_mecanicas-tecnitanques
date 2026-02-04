import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import useStore from "../../store";
import ModalDialog from "../components/ModalDialog";
import {
  faCheck,
  faRepeat,
  faArrowRight,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import "../slides/styles/ImportanciaDelManejoSeguro.css";
import audioModal from "../../assets/audio/M1Slide7.mp3";
import Loader from "../components/Loader";

function ImportanciaDelManejoSeguro() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const videoRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 2 });
  const [questionResults, setQuestionResults] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const questions = [
    {
      question:
        "¿Cuál paso consideras que Andy NO está haciendo correctamente?",
      options: [
        {
          text: "Entregar las herramientas al comenzar el turno",
          correct: false,
        },
        {
          text: "Revisar el estado de las herramientas y aplicar procedimiento de mantenimiento preventivo",
          correct: true,
        },
        { text: "Recibir las herramientas al final del turno", correct: false },
      ],
      correctFeedback:
        "Es importante que Andy revise el estado de las herramientas y aplique el procedimiento de mantenimiento preventivo para garantizar la seguridad en el trabajo.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "Escoge 2 razones por las que Andy debería revisar las herramientas:",
      options: [
        { text: "Para prevenir accidentes a los compañeros", correct: true },
        { text: "Para prevenir daños en los equipos", correct: true },
        { text: "Quejarse de Andy ante la jefatura", correct: false },
      ],
      multipleCorrect: true,
      correctCount: 2,
      correctFeedback:
        "Revisar las herramientas es crucial para prevenir accidentes a los compañeros y daños en los equipos. Esto contribuye a un ambiente de trabajo más seguro y eficiente.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      if (questions[currentQuestion].multipleCorrect) {
        setSelectedAnswers((prev) => {
          const newAnswers = [...prev];
          if (!newAnswers[currentQuestion]) {
            newAnswers[currentQuestion] = [];
          }
          if (newAnswers[currentQuestion].includes(optionIndex)) {
            newAnswers[currentQuestion] = newAnswers[currentQuestion].filter(
              (i) => i !== optionIndex
            );
          } else if (newAnswers[currentQuestion].length < 2) {
            newAnswers[currentQuestion] = [
              ...newAnswers[currentQuestion],
              optionIndex,
            ];
          }
          return newAnswers;
        });
      } else {
        setSelectedAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[currentQuestion] = [optionIndex];
          return newAnswers;
        });
      }
      setShowErrorMessage(false);
      setShowFeedback(false);
    }
  };

  const handleValidate = () => {
    if (selectedAnswers[currentQuestion]?.length > 0) {
      if (
        questions[currentQuestion].multipleCorrect &&
        selectedAnswers[currentQuestion].length === 1
      ) {
        setShowErrorMessage(true);
        return;
      }

      let isCorrect;
      if (questions[currentQuestion].multipleCorrect) {
        const correctOptions = questions[currentQuestion].options
          .map((option, index) => (option.correct ? index : null))
          .filter((index) => index !== null);
        isCorrect =
          selectedAnswers[currentQuestion].length ===
            questions[currentQuestion].correctCount &&
          selectedAnswers[currentQuestion].every((answer) =>
            correctOptions.includes(answer)
          );
      } else {
        isCorrect =
          questions[currentQuestion].options[
            selectedAnswers[currentQuestion][0]
          ].correct;
      }
      setQuestionResults((prev) => {
        const newResults = [...prev];
        newResults[currentQuestion] = isCorrect ? 1 : 0;
        return newResults;
      });
      setIsValidated(true);
      setShowErrorMessage(false);
      setShowFeedback(true);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsValidated(false);
      setShowFeedback(false);
    } else {
      setResults({
        correct: questionResults.reduce((a, b) => a + b, 0),
        total: questions.length,
      });
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setIsValidated(false);
    setQuestionResults([]);
    setShowErrorMessage(false);
    setShowFeedback(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-2/5 w-full py-6 px-12 flex flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="text-center">
            <Title>Reflexionemos...</Title>
            <Subtitle>
              Importancia del manejo seguro de herramientas mecánicas
            </Subtitle>
          </div>
          <Instruction arrow="down" theme="dark">
            Haz clic para ejecutar el video-caso
          </Instruction>
          <div style={{ position: "relative" }}>
            {isLoading && <Loader />}
            <iframe
              src="https://iframe.mediadelivery.net/embed/369366/2c923105-8e64-4745-8415-05e39cb1b1ef?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
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
          <div className="mx-auto mt-2">
            <Button
              icon={faQuestionCircle}
              roundedFull={true}
              onClick={handleOpenModal}
              className="validate-button"
            >
              ¿Sabías que?
            </Button>
          </div>
        </div>
      </div>

      <div className="md:flex-2 bg-white md:w-3/5 w-full px-6 md:pr-20 flex justify-center items-center pb-2">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center my-2">
            <Title>
              <span className="text-secondary-color">
                ¡Sigamos con la historia!
              </span>
            </Title>
          </div>
          <div className="text-justify">
            <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
              Ahora ayuda un poco a Andy contestando estas preguntas con
              relación al video:
            </Paragraph>
          </div>
          <div className="flex justify-center items-center">
            <Instruction theme="light" arrow="down">
              Responde las siguientes preguntas basadas en el video que acabas
              de ver.
            </Instruction>
          </div>
          {showQuestions && !showResults && (
            <div className="preguntas_01">
              <div className="ctItem-7">
                <Paragraph
                  theme="light"
                  justify={isMobile ? "justify" : "justify"}
                >
                  <strong>Pregunta {currentQuestion + 1}: </strong>
                  {questions[currentQuestion].question}
                </Paragraph>
                <div>
                  {questions[currentQuestion].options.map((option, index) => (
                    <p
                      key={index}
                      className={`
                        ${selectedAnswers[currentQuestion]?.includes(index) ? "act" : ""}
                        ${
                          isValidated &&
                          selectedAnswers[currentQuestion]?.includes(index)
                            ? option.correct
                              ? "true"
                              : "false"
                            : ""
                        }
                      `}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {String.fromCharCode(97 + index)}. {option.text}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col items-center">
                  {showErrorMessage && (
                    <h3 className="text-secondary-color tex-center font-bold mb-2">
                      {questions[currentQuestion].multipleCorrect
                        ? selectedAnswers[currentQuestion]?.length === 1
                          ? "Falta una opción por seleccionar."
                          : "Debes seleccionar dos opciones para continuar."
                        : "Debes seleccionar una opción para continuar."}
                    </h3>
                  )}
                  <Button
                    bold={false}
                    icon={isValidated ? faArrowRight : faCheck}
                    roundedFull={true}
                    onClick={isValidated ? handleNext : handleValidate}
                    disabled={selectedAnswers[currentQuestion]?.length === 0}
                  >
                    {isValidated ? "Siguiente" : "Validar"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {showQuestions && !showResults && showFeedback && (
            <div className="feedback-container ctItem mt-4">
              <Paragraph
                theme="light"
                justify={isMobile ? "justify" : "justify"}
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
          {showResults && (
            <div className="resultado-container">
              <p className="text-secondary-color font-bold">Resultados:</p>
              <div className="results-list">
                {questionResults.map((result, index) => (
                  <Paragraph key={index} theme="light">
                    El resultado de la pregunta {index + 1} es{" "}
                    <span
                      className={result === 1 ? "text-success" : "text-error"}
                    >
                      {index === 1 ? result + 1 : result}/{index + 1} respuestas
                      correctas
                    </span>
                  </Paragraph>
                ))}
                <Paragraph theme="light">
                  Tus respuestas correctas son {results.correct} de{" "}
                  {results.total} (
                  {((results.correct / results.total) * 100).toFixed(0)}%)
                </Paragraph>
              </div>
              <Button
                bold={false}
                icon={faRepeat}
                roundedFull={true}
                onClick={handleReset}
              >
                Reiniciar Actividad
              </Button>
            </div>
          )}
        </div>
      </div>
      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="¿Sabías que?"
      >
        <Paragraph theme="light" justify="justify">
          Las primeras herramientas que se conocen en la humanidad, se ubican en
          África, y fueron el hueso, la piedra (para cortar, raspar, machacar,
          trabajar madera, despiezar la caza), la lanza, los punzones, cinceles
          y luego de años de evolución la hoz o cuchilla para cosechar.
        </Paragraph>
        <div className="audio-container flex items-center justify-center">
          <audio controls className="media-espanol">
            <source src={audioModal} type="audio/mpeg" />
          </audio>
        </div>
      </ModalDialog>
    </div>
  );
}

export default ImportanciaDelManejoSeguro;
