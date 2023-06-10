import React from "react";
import FirstNav from "../component/FirstNav";
import FooterOne from "../component/FooterOne";
import backGround from"../images/Background2.jpg"
import { useParams } from 'react-router-dom';
import CatCard from "../component/CatCard";
import appph1 from "../images/appph1.jpg"
import appph2 from "../images/appph2.jpg"

function Categorie(){
    const { categoryKey } = useParams();
    const sousCat =[
        {
            titre :"Trépied et support ", 
            image :appph1 , 
            description:"Description de la premier sous categorie de la categorie appareil photo ",
            categoryKey :"Appareil Photo",
        },
        {
            titre :"Sacs et étuis de photographie ", 
            image :appph2 , 
            description:"Description de la deuxieme sous categorie de la categorie appareil photo ",
            categoryKey :"Objectif",
        }

        
    ];
    const sousCatFiltered = sousCat.filter((sousCategorie) => sousCategorie.categoryKey === categoryKey);

    return(
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
            <FirstNav/>
            <h2> {categoryKey}</h2>
            {sousCatFiltered.map((sousCategorie) => (
                <div key={sousCategorie.titre} className="w-1/4 h-10">
                    <CatCard image={sousCategorie.image} titre={sousCategorie.titre} description={sousCategorie.description}/>
                </div>
            ))}  
            <FooterOne/>
             
        </div>
    )
}
export default Categorie;