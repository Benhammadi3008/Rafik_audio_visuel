import { Row , Col , Rate, Button} from "antd";
import React from "react";

function ArtCard({nom , sousCategori , image , description , notation , prix , stock}){
    return(
        <div className="flex w-full bg-white  rounded-lg cursor-pointer opacity-50 hover:opacity-100  h-full overflow-auto font-semibold  hover:font-black text-slate-600">
            <Col classname="h-full w-1/4 justify-center ml-auto mr-auto  ">
                <img src={image} alt={nom} className="pt-2 pb-2 pl-2" />
            </Col>
            <Col className="h-full w-1/2 justify-around ml-auto mr-auto  mt-auto mb-auto">
               <Row> <p>{nom} -{sousCategori} </p> </Row>
               <Row> <Rate value={notation} /></Row>
               <Row> <p>{description}</p> </Row>
            </Col>
            <Col classname="h-full w-1/4  justify-center ml-auto mr-auto " >
            <Row> {prix} DA </Row>
            <Row> <Button type="primary" className="">Acheter ...</Button></Row>
            <Row> En Stock : {stock} </Row>
            </Col>
        </div>
    )
}
export default ArtCard;