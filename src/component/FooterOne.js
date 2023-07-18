import React from "react";
import { Col, Row } from "antd";
import { FaFacebook,  FaInstagram,  FaPhoneAlt ,FaMapMarkerAlt , FaTruck } from 'react-icons/fa';
import logo from "../images/RAFIK AUDIO VISUEL FINAL 2 .png" 
import back from "../images/Background.jpg"
function FooterOne (){
    return(
        < div style=
        {{
          backgroundImage: `url(${back})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: "100%" ,
        }}>
        <Row  >
            <Col className="h-full w-1/3 pt-4  max-[600px]:mt-2">
                <Row className="w-full flex space-x-5   ml-5  max-[600px]:ml-0 max-[600px]:flex max-[600px]:space-x-0 pb-3 " >
                    <FaInstagram size={20} className="text-inherit "  />
                    <a href="https://www.instagram.com/rafikaudiovisuel/" className="font-bold max-[600px]:text-xs max-[600px]:ml-0 max-[600px]:mt-0  "> RafikAudioVisuel</a>
                </Row>
                <Row className="pb-3 w-full flex space-x-5 ml-5 max-[600px]:ml-0 max-[600px]:flex max-[600px]:space-x-0">
                <FaFacebook  size={20}/>
                <a className="font-bold max-[600px]:text-xs  max-[600px]:mt-0"> Rafik Audio Visuel </a>
                </Row>
                <Row className="pb-3 w-full flex space-x-7 ml-5 max-[600px]:ml-0 max-[600px]:flex max-[600px]:space-x-0">
                <FaPhoneAlt  size={20}/>
                <p className="font-bold max-[600px]:text-xs max-[600px]:mt-0 "> 0770 10 82 45 </p>
                </Row>    
            </Col>
            <Col className=" w-1/3 justify-center h-full pt-4 max-[600px]:mt-2">
               <Row className="justify-center w-2/3 ml-auto mr-auto pb-3" >  <img src={logo} alt="Rafik Audio Visuel  " className="h-10 w-3/5"  /> </Row>   
               <Row className=" w-full  justify-center font-bold pb-2"> <p> @RAV 2023</p> </Row> 
               <Row className=" w-full justify-center  font-bold max-[600px]:text-center pb-3"> <p>Vente de Matériel Audio Visuel</p> </Row> 
            </Col>
          <Col className="h-full w-1/3 text-center pt-4 pl-20 max-[600px]:mt-2 max-[600px]:pl-0 ">
            <Row className="pb-3 w-full flex space-x-3 max-[600px]:ml-0 max-[600px]:flex max-[600px]:space-x-0  ">
            <FaMapMarkerAlt  size={20}/>
                <p className="font-bold "> Alger - Algérie </p>
            </Row>
            <Row className=" pb-3 w-full flex space-x-3 max-[600px]:ml-0 max-[600px]:flex max-[600px]:space-x-0  ">
            <FaTruck  size={20}/>
                <p className="font-bold max-[600px]:text-xs "> Livraison Disponible </p>
            </Row>
          </Col>
          
       </Row>
    </div>
    )
}
export default FooterOne;