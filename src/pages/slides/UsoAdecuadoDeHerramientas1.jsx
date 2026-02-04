import { useState, useEffect, useRef } from "react";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Subtitle from "../components/Subtitle";
import Button from "../components/Button";
import "../slides/style/LimitesPesoCargas.css";
import {
  faVolumeUp,
  faCheck,
  faRepeat,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import imgSwiper1 from "../../assets/img/artes-morelco/slider-1.webp";
import imgSwiper2 from "../../assets/img/artes-morelco/slider-2.webp";
import imgSwiper3 from "../../assets/img/artes-morelco/slider-3.webp";
import imgSwiper4 from "../../assets/img/artes-morelco/slider-4.webp";
import imgSwiper5 from "../../assets/img/artes-morelco/slider-5.webp";
import imgSwiper6 from "../../assets/img/artes-morelco/slider-6.webp";
import audioSwiper1 from "../../assets/audio/sl06au01.mp3";
import audioSwiper2 from "../../assets/audio/sl06au02.mp3";
import audioSwiper3 from "../../assets/audio/sl06au03.mp3";
import audioSwiper4 from "../../assets/audio/sl06au04.mp3";
import audioSwiper5 from "../../assets/audio/sl06au03.mp3";
import audioSwiper6 from "../../assets/audio/sl06au04.mp3";
import ModalDialog from "../components/ModalDialog";
import audioModal from "../../assets/audio/uso_adecuado_herramientas.mp3";

// import imgPosturaCaja from "../../assets/img/slides/carga_sld9.png";

export default function UsoAdecuadoDeHerramientas1() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [instructionWidth, setInstructionWidth] = useState(0);
  const audioRef = useRef(null);
  const mainImageRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const slides = [
    { image: imgSwiper1, audio: audioSwiper1 },
    { image: imgSwiper2, audio: audioSwiper2 },
    { image: imgSwiper3, audio: audioSwiper3 },
    { image: imgSwiper4, audio: audioSwiper4 },
    { image: imgSwiper5, audio: audioSwiper5 },
    { image: imgSwiper6, audio: audioSwiper6 },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Set instruction width based on main image width
    if (mainImageRef.current) {
      setInstructionWidth(mainImageRef.current.offsetWidth);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSlideChange = (index) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveSlide(index);

    if (index !== 0 && audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleAudioEnd = () => {
    const nextSlide = (activeSlide + 1) % slides.length;
    handleSlideChange(nextSlide);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();

      if (activeSlide !== 0) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => {
            audioRef.current.controls = false;
            audioRef.current.controls = true;
          })
          .catch((error) => {
            console.log("Autoplay prevented or failed:", error);
          });
      }
    }
  }, [activeSlide]);

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Left Column */}
      <div className="md:flex-1 dark-mobile bg-dark-color md:w-1/2 px-6 md:px-20 ">
        <div
          className="display-mobile flex flex-col justify-center py-3 items-center px-0 md:h-screen"
          style={{
            position: isMobile ? "static" : "static",
            top: isMobile ? "0" : "-30px",
          }}
        >
          <div className="text-center text-title-size">
            <Title>
              Conozcamos…
              <br />
              Uso adecuado de herramientas mecánicas
            </Title>
            <Subtitle>Buenas practicas</Subtitle>
          </div>
          <div className="w-full mx-auto flex items-center justify-center my-2">
            {/* <img src={imgPosturaCaja} alt="Main" className="w-[80%] object-cover mb-0" /> */}
          </div>
          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            El empleo inadecuado de herramientas de mano son origen de una
            cantidad importante de lesiones partiendo de la base de que se
            supone que todo el mundo sabe cómo utilizar las herramientas
            mecánicas más corrientes. A nivel general se pueden resumir en seis
            (6) las prácticas de seguridad asociadas al buen uso de las
            herramientas de mano
          </Paragraph>
          <div className="mx-auto mt-3">
            <Button
              icon={faVolumeUp}
              roundedFull={true}
              onClick={handleOpenModal}
              className="validate-button"
            >
              Escucha
            </Button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-2 display-mobile ligth-display bg-white md:w-3/5 w-full px-6 md:pr-24 flex mx-auto justify-center items-center mb-4">
        <div className="relative flex-grow mt-0 w-full">
          <div
            className="flex flex-col items-center"
            style={{
              position: isMobile ? "static" : "relative",
              top: isMobile ? "0" : "20px",
            }}
          >
            <div className="w-auto">
              <Instruction
                arrow="down"
                theme="light"
                className="w-full text-center"
              >
                Haz clic en las imágenes pequeñas para explorar el contenido
              </Instruction>
            </div>

            <div
              className={`flex ${isMobile ? "flex-col" : "flex-row"} w-full`}
            >
              {isMobile && (
                <div className="grid grid-cols-3 gap-2 md:flex items-center justify-center md:space-x-2 mb-4">
                  {slides.map((slide, index) => (
                    <img
                      key={index}
                      src={slide.image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`md:w-16 md:h-16 w-auto h-auto object-cover flex cursor-pointer transition-all ${
                        activeSlide === index
                          ? "border-4 border-secondary-color rounded-lg"
                          : "opacity-70"
                      }`}
                      onClick={() => handleSlideChange(index)}
                    />
                  ))}
                </div>
              )}

              {!isMobile && (
                <div className="flex-col space-y-2 mr-4 mb-4 w-20 flex items-center justify-center">
                  {slides.map((slide, index) => (
                    <img
                      key={index}
                      src={slide.image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-full cursor-pointer transition-all mb-0 ${
                        activeSlide === index
                          ? "border-4 border-secondary-color rounded-lg"
                          : "opacity-70"
                      } object-cover`}
                      onClick={() => handleSlideChange(index)}
                    />
                  ))}
                </div>
              )}

              <div className="relative flex-grow">
                <img
                  ref={mainImageRef}
                  src={slides[activeSlide].image}
                  alt={`Slide ${activeSlide + 1}`}
                  className="w-full max-h-[60vh] object-contain m-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Escucha"
      >
        <Paragraph theme="light" justify="justify">
          Desde un punto de vista ergonómico las herramientas manuales deben
          cumplir una serie de requisitos básicos para que sean eficaces, a
          saber:
        </Paragraph>
        <div className="audio-container flex items-center justify-center">
          <audio controls className="media-espanol">
            <source src={audioModal} type="audio/mpeg" />
          </audio>
        </div>
      </ModalDialog>
    </div>
  );
}
