import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import "../../../node_modules/video-react/dist/video-react.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import ModalDialog from "../components/ModalDialog";
import Button from "../components/Button";

const secondaryColor = "#0a9ead";

function NormatividadRelacionadaAccidentes() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [expanded, setExpanded] = useState("panel1");
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const accordionData = [
    {
      title: "NTP 391",
      content:
        "Herramientas manuales (I): condiciones generales de seguridad Ministerio de asuntos legales de España",
    },
    {
      title: "Decreto 1072 de 2015",
      content:
        "Establecen la obligación de las asignación de responsabilidades en todos los niveles de la organización, asignar las responsabilidades de los jefes, directores o supervisores no puede ser una excepción.",
    },
    {
      title: "Resolución 1111 de 2017",
      content:
        " en su estándar 1.1.2 establecen la obligación de las asignación de responsabilidades en todos los niveles de la organización, asignar las responsabilidades de los jefes, directores o supervisores no puede ser una excepción.",
    },
    {
      title: "La Resolución 2413 de 1979",
      content:
        "El Ministerio de Trabajo y Seguridad Social de Colombia establece el reglamento de higiene y seguridad para la industria de la construcción. A continuación, se detallan los artículos 77-81, que se enfocan en el uso seguro de herramientas manuales.",
    },
    {
      title: "Normas Técnicas Colombianas",
      content:
        "NTC 5794:2017 - Herramientas manuales. Seguridad. Requisitos generales.",
    },
    {
      title: "NTC 2031",
      content:
        "1974 - Herramientas manuales. Estándares de seguridad para destornilladores.",
    },
    {
      title: "NTC 2032",
      content:
        "Herramientas manuales. Especificaciones para llaves ajustables.",
    },
    {
      title: "NTC 2754",
      content:
        "978 - Herramientas manuales. Alicates. Requisitos de seguridad y uso.",
    },
    {
      title: "NTC 2033",
      content:
        "1974 - Herramientas manuales. Estándares de seguridad para martillos.",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full md:h-screen py-6 px-6 md:px-16 flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center md:px-6">
          <div className="text-center text-title-size">
            <Title>Recordemos...</Title>
            <Subtitle>
              Aspectos normativos para el uso seguro de herramientas
            </Subtitle>
          </div>

          <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
            En Colombia, usamos algunos referentes internacionales para
            estructurar nuestras normas, para el uso seguro de herramientas
            manuales está regulado por varias normas y resoluciones que se
            enfocan en la seguridad en el trabajo y el uso adecuado de estas
            herramientas.
            <br />
            Revisa atentamente esta lista de algunas de las normas más
            relevantes para el uso seguro de herramientas:
          </Paragraph>
          <div className="mt-4">
            <Button
              icon={faCircleQuestion}
              roundedFull={true}
              onClick={handleOpenModal}
            >
              ¿Sabías que?
            </Button>
            <ModalDialog
              open={isModalOpen}
              handleClose={handleCloseModal}
              title=" ¿Sabías que?"
            >
              <Paragraph theme="light">
                <div
                  className="modal-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div className="flex flex-col text-justify">
                    Según la Organización Internacional del Trabajo (OIT), en el
                    año 2020, se registraron 168 millones de víctimas de
                    accidentes laborales en el mundo, de las cuales 308.000
                    resultaron en muertes. De este total, un porcentaje
                    significativo se atribuye al uso inadecuado de herramientas
                    mecánicas
                  </div>
                </div>
              </Paragraph>
            </ModalDialog>
          </div>
        </div>
      </div>

      <div className="md:flex-2 bg-white md:w-3/5 w-full px-6 md:pr-24 flex justify-center items-center pb-8">
        <div
          className="w-full flex flex-col justify-start items-start"
          style={{
            position: isMobile ? "static" : "relative",
            top: isMobile ? "0" : "0",
          }}
        >
          <div className="flex justify-center mx-auto items-center">
            <Instruction arrow="down" theme="light" className="w-full">
              Haz clic en cada uno de los elementos
            </Instruction>
          </div>
          <div className=" w-full px-18">
            {accordionData.map((item, index) => (
              <Accordion
                key={`panel${index + 1}`}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                className="bg-secondary-color text-white mb-1 m-0"
                // style={{ margin: '0 !important', marginBottom: '1rem !important' }}
                sx={{
                  margin: "0 !important",
                  marginBottom: "3px !important",
                  backgroundColor: "#0f172a",
                  color: "white",
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  style={{
                    minHeight: "36px",
                    maxHeight: "36px",
                    lineHeight: "1.1rem",
                  }}
                  className="mb-0"
                  expandIcon={<ExpandMoreIcon className="text-white" />}
                  aria-controls={`panel${index + 1}a-content`}
                  id={`panel${index + 1}a-header`}
                  sx={{
                    marginBottom: "0",
                    backgroundColor: "#0f172a",
                    color: "white",
                    "&:hover": {
                      backgroundColor: secondaryColor,
                    },
                    "&.Mui-expanded": {
                      backgroundColor: secondaryColor,
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      color: "white",
                    },
                    "&.Mui-expanded .MuiAccordionSummary-expandIconWrapper": {
                      color: "white",
                    },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <span className="text-white">{item.title}</span>
                </AccordionSummary>
                <AccordionDetails
                  className="bg-white"
                  style={{ border: "1px solid gray", margin: 0 }}
                >
                  <p className="text-slate-900">{item.content}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormatividadRelacionadaAccidentes;
