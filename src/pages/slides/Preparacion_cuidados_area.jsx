import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import { faPaw, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Loader from "../components/Loader";

function VideoTextoTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
  }
  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full md:h-screen px-6 py-4 md:px-24 flex-col justify-center items-center">
        <div className=" h-full flex flex-col justify-center items-center">
          {/* Left Column */}

          <div className="mb-2 text-center">
            <Title>Apliquemos...</Title>
            <Subtitle>
              Preparación y cuidados <br /> en el área de trabajo
            </Subtitle>
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            ¡Veamos cómo Andy está ayudando a su compañero a establecer el
            programa de buenas prácticas en el manejo de herramientas!
          </Paragraph>
          <div className="w-auto justify-center items-center">
            <Instruction arrow="down">
              Lee atentamente la continuación de <br /> la historia de Andy y
              Tamara :
            </Instruction>
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            En esta ocasión, su compañero está enseñando a Andy acerca de cómo
            preparar y mantener adecuadamente las superficies de trabajo en la
            operación, especialmente dentro del área de trabajos con
            herramientas mecánicas, manuales y no manuales.
            <br /> Hay cinco (5) elementos clave que su compañero está mostrando
            a Andy, observa el video con atención y aplica lo visto en tu área
            de trabajo:
          </Paragraph>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full px-24  flex mx-auto justify-center items-center ">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <Instruction arrow="down" theme="light">
            Dale clic para reproducir el video
          </Instruction>
          <div style={{ position: "relative" }}>
            {isLoading && <Loader theme="dark" />}
            <iframe
              src="https://iframe.mediadelivery.net/embed/369366/f0b81d7a-7a11-4647-b54f-bad327352973?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
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

      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Título del modal"
      >
        <p>
          Contenido del <strong>hola</strong>modal
        </p>
        <h1 className="text-4xl font-bold">titulo</h1>
      </ModalDialog>
    </div>
  );
}

export default VideoTextoTemplate;
