import React, { useState, useEffect } from 'react';
import '../slides/styles/RiesgosAsociadosHerramientas.css';
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import ImgBienvenidos from "../../assets/img/caras/avatar_completo_epp.webp";
import { useMediaQuery } from "react-responsive";
import useStore from "../../store";
import { faThumbTack, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import modalAudio from "../../assets/audio/M1_Slide 8.mp3";
import ingeMorelco from "../../assets/img/caras/avatar_neutro.webp"
import imgMorelcoMen from '../../assets/img/artes-morelco/ImagenTooltips.jpg';

const tooltips = [
    {
        id: 1,
        title: "proyección de partículas",
        texto: "Protegen las manos de cortes, abrasiones, impactos​",
        top: "20%",
        left: "70%",
        position: "left",
        // icon: cascoIcon
    },
    {
        id: 2,
        title: "atrapamiento, cizallamiento, corte",
        texto: "Protegen los ojos de partículas voladoras, polvo, chispas.",
        top: "90%",
        left: "30%",
        position: "top",
        // icon: gafasIcon
    },
    {
        id: 3,
        title: "enganche, fricción",
        texto: "Protegen los oídos de niveles de ruido elevados que pueden causar daño auditivo por ruido de impacto o continuo.",
        top: "55%",
        left: "21%",
        position: "top",
        // icon: guantesIcon
    },
    {
        id: 4,
        title: "agotamiento, entumecimiento",
        texto: "Protege la cabeza de impactos, caídas de objetos y otras lesiones.",
        top: "84%",
        left: "83%",
        position: "left",
        // icon: botasIcon
    }
];

function RiesgosAsociadosHerramientas() {
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
                        <Subtitle>Riesgos asociados al manejo no seguro de herramientas mecánicas</Subtitle>
                    </div>
                    <div className="w-[40%]">
                        <img
                            className="mb-0"
                            src={ingeMorelco}
                            alt="Img_reflexionemos"
                        />
                    </div>
                    <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
                        No importa el tipo de herramienta que utilices, siempre estarás expuesto en mayor o menor medida a algún riesgo
                    </Paragraph>
                    <div className="mt-3">
                        <Button
                            icon={faVolumeUp}
                            roundedFull={true}
                            onClick={handleOpenModal}
                        >
                            Escucha
                        </Button>
                    </div>
                </div>
            </div>

            {/* Columna Derecha */}
            <div className="md:flex-1 bg-white md:w-3/5 w-full px-6 md:px-24 flex mx-auto justify-center items-center">
                <div className="h-full my-auto flex flex-col justify-center items-center">
                    <Instruction arrow="down" theme="light">
                        Haz clic sobre los botones de la imagen para ver más información.
                    </Instruction>
                    <div className="image-container8 flex justify-center items-center">
                        <div className="w-[90%]">
                            <img
                                className="mb-0"
                                src={imgMorelcoMen}
                                alt="Img_reflexionemos"
                            />
                        </div>
                        {tooltips.map((tooltip) => (
                            <div
                                key={tooltip.id}
                                className={`tooltip-button ${activeTooltip && activeTooltip !== tooltip.id ? "hidden-buttonRAH" : ""
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
                                        <div className="tooltip-header-ra ">
                                            {/* <img
                        // src={tooltip.icon}
                        alt=""
                        className="tooltip-icon"
                      /> */}
                                            <h3 className="tooltip-title">
                                                {tooltip.title}
                                            </h3>
                                        </div>
                                        {/* <Paragraph theme="light" justify="justify">
                                            {tooltip.texto}
                                        </Paragraph> */}
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
                    title="Escucha"
                >
                    <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
                        En el dinámico mundo de la construcción y la producción, las herramientas manuales juegan un papel fundamental en el desarrollo de las obras y las plantas de producción.
                    </Paragraph>
                    <audio controls className="media-espanol ml-7 mt-5">
                        <source src={modalAudio} type="audio/mp3" />
                    </audio>
                </ModalDialog>
            </div>
        </div>
    );
}

export default RiesgosAsociadosHerramientas;
