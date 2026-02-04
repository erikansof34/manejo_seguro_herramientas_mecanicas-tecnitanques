import React, { useState, useRef, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import useStore from "../../store";
import {
  faCheck,
  faRepeat,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import Loader from "../components/Loader";
import "../slides/styles/IdentificacionRiesgosComunes.css";

function IdentificacionRiesgosComunes() {
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
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const questions = [
    {
      question:
        "¿Cuál es la forma correcta de verificar si una herramienta manual está en buen estado antes de usarla?",
      options: [
        {
          text: "Usarla brevemente para asegurarse de que funcione correctamente.",
          correct: false,
        },
        {
          text: "Inspeccionarla visualmente para detectar grietas, desgaste, o piezas sueltas.",
          correct: true,
        },
        {
          text: "Preguntar a un compañero si la herramienta está en buen estado.",
          correct: false,
        },
      ],
      correctFeedback:
        "La inspección visual es la forma más segura y efectiva de verificar el estado de una herramienta antes de usarla. Esto permite detectar problemas potenciales que podrían causar accidentes.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "¿Cuáles dos (2) medidas consideras que Tamara  debería tomar al analizar la situación?",
      options: [
        {
          text: "Realizar capacitación de manejo seguro de herramientas",
          correct: true,
        },
        {
          text: "Implementar programa de Orden y limpieza en el almacén",
          correct: true,
        },
        { text: "Quejarse de Andy ante la jefatura", correct: false },
        { text: "Tratar de que echen del puesto a Andy", correct: false },
      ],
      multipleCorrect: true,
      correctCount: 2,
      correctFeedback:
        "La capacitación en manejo seguro de herramientas y la implementación de un programa de orden y limpieza son medidas proactivas que pueden mejorar significativamente la seguridad en el lugar de trabajo.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      if (questions[currentQuestion].multipleCorrect) {
        setSelectedAnswers((prev) => {
          const newAnswers = [...prev];
          if (!newAnswers[currentQuestion]) {
            newAnswers[currentQuestion] = [];
          }
          if (newAnswers[currentQuestion].includes(optionIndex)) {
            // Si la opción ya está seleccionada, la quitamos
            newAnswers[currentQuestion] = newAnswers[currentQuestion].filter(
              (i) => i !== optionIndex
            );
          } else if (newAnswers[currentQuestion].length < 2) {
            // Si hay menos de 2 opciones seleccionadas, añadimos la nueva
            newAnswers[currentQuestion] = [
              ...newAnswers[currentQuestion],
              optionIndex,
            ];
          }
          // Si ya hay 2 opciones seleccionadas, no hacemos nada
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

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsValidated(false);
      setShowFeedback(false);
      setShowErrorMessage(false);
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
        <div className="md:h-screen h-auto my-auto flex flex-col justify-center items-center">
          <div className="text-center">
            <Title>Aprendamos...</Title>
            {/* <Subtitle>Veamos cómo Tamara  da las instrucciones a los trabajadores acerca del uso seguro de herramientas mécanicas </Subtitle> */}
          </div>
          <div className="mt-1" style={{ lineHeight: "1.2rem" }}>
            <Paragraph theme="dark" justify="center">
              Veamos cómo dar las instrucciones a los trabajadores acerca del
              uso seguro de herramientas mécanicas{" "}
            </Paragraph>
          </div>
          <Instruction arrow="down" theme="dark">
            Haz clic para ejecutar el video-caso
          </Instruction>
          <div style={{ position: "relative" }}>
            {isLoading && <Loader />}
            <iframe
              src="https://iframe.mediadelivery.net/embed/369366/d0feb6b0-dcb3-4fee-85d7-c1256abc3803?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
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
              Ahora ayuda a Andy un poco contestando estas preguntas con
              relación al video:
            </Paragraph>
          </div>
          <div className="flex justify-center items-center">
            <Instruction theme="light" arrow="down">
              Contesta las preguntas de acuerdo con la historia que acabas de
              ver en el video
            </Instruction>
          </div>

          {showQuestions && !showResults && (
            <div className="preguntas_01">
              <div className="ctItem">
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
                    <h3 className="text-secondary-color text-center font-bold mb-2">
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
                {questionResults.map((result, index) => {
                  const question = questions[index];
                  const totalCorrectAnswers = question.multipleCorrect
                    ? question.correctCount
                    : 1;

                  return (
                    <Paragraph key={index} theme="light">
                      <br />
                      El resultado de la pregunta {index + 1} es{" "}
                      <span
                        className={
                          result === totalCorrectAnswers
                            ? "text-success"
                            : "text-error"
                        }
                      >
                        {result}/{totalCorrectAnswers} respuestas correctas
                      </span>
                    </Paragraph>
                  );
                })}
                {/* Mostrar el número de respuestas correctas y el porcentaje */}
                <Paragraph theme="light">
                  <br />
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
    </div>
  );
}

export default IdentificacionRiesgosComunes;
