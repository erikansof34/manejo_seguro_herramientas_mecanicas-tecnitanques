import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import { useMediaQuery } from "react-responsive";
import imgIngenieroHerramientas from "../../assets/img/caras/avatar_neutro.webp";
// import imgIngenieroHerramientas from '../../assets/img/ingenieroHerramientas.png';
import martillo from "../../assets/img/herramientas/martillo.webp";
import cintaMetrica from "../../assets/img/herramientas/cintaMetrica.webp";
import destornillador from "../../assets/img/herramientas/destornillador.webp";
import taladro from "../../assets/img/herramientas/taladro.webp";
import sierraElectrica from "../../assets/img/herramientas/sierraElectrica.webp";
import mezcladoraCemento from "../../assets/img/herramientas/Mezcladora.webp";
import "../slides/styles/ApliquemosHerramientasMecanicas.css";
import imgVerdadero from "../../assets/img/checkAct.png";
import imgFalso from "../../assets/img/xmarkAct.png";
import { faRepeat, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalDialog from "../components/ModalDialog";
import audioModal from "../../assets/audio/M1Slide6.mp3";
import Button from "../components/Button";

import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function ApliquemosHerramientasMecanicas() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [results, setResults] = useState({});
  const [explanation, setExplanation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const correctImages = [martillo, cintaMetrica, destornillador];
  const [validationMessage, setValidationMessage] = useState("");

  const explanationsMap = {
    [martillo]:
      "Muy bien! Este tipo de herramienta SOLO usa energía manual, y hace parte de las HERRAMIENTAS DE GOLPEO.",
    [cintaMetrica]:
      "Este tipo de herramienta SOLO usa energía manual, y hace parte de las HERRAMIENTAS DE MEDICIÓN.",
    [destornillador]:
      "Este tipo de herramienta SOLO usa energía manual, y hace parte de las HERRAMIENTAS DE SUJECIÓN.",
    [taladro]:
      "Piénsalo bien! Este tipo de herramienta NO es manual ya que usa energía eléctrica, y hace parte de las HERRAMIENTAS DE PERFORACIÓN.",
    [sierraElectrica]:
      "Revisa bien! Este tipo de herramienta NO es manual ya que usa energía eléctrica para su funcionamiento, hace parte de las HERRAMIENTAS DE CORTE.",
    [mezcladoraCemento]:
      "Revisa bien! Este tipo de herramienta NO es manual, ya que cuenta con otros mecanismos además de la fuerza humana para su operación.",
  };

  const actSelectImg = (image) => {
    const isSelected = selectedImages.includes(image);
    let newSelectedImages = [...selectedImages];

    if (isSelected) {
      newSelectedImages = newSelectedImages.filter((img) => img !== image);
      setExplanation(null);
    } else if (newSelectedImages.length < 6) {
      newSelectedImages.push(image);
      setExplanation({ image, isCorrect: correctImages.includes(image) });
    }

    setSelectedImages(newSelectedImages);

    const isCorrect = correctImages.includes(image);
    setResults((prevResults) => ({
      ...prevResults,
      [image]: isSelected ? undefined : isCorrect,
    }));

    updateValidationMessage(newSelectedImages);
  };

  const updateValidationMessage = (selected) => {
    if (selected.length === 0) {
      setValidationMessage("");
      return;
    }

    const totalCorrect = selected.filter((img) =>
      correctImages.includes(img)
    ).length;
    const percentage = Math.round((totalCorrect / 3) * 100);

    setValidationMessage(
      `Tus respuestas correctas son: ${totalCorrect} de 3 (${percentage}%)`
    );
  };

  const resetActivity = () => {
    setResults({});
    setSelectedImages([]);
    setExplanation(null);
    setIsModalOpen(false);
    setValidationMessage("");
  };

  const handleOpenModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleCloseModal1 = () => {
    setIsModalOpen1(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row mb-36 md:mb-0">
        {/* Columna izquierda */}
        <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
          <div
            className="display-mobile flex flex-col justify-center items-center md:px-16"
            style={{
              position: isMobile ? "static" : "relative",
              top: isMobile ? "0" : "0",
            }}
          >
            <div className="my-2 text-center">
              <Title>Apliquemos</Title>
            </div>
            <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
              ¿Recuerdas la definición de HERRAMIENTA MECÁNICA (Manuales y No
              manuales)?
            </Paragraph>
            <img
              className="h-[35%] w-auto m-0 rounded"
              src={imgIngenieroHerramientas}
              alt="ingeniero de obra"
            />
            <Button
              onClick={handleOpenModal1}
              icon={faCircleQuestion}
              roundedFull={true}
              className="flex justify-center items-center group bg-button-color rounded-full px-4 py-2 shadow-main-color text-white"
            >
              ¿Sabías que?
            </Button>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="md:flex-2 bg-white md:w-3/5 w-full px-4 md:pr-12 flex flex-col justify-between h-auto md:h-screen">
          {/* Instrucción y actividad interactiva */}
          <div className="flex flex-col items-center justify-center mx-auto flex-grow">
            <Instruction arrow="down" theme="light">
              Ayuda a Tamara a identificar cuáles SÍ son herramientas mecánicas
              MANUALES:
            </Instruction>

            {/* Image Container */}
            <div className="col-lg-9 col-md-12">
              <div className="actSelectImg text-center">
                <div className="items-container grid-container">
                  {[
                    martillo,
                    cintaMetrica,
                    destornillador,
                    taladro,
                    sierraElectrica,
                    mezcladoraCemento,
                  ].map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`itemAct ${selectedImages.includes(imgSrc) ? "selected" : ""} ${correctImages.includes(imgSrc) ? "check" : "xmark"}`}
                      onClick={() => actSelectImg(imgSrc)}
                    >
                      <img src={imgSrc} alt={`Imagen ${index}`} />
                      {selectedImages.includes(imgSrc) && (
                        <img
                          className="resAct"
                          src={
                            results[imgSrc] === true
                              ? imgVerdadero
                              : results[imgSrc] === false
                                ? imgFalso
                                : ""
                          }
                          alt={
                            results[imgSrc] === true ? "Correcto" : "Incorrecto"
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
                {/* Explicación de la imagen seleccionada, movido encima del botón de reiniciar */}
                {explanation && (
                  <div
                    style={{
                      fontSize: "16px",
                      textAlign: "left",
                      marginBottom: "10px",
                    }}
                    className={`p-2 md:w-[95%] w-[100%] text-white ${explanation.isCorrect ? "bg-green-500" : "bg-red-500"} rounded`}
                  >
                    {explanationsMap[explanation.image]}
                  </div>
                )}
                {validationMessage && (
                  <div
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "10px",
                      color: "grey",
                    }}
                    className="p-2 w-[100%] rounded"
                  >
                    {validationMessage}
                  </div>
                )}
                {/* Botón de reinicio centrado en la parte inferior */}
                <div className="flex justify-center items-center">
                  <Button
                    onClick={resetActivity}
                    roundedFull={true}
                    icon={faRepeat}
                    className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                  >
                    Reiniciar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal "Sabías que" */}
      <ModalDialog
        open={isModalOpen1}
        handleClose={handleCloseModal1}
        title="¿Sabías que?"
      >
        <Paragraph theme="light" justify="justify">
          <ul>
            Las herramientas mecánicas (manuales y no manuales) se dividen en
            cuatro (4) grandes categorías:
            <ul>
              <li>
                Herramientas de corte: Sierras mecánicas, cepilladoras,
                lijadoras.
              </li>
              <li>Herramientas de golpeo: Taladros, martillos neumáticos.</li>
              <li>Herramientas de sujeción: Tornillos, clavos, abrazaderas.</li>
              <li>
                Herramientas de medición: Cintas métricas, niveles de burbuja.
              </li>
            </ul>
          </ul>
        </Paragraph>
        <div className="flex justify-center items-center mt-3">
          <audio controls className="media-espanol w-full">
            <source src={audioModal} type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      </ModalDialog>
    </>
  );
}

export default ApliquemosHerramientasMecanicas;
