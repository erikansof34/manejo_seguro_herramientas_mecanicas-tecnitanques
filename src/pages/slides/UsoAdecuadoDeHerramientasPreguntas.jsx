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
import Img_reflexionemos1 from "../../assets/img/caras/avatar_sonriente.webp";
import "../slides/styles/UsoAdecuadoDeHerramientasPreguntas.css";

function UsoAdecuadoDeHerramientasPreguntas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 3 });
  const [questionResults, setQuestionResults] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      question:
        "¿Qué se debe hacer antes de iniciar un trabajo con herramientas manuales?",
      options: [
        {
          text: "Escoger cualquier herramienta disponible, sin importar su estado.",
          correct: false,
        },
        {
          text: "Seleccionar la herramienta adecuada para la tarea y verificar su estado.",
          correct: true,
        },
        {
          text: "Usar la misma herramienta para diferentes trabajos.",
          correct: false,
        },
      ],
      correctFeedback:
        "Es crucial seleccionar la herramienta adecuada y verificar su estado antes de iniciar cualquier trabajo para garantizar la seguridad y eficiencia.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "¿Cuál es la mejor práctica después de utilizar una herramienta manual?",
      options: [
        {
          text: "Dejarla en cualquier lugar cercano al área de trabajo.",
          correct: false,
        },
        { text: "Guardarla en un lugar seguro y designado.", correct: true },
        {
          text: "Pasársela a un compañero sin revisar su estado.",
          correct: false,
        },
      ],
      correctFeedback:
        "Guardar las herramientas en un lugar seguro y designado después de su uso ayuda a mantener el orden, prevenir accidentes y prolongar la vida útil de las herramientas.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
    {
      question:
        "¿Qué medida se debe tomar para garantizar un uso seguro y eficiente de las herramientas manuales?",
      options: [
        { text: "Asignar herramientas personalizadas.", correct: true },
        {
          text: "Permitir que los trabajadores usen cualquier herramienta.",
          correct: false,
        },
        { text: "Dejar las herramientas expuestas.", correct: false },
      ],
      correctFeedback:
        "Asignar herramientas personalizadas fomenta la responsabilidad individual, facilita el mantenimiento y reduce el riesgo de uso inadecuado o daño a las herramientas.",
      incorrectFeedback:
        "¡Inténtalo de nuevo! La opción seleccionada no es la correcta.",
    },
  ];

  const feedbacks = [];

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleAnswerSelect = (optionIndex) => {
    if (!isValidated) {
      setSelectedAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = [optionIndex];
        return newAnswers;
      });
      setShowErrorMessage(false);
      setShowFeedback(false);
    }
  };

  const handleValidate = () => {
    if (selectedAnswers[currentQuestion]?.length > 0) {
      const isCorrect =
        questions[currentQuestion].options[selectedAnswers[currentQuestion][0]]
          .correct;
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
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-2/5 w-full py-6 px-6 md:px-20 flex flex-col justify-center items-center">
        <div className="h-auto md:h-screen my-auto flex flex-col justify-center items-center">
          {/* <div className="text-center">
            <Title>Apliquemos...</Title>
            <Subtitle>Uso adecuado de herramientas mecánicas</Subtitle>
          </div> */}
          <div className="text-center">
            {/*imagen aquí */}
            <img
              className=" max-w-[200px] mx-auto mb-0"
              src={Img_reflexionemos1}
              alt="Img_reflexionemos"
            />
            <Title>Apliquemos…</Title>
            <Subtitle>Uso adecuado de herramientas mecánicas</Subtitle>
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            Lee atentamente la continuación de la historia de Tamara y su
            compañero:
          </Paragraph>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            Tamara ya es consciente de que debe capacitarse en el procedimiento
            de almacenamiento y mantenimiento de las herramientas mecánicas...
          </Paragraph>
        </div>
      </div>

      <div className="md:flex-2 bg-white md:w-3/5 w-full px-6 md:pr-20 flex justify-center items-center pb-2">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center my-2">
            <Title>
              <span className="text-secondary-color">¡Ayudemos a Tamara!</span>
            </Title>
          </div>
          <div className="flex justify-center items-center">
            <Instruction theme="light" arrow="down">
              Lee cada pregunta y ayúdale a Tamara a seleccionar 1 sola
              respuesta:
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
                      Debes seleccionar una opción para continuar.
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
                    <br />
                    El resultado de la pregunta {index + 1} es:{" "}
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

export default UsoAdecuadoDeHerramientasPreguntas;
