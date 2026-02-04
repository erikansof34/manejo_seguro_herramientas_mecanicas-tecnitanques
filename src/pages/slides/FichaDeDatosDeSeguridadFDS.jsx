import React, { useState, useEffect } from 'react';
import useStore from "../../store";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import ModalDialog from "../components/ModalDialog";
import Instruction from "../components/Instruction";
import img1 from "../../assets/img/herramienta_corte.jpg";
import img2 from "../../assets/img/herramienta_impact.jpg";
import img4 from "../../assets/img/herramienta_penetracion.jpg";
import img3 from "../../assets/img/herramienta_torsion.jpg";
import audioCorte from "../../assets/audio/M2Slide 15 1 Version-buena.mp3";
import audioImpacto from "../../assets/audio/M2Slide 15 2 Version-buena.mp3";
import audioTorsion from "../../assets/audio/M2Slide 15 3 Version-buena.mp3";
import audioPenetracion from "../../assets/audio/M2Slide 15 4 Version-buena.mp3";

import { faThumbTack, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../slides/styles/FichaDeDatosDeSeguridadFDS.css";
import imgVerdadero from '../../assets/img/checkAct.png';
import imgFalso from '../../assets/img/xmarkAct.png';
import Escucha from "../../assets/audio/M2Slide 15 Escucha.mp3";
import { useMediaQuery } from "react-responsive";

function FichaDeDatosDeSeguridadFDS() {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState("");
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const [modalAudio, setModalAudio] = useState(null);
    const [isModalOpenEtiquetas, setIsModalOpenEtiquetas] = useState(false);
    const [selections, setSelections] = useState({
        drop1: '',
        drop2: '',
        drop3: '',
        drop4: '',
    });

    useEffect(() => {
        setIsOnDivisor(false);
    }, [])

    const handleOpenModal = (texto, audio) => {
        setModalText(texto);
        setModalAudio(audio);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalText("");
        setModalAudio(null);
    };

    const handleOpenModalEtiquetas = () => {
        setIsModalOpenEtiquetas(true);
    };

    const handleCloseModalEtiquetas = () => {
        setIsModalOpenEtiquetas(false);
    };

    const cuadros = [
        {
            imagen: img1,
            Audio: audioCorte,
            texto: "Herramientas de corte",
            modalTexto:
                "Inspeccione que sus cuchillas no tengan estrías ni melladuras, que sus mangos se encuentren fijos, no cortados, desgastados o incompletos, que su aislamiento no se encuentre deteriorado, que estén libres de grasas o aceites y que sus dientes estén completos y con buen filo."
        },
        {
            imagen: img2,
            Audio: audioImpacto,
            texto: "Herramientas de Impacto",
            modalTexto:
                "Verifique que el cabo se encuentre bien ajustado, tenga mango antideslizante y que no esté astillado ni roto."
        },
        {
            imagen: img3,
            Audio: audioPenetracion,
            texto: "Herramientas de Penetración",
            modalTexto:
                "Verifique que los enchufes, cables, carcasas, botones e interruptores estén en buen estado y perfectamente aislados, sin reparaciones improvisadas con cinta aislante, que solo se conecten a tableros portátiles y nunca a los circuitos de alimentación de plantas eléctricas, que las conexiones tengan polo a tierra para evitar descargas."
        },
        {
            imagen: img4,
            Audio: audioTorsion,
            texto: "Herramientas de Torsión",
            modalTexto:
                "Confirme que la estructura no presente fisuras. En todas las llaves, verifique que la boca o la estrella no esté redondeada, que las llaves Bristol concuerden con sus cuadrantes y que el destornillador tenga el vástago recto y su pala o estrella en buen estado."
        }
    ];


    return (
        <>
            <div className="quiz-container-ra mb-36 md:mb-0 overflow-auto">
                <div className="quiz-header-ra px-6 md:px-14">
                    <Title>Conozcamos...</Title>
                    <Subtitle>Programa de Inspecciones de Herramientas</Subtitle>
                    <div className="quiz-subtitle-ra">
                        <Paragraph theme='dark' justify={'justify'}>
                            Igualmente, el dec. 1072 del 2015, establece que en toda empresa se debe tener un plan de inspección y mantenimiento preventivo de las herramientas mecánicas, manuales y no manuales. Veamos que tener en cuenta en las inspecciones para cada categoría de herramientas:
                        </Paragraph>
                    </div>
                </div>
                <div className="flex justify-center items-center px-4">
                    <Instruction theme="light" arrow="down">
                        Haz clic sobre cada elemento para ver más información
                    </Instruction>
                </div>

                <div className="cards-container-ra">
                    {cuadros.map((cuadro, index) => (
                        <div className="quiz-card-raFDS" key={index}>
                            <div className="card-front-ra">
                                <div className={`card-image-ra-pih bg-gradient-to-b`}>
                                    <img
                                        src={cuadro.imagen}
                                        alt={`Imagen ${index + 1}`}
                                        className="cuadro-imagen-pih"
                                    />
                                    <div className='flex justify-center items-center'>
                                        <h1 className="cuadro-texto mb-3">{cuadro.texto}</h1>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <button
                                            className="cuadro-boton-pih"
                                            onClick={() => handleOpenModal(cuadro.modalTexto, cuadro.Audio)}
                                        >
                                            Recomendaciones
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center my-5">
                    <Button
                        open={isModalOpenEtiquetas}
                        bold={false}
                        icon={faThumbTack}
                        roundedFull={true}
                        onClick={handleOpenModalEtiquetas}
                    >
                        Recuerda
                    </Button>
                </div>
                <ModalDialog
                    open={isModalOpenEtiquetas}
                    handleClose={handleCloseModalEtiquetas}
                    title="Recuerda"
                >
                    <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                        Es importante tener en cuenta que, durante la jornada de trabajo, es muy probable que utilices algún tipo de herramienta.
                    </Paragraph>
                    <audio controls className="media-espanol ml-7 mt-5">
                        <source src={Escucha} type="audio/mp3" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </ModalDialog>
            </div>

            <ModalDialog open={isModalOpen} handleClose={handleCloseModal} title="Recomendaciones">
                <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}>
                    {modalText.split("\n").map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </Paragraph>
                {modalAudio && (
                    <audio controls className="media-espanol ml-7 mt-5">
                        <source src={modalAudio} type="audio/mp3" />
                    </audio>
                )}
            </ModalDialog>
        </>
    );
}

export default FichaDeDatosDeSeguridadFDS;

