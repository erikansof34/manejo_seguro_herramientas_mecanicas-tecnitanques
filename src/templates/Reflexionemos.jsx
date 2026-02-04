import Title from "../pages/components/Title";
import Subtitle from "../pages/components/Subtitle";
import Paragraph from "../pages/components/Paragraph";
import Instruction from "../pages/components/Instruction";
import Button from "../pages/components/Button";
import ModalDialog from "../pages/components/ModalDialog";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import Img_reflexionemos from "../assets/img/artes-morelco/slide_reflexionemos.png";
import PreguntaModal from "../assets/img/artes-morelco/no-olvides-color.png";

import { useState } from "react";
import useStore from "../store";
import { useEffect } from "react";

function VideoTextoTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-screen py-6 px-12 md:px-24  flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          <div className="my-8 text-center">
            <Title>Antes de comenzar…</Title>
            <Subtitle>Reflexionemos…</Subtitle>
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            Lee esta situación y concluye: ¿Realmente vale la pena, lastimarse
            una mano o miembro superior, por tener afán de realizar una tarea?
            Tamara tiene mucho afán, su jefe lo está presionando para que
            termine esa tarea de inmediato, luego de tomarse el café, olvidando
            todas las recomendaciones del buen manejo de herramientas manuales,
            y sin hacer uso de los EPP continua su labor, a los 2 minutos, le
            ocurre un accidente...
            <br />
            ¿Realmente vale la pena, lastimarse una mano o miembro superior, por
            tener afán de realizar una tarea?
          </Paragraph>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full px-12 md:px-24 py-6 flex mx-auto justify-center items-center ">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/*imagen aquí */}
          <img
            className="my-6 max-w-[500px] mx-auto"
            src={Img_reflexionemos}
            alt="Img_reflexionemos"
          />

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

      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Pregunta"
      >
        <img
          className="my-6 max-w-[100px] mx-auto"
          src={PreguntaModal}
          alt="Img_reflexionemos"
        />
        <Paragraph theme="light">
          ¿Consideras que el jefe tuvo algo de responsabilidad en el accidente?
        </Paragraph>
      </ModalDialog>
    </div>
  );
}

export default VideoTextoTemplate;
