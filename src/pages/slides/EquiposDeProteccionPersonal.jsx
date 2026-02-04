import React, { useState, useEffect } from 'react';
import '../slides/styles/EquiposDeProteccionPersonal.css';
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import ImgBienvenidos from "../../assets/img/caras/avatar_completo_epp.webp";
import { useMediaQuery } from "react-responsive";
import useStore from "../../store";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import modalAudio from "../../assets/audio/M2 – Slide 16_recuerda.mp3";

const tooltips = [
  {
    id: 1,
    title: "Guantes de Seguridad",
    texto: "Protegen las manos de cortes, abrasiones, impactos​",
    top: "52%",
    left: "37%",
    position: "bottom",
    // icon: cascoIcon
  },
  {
    id: 2,
    title: "Gafas de Seguridad",
    texto: "Protegen los ojos de partículas voladoras, polvo, chispas.",
    top: "10%",
    left: "42%",
    position: "bottom",
    // icon: gafasIcon
  },
  {
    id: 3,
    title: "Protectores Auditivos",
    texto: "Protegen los oídos de niveles de ruido elevados que pueden causar daño auditivo por ruido de impacto o continuo.",
    top: "10%",
    left: "58%",
    position: "bottom",
    // icon: guantesIcon
  },
  {
    id: 4,
    title: "Casco de Seguridad",
    texto: "Protege la cabeza de impactos, caídas de objetos y otras lesiones.",
    top: "3%",
    left: "50%",
    position: "bottom",
    // icon: botasIcon
  },
  {
    id: 5,
    title: "Ropa de Trabajo",
    texto: "Protege el cuerpo de cortes, quemaduras y otras lesiones.",
    top: "40%",
    left: "50%",
    position: "bottom",
    // icon: botasIcon
  },
  {
    id: 6,
    title: "Calzado de Seguridad",
    texto: "Protege los pies de impactos, perforaciones, resbalones.",
    top: "92%",
    left: "42%",
    position: "top",
    // icon: botasIcon
  }
];

function EquiposDeProteccionPersonal() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsOnDivisor(false);

    const handleClickOutside = (event) => {
      if (!event.target.closest(".tooltip-button") && !event.target.closest(".tooltip-text")) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOnDivisor]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleTooltipClick = (id) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setActiveTooltip(null);
  };

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Columna Izquierda */}
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full md:h-screen h-auto py-3 px-6 md:px-24 flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="mb-2 text-center">
            <Title>Recordemos…</Title>
            <Subtitle>Equipos de Protección Personal (EPP)</Subtitle>
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            Recordemos que el Decreto 1072 de 2015, que es el Decreto Único
            Reglamentario del Sector Trabajo en Colombia, define los Equipos
            de Protección Personal (EPP) como:
          </Paragraph>
          <br />
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            "Cualquier equipo, aparato o dispositivo destinado a ser usado o sujetado por el trabajador para que lo proteja contra uno o varios riesgos que puedan amenazar su seguridad o su salud en el trabajo, así como cualquier complemento o accesorio destinado a tal fin."
          </Paragraph>
          <div className="mt-3">
            <Button
              icon={faThumbTack}
              roundedFull={true}
              onClick={handleOpenModal}
            >
              Recuerda
            </Button>
          </div>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="md:flex-1 bg-white md:w-3/5 w-full px-12 md:px-24 flex mx-auto justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <Instruction arrow="down" theme="light">
            Haz clic sobre cada elemento para ampliar información
          </Instruction>
          <div className="image-container2">
            <img
              className={`main-image ${activeTooltip ? "darken" : ""}`}
              src={ImgBienvenidos}
              alt="Equipos de Protección Personal"
            />
            {tooltips.map((tooltip) => (
              <div
                key={tooltip.id}
                className={`tooltip-button ${activeTooltip && activeTooltip !== tooltip.id ? "hidden-button" : ""
                  }`}
                style={{ top: tooltip.top, left: tooltip.left }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTooltipClick(tooltip.id);
                }}
              >
                {tooltip.id}
                {activeTooltip === tooltip.id && (
                  <div
                    className={`tooltip-text active`}
                    data-position={tooltip.position}
                  >
                    <div className="tooltip-header">
                      {/* <img
                        // src={tooltip.icon}
                        alt=""
                        className="tooltip-icon"
                      /> */}
                      <h3 className="tooltip-title">
                        {tooltip.title}
                      </h3>
                    </div>
                    <Paragraph theme="light" justify="justify">
                      {tooltip.texto}
                    </Paragraph>
                    <button
                      className="close-button"
                      onClick={handleCloseClick}
                      aria-label="Cerrar"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <ModalDialog
          open={isModalOpen}
          handleClose={handleCloseModal}
          title="Recuerda"
        >
          <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
            Recuerda que el Decreto 1072 de 2015 establece como una obligación
            intransferible de cada trabajador, el buen uso de sus Equipos de
            Protección Personal (EPP). Esta obligación son fundamentales
            para garantizar la seguridad y la salud en el trabajo tuyo y de tus compañeros.
          </Paragraph>
          <audio controls className="media-espanol ml-7 mt-5">
            <source src={modalAudio} type="audio/mp3" />
          </audio>
        </ModalDialog>
      </div>
    </div>
  );
}

export default EquiposDeProteccionPersonal;
