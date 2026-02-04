import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import useStore from "../../store";
import Img_reflexionemos from "../../assets/img/artes-morelco/slide_reflexionemos.png";
import PreguntaModal from "../../assets/img/artes-morelco/no-olvides-color.png";
import '../slides/styles/AntesComenzarReflexionemos.css';
import ingenieraTecnitanques from "../../assets/img/caras/avatar_feliz.webp";

function AntesComenzarReflexionemos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

    useEffect(() => {
        setIsOnDivisor(false);
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row mb-36 md:mb-0">
            {/* Left Column */}
            <div className="md:flex-1 dark-mobile bg-dark-color md:w-1/2 w-full">
                <div className="display-mobile flex flex-col justify-center items-center md:px-16" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '0' }}>
                    <div className="w-[40%]">
                            <img
                                className="mb-0"
                                src={ingenieraTecnitanques}
                                alt="Img_reflexionemos"
                            />
                    </div>
                    <div className="my-3 text-center text-title-size">
                        <Title>Antes de comenzar…</Title>
                        <Subtitle>Reflexionemos…</Subtitle>
                    </div>
                    <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
                        Lee esta situación y concluye:<br/>
                        Tamara tiene mucho afán, su jefe lo está presionando para 
                        que termine esa tarea de inmediato, luego de tomarse el café, 
                        olvidando todas las recomendaciones del buen manejo de herramientas 
                        manuales y sin hacer uso de los EPP continúa su labor. A los 2 minutos, 
                        le ocurre un accidente.
                        <br />
                        <p className="font-bold text-center mt-3">
                        ¿Realmente vale la pena, lastimarse una mano o miembro superior, por tener afán de realizar una tarea?
                        </p>
                    </Paragraph>
                </div>
            </div>

            {/* Right Column */}
            <div className="md:flex-1 ligth-display bg-white md:w-1/2 w-full flex justify-start">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="image-container w-full h-auto max-w-[100%] flex justify-center items-center overflow-hidden">
                        <img
                            src={Img_reflexionemos}
                            alt="Reflexionemos"
                            className="w-[70%] animate-slide m-0"
                        />
                    </div>
                    <Instruction arrow="down" theme="light">
                        Haz clic en el botón y lee la pregunta
                    </Instruction>
                    <Button
                        icon={faQuestionCircle}
                        roundedFull={true}
                        onClick={handleOpenModal}
                    >
                        Pregunta
                    </Button>
                </div>
            </div>

            {/* Modal for question */}
            <ModalDialog
                open={isModalOpen}
                handleClose={handleCloseModal}
                title="Pregunta"
            >
                <img
                    className="my-6 max-w-[100px] mx-auto"
                    src={PreguntaModal}
                    alt="Pregunta"
                />
                <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
                    ¿Consideras que el jefe tuvo algo de responsabilidad en el accidente?
                </Paragraph>
            </ModalDialog>
        </div>
    );
}

export default AntesComenzarReflexionemos;

