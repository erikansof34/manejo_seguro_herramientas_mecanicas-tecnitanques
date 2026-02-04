import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import Title from "../../pages/components/Title";
import Subtitle from "../../pages/components/Subtitle";
import Paragraph from "../../pages/components/Paragraph";
import Instruction from "../../pages/components/Instruction";
import Button from "../../pages/components/Button";
import ModalDialog from "../../pages/components/ModalDialog";
import useStore from "../../store";
import ImgBienvenidos from "../../assets/img/montaje_sld1_herramientas_manuales.webp";
import audioBienvenidos from '../../assets/audio/slide_bienvenidos.mp3';
import '../slides/styles/BienvenidoModulo.css';

function BienvenidosModulo() {
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
                    <div className="my-3 text-center text-title-size">
                        <Title>Bienvenidos al módulo</Title>
                        <Subtitle>Manejo Seguro de Herramientas Manuales en obra</Subtitle>
                    </div>
                    <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
                        Bienvenidos y bienvenidas a este módulo virtual, en el cual buscamos mejorar
                        la cultura de prevención en sus labores diarias con manipulación de las herramientas
                        manuales necesarias para su trabajo. Queremos recordarle las buenas prácticas de
                        manejo seguir de estas herramientas, así como los elementos clave para el cuidado
                        de su salud y seguridad mientras las está manipulando.
                    </Paragraph>
                    <Instruction arrow="down" theme="dark">
                        Haz clic aquí para escuchar el audio
                    </Instruction>
                    <audio controls className="media-espanol mb-3 w-full">
                    <source src={audioBienvenidos} type="audio/mp3" />
                    Tu navegador no soporta el elemento de audio.
                </audio>
                    {/* <Button
                        bold={false}
                        icon={faVolumeUp}
                        roundedFull={true}
                        onClick={handleOpenModal}
                    >
                        Escuchar Audio
                    </Button> */}
                </div>
            </div>

            {/* Right Column */}
            <div className="md:flex-1 ligth-display bg-white md:w-1/2 w-full flex justify-start">
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className="image-container w-full h-auto max-w-[100%] flex justify-center items-center overflow-hidden">
                        <img
                            src={ImgBienvenidos}
                            alt="Bienvenidos"
                            className="w-[70%] animate-slide"
                        />
                    </div>
                </div>
            </div>

            {/* Modal for audio */}
            {/* <ModalDialog
                open={isModalOpen}
                handleClose={handleCloseModal}
                title="Audio del módulo"
            >
               
                <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
                    Escucha atentamente el audio del módulo para obtener información importante sobre el manejo seguro de herramientas manuales en obra.
                </Paragraph>
            </ModalDialog> */}
        </div>
    );
}

export default BienvenidosModulo;

