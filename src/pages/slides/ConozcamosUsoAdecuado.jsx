// import { useState, useEffect } from 'react';
import "../slides/styles/ConozcamosUsoAdecuado.css";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";

import condiciones from "../../assets/img/artes-morelco/propiedades_fisicoquimicas.png";
import actos from "../../assets/img/artes-morelco/propiedades_toxicologicas.png";
import Button from "../components/Button";
import imgActos from "../../assets/img/actos.svg";
import img1 from "../../assets/img/herramientas_abandonadas_lugares_peligrosos.webp";
import img2 from "../../assets/img/herramientas_inadecuadas.webp";
import img3 from "../../assets/img/herramientas_mal_conectadas.webp";
import img4 from "../../assets/img/herramientas_manipuladas_forma_insegura.webp";
import img5 from "../../assets/img/herramientas_sin_guardas_seguridad.webp";
import img6 from "../../assets/img/herramientas_sin_mantenimiento.webp";
import img7 from "../../assets/img/herramientas_sin_parada_emergencia.webp";
import img8 from "../../assets/img/herramientas_transportadas_forma_insegura.webp";
import React, { useState } from "react";

const ConozcamosUsoAdecuado = () => {
  const [activeTab, setActiveTab] = useState("condiciones");

  const tabData = {
    condiciones: {
      image: condiciones,
      text: "De acuerdo con el Capítulo 6 del Dec. 1072 del 2015, es toda situación que se presenta en el lugar de trabajo y que se caracteriza por la presencia de riesgos no controlados que pueden generar accidentes de trabajo o enfermedades laborales. Se pueden clasificar en:",
      cards: [
        {
          image: img2,
          title: "Herramientas inadecuadas",
          description:
            "Herramientas inadecuadas, mal diseñadas, de mala calidad o defectuosas.",
        },
        {
          image: img5,
          title: "Sin guardas de seguridad",
          description:
            "Herramientas sin guardas de seguridad ni protección en sus puntos de operación.",
        },
        {
          image: img7,
          title: "Sin parada de emergencia",
          description:
            "Herramientas sin parada de emergencia, válvulas de seguridad o aislamiento.",
        },
        {
          image: img6,
          title: "Sin mantenimiento",
          description:
            "Herramientas sin mantenimiento, descalibradas, con ejes desalineados.",
        },
      ],
    },
    actos: {
      image: actos,
      text: "De acuerdo con Capítulo 6 del Dec. 1072 del 2015, es todo acto que realiza un trabajador de manera insegura o inapropiada y que puede facilitar la ocurrencia de un accidente de trabajo. Se pueden clasificar en:",
      cards: [
        {
          image: img4,
          title: "Manipulación incorrecta",
          description: "Herramientas manipuladas de forma incorrecta.",
        },
        {
          image: img8,
          title: "Transporte inseguro",
          description: "Herramientas transportadas de forma insegura.",
        },
        {
          image: img1,
          title: "Lugares peligrosos",
          description: "Herramientas abandonadas en lugares peligrosos.",
        },
        {
          image: img3,
          title: "Mal conectadas",
          description: "También mal conectadas y mal conservadas.",
        },
      ],
    },
  };

  return (
    <div className="quiz-container-ra mb-36 md:mb-0">
      <div className="quiz-header-ra">
        <Title>Conozcamos...</Title>
        <Subtitle>Uso adecuado de herramientas mecánicas</Subtitle>
      </div>
      <div className="flex justify-center px-4">
        <Instruction
          arrow="down"
          theme="light"
          className="mb-2 text-xs text-center max-w-xs mx-auto"
        >
          Haz clic en los botones para explorar el contenido
        </Instruction>
      </div>
      <div className="flex justify-center gap-4 mb-3 mx-4">
        <div>
          <button
            onClick={() => setActiveTab("condiciones")}
            className={`action-button ${activeTab === "condiciones" ? "bg-main-color bordeado" : ""}`}
          >
            <span className="hidden md:inline">
              Elementos Condiciónes Inseguras
            </span>
            <span className="inline md:hidden">Condiciónes Inseguras</span>
          </button>
        </div>
        <div>
          <button
            onClick={() => setActiveTab("actos")}
            className={`action-button ${activeTab === "actos" ? "bg-main-color bordeado" : ""}`}
          >
            <span className="hidden md:inline">Elementos Actos Inseguros</span>
            <span className="inline md:hidden">Actos Inseguros</span>
          </button>
        </div>
      </div>

      {/* contenido de texto e imagen para cada activeTab */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="w-[80%] flex justify-center items-center flex-col mb-6 md:mb-2 md:pr-4">
            {/* <img src={tabData[activeTab].image} alt={activeTab} className="w-96 h-auto mb-4" /> */}
            <Paragraph theme="light" justify="justify">
              {tabData[activeTab].text}
            </Paragraph>
          </div>
          <div className="w-full md:flex grid grid-cols-1 px-6 gap-4 justify-center">
            {tabData[activeTab].cards.map((item, index) => (
              <div key={index} className="quiz-card-ra-uso">
                <div className="card-inner-ra">
                  <div className="card-front-ra">
                    <div
                      className="card-image-ra-uso"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="card-content-ra">
                      <h3 className="card-title-ra">{item.title}</h3>
                      <div className="mt-4 w-full">
                        <Paragraph theme="light">{item.description}</Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConozcamosUsoAdecuado;
