import { Row , Col , Rate, Button} from "antd";
import React, {useState } from "react";
import backGround from"../images/Background2.jpg"
import axios from 'axios'

function ArtCard({nom , brand ,sousCategori , image , description , notation , prix , stock , product_id}){
    const [currentValue, setCurrentValue] = useState()
    const PostNotation = (e) => {
        const formData = new FormData();
        
        formData.append("product_id", product_id);
        if(e === 0){
            formData.append("notation", notation);
        }else{
            formData.append("notation", e);
        }
        console.log(process.env.REACT_APP_API_BASE_URL + "notation");
        axios
            .post(
                process.env.REACT_APP_API_BASE_URL+"notation",
                formData
            )
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    }
    return(
        <div className="flex w-full bg-white  rounded-lg cursor-pointer opacity-50 hover:opacity-100  h-full overflow-auto font-semibold max-[600px]:hover:font-medium  hover:font-black text-slate-600 ">
            <Col classname="h-full w-1/4 justify-center ml-auto mr-auto  " >
                <img src={image} alt={nom} className=" w-48 h-48 pt-2 pb-2 pl-2 X rounded-2xl"  />
            </Col>
            <Col className="h-full w-1/2 justify-center ml-auto mr-auto   pl-3 max-h-40">
               <Row className="pt-5"> <p>{brand} {nom} -{sousCategori} </p> </Row>
               <Row> <Rate value={notation}  onChange={PostNotation}  allowHalf /></Row>
               <Row> <p>{description}</p> </Row>
            </Col>
            <Col className=" h-full  w-1/4  pl-8 max-[600px]:pl-3 " >
                <Row className=" text-2xl text-black pt-6  max-[600px]:text-xl justify-center max-[600px]:pl-0  " > {prix} DA </Row>
                <Row className=" pt-4 justify-center "> 
                    <Button type="primary" className="w-3/4 h-10 max-[600px]:pl-3 text-xl max-[600px]:w-auto "  style={{backgroundColor :"#486BFF"}}>
                        Acheter 
                    </Button>
                </Row>
                <Row className="pt-4 justify-center max-[600px]:pl-0 "> En Stock : {stock} </Row>
            </Col>
        </div>
    )
}
export default ArtCard;