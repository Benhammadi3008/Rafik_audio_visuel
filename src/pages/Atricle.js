import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import empty from "../images/empty.png"
import backGround from"../images/Background2.jpg"
import FirstNav from "../component/FirstNav";
import FooterOne from "../component/FooterOne";
import ScrollToTopButton from "../component/ScrolToTopButton";
import nikon from "../images/Nikon.png"
import ArtCard from "../component/ArtCard";
import { Row } from "antd";

import axios from 'axios'

function Article (){
    const [IsLoading, setIsLoading] = useState(true);
    const { SouscategoryKey } = useParams();
    const { categoryKey } = useParams();
    const [products, setProduct] = useState([]);
    const [Souscategory, setSouscategory] = useState([]);
    const [category, setcategory] = useState([]);
     function GetNotation(val){
        
        if (val.length === 0){
            return 0
        }else{
            return val[0].avgnotation
        }
    }
    function GetProductImage(val) {

        if (val.length === 0) {
            return empty
        } else {
            return val[0].image
        }
    }
    
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL +'productsofundercategory/' + SouscategoryKey)
            .then(res => {
                const tmp = res.data.Products;
                setProduct(tmp)
                setIsLoading(false)
            })
        axios.get(process.env.REACT_APP_API_BASE_URL +'undercategory/' + SouscategoryKey)
            .then(res => {
                const tmp = res.data.undercategory;
                setSouscategory(tmp)
                const tmp2 = res.data.category;
                setcategory(tmp2)
            })
    }
    useEffect(() => {
        getEvents();
    }, [useLocation().pathname])


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
        <div 
        style=
            {{
            backgroundImage: `url(${backGround})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: "100%" ,
            }}>
     {/*-------------------------- Stepper ------------------------------ */}
            <Row className="  text-justify pt-6 pl-16 font-bold  text-blue-900  opacity-80 hover:opacity-100">
                <p className="underline pr-3">
                    <Link to={`/`}>
                    Acceuil 
                    </Link>
                </p>
                <p className="underline pr-3">
                    <Link to={`/`}>
                    - Catégorie  
                    </Link>
                </p>
                <p className="underline pr-3" > 
                    <Link to={`/Catégories/${categoryKey}`}>
                       - {category.name} 
                    </Link>
                </p>
                <p className="underline pr-3">
                    <Link to={`/Catégories/${categoryKey}/${Souscategory.id}`}>    
                    -{Souscategory.name}
                    </Link>
                </p>
                
            </Row>
            <p className="font-bold text-slate-100 justify-center pt-10 pb-5 text-center "> Sous-categorie : {Souscategory.name} </p>
            <div className="w-4/5  max-[600px]:w-full justify-center mr-auto ml-auto pt-3 pb-4">
            {  products.map((product) => (
                <div className="pt-2 pb-3" >
                    <Link to={`/product/${product.id}`}>
                    <ArtCard 
                        image={GetProductImage(product.products_images_primary)}
                        nom={product.name}
                        description={product.description} 
                        prix={product.price} 
                        notation={GetNotation(product.avg_notations)} 
                        sousCategori={product.under_category.name} 
                        stock={product.stock}
                        product_id={product.id}
                        brand={product.brand.name}
                        />
                    
                        </Link>
                </div>
        ))}   
            </div>
            <FooterOne/>
            <ScrollToTopButton/>
        </div>
    )
}
export default Article ; 