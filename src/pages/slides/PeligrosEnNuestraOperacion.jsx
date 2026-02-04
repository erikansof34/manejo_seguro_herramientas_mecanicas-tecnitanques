import { useState, useEffect } from 'react';
import useStore from '../../store';
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import { useMediaQuery } from "react-responsive";
import fisi from '../../assets/img/artes-morelco/propiedades_fisicoquimicas.png';
import toxi from '../../assets/img/artes-morelco/propiedades_toxicologicas.png';
import fis_img1 from '../../assets/img/artes-morelco/p-fisicoquimico-explosivos.svg';
import fis_img2 from '../../assets/img/artes-morelco/p-fisicoquimico-comurentes.svg';
import fis_img3 from '../../assets/img/artes-morelco/p-fisicoquimico-inflamable.svg';
import fis_img4 from '../../assets/img/artes-morelco/p-fisicoquimico-combustible.svg';
import tox_img1 from '../../assets/img/artes-morelco/p-toxicologico-toxico.svg';
import tox_img2 from '../../assets/img/artes-morelco/p-toxicologico-nocivo.svg';
import tox_img3 from '../../assets/img/artes-morelco/p-toxicologico-corrosivo.svg';
import tox_img4 from '../../assets/img/artes-morelco/p-toxicologico-irritacion.svg';
import "../../pages/slides/styles/PeligrosEnNuestraOperacion.css";

function PeligrosEnNuestraOperacion() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentSide, setCurrentSide] = useState('left');
  const [activeButton, setActiveButton] = useState('left');
  const [leftImage, setLeftImage] = useState(fisi);
  const [descriptionText, setDescriptionText] = useState("De acuerdo con el Capítulo 6 del Dec. 1072 del 2015, es toda situación que se presenta en el lugar de trabajo y que se caracteriza por la presencia de riesgos no controlados que pueden generar accidentes de trabajo o enfermedades laborales. Se pueden clasificar en:");
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const leftSlides = [
    { title: "Acto 1", content: "Herramientas inadecuadas, mal diseñadas, de mala calidad o defectuosas.", image: fis_img1 },
    { title: "Acto 2", content: "Herramientas sin guardas de seguridad ni protección en sus puntos de operación.", image: fis_img2 },
    { title: "Acto 3", content: "Herramientas sin parada de emergencia, válvulas de seguridad o aislamiento", image: fis_img3 },
    { title: "Acto 4", content: "Herramientas sin mantenimiento, descalibradas, con ejes desalineados, rodamientos defectuosos, anclajes defectuosos o insuficientes, o con escapes.", image: fis_img4 },
  ];

  const rightSlides = [
    { title: "Acto 1", content: "Herramientas manipuladas de forma incorrecta", image: tox_img1 },
    { title: "Acto 2", content: "Herramientas transportadas de forma insegura", image: tox_img2 },
    { title: "Acto 3", content: "Herramientas abandonadas en lugares peligrosos", image: tox_img3 },
    { title: "Acto 4", content: "También mal conectadas y mal conservadas.", image: tox_img4 },
  ];

  const slides = currentSide === 'left' ? leftSlides : rightSlides;

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handleSideChange = (side) => {
    setCurrentSide(side);
    setActiveSlide(0);
  };

  const handleButtonClick = (side) => {
    setActiveButton(side);
    handleSideChange(side);
    setLeftImage(side === 'left' ? fisi : toxi);
    if (side === 'left') {
      setDescriptionText("De acuerdo con el Capítulo 6 del Dec. 1072 del 2015, es toda situación que se presenta en el lugar de trabajo y que se caracteriza por la presencia de riesgos no controlados que pueden generar accidentes de trabajo o enfermedades laborales. Se pueden clasificar en:");
    } else {
      setDescriptionText("De acuerdo con Capítulo 6 del Dec. 1072 del 2015, es todo acto que realiza un trabajador de manera insegura o inapropiada y que puede facilitar la ocurrencia de un accidente de trabajo. Se pueden clasificar en:");
    }
  };

  return (
    <div className="flex flex-col mb-36 md:mb-0">
      <div className="bg-dark-color w-full py-6 px-10 flex flex-col justify-center items-center">
        <div className="text-center">
          <Title className="text-2xl mb-1 text-white">Conozcamos…</Title>
          <Subtitle className="text-xl text-white">Uso adecuado de herramientas mecánicas</Subtitle>
        </div>
      </div>

      <div className="flex justify-center">
        <Instruction arrow="down" theme="light" className="mb-2 text-xs text-center max-w-xs mx-auto">
          Haz clic en los botones para explorar el contenido
        </Instruction>
      </div>

      <div className="flex justify-center">
        <div className="max-w-full w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 h-full bg-white p-3 md:p-4 flex flex-col items-center img_izq">
            <img src={leftImage} alt="Descripción de la imagen" className="contenido-imagen-izquierda img-izq" />
            <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-justify description-text">
             <Paragraph theme='light' justify='justify'>{descriptionText}</Paragraph> 
            </div>
          </div>

          <div className="w-full md:w-2/3 h-full bg-white p-3 md:p-4 md:mr-8">
            <div className="buttons-container mb-2 mr-12 boton-titulo">
              <button
                onClick={() => handleButtonClick('left')}
                className={`title-button-left ${activeButton === 'left' ? 'active' : ''}`}
              >
                Condiciones Subestándares (Inseguras):
              </button>
              <button
                onClick={() => handleButtonClick('right')}
                className={`title-button-right ${activeButton === 'right' ? 'active' : ''}`}
              >
                Actos Subestándares (Inseguros):
              </button>
            </div>

            <div className="w-full flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 pr-2 flex flex-wrap justify-center md:flex-col md:justify-start items-center botones botones-mobile mb-4 md:mb-0">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    className={`left-button p-2 text-left transition-all mb-1 w-32 mx-1 md:mx-auto rounded-lg text-sm ${
                      activeSlide === index ? 'text-white active' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    } ${activeButton === 'left' ? 'left-active' : 'right-active'}`}
                    onClick={() => handleSlideChange(index)}
                  >
                    {slide.title}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-3/4 flex flex-col mr-0 md:mr-10">
                <div className="content-box rounded-lg flex-grow max-w-[630px] overflow-hidden">
                  <div className="text-container">
                    <Paragraph theme="dark" justify={isMobile ? 'justify' : 'justify'}>
                      {slides[activeSlide]?.content.split('\n').map((text, index) => (
                        <span key={index}>
                          {text}
                          <br />
                        </span>
                      ))}
                    </Paragraph>
                  </div>
                  <div className="img-audio-container flex flex-col items-center justify-center">
                    <img
                      src={slides[activeSlide]?.image}
                      alt="Descripción de la imagen"
                      className="contenido-imagen w-3/5 h-auto mb-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeligrosEnNuestraOperacion;

