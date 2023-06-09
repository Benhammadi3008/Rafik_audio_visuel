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
            <Col className="h-full w-1/3 ">
                <Row className="w-full flex space-x-5 ml-10 " >
                    <FaInstagram size={30} className="text-inherit"  />
                    <p className="font-bold "> RafikAudioVisuel</p>
                </Row>
                <Row className="w-full flex space-x-5 ml-10 ">
                <FaFacebook  size={30}/>
                <p className="font-bold "> Rafik Audio Visuel </p>
                </Row>
                <Row className="w-full flex space-x-7 ml-10 ">
                <FaPhoneAlt  size={25}/>
                <p className="font-bold "> 0770 10 82 45 </p>
                </Row>    
            </Col>
            <Col className="h-full w-1/3">
                {/* <img src={logo} alt="Rafik Audio Visuel" />     */}
                duh
            </Col>
          <Col className="h-full w-1/3">
            <Row className="w-full flex space-x-6 ml-10">
            <FaMapMarkerAlt  size={25}/>
                <p className="font-bold "> Alger - Algérie </p>
            </Row>
            <Row className="w-full flex space-x-6 ml-10">
            <FaTruck  size={25}/>
                <p className="font-bold "> Livraison Disponible </p>
            </Row>
          </Col>
          
       </Row>
    </div>
    )
}
export default FooterOne;