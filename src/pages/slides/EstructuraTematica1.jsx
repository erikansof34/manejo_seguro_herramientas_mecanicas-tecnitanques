// import "../../../assets/css/cards.css";
import momento1 from "../../assets/img/momentos/moment-1.jpg";
import momento2 from "../../assets/img/momentos/moment-2.jpg";
import momento3 from "../../assets/img/momentos/moment-3.jpg";
import '../slides/styles/EstructuraTematica.css';
import Instruction from "../components/Instruction";

import useStore from "../../store";
import { useEffect } from "react";
import Paragraph from "../components/Paragraph";

function EstructuraTematica() {

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [])
  return (
    <div className="mb-36 md:mb-0 px-4 w-full flex items-center justify-center bg-dark-color overflow-y-auto">
      <div className="container current">
        <div className="col-lg-12 col-md-12 h-[90vh]">
          <div className="text-center mb-5">
            <h1 className="text-title-size font-bold text-white text-center mt-4">
              Estructura <span className="text-secondary-color">temática</span>
            </h1>
            <Paragraph theme='dark' justify='center'>
              En este curso encontrarás estos <span className="text-subtitle-color-qa">tres (3) momentos </span>claves de acercamiento <br />
              a nuestra organización continúa adelante para irlos revisando en el mismo orden
            </Paragraph>
            <div className="flex justify-center items-center px-4" >
              <Instruction arrow="down" theme="dark">
                Desplaza el mouse sobre cada imagen para ver el contenido
              </Instruction>
            </div>
          </div>
          {/* <div>
            <h1 className="text-title-size font-bold text-main-color text-center my-3" >
            <span>Objetivos de este módulo:</span>
            </h1>
          </div> */}
          <section className="section-tours">
            <div className="container bgazul-doble-lateral">
              <div className="row">
                <div className="col-lg-12 col-md-12 grid justify-center bg-dark-color">
                  <div className="contenido-central">
                    <div className="col-lg-12 col-md-12 pcslide-flex_sld3">
                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new">
                          <img
                            className="card_new__background"
                            src={momento1}
                            alt="Momento 1"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__contentET | flow">
                            <div className="card_new__contentET--container | flow">
                              <h2 className="card_new__titleET cardh2" style={{ lineHeight: '1.3rem' }}>
                                1- Introducción al uso seguro de herramientas manuales
                              </h2>
                              <p className="card_new__descriptionET pt-4">
                                Abordaremos la importancia fundamental del uso seguro de herramientas manuales en la operación industrial y de obra.
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new">
                          <img
                            className="card_new__background"
                            src={momento2}
                            alt="Momento 2"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__contentET | flow">
                            <div className="card_new__contentET--container | flow">
                              <h2 className="card_new__titleET cardh2" style={{ lineHeight: '1.3rem' }}>
                                2- Riesgos comunes y medidas preventivas
                                {/* <br />
                                (Sistema Globalmente Armonizado) */}
                              </h2>
                              <p className="card_new__descriptionET pt-4">
                                Revisaremos los riesgos más comunes derivados del uso de herramientas y las técnicas de uso para mitigar estos riesgos en nuestro trabajo diario con herramientas.
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new">
                          <img
                            className="card_new__background"
                            src={momento3}
                            alt="Momento 3"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__contentET | flow">
                            <div className="card_new__contentET--container | flow">
                              <h2 className="card_new__titleET cardh2  px-4" style={{ lineHeight: '1.3rem' }}>
                                3- Procedimientos seguros de trabajo
                              </h2>
                              <p className="card_new__descriptionET pt-4">
                                Tendremos en cuenta las recomendaciones para el cuidado del área de trabajo y el buen almacenamiento de las herramientas.
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EstructuraTematica;
