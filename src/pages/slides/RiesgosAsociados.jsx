import { useState, useEffect } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor } from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faCheck } from "@fortawesome/free-solid-svg-icons";
import '../slides/styles/EstructuraTematica.css';
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import useStore from "../../store";
import img1 from "../../assets/img/herramienta_corte.jpg";
import img2 from "../../assets/img/herramienta_impact.jpg";
import img3 from "../../assets/img/herramienta_penetracion.jpg";
import img4 from "../../assets/img/herramienta_torsion.jpg";
import Button from '../components/Button';
// Import your audio files here
import audio1 from '../../assets/audio/sl06au01.mp3';
import audio2 from '../../assets/audio/sl06au01.mp3';
import audio3 from '../../assets/audio/sl06au01.mp3';
import audio4 from '../../assets/audio/sl06au01.mp3';

import imgVerdadero from '../../assets/img/checkAct.png';
import imgFalso from '../../assets/img/xmarkAct.png';

function DraggableOption({ id, children, isDropped }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, visibility: isDropped ? "hidden" : "visible" }}
      {...listeners}
      {...attributes}
      className="draggable-option common-size cursor-pointer bg-main-color text-white p-2 rounded-lg text-center"
    >
      {children}
    </div>
  );
}

function DropArea({ id, children, isCorrect, isVerified }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isVerified
      ? isCorrect
        ? 'green'
        : 'red'
      : children !== 'Arrastra aquí'
        ? '#c0185d'
        : 'rgb(235, 235, 235)',
    border: '2px dashed gray',
    padding: '10px',
    borderRadius: '8px',
    minHeight: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const textStyle = {
    color: isVerified || children !== 'Arrastra aquí' ? 'white' : 'black',
    opacity: children === 'Arrastra aquí' ? 0.5 : 1,
    transition: 'color 0.3s ease',
  };

  return (
    <div ref={setNodeRef} style={style} className="drop-area common-size">
      <span style={textStyle}>{children}</span>
      {isVerified && (
        <img
          src={isCorrect ? imgVerdadero : imgFalso}
          alt={isCorrect ? "Correcto" : "Incorrecto"}
          style={{
            position: 'absolute',
            top: '50%',
            right: '-40px',
            transform: 'translateY(-50%)',
            width: '25px',
          }}
        />
      )}
    </div>
  );
}

function RiesgosAsociados() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
    drop4: null,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 10 } }));

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over && over.id) {
      setItems((prevItems) => ({
        ...prevItems,
        [over.id]: active.id,
      }));
    }
  };

  const handleVerify = () => {
    let count = 0;
    Object.keys(items).forEach((key) => {
      if (items[key] === correctItems[key]) {
        count++;
      }
    });
    setCorrectCount(count);
    setIsVerified(true);
  };

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
      drop4: null,
    });
    setIsVerified(false);
    setCorrectCount(0);
  };

  const risks = [
    {
      image: img1,
      caption: "Causadas por el contacto con bordes afilados o herramientas mal utilizadas",
      audio: audio1,
      dropId: "drop1",
    },
    {
      image: img2,
      caption: "Producidas por la caída de objetos pesados o el uso incorrecto de herramientas de golpeo",
      audio: audio2,
      dropId: "drop2",
    },
    {
      image: img3,
      caption: "Derivadas del uso inadecuado de herramientas como martillos o cinceles",
      audio: audio3,
      dropId: "drop3",
    },
    {
      image: img4,
      caption: "Causados por posturas inadecuadas, esfuerzos excesivos o movimientos repetitivos",
      audio: audio4,
      dropId: "drop4",
    },
  ];

  const draggableItems = [
    { id: "option1", text: "Lesiones por corte" },
    { id: "option2", text: "Lesiones por aplastamiento" },
    { id: "option3", text: "Golpes y proyecciones" },
    { id: "option4", text: "Riesgo ergonómico" },
  ];

  const correctItems = {
    drop1: "option1",
    drop2: "option2",
    drop3: "option3",
    drop4: "option4",
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="px-4 w-full flex items-center justify-center">
        <div className="container current mx-24"> {/* Agregando margen izquierdo y derecho */}
          <div className="col-lg-12 col-md-12">
            <div className="text-center mb-5">
              <div className="my-2 text-center">
                <Title theme='light'>Conozcamos...</Title>
                <Subtitle>Riesgos asociados al manejo no seguro de herramientas mecánicas</Subtitle>
              </div>
              <Paragraph theme="light">
                El uso inadecuado de herramientas manuales puede generar una amplia gama de riesgos <br/>para la salud y la seguridad de los trabajadores, incluyendo:
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              {risks.map((risk, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={risk.image} alt={`Risk ${index + 1}`} className="w-full h-32 object-cover mb-2" />
                  <p className="text-xs text-center mb-2 h-16 overflow-y-auto">{risk.caption}</p>
                  <audio controls className="w-full mb-2">
                    <source src={risk.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  {/* Eliminamos las instrucciones individuales aquí */}
                  <DropArea 
                    id={risk.dropId}
                    isCorrect={items[risk.dropId] === correctItems[risk.dropId]}
                    isVerified={isVerified}
                  >
                    {items[risk.dropId] ? draggableItems.find(item => item.id === items[risk.dropId]).text : "Arrastra aquí"}
                  </DropArea>
                </div>
              ))}
            </div>
            
            {/* Instrucción única aquí */}
            <div className='flex justify-center'>
              <Instruction theme="light"  className="my-4">
                Escucha los audios y arrastra cada riesgo a su imagen correspondiente
              </Instruction>
            </div>

            <div className="flex justify-center flex-wrap gap-2 mb-6">
              {draggableItems.map((item) => (
                <DraggableOption 
                  key={item.id} 
                  id={item.id}
                  isDropped={Object.values(items).includes(item.id)}
                >
                  {item.text}
                </DraggableOption>
              ))}
            </div>

            <div className="flex justify-center gap-4">
  <button 
   icon={faCheck}
    onClick={handleVerify} 
    className="bg-main-color text-white p-2  mt-5 rounded-full"
    style={{ height: '48px' }}  // Establecemos la altura de 48px (o la que prefieras)
  >
    Validar
  </button>
  <button 
  icon={faRepeat}
    onClick={handleReset} 
    className="bg-main-color text-white p-2 rounded-full  mb-10"
    style={{ height: '48px' }}  // La misma altura para el botón "Reiniciar"
  >
    Reiniciar
  </button>
</div>


            {isVerified && (
              <div className="mt-4 text-center">
                <p>
                  {correctCount} de {Object.keys(correctItems).length} respuestas correctas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default RiesgosAsociados;
