import React from "react";
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
const CatCard = ({image , titre , description}) => (
  
  <Col className="bg-white  rounded-lg cursor-pointer opacity-50 hover:opacity-100  h-full overflow-auto font-semibold  hover:font-black  ">
    <Row className="  justify-center pt-4"> 
      <img src={image} alt={titre} />
    </Row>
    <Row className="  justify-center text-center" >
      <p>  {titre} </p>  
    </Row>
    <Row>
      <p className=" text-slate-400  text-center pb-3 " >  {description} </p>  
    </Row>
  </Col>
);
export default CatCard;