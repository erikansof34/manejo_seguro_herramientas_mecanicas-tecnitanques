import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import "../../pages/slides/style/ProgramaDeInspeccionesDeHerramientas.css";
import img1 from "../../assets/img/herramienta_corte.jpg";
import img2 from "../../assets/img/herramienta_impact.jpg";
import img3 from "../../assets/img/herramienta_penetracion.jpg";
import img4 from "../../assets/img/herramienta_torsion.jpg";
import Instruction from "../../pages/components/Instruction";
import audioCorte from "../../assets/audio/herramienta_corte.mp3";
import audioImpacto from "../../assets/audio/herramienta_impacto.mp3";
import audioPenetracion from "../../assets/audio/herramienta_penetracion.mp3";
import audioTorsion from "../../assets/audio/herramienta_torsion.mp3";

function ProgramaDeInspeccionesDeHerramientas() {
  const [expanded, setExpanded] = useState({
    corte: false,
    impacto: false,
    torsion: false,
    penetracion: false,
  });
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const audioRefs = useRef([]); // Crear la referencia para los elementos de audio

  const handlePlay = (index) => {
    console.log(`Reproduciendo audio en el índice ${index}`);
  };

  const toggleText = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="flex flex-col mb-36 md:mb-0">
      <div className="bg-dark-color w-full py-6 px-10 flex flex-col justify-center items-center">
        <div className="text-center">
          <Title>Conozcamos… </Title>
          <Subtitle>Programa de Inspecciones de Herramientas:</Subtitle>
        </div>
        <div className="max-w-4xl">
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
            Igualmente, el dec. 1072 del 2015, establece que en toda empresa se
            debe tener un plan de inspección y mantenimiento preventivo de las
            herramientas mecánicas, manuales y no manuales. Veamos que tener en
            cuenta en las inspecciones para cada categoría de herramientas:
          </Paragraph>
        </div>
      </div>

      <div className="cards-container w-full py-6 px-10 pr-16 pl-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Tarjeta 1: Herramientas de Corte */}
          <div className="cardambiental">
            <div className="card_image">
              <img src={img1} alt="Herramientas de corte" />
            </div>
            <div className="card_content">
              <h3
                className="text-16px font-bold text-center"
                style={{ color: "#003454" }}
              >
                Herramientas de corte
              </h3>
              <div
                className="card_content_text"
                style={{
                  height: expanded.corte ? "auto" : "150px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "height 0.3s ease",
                }}
              >
                <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
                  {expanded.corte ? (
                    <>
                      Inspeccione que sus cuchillas no tengan estrías ni
                      melladuras, que sus mangos se encuentren fijos, no
                      cortados, desgastados o incompletos, que su aislamiento no
                      se encuentre deteriorado, que estén libres de grasas o
                      aceites y que sus dientes estén completos y con buen filo.
                    </>
                  ) : (
                    <>
                      Inspeccione que sus cuchillas no tengan estrías ni
                      melladuras, que sus mangos se encuentren fijos, no
                      cortados, desgastados o incompletos,
                
                    </>
                  )}
                </Paragraph>
              </div>
              <button
                className="text-blue-500 mt-2"
                onClick={() => toggleText("corte")}
              >
                {expanded.corte ? "Ver menos" : "Ver más"}
              </button>

              <div className="instruction-container">
                <Instruction arrow="down" theme="light">
                  Haz clic para ejecutar el audio
                </Instruction>
              </div>
              <div className="audio-controls">
                <audio
                  controls
                  className="media-espanol"
                  ref={(el) => (audioRefs.current[0] = el)}
                  onPlay={() => handlePlay(0)}
                  style={{ width: "220px", fontSize: "0.75rem" }}
                >
                  <source src={audioCorte} type="audio/mp3" />
                </audio>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Herramientas de Impacto */}
          <div className="cardambiental">
            <div className="card_image">
              <img src={img2} alt="Herramientas de impacto" />
            </div>
            <div className="card_content">
              <h3
                className="text-16px font-bold text-center"
                style={{ color: "#003454" }}
              >
                Herramientas de Impacto
              </h3>
              <div
                className="card_content_text"
                style={{
                  height: expanded.impacto ? "auto" : "150px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "height 0.3s ease",
                }}
              >
                <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
                  Verifique que el cabo se encuentre bien ajustado, tenga
                  
                </Paragraph>
                {expanded.impacto && (
                  <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
                    mango antideslizante y que no esté astillado ni roto.
                  </Paragraph>
                )}
              </div>
              <button
                className="text-blue-500 mt-2"
                onClick={() => toggleText("impacto")}
              >
                {expanded.impacto ? "Ver menos" : "Ver más"}
              </button>

              <div className="instruction-container">
                <Instruction arrow="down" theme="light">
                  Haz clic para ejecutar el audio
                </Instruction>
              </div>
              <div className="audio-controls">
                <audio
                  controls
                  className="media-espanol"
                  ref={(el) => (audioRefs.current[1] = el)}
                  onPlay={() => handlePlay(1)}
                  style={{ width: "220px", fontSize: "0.75rem" }}
                >
                  <source src={audioImpacto} type="audio/mp3" />
                </audio>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Herramientas de Torsión */}
          <div className="cardambiental">
            <div className="card_image">
              <img src={img3} alt="Herramientas de torsión" />
            </div>
            <div className="card_content">
              <h3
                className="text-16px font-bold text-center"
                style={{ color: "#003454" }}
              >
                Herramientas de Torsión
              </h3>
              <div
                className="card_content_text"
                style={{
                  height: expanded.torsion ? "auto" : "150px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "height 0.3s ease",
                }}
              >
                <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
                  Confirme que la estructura no presente fisuras. En todas las
                  llaves, verifique que la boca o la estrella no esté
                  redondeada,
                </Paragraph>
                {expanded.torsion && (
                 <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
                    que las llaves Bristol concuerden con sus cuadrantes y que
                    el destornillador tenga el vástago recto y su pala o estrella en buen estado.
                  </Paragraph>
                )}
              </div>
              <button
                className="text-blue-500 mt-2"
                onClick={() => toggleText("torsion")}
              >
                {expanded.torsion ? "Ver menos" : "Ver más"}
              </button>

              <div className="instruction-container">
                <Instruction arrow="down" theme="light">
                  Haz clic para ejecutar el audio
                </Instruction>
              </div>
              <div className="audio-controls">
                <audio
                  controls
                  className="media-espanol"
                  ref={(el) => (audioRefs.current[2] = el)}
                  onPlay={() => handlePlay(2)}
                  style={{ width: "220px", fontSize: "0.75rem" }}
                >
                  <source src={audioTorsion} type="audio/mp3" />
                </audio>
              </div>
            </div>
          </div>

          {/* Tarjeta 4: Herramientas de Penetración */}
          <div className="cardambiental">
            <div className="card_image">
              <img src={img4} alt="Herramientas de penetración" />
            </div>
            <div className="card_content">
              <h3
                className="text-16px font-bold text-center"
                style={{ color: "#003454" }}
              >
                Herramientas de Penetración
              </h3>
              <div
                className="card_content_text"
                style={{
                  height: expanded.penetracion ? "auto" : "150px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "height 0.3s ease",
                }}
              >
               <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
                Verifique que los enchufes, cables, carcasas, botones e interruptores estén en buen estado y 
                perfectamente aislados, sin reparaciones 
                
                </Paragraph>
                {expanded.penetracion && (
                  <Paragraph theme='light' justify={isMobile ? 'justify' : 'justify'}>
                    improvisadas con cinta aislante, que solo se conecten a tableros portátiles y 
                    nunca a los circuitos de alimentación de plantas eléctricas, 
                    que las conexiones tengan polo a tierra para evitar descargas 
                  </Paragraph>
                )}
              </div>
              <button
                className="text-blue-500 mt-2"
                onClick={() => toggleText("penetracion")}
              >
                {expanded.penetracion ? "Ver menos" : "Ver más"}
              </button>

              <div className="instruction-container">
                <Instruction arrow="down" theme="light">
                  Haz clic para ejecutar el audio
                </Instruction>
              </div>
              <div className="audio-controls">
                <audio
                  controls
                  className="media-espanol"
                  ref={(el) => (audioRefs.current[3] = el)}
                  onPlay={() => handlePlay(3)}
                  style={{ width: "220px", fontSize: "0.75rem" }}
                >
                  <source src={audioPenetracion} type="audio/mp3" />
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramaDeInspeccionesDeHerramientas;
