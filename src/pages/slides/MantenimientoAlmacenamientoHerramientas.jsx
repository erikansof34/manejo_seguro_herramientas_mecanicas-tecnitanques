import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import { faPaw, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Img_reflexionemos1 from "../../assets/img/caras/avatar_sonriente.webp";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import Loader from "../components/Loader";

function VideoTextoTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const videoRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
  }
  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full md:h-screen h-auto py-6 px-6 md:px-24 flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          {/* Este div es opcional. Cuando el título requiere más información */}

          <div className="text-center">
            {/*imagen aquí */}
            <img
              className=" max-w-[200px] mx-auto mb-0"
              src={Img_reflexionemos1}
              alt="Img_reflexionemos"
            />
            <Title>Apliquemos…</Title>
            <Subtitle>Mantenimiento y Almacenamiento de herramientas</Subtitle>
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            Veamos estas recomendaciones para el buen mantenimiento y
            almacenamiento de herramientas en nuestra operación:
          </Paragraph>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full md:pr-24  md:pl-6 flex mx-auto justify-center items-center ">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <Instruction arrow="down" theme="light">
            Haz clic para ejecutar el video
          </Instruction>
          <div style={{ position: "relative" }}>
            {isLoading && <Loader theme="dark" />}
            <iframe
              src="https://iframe.mediadelivery.net/embed/369366/f2300c96-8e97-432f-8f11-3c6fb2bd0842?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
              loading="lazy"
              ref={videoRef}
              className="w-[90vw] md:w-[40vw] h-[25vh] md:h-[50vh]"
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
    </div>
  );
}

export default VideoTextoTemplate;
