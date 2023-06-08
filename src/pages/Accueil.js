import React from "react";
import FirstNav from "../component/FirstNav";
import backGround from "../images/Background2.jpg"
import test1 from "../images/test1.jpg"
import test2 from "../images/test2.jpg"
import test3 from "../images/test3.jpg"

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
          prevIndex === items.length - 1 ? 0 : prevIndex + 1 ,
          // console.log (colors.length)
        ),
      delay , 
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
    return(
       <div class="block h-screen w-screen " 
       style={{
        backgroundImage: `url(${backGround})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: "100%" 
       }} 
       >
        <FirstNav class="h-auto w-auto"  />
        
        <div className="slideshow  " style={{margin: "0 auto",
                                    overflow: "hidden",
                                    width: "90%",
                                    "@media (max-width: 768px)": {
                                      width: "100%",
                                    },
                                    }}>
      <div
        className="slideshowSlider "
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` ,
                  whiteSpace: "nowrap" ,
                  transition: "ease 1000ms", 
                }}>
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

      <div className="slideshowDots ">
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
              textalign:"center",
                        }}  >
          </div>
        ))}
      </div>
    </div>
        
  </div> 

    )
}
export default Acceuil ; 