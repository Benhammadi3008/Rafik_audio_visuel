import React from "react";
import { Link, useParams } from "react-router-dom";

import backGround from"../images/Background2.jpg"
import FirstNav from "../component/FirstNav";
import FooterOne from "../component/FooterOne";
import ScrollToTopButton from "../component/ScrolToTopButton";
import nikon from "../images/Nikon.png"
import ArtCard from "../component/ArtCard";

function Article (){
    
    const { SouscategoryKey } = useParams();
    const { categoryKey } = useParams();

    const article = [{
        nom :"Canon Powershot G7 Mark III ",
        sousCategori : "Trépied et support",
        image : nikon ,
        id : "1",
        description: "description de l'article ",
        notation : 5 , 
        prix : 20000 ,
        stock: 10 , 
        SouscategoryKey : "Trépied et support"

    },
    {
        nom :"Canon Powershot G7 Mark III ",
        sousCategori : "Trépied et support",
        image : nikon ,
        id : "1",
        description: "description de l'article ",
        notation : 5 , 
        prix : 20000 ,
        stock: 10 , 
        SouscategoryKey : "Trépied et support"

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
            <FirstNav/>
            <div className="inline">
                <p>
                    Acceuil 
                </p>
                <p>
                    Catégorie
                </p>
                <p> 
                    <Link to={`/Catégories/${categoryKey}`}>
                        {categoryKey}
                    </Link>
                </p>
                <p>
                    {SouscategoryKey}
                </p>
                
            </div>
            <p className="font-bold text-slate-100 justify-center pt-10 pb-5 text-center "> Sous-categorie : {SouscategoryKey} </p>
            <div className="w-4/5  max-[600px]:w-full justify-center mr-auto ml-auto pt-3 pb-4">
                {article.map((articles) => (
                    <div className="pt-2 pb-3" >
                        <ArtCard 
                        image={articles.image}
                        nom={articles.nom}
                        description={articles.description} 
                        prix={articles.prix} 
                        notation={articles.notation} 
                        sousCategori={articles.sousCategori} 
                        stock={articles.stock}
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