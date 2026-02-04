import React, { useState, useEffect } from "react";
import useStore from "../../store";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import img1 from "../../assets/img/herramienta_corte.jpg";
import img2 from "../../assets/img/herramienta_impact.jpg";
import img3 from "../../assets/img/herramienta_penetracion.jpg";
import img4 from "../../assets/img/herramienta_torsion.jpg";
import audio1 from "../../assets/audio/sl06au01.mp3";
import audio2 from "../../assets/audio/sl06au01.mp3";
import audio3 from "../../assets/audio/sl06au01.mp3";
import audio4 from "../../assets/audio/sl06au01.mp3";
import { faRefresh, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../slides/styles/RiesgosAsociadosSelects.css";
import imgVerdadero from "../../assets/img/checkAct.png";
import imgFalso from "../../assets/img/xmarkAct.png";

function RiesgosAsociadosSelects() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [selections, setSelections] = useState({
    drop1: "",
    drop2: "",
    drop3: "",
    drop4: "",
  });
  const [availableOptions, setAvailableOptions] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
  });
  const [isVerified, setIsVerified] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState({
    correct: 0,
    total: 4,
  });

  useEffect(() => {
    setIsOnDivisor(false);
    // Initialize available options
    const initialOptions = options.slice(1);
    setAvailableOptions({
      drop1: initialOptions,
      drop2: initialOptions,
      drop3: initialOptions,
      drop4: initialOptions,
    });
  }, [setIsOnDivisor]);

  const handleChange = (dropId, value) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [dropId]: value };

      // Update available options for all dropdowns
      const selectedValues = Object.values(newSelections).filter(
        (v) => v !== ""
      );
      const newAvailableOptions = {};
      Object.keys(availableOptions).forEach((key) => {
        newAvailableOptions[key] = options
          .slice(1)
          .filter(
            (option) =>
              !selectedValues.includes(option.value) ||
              option.value === newSelections[key]
          );
      });
      setAvailableOptions(newAvailableOptions);

      return newSelections;
    });
  };

  const handleVerify = () => {
    let count = 0;
    Object.keys(selections).forEach((key) => {
      if (selections[key] === correctItems[key]) {
        count++;
      }
    });
    setCorrectCount(count);
    setIsVerified(true);
    setResults({ correct: count, total: Object.keys(correctItems).length });
  };

  const handleReset = () => {
    setSelections({
      drop1: "",
      drop2: "",
      drop3: "",
      drop4: "",
    });
    setIsVerified(false);
    setCorrectCount(0);
    // Reset available options
    const initialOptions = options.slice(1);
    setAvailableOptions({
      drop1: initialOptions,
      drop2: initialOptions,
      drop3: initialOptions,
      drop4: initialOptions,
    });
  };

  const risks = [
    {
      title: "Lesiones por corte",
      image: img1,
      audio: audio1,
      description:
        "Causadas por el contacto con bordes afilados o herramientas mal utilizadas",
      dropId: "drop1",
      gradient: "from-red-400 to-red-600",
    },
    {
      title: "Lesiones por aplastamiento",
      image: img2,
      audio: audio2,
      description:
        "Producidas por la caída de objetos pesados o el uso incorrecto de herramientas de golpeo",
      dropId: "drop2",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Golpes y proyecciones",
      image: img4,
      audio: audio3,
      description:
        "Derivadas del uso inadecuado de herramientas como martillos o cinceles",
      dropId: "drop3",
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Riesgo ergonómico",
      image: img3,
      audio: audio4,
      description:
        "Causados por posturas inadecuadas, esfuerzos excesivos o movimientos repetitivos",
      dropId: "drop4",
      gradient: "from-yellow-400 to-yellow-600",
    },
  ];

  const options = [
    { value: "", label: "Selecciona una opción" },
    { value: "option1", label: "Golpes y proyecciones" },
    { value: "option2", label: "Lesiones por corte" },
    { value: "option3", label: "Riesgo ergonómico" },
    { value: "option4", label: "Lesiones por aplastamiento" },
  ];

  const correctItems = {
    drop1: "option2",
    drop2: "option4",
    drop3: "option1",
    drop4: "option3",
  };

  return (
    <div className="quiz-container-ra mb-36 md:mb-0 overflow-auto">
      <div className="quiz-header-ra px-6 md:px-14">
        <Title>Conozcamos...</Title>
        <Subtitle>
          Riesgos asociados al manejo no seguro de herramientas mecánicas
        </Subtitle>
        <div className="quiz-subtitle-ra">
          <Paragraph theme="dark" justify={"justify"}>
            El uso inadecuado de herramientas mecánicas puede generar una amplia
            gama de riesgos para la salud y la seguridad de los trabajadores,
            incluyendo:
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center items-center px-4">
        <Instruction theme="light" arrow="down">
          Selecciona el riesgo correspondiente para cada imagen
        </Instruction>
      </div>

      <div className="cards-container-ra">
        {risks.map((risk, index) => (
          <div className="quiz-card-ra" key={index}>
            <div className="card-front-ra">
              <div
                className={`card-image-ra bg-gradient-to-b ${risk.gradient}`}
                style={{ position: "relative" }}
              >
                <img
                  src={risk.image}
                  alt={risk.title}
                  className="w-full h-full object-cover"
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
                {isVerified && (
                  <div className="validation-icon-container">
                    <img
                      src={
                        selections[risk.dropId] === correctItems[risk.dropId]
                          ? imgVerdadero
                          : imgFalso
                      }
                      alt="Validation Icon"
                      className="validation-icon"
                    />
                  </div>
                )}
              </div>

              <div
                className={`card-content-ra ${
                  isVerified
                    ? selections[risk.dropId] === correctItems[risk.dropId]
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                <p
                  className="text-justify"
                  style={{ color: isVerified ? "white" : "gray" }}
                >
                  {risk.description}
                </p>
                <select
                  value={selections[risk.dropId]}
                  onChange={(e) => handleChange(risk.dropId, e.target.value)}
                  className="my-2 w-full p-2 border rounded"
                  disabled={isVerified}
                  style={{
                    backgroundColor: isVerified ? "white" : "white",
                    color: isVerified ? "gray" : "black",
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  {availableOptions[risk.dropId].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isVerified && (
        <div className="text-center mt-3">
          <Paragraph theme="light">
            Tus respuestas correctas son {results.correct} de{" "}
            {Object.keys(correctItems).length} (
            {(results.correct / results.total) * 100}%)
          </Paragraph>
        </div>
      )}
      <div className="flex justify-center gap-4 my-3">
        <Button
          bold={false}
          icon={faCheck}
          roundedFull={true}
          onClick={handleVerify}
        >
          Validar
        </Button>
        <Button
          bold={false}
          icon={faRefresh}
          roundedFull={true}
          onClick={handleReset}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}

export default RiesgosAsociadosSelects;
