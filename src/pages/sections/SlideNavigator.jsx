import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
// import VideoTextoTemplate from '../../templates/VideoTextoTemplate';

import RiesgoAsociadosAlManejo from '../slides/RiesgoAsociadosAlManejo';
import AspectosNormativos from ".././slides/AspectosNormativos";
import UsoAdecuadoDeHerramientas1 from '.././slides/UsoAdecuadoDeHerramientas1';


import ApliquemosHerramientasMecanicas from '../slides/ApliquemosHerramientasMecanicas';
import IdentificacionRiesgosComunes from '../slides/IdentificacionRiesgosComunes';
import EstructuraTematica from "../slides/EstructuraTematica";
import DivisorMomentos from "../slides/DivisorMomentos";
import DivUsoSeguroHerramientas from "../../assets/img/divisores/momento1-tecnitanques.webp";
import DivUsoSeguroHerramientasMovil from "../../assets/img/divisores/momento_1_herramientas_mecanicas_movil.webp";
import DivRiesgosComunes from "../../assets/img/divisores/momento2-tecnitanques.webp";
import DivRiesgosComunesMovil from "../../assets/img/divisores/momento_2_herramientas_mecanicas_movil.webp";
import DivProcemientosSeguros from "../../assets/img/divisores/momento3-tecnitanque.webp";
import DivProcemientosSegurosMovil from "../../assets/img/divisores/momento_3_herramientas_mecanicas_movil.webp";
import PreparacionCuidadosArea from "../slides/Preparacion_cuidados_area";
import MantenimientoAlmacenamientoHerramientas from "../slides/MantenimientoAlmacenamientoHerramientas";

import Reflexionemos from "../../templates/Reflexionemos";
// import Bienvenidos_modulo  from "../../templates/Bienvenidos_modulo";
import BienvenidoModulo from "../slides/BienvenidoModulo";
import AntesComenzarReflexionemos from "../slides/AntesComenzarReflexionemos";
import SeDiceHerramientaManualOMecanica from "../slides/SeDiceHerramientaManualOMecanica";
import ProgramaDeInspeccionesDeHerramientas from "../slides/ProgramaDeInspeccionesDeHerramientas";
import QueAprendimos from "../slides/QueAprendimos";
import ImagenQuiz from "../../assets/img/fondo_quiz.png";
import UsoAdecuadoDeHerramientasPreguntas from "../slides/UsoAdecuadoDeHerramientasPreguntas";
import FichaDeDatosDeSeguridadFDS from "../slides/FichaDeDatosDeSeguridadFDS";
import UsoAdecuadoHerramientasMecanicas from "../slides/UsoAdecuadoHerramientasMecanicas"
import RiesgosAsociadosSelects from "../slides/RiesgosAsociadosSelects";
import ConozcamosUsoAdecuado from "../slides/ConozcamosUsoAdecuado";
import ImportanciaDelManejoSeguro from "../slides/ImportanciaDelManejoSeguro";
import TecnicasSegurasDeOperacionDeHerramientas from "../slides/TecnicasSegurasDeOperacionDeHerramientas";
import EquiposDeProteccionPersonal from "../slides/EquiposDeProteccionPersonal";
import PeligrosEnNuestraOperacion from "../slides/PeligrosEnNuestraOperacion";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RiesgosAsociadosHerramientas from "../slides/RiesgosAsociadosHerramientas";
import { setArrayValidacionTraking, getArrayValidacionTraking, setPorcentajeTraking, getPorcentajeTraking } from "../../traking";

/*
* El componente SlideNavigator es el encargado de mostrar las diapositivas y de permitir la navegación entre ellas.

* ASPECTOS CONFIGURABLES:
* - Arriba hay varios import. Se deben añadir tantos como sea necesario para importar las diapositivas que se desean mostrar.
* - Después de importar los componentes, se deben incluir en la lista slides, que es un arreglo de las diapositivas. Expandir la estructura actual en el arreglo "Slides" ubicado abajo.
* - Colores: Se pueden cambiar los colores de los botones de navegación, y de las barras de navegación. Todo esto se cambia desde el className.
*  Hay algunas clases "bg-main-color/80" o "text-main-color/50". Ese "/80" o "/50" es la opacidad del color, se puede cambiar a gusto.

* FUNCIONAMIENTO DEL COMPONENTE:
* Aquí se importan todas las slides que se van a renderizar en el proyecto. 
* Una parte de la lógica se encarga de determinar el número total de slides para mostrar en la barra de navegación,
* otra se encarga de manejar el estado de la slide actual y de permitir la navegación entre ellas. Adicionalmente,
* se definió lógica para manejar los eventos clic de los botones, desaparecer los botones de navegación cuando se llega al final o al principio de las slides,
* y actualizar el estado global de las diapositivas, para que otros componentes puedan saber en qué diapositiva se encuentra el usuario.
*/
const EmployeeDataUpdateProg = () => {
  const params = new URLSearchParams(window.location.search);
  axios.get('../../../data_user.php',
    {
      params: { // Aquí agregamos los parámetros a la URL
        course_code: params.get('course_code'),
        uid: params.get('uid'),
        mid: params.get('mid')
      }
    }
  )
    .then((response) => {
      console.log(response.data.data.user_id);
      const datos = response.data;
      axios.post('../../../react_update_progress.php', {
        progress: getPorcentajeTraking(), // Enviar parámetros en el cuerpo de la solicitud
        module_id: params.get('mid'),
        unique_course_id: params.get('uid'),
        asistencia_id: datos.data.user_id,
        react_progress_object: JSON.stringify(getArrayValidacionTraking())
      })
        .then((response) => {
          const datos = response;
          console.log(datos);
        })
        .catch((error) => {
          console.error('Error al obtener los datos:', error); // Imprime el error
        });
    })
    .catch((error) => {
      console.error('Error al obtener los datos:', error); // Imprime el error
    });
};

const addNumber = (number) => {
  const storedArray = getArrayValidacionTraking() || [];
  if (!storedArray.includes(number)) {
    const updatedNumbers = [...storedArray, number];
    setArrayValidacionTraking(updatedNumbers);
  }
};

function SlideNavigator() {
  const slides = [
    // <Bienvenidos_modulo key='Bienvenidos_modulo' />,
    <AntesComenzarReflexionemos key="AntesComenzarReflexionemos" />,//slide1
    <BienvenidoModulo key='BienvenidoModulo' />,//slide2
    // <Reflexionemos key='Reflexionemos' />,   

    <EstructuraTematica key='EstructuraTematica' />,//slide3
    <DivisorMomentos //slide4
      background={DivUsoSeguroHerramientas}
      mobileBackground={DivUsoSeguroHerramientasMovil}
      index={4}
      line1="Introducción al"
      line2="Uso Seguro de"
      line3="Herramientas"
      momento="Momento 1"
      key='DivisorMomentos' />,
    <SeDiceHerramientaManualOMecanica key='SeDiceHerramientaManualOMecanica' />,//slide5
    <ApliquemosHerramientasMecanicas key='ApliquemosHerramientasMecanicas' />,//slide6
    <ImportanciaDelManejoSeguro key='ImportanciaDelManejoSeguro' />,//slide7
    // <RiesgoAsociadosAlManejo key='RiesgoAsociadosAlManejo' />,//slide8
    <RiesgosAsociadosHerramientas key="RiesgosAsociadosHerramientas" />,//slide8
    <AspectosNormativos key='AspectosNormativos' />,//slide9
    <DivisorMomentos //slide10
      background={DivRiesgosComunes}
      mobileBackground={DivRiesgosComunesMovil}
      index={4}
      line1="Riesgos Comunes"
      line2="Y Medidas"
      line3="Preventivas"
      momento="Momento 2"
      key='DivisorMomentos' />,
    <IdentificacionRiesgosComunes key='IdentificacionRiesgosComunes' />,//slide11
    <RiesgosAsociadosSelects key="RiesgosAsociadosSelets" />,//slide12
    <UsoAdecuadoDeHerramientas1 key='UsoAdecuadoDeHerramientas1' />, //slide13
    <ConozcamosUsoAdecuado key="ConozcamosUsoAdecuado" />,
    // <PeligrosEnNuestraOperacion key="PeligrosEnNuestraOperacion" />,//slide14
    // <UsoAdecuadoHerramientasMecanicas key="UsoAdecuadoHerramientasMecanicas" />,//slide14 revisar
    <FichaDeDatosDeSeguridadFDS key='FichaDeDatosDeSeguridadFDS' />,//slide15
    // <ProgramaDeInspeccionesDeHerramientas key='ProgramaDeInspeccionesDeHerramientas' />,//slide15 revisar
    <EquiposDeProteccionPersonal key='EquiposDeProteccionPersonal' />,//slide16
    <UsoAdecuadoDeHerramientasPreguntas key='UsoAdecuadoDeHerramientasPreguntas' />,//slide17
    <DivisorMomentos //slide18
      background={DivProcemientosSeguros}
      mobileBackground={DivProcemientosSegurosMovil}
      index={4}
      line1="Procedimientos"
      line2="Seguros de"
      line3="Trabajo"
      momento="Momento 3"
      key='DivisorMomentos' />,
    <PreparacionCuidadosArea key='PreparacionCuidadosArea' />,//slide19
    <TecnicasSegurasDeOperacionDeHerramientas key='TecnicasSegurasDeOperacionDeHerramientas' />,//slide20
    <MantenimientoAlmacenamientoHerramientas key='MantenimientoAlmacenamientoHerramientas' />,//lide21
    // <AspectosNormativos key='AspectosNormativos' />,
    // <QueAprendimos key='QueAprendimos' background={ImagenQuiz} />,//slide22
    // < UsoAdecuadoDeHerramientas key='UsoAdecuadoDeHerramientas' />,


    // <VideoTextoTemplate key='videoTextoTemplate' />,
    // <VideoTextoTemplate key='videoTextoTemplat2' />,

    //<VideoTextoTemplate key='videoTextoTemplate' />,
    //<VideoTextoTemplate key='videoTextoTemplat2' />,

  ];
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setSlideIndex = useStore((state) => state.setSlideIndex);
  const slideIndex = useStore((state) => state.slideIndex);
  const setTotalSlides = useStore((state) => state.setTotalSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setCurrentProgress = useStore((state) => state.setCurrentProgress);
  const isOnDivisor = useStore((state) => state.isOnDivisor);
  const navigate = useNavigate();

  // Función para hacer scroll al Header y al slide actual
  const scrollToSlide = () => {
    if (window.innerWidth <= 768) { // Solo en móviles
      const headerElement = document.getElementById("slide-Header"); // Obtén el Header
      if (headerElement) {
        headerElement.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll al Header
      }

      const slideId = `slide-${slides[currentSlide].key}`; // Construye el ID del slide actual
      const slideElement = document.getElementById(slideId); // Obtén el elemento del slide
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll al inicio del slide
      }
    }
  };

  // Efecto para hacer scroll cuando cambia el slide
  useEffect(() => {
    scrollToSlide();
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

    if (currentSlide === slides.length - 1) {
      null;
    } else {
      setSlideIndex(currentSlide + 1);
      if (slides.length === 0) {
        setPorcentajeTraking(0);
      } else {
        addNumber(parseInt(currentSlide + 2))
        const storedArray = getArrayValidacionTraking() || [];
        const sum = storedArray.length;
        console.log(sum);
        const porcentaje = (sum / parseInt(slides.length)) * 100;
        setPorcentajeTraking(parseInt(porcentaje))
        EmployeeDataUpdateProg();
      }
    }
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    if (currentSlide === 0) {
      null;
    } else {
      setSlideIndex(currentSlide - 1);
      if (slides.length === 0) {
        setPorcentajeTraking(0);
      } else {
        if (parseInt(currentSlide - 1) != 0) {
          addNumber(parseInt(currentSlide - 1));
          const storedArray = getArrayValidacionTraking() || [];
          const sum = storedArray.length;
          console.log(sum);
          const porcentaje = (sum / parseInt(slides.length)) * 100;
          setPorcentajeTraking(parseInt(porcentaje));
          EmployeeDataUpdateProg();
        }
      }
    }
  };

  // set progress from 0 to 100 based on currentSlide
  const setProgress = (currentSlide) => {
    const progress = (currentSlide / (slides.length - 1)) * 100;
    setCurrentProgress(parseInt(progress));
  };

  useEffect(() => {
    setCurrentSlide(slideIndex);
    setProgress(slideIndex);
  }, [slideIndex, setCurrentSlide]);

  useEffect(() => {
    setTotalSlides(slides.length);
  }, []);


  return (
    <div
      className="relative p-0 m-0 overflow-x-hidden"
    // style={{ height: "100vh", overflowX: "hidden" }}
    >
      {currentSlide === 0 ? null : (
        <div
          className="absolute bottom-0 right-1/2 md:right-auto md:left-0 md:top-1/2 md:bottom-auto group md:h-fit transform -translate-y-1/2 z-10 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer"
          onClick={prevSlide}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="4x"
            // className="group-hover:text-main-color text-secondary-color px-4 py-2"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      )}
      <div className="flex justify-between w-full">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-full mx-1 my-0 hover:cursor-pointer ${currentSlide >= index ? "bg-background-progres-bar" : "bg-main-color/30"} `}
            onClick={() => {
              addNumber(parseInt(index + 1));
              const storedArray = getArrayValidacionTraking() || [];
              const sum = storedArray.length;
              const porcentaje = (sum / parseInt(slides.length)) * 100;
              setPorcentajeTraking(parseInt(porcentaje));
              setCurrentSlide(index);
              setSlideIndex(index);
            }}
          ></div>
        ))}
      </div>
      {currentSlide === slides.length - 1 ? (
        <div
          className={`absolute bottom-0 left-1/2 md:right-0 md:top-1/2 md:bottom-auto md:left-auto group md:h-fit transform z-10 -translate-y-1/2 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer`}
          onClick={() => navigate('/evaluación')}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      ) : (
        <div
          className={`absolute bottom-0 left-1/2 md:right-0 md:top-1/2 md:bottom-auto md:left-auto group md:h-fit transform z-10 -translate-y-1/2 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer`}
          onClick={nextSlide}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      )}
      <div
        className={`${isMobile ? "overflow-auto" : "overflow-hidden"
          } p-0 m-0 w-screen hide-scrollbar`}
      // style={{ height: "100vh" }}
      >
        {slides[currentSlide]}
      </div>
    </div>
  );
}

export default SlideNavigator;