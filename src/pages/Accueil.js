import React, { useEffect,useState  } from "react";
import FirstNav from "../component/FirstNav";
import { Link } from 'react-router-dom';

import backGround from "../images/Background2.jpg"

import axios from 'axios'
import { Col, Row } from "antd";
import FooterOne from "../component/FooterOne";
import ScrollToTopButton from "../component/ScrolToTopButton";
import Product from "./Product";



const delay = 5000;
function Acceuil () {
  const [IsLoading, setIsLoading] = useState(true);
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  
  // API
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  function getEvents() {
    axios.get(process.env.REACT_APP_API_BASE_URL + `category`)
      .then(res => {
        const tmp = res.data;
        setCategories(tmp.Categories)
      })
    axios.get(process.env.REACT_APP_API_BASE_URL +'publicity')
      .then(res => {
        const tmp = res.data;

        setItems(tmp.message)
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getEvents();
  }, [])


  // END API
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    resetTimeout();

    // Si vous avez un seul slide, n'activez pas le défilement automatique
    if (items.length === 1) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index, items]);

 

  if (IsLoading) {
    return <div style=
      {{
        backgroundImage: `url(${backGround})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: "100%",
      }} id="preloader">
      <div id="loader"></div>
    </div>
  }
    return(
      <div>
        {/* <FirstNav class="h-auto w-auto "  /> */}
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
        <div className="slideshow w-11/12 max-[600px]:w-full  " style={{     margin: "0 auto",
                                                  overflow: "hidden",                                                  
                                            }}
        >
                    <div
                      className="slideshowSlider "
                      style={{ transform: `translate3d(${-index * 100}%, 0, 0)` ,
                                whiteSpace: "nowrap" ,
                                transition: "ease 1000ms", 
                              }}
                    >
                      {items.map((item, index) => 
                      (
                        <Link to={`/Product/` + item.product_id}>
                        <div
                          className="slide "
                          key={index}
                          style={{ backgroundImage : `url(${item.image})` ,
                          height: "400px",
                          width: "100%",
                          display: "inline-block",
                          opacity :"90%", 
                          borderRadius :"10px",
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          
                        }}>
                         
                          <p className="decoration-solid w-1/3  h-1/3  text-center font-bold text-2xl italic  text-slate-100 relative top-3/4 left-7 cursor-pointer underline"> {item.text} </p>
                         
                        </div>
                      </Link>   
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
        < >
        <Row className="w-4/5 mt-2 mb-2 ml-auto mr-auto  justify-between text-center"  >
          <Col span={8} className="text-xl font-bold underline-offset-2  text-neutral-950"><p>Categories</p></Col>
          <Col span={8}  className="text-xl font-bold underline-offset-2  text-neutral-950"><p>All</p></Col>
        </Row>
              <div className=" pb-6">
                <Row className=" justify-center w-4/5 mt-6  ml-auto mr-auto flex flex-wrap ">
                  {categories.map((Categorie) => (
                  <Col className="bg-white text-center rounded-lg  ml-3 max-[600px]:ml-0 max-[600px]:pl-3 mb-3 max-[600px]:bg-inherit h-2/3  cursor-pointer opacity-50 hover:opacity-100 w-1/5  max-[600px]:w-1/2 ">
                    <Link to={`/Catégories/` + Categorie.id}>
                      <img className=" mr-auto ml-auto rounded-lg h-48 " src={Categorie.image} alt={Categorie.name} />
                      <p className="font-extrabold text-slate-400 text-center absolute inset-x-0 bottom-4 ">{Categorie.name}</p>
                    </Link>
                  </Col>
                ))}
                </Row>
              </div>
        </>
        </div>
        <>
        <Row className="  bg-slate-50" style={{height : " 300px"}}>
        </Row>
        </>
        <FooterOne/>
        <ScrollToTopButton/>

      </div> 

    )
}
export default Acceuil ; 