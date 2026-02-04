import { useState, useEffect } from 'react';
import useStore from '../../store';
import imgMorelcoMen from '../../assets/img/artes-morelco/ImagenTooltips.jpg';
import "../../pages/slides/style/RiesgoAsociadosAlManejo.css";
import Title from "../components/Title";
import Instruction from "../components/Instruction";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "../components/ModalDialog";
import Audio1 from "../../assets/audio/RIesgos asociados al manejo.mp3";
import Subtitle from '../components/Subtitle';
import { useMediaQuery } from "react-responsive";

function RiesgoAsociadosAlManejo() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  // Estado para controlar los tooltips seleccionados
  const [activeTooltips, setActiveTooltips] = useState([]);

  const tooltipsOrder = [
    'A- proyección de partículas',
    'B- atrapamiento, cizallamiento, corte',
    'C- enganche, fricción',
    'D- Agotamiento, entumecimiento'
  ];

  const handleTooltipClick = (tooltipText) => {
    setActiveTooltips((prevTooltips) => {
      // Toggle logic to show/hide tooltips
      if (prevTooltips.includes(tooltipText)) {
        return prevTooltips.filter(text => text !== tooltipText);
      } else {
        // Maintain order when adding new tooltips
        const newTooltips = [...prevTooltips, tooltipText].filter((item, index, self) => self.indexOf(item) === index);
        return tooltipsOrder.filter(tooltip => newTooltips.includes(tooltip));
      }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Columna izquierda */}
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full py-6 px-12 md:px-24 flex-col justify-center items-center h-auto md:h-screen ">
        <div className=" my-auto flex flex-col justify-center items-center mb-4">

          <div className="text-center">
            <Title >Recordemos…</Title>
            <Subtitle>Riesgos asociados al manejo no seguro de herramientas mecánicas</Subtitle>
          </div>
          <Instruction arrow="down">
            Observa detenidamente la imagen y haz clic en los puntos para identificar los posibles riesgos
          </Instruction>
          <div className="image-container relative">
            <img
              src={imgMorelcoMen}
              alt="Carl"
              className="imagen-carl-respon"
              style={{ width: "300px" }}
            />
            {/* Botón A */}
            <div className="tooltip-container">
              <button
                onClick={() => handleTooltipClick('A- proyección de partículas')}
                className="botonporcentaje"
                style={{ position: 'absolute', bottom: '230px', left: '220px' }}
              >
                A
              </button>
            </div>
            {/* Botón B */}
            <div className="tooltip-container">
              <button
                onClick={() => handleTooltipClick('B- atrapamiento, cizallamiento, corte')}
                className="botonporcentaje"
                style={{ position: 'absolute', bottom: '30px', left: '50px' }}
              >
                B
              </button>
            </div>
            {/* Botón C */}
            <div className="tooltip-container">
              <button
                onClick={() => handleTooltipClick('C- enganche, fricción')}
                className="botonporcentaje"
                style={{ position: 'absolute', bottom: '140px', left: '30px' }}
              >
                C
              </button>
            </div>
            {/* Botón D */}
            <div className="tooltip-container">
              <button
                onClick={() => handleTooltipClick('D- Agotamiento, entumecimiento')}
                className="botonporcentaje"
                style={{ position: 'absolute', bottom: '55px', right: '30px' }}
              >
                D
              </button>
            </div>

          </div>
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
            No importa el tipo de herramienta que utilices, siempre estarás expuesto en mayor o menor medida a algún riesgo
          </Paragraph>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="md:flex-2 bg-white md:w-1/2 w-full px-10 md:pr-20 flex mx-auto justify-center items-center">
        <div className="flex flex-col justify-center items-center p-2 gap-4 h-[50vh] max-w-[100%] mx-auto">

          <Instruction arrow="down" theme='light'>
            Observa las opciones que aparecen a medida que haces clic en los botones de la imagen.
          </Instruction>
          {/* Aquí se muestran los textos de los tooltips activos */}
          {activeTooltips.length > 0 ? (
            activeTooltips.map((tooltipText, index) => (
              <div key={index} className="tooltip-text1 bg-white p-4 rounded-lg shadow-md mb-2">
                <p>{tooltipText}</p>
              </div>
            ))
          ) : (
            <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
              <p>Haz clic en los botones para ver su descripción.</p>
            </Paragraph>
          )}
          <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
            Otros riesgos asociados con la manipulación de herramientas son: abrasión, aplastamiento, arrastre, descarga eléctrica, golpe y perforación, entre otros.
          </Paragraph>
          <Button

            icon={faThumbsUp}
            roundedFull={true}
            onClick={handleOpenModal}
          >
            Sabias que
          </Button>
          <ModalDialog
            open={isModalOpen}
            handleClose={handleCloseModal}
            title=" Sabias que"
          >
            <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
              Según la Organización Internacional del Trabajo (OIT), en el año 2020,
              se registraron 168 millones de víctimas de accidentes laborales en el mundo,
              de las cuales 308.000 resultaron en muertes. De este total, un porcentaje significativo
              se atribuye al uso inadecuado de herramientas manuales</Paragraph>
            <div className="audio-container">
              {/* <audio controls className="media-espanol">
                    <source src={Audio1} type="audio/mpeg" />
                  </audio> */}
            </div>
          </ModalDialog>

        </div>
      </div>
    </div>
  );
}

export default RiesgoAsociadosAlManejo;