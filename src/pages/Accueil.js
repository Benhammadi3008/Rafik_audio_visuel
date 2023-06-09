import React from "react";
import FirstNav from "../component/FirstNav";
import backGround from "../images/Background2.jpg"
import test1 from "../images/test1.jpg"
import test2 from "../images/test2.jpg"
import test3 from "../images/test3.jpg"
import apparph from "../images/appar.png"
import objec from "../images/objec.png"
import trep from "../images/trep.png"
import stock from "../images/stock.png"

  import { Col, Row } from "antd";
import FooterOne from "../component/FooterOne";

const items = [
  {
    image : test1,
    text: "test1"
  },
  {
    image : test2,
    text: "test2"
  },
  {
    image : test3,
    text: "test3"
  },
];
const delay = 5000;
function Acceuil () {
    const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => 
        setIndex((prevIndex) =>
          prevIndex === items.length - 1   ? 0 : prevIndex + 1 ,
        ),
        
      delay , 
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
    return(
      <div>
        <FirstNav class="h-auto w-auto"  />
       <div class="block h-full w-full " 
          style=
          {{
            backgroundImage: `url(${backGround})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: "100%" ,
          }} 
        >  
        <div className="slideshow  " style={{     margin: "0 auto",
                                                  overflow: "hidden",
                                                  width: "90%",
                                                  
                                            }}
        >
                    <div
                      className="slideshowSlider "
                      style={{ transform: `translate3d(${-index * 100}%, 0, 0)` ,
                                whiteSpace: "nowrap" ,
                                transition: "ease 1000ms", 
                              }}
                    >
                      {items.map((items, index) => 
                      (
                        <div
                          className="slide "
                          key={index}
                          style={{ backgroundImage : `url(${items.image})` ,
                                height: "400px",
                                width: "100%",
                                display: "inline-block",
                                opacity :"90%", 
                                borderRadius :"10px"
                                  }}>
                          <p className="decoration-solid w-1/3 text-center font-bold text-2xl italic  text-slate-100 relative top-3/4 left-7"> {items.text} </p>
                          
                        </div>
                      ))}
                    </div>

                      <div className="slideshowDots " 
                          style={{textAlign: "center"}}>
                            {items.map((_, idx) => 
                            (
                              <div
                                key={idx}
                                className={`slideshowDot${index === idx ? " active" : ""}` }
                                onClick={() => {
                                  setIndex(idx);
                                }}
                                style={{
                                  display: "inline-block",
                                  height: "10px" ,
                                  width: "10px",
                                  borderRadius: "50%",
                                  cursor: "pointer",
                                  margin: "15px 7px 0px",
                                  backgroundColor: "#c4c4c4",
                                            }}  >
                                </div>  
                            ))}
                        </div>
        </div>
        <>
        <Row className="w-4/5 mt-2 mb-2 ml-auto mr-auto  justify-between text-center"  >
          <Col span={8} className="text-xl font-bold underline-offset-2  text-neutral-950"><p>Produit</p></Col>
          <Col span={8}  className="text-xl font-bold underline-offset-2  text-neutral-950"><p>All</p></Col>
        </Row>
        <Row className=" justify-between w-4/5 mt-6  ml-auto mr-auto ">
          <Col className="bg-white w-1/5 h-auto rounded-lg cursor-pointer opacity-50 hover:opacity-100">
            <img  src={apparph} alt="Appareil photo"/>
            <p className="font-black text-slate-400 text-center absolute inset-x-0 bottom-4 ">Appareil photo</p>
           </Col>
          <Col className="bg-white w-1/5 h-auto rounded-lg cursor-pointer opacity-50 hover:opacity-100">
          <img  src={objec} alt="Objectif"/>
            <p className="font-extrabold text-slate-400 text-center absolute inset-x-0 bottom-4">Objectif</p>
          </Col>
          <Col className="bg-white w-1/5 h-auto rounded-lg cursor-pointer opacity-50 hover:opacity-100">
          <img  src={trep} alt="Ecairage"/>
            <p className="font-black text-slate-400 text-center absolute inset-x-0 bottom-4">Ecairage</p>
          </Col>
          <Col className="bg-white w-1/5 h-auto rounded-lg cursor-pointer opacity-50 hover:opacity-100">
          <img  src={stock} alt="Stockage"/>
            <p className="font-black text-slate-400 text-center absolute inset-x-0 bottom-4 ">Stockage</p> 
          </Col>
        </Row>
        </>
        </div>
        <>
        <Row className="  bg-slate-50" style={{height : " 300px"}}>
        </Row>
        </>
        <FooterOne/>
      </div> 

    )
}
export default Acceuil ; 