// import "../../../assets/css/cards.css";
import momento1 from "../../assets/img/momentos/moment-1.jpg";
import momento2 from "../../assets/img/momentos/moment-2.jpg";
import momento3 from "../../assets/img/momentos/moment-3.jpg";
import '../slides/styles/EstructuraTematica.css';
import Instruction from "../components/Instruction";
import Title from "../components/Title";
import useStore from "../../store";
import { useEffect } from "react";
import Paragraph from "../components/Paragraph";

function EstructuraTematica() {

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [])
  return (
    <div className="px-4 w-full flex items-center justify-center mb-36 md:mb-0 bg-dark-color md:h-screen h-auto">
      <div className="container current pt-3">
        <div className="col-lg-12 col-md-12 flex flex-col justify-center items-center">
          <div className="my-2 text-center">
            <Title>Estructura <span className="text-subtitle-color-qa">temática</span></Title>
          </div>
          <div>
            <Paragraph theme='dark' justify='center'>
              En este curso encontrarás estos <span className="text-subtitle-color-qa">tres (3) Momentos </span>clave de acercamiento 
              a la cultura de nuestra organización. <br /> 
              <span className="justify-center">Continúa adelante para irlos revisando en el mismo orden.</span>
            </Paragraph>
          </div>
          <div className="w-auto flex justify-center items-center">
            <Instruction arrow="down" theme="dark">
              Pasa por cada sección para descubrir su contenido
            </Instruction>
          </div>
          <section className="section-tours my-3">
            <div className="container bgazul-doble-lateral p-0">
              <div className="row">
                <div className="col-lg-12 col-md-12 grid justify-center p-0 bg-dark-color">
                  <div className="contenido-central">
                    <div className="col-lg-12 col-md-12 pcslide-flex_sld3">
                      <div className="col-lg-4 col-md-6 col-sm-12 flex justify-center">
                        <article className="card_new ">
                          <img
                            className="card_new__background"
                            src={momento1}
                            alt="Momento 1"
                            width="1920"
                            height="2193"
                          />
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2" style={{ lineHeight: '1.3rem' }}>
                                1- Introducción al uso seguro de herramientas mecánicas
                              </h2>
                              <p className="card_new__description pt-4">
                                Abordaremos la importancia fundamental del uso seguro de herramientas mecánicas en la operación industrial y de obra.
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
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2">
                                2- Riesgos comunes y medidas preventivas
                              </h2>
                              <p className="card_new__description pt-4">
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
                          <div className="card_new__content | flow">
                            <div className="card_new__content--container | flow">
                              <h2 className="card_new__title cardh2  px-2" style={{ lineHeight: '1.3rem' }}>
                                3- Procedimientos seguros de trabajo
                              </h2>
                              <p className="card_new__description pt-4">
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
