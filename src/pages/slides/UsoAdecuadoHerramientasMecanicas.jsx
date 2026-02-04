import { useState, useEffect, useRef } from 'react';
import useStore from '../../store';
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
// import Instruction from "../components/Instruction";
import "../../pages/slides/styles/UsoAdecuadoHerramientasMecanicas.css";
import audioRight1 from '../../assets/audio/sl06au01.mp3';
import audioRight2 from '../../assets/audio/sl06au01.mp3';
import audioRight3 from '../../assets/audio/sl06au01.mp3';
import audioRight4 from '../../assets/audio/sl06au01.mp3';
import { useMediaQuery } from "react-responsive";
import Instruction from '../components/Instruction';

function UsoAdecuadoHerramientasMecanicas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [activeLeftSlide, setActiveLeftSlide] = useState(0);
  const [activeRightSlide, setActiveRightSlide] = useState(0);
  const audioLeftRef = useRef(null);
  const audioRightRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const leftSlides = [
    { title: "Acto 1", content: "Herramientas inadecuadas, mal diseñadas, de mala calidad o defectuosas.", audio: audioRight1 },
    { title: "Acto 2", content: "Herramientas sin guardas de seguridad ni protección en sus puntos de operación.", audio: audioRight2 },
    { title: "Acto 3", content: "Herramientas sin parada de emergencia, válvulas de seguridad o aislamiento", audio: audioRight3 },
    { title: "Acto 4", content: "Herramientas sin mantenimiento, descalibradas, con ejes desalineados, rodamientos defectuosos, anclajes defectuosos o insuficientes, o con escapes.", audio: audioRight4 },
  ];

  const rightSlides = [
    { title: "Acto 1", content: "Herramientas manipuladas de forma incorrecta", audio: audioRight1 },
    { title: "Acto 2", content: "Herramientas transportadas de forma insegura", audio: audioRight2 },
    { title: "Acto 3", content: "Herramientas abandonadas en lugares peligrosos", audio: audioRight3 },
    { title: "Acto 4", content: "También mal conectadas y mal conservadas.", audio: audioRight4 },
  ];

  const handleSlideChange = (index, side) => {
    if (side === 'left') {
      setActiveLeftSlide(index);
    } else {
      setActiveRightSlide(index);
    }
  };

  const renderColumnContent = (side, slides, activeSlide, title, paragraph) => (
  <div className={`w-full flex flex-col flex-grow min-h-[500px] relative border rounded-lg bg-white ${isMobile ? 'p-2' : 'p-4'}`}>
      {/* Pestañas superiores */}
      <div className="absolute top-0 left-0 right-0 flex justify-start bg-gray-100 border-b tabs-button-container">
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`tabs-button transition-all rounded-t-lg text-sm mx-1 ${
              activeSlide === index
                ? `bg-secondary-color text-white`
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            onClick={() => handleSlideChange(index, side)}
          >
            {slide.title}
          </button>
        ))}
      </div>
      {/* Contenido debajo de las pestañas */}
      <div className="mt-12 p-4 flex flex-col flex-grow"> {/* Ajusta el margen superior para dejar espacio a las pestañas */}
        <Subtitle className="text-xl mb-4 text-center">{title}</Subtitle>
        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'} className="mb-4">
          {paragraph}
        </Paragraph>
        <div className="p-3 rounded-lg flex-grow bg-gray-100">
          <h3 className="text-lg font-bold mb-1 text-gray-800">
            {slides[activeSlide].title}
          </h3>
          <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
            {slides[activeSlide].content}
          </Paragraph>
        </div>
        <div className="mt-2">
          <audio 
            ref={side === 'left' ? audioLeftRef : audioRightRef}
            src={slides[activeSlide].audio} 
            className="w-full" 
            controls
          />
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="flex flex-col mb-36 md:mb-0">
      <div className="bg-dark-color w-full py-6 px-10 flex flex-col justify-center items-center">
        <div className="text-center">
          <Title className="text-2xl mb-1 text-white">Conozcamos…</Title>
          <Subtitle className="text-xl text-white">Uso adecuado de herramientas mecánicas</Subtitle>
        </div>
      </div>
     
      <div className="flex justify-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row p-6">
          <div className="w-full md:w-1/2 h-full bg-white p-3 md:p-4">

          <Instruction theme='light' arrow='down'>Clic sobre cada elemento para ampliar información</Instruction>
            {renderColumnContent(
              'left',
              leftSlides,
              activeLeftSlide,
              "Condiciones Subestándares (Inseguras):",
              "De acuerdo con el Capítulo 6 del Dec. 1072 del 2015, es toda situación que se presenta en el lugar de trabajo y que se caracteriza por la presencia de riesgos no controlados que pueden generar accidentes de trabajo o enfermedades laborales. Se pueden clasificar en:"
            )}
          </div>

          <div className="w-full md:w-1/2 h-full bg-white p-3 md:p-4 ml-4 md:mr-8">
           <Instruction theme='light' arrow='down'>Clic sobre cada elemento para ampliar información</Instruction>
            {renderColumnContent(
              'right',
              rightSlides,
              activeRightSlide,
              "Actos Subestándares (Inseguros):",
              "De acuerdo con Capítulo 6 del Dec. 1072 del 2015, es todo acto que realiza un trabajador de manera insegura o inapropiada y que puede facilitar la ocurrencia de un accidente de trabajo. Se pueden clasificar en:"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsoAdecuadoHerramientasMecanicas;
