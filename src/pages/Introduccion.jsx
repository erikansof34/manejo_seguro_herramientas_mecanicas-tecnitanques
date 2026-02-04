import logoMorelco from '../assets/img/artes-morelco/tecnitanques_logo_color.png';
import background from '../assets/img/fondo.webp';
import { Clock, BookOpen, User, CheckSquare } from 'lucide-react';
import Button from './components/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import React, { useState } from 'react';
import axios from 'axios';
import { setArrayValidacionTraking, getArrayValidacionTraking, setPorcentajeTraking, getPorcentajeTraking } from "../traking.js";


export default function Component() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const sections = [

    {
      icon: <Clock className="w-8 h-8" />,
      title: "Duración del Curso",
      content: [
        { label: "Tiempo máximo estimado de duración virtual:", value: "1 hora" },
        // { label: "Tiempo asociado a su perfil de formación:", value: "4 horas" }
      ]
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Objetivo del Curso",
      content: [
        {
          label: "Este curso le permitirá:", value: <li>Fortalecer la cultura de prevención en sus labores diarias al manipular herramientas manuales de forma segura.
          </li>
        },
        {
          value: <li>Recordar las buenas prácticas en el uso de herramientas manuales, asegurando una correcta manipulación.
          </li>
        },
        { value: <li>Conocer los elementos clave para el cuidado de su salud y seguridad al trabajar con herramientas manuales. </li> },

      ]
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: "Al finalizar el curso",
      content: [
        {
          label: "Este curso le permitirá:", value: (
            <ul className="list-disc list-inside">
              <li>Aplicar las mejores prácticas de manejo seguro de herramientas manuales en su entorno laboral.
              </li>
              <li>Identificar y minimizar los riesgos asociados con la manipulación incorrecta de herramientas.
              </li>
              <li>Proteger su salud al seguir las recomendaciones de seguridad para la prevención de lesiones.
              </li>
              <li>Incorporar las buenas prácticas en el uso de herramientas manuales para mejorar la eficiencia y reducir accidentes.
              </li>

            </ul>
          )
        }
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Recomendaciones",
      content: [
        { label: "1.", value: "Disponerse a adquirir nuevos conocimientos y reforzar los existentes para su seguridad" },
        { label: "2.", value: "Disponer el tiempo mínimo estimado de duración para tomar este curso" },
        { label: "3.", value: "Contar con conexión a internet" },
        { label: "4.", value: "Realizar todas las actividades de refuerzo y repetirlas si es necesario" },
        { label: "5.", value: "No olvides firmar tu compromiso y presentar la Evaluación del curso" },
        { label: "6.", value: "Si estás en un lugar abierto, usa AUDÍFONOS; hay audios con información valiosa que no te querrás perder" }
      ]
    }
  ];

  const navigate = useNavigate();

  const addNumber = (number) => {
    const storedArray = (getArrayValidacionTraking()) || [];
    if (!storedArray.includes(number)) {
      const updatedNumbers = [...storedArray, number];
      setArrayValidacionTraking((updatedNumbers));
    }
  };

  const handleClick = () => {
    logEmployeeData();
    navigate("/slides");
  };

  const logEmployeeData = () => {
    const params = new URLSearchParams(window.location.search);
    axios.get('../../../data_user.php',
      {
        params: {
          course_code: params.get('course_code'),
          uid: params.get('uid'),
          mid: params.get('mid')
        }
      }
    )
      .then((response) => {
        const datos = response.data;
        if (datos.data_course[0].react_progress_object != "") {
          setArrayValidacionTraking((JSON.parse(datos.data_course[0].react_progress_object)));
          const storedArray = getArrayValidacionTraking();
          const sum = storedArray.length;
          const porcentaje = (sum / parseInt(21)) * 100;
          setPorcentajeTraking(parseInt(porcentaje));
        } else {
          addNumber(parseInt(1))
          setPorcentajeTraking(0)
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <div className="mx-auto p-6 min-h-screen"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={`relative mb-14 flex ${isMobile ? 'flex-col items-center' : 'flex-col'}`}>
        <div className={`absolute top-0 ${isMobile ? 'relative' : 'left-0'}`}>
          <img src={logoMorelco} className="w-32" alt="logo" />
        </div>


        <h1
          className="text-3xl font-bold text-white pt-2"
          style={{
            justifyContent: isMobile ? 'center' : 'center',
            alignItems: isMobile ? 'center' : 'center',
            textAlign: isMobile ? 'center' : 'center'
          }}
        >
          Información del Curso
        </h1>
      </div>

      {/* Cuadros de información */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:shadow-main-color/30 transition-shadow overflow-auto max-h-64">
            <div className="p-2 bg-blue-50">
              <div className="flex items-center space-x-4">
                <div className="text-main-color bg-blue-100 p-1 rounded-full">{section.icon}</div>
                <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
              </div>
            </div>
            <div className="p-2">
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-1">
                  <span className="font-medium text-black">{item.label} </span>
                  <span className="text-gray-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botón de navegación */}
      <div className='flex justify-center items-center my-6'>
        <Button onClick={handleClick} roundedFull={true} icon={faArrowRight}>Siguiente</Button>
      </div>
    </div>
  );
}

