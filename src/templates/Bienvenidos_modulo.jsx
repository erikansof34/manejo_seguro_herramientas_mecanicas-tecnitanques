import Title from "../pages/components/Title";
import Subtitle from "../pages/components/Subtitle";
import Paragraph from "../pages/components/Paragraph";
import Instruction from "../pages/components/Instruction";
import ModalDialog from "../pages/components/ModalDialog";
import { useState } from "react";
//Importar imagenes
import ImgBienvenidos from "../assets/img/artes-morelco/sld_bievenidos_1.png";

//Importar audios
import audioBienvenidos from '../assets/audio/slide_bienvenidos.mp3';
import { useMediaQuery } from "react-responsive";
import useStore from "../store";
import { useEffect } from "react";

function VideoTextoTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [])


  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-screen py-6 px-12 md:px-24 flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          {/* Este div es opcional. Cuando el título requiere más información */}

          <div className="my-8 text-center">
            <Title>Bienvenidos al módulo</Title>
            <Subtitle>Manejo Seguro de Herramientas Manuales en obra</Subtitle>
          </div>
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
            Bienvenidos y bienvenidas a este módulo virtual, en el cual buscamos mejorar
            la cultura de prevención en sus labores diarias con manipulación de las herramientas
            manuales necesarias para su trabajo.   Queremos recordarle las buenas prácticas de
            manejo seguir de estas herramientas, así como los elementos clave para el cuidado
            de su salud y seguridad mientras las está manipulando.
          </Paragraph>
          <Instruction arrow="down">
            Haz clic para ejecutar el audio
          </Instruction>
          <audio controls className="media-espanol">
            <source src={audioBienvenidos} type="audio/mp3" />
          </audio>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full px-12 md:px-24 py-6 flex mx-auto justify-center items-center ">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Este div es opcional. Cuando el título requiere más información */}
          <img
            className="my-6 max-w-[500px] mx-auto"
            src={ImgBienvenidos}
            alt="ImgBienvenidos"
          />


        </div>
      </div>


    </div>
  );
}

export default VideoTextoTemplate;
