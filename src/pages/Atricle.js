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

    const article = [{
        marque:"Nikon" ,
        nom :" Powershot G7 Mark III ",
        sousCategori : "Trépied et support",
        image : nikon ,
        id : "1",
        description: "Caracteristique  de l'article Caracteristique Caracteristique  de l'articleCaracteristique  de l'articleCaracteristique  de l'articleCaracteristique  de l'articleCaracteristique  de l'articleCaracteristique  de l'articleCaracteristique  de l'article   de l'article Caracteristique  de l'article Caracteristique  de l'article Caracteristique  de l'article Caracteristique  de l'article Caracteristique  de l'article ",
        notation : 5 , 
        prix : '20 000' ,
        stock: '10' , 
        SouscategoryKey : "Trépied et support"

    },
    {
        marque : "Canon " ,
        nom :"Powershot G7 Mark III ",
        sousCategori : "Trépied et support",
        image : empty ,
        id : "1",
        description: "description de l'article ",
        notation : 3.5 , 
        prix : 20000 ,
        stock: 10 , 
        SouscategoryKey : "Trépied et support",

    }]
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
            {/* <FirstNav/> */}
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
                    <ArtCard 
                        image={GetProductImage(product.products_images_primary)}
                        // image={nikon}
                        nom={product.name}
                        description={product.description} 
                        prix={product.price} 
                        notation={GetNotation(product.avg_notations)} 
                        // notation={4} 
                        sousCategori={product.under_category.name} 
                        stock={product.stock}
                        product_id={product.id}
                        brand={product.brand.name}
                    />
                </div>

        ))}   
            </div>
            <FooterOne/>
            <ScrollToTopButton/>
        </div>
    )
}
export default Article ; 