import React, { useEffect, useState }  from "react";
import FirstNav from "../component/FirstNav";
import FooterOne from "../component/FooterOne";
import backGround from"../images/Background2.jpg"
import { useParams  ,useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';

import CatCard from "../component/CatCard";
import appph1 from "../images/appph1.jpg"
import appph2 from "../images/appph2.jpg"
import appph3 from "../images/appph3.jpg"
import appph4 from "../images/appph4.jpg"
import appph5 from "../images/appph5.jpg"
import appph6 from "../images/appph6.jpg"
import ScrollToTopButton from "../component/ScrolToTopButton";

import axios from 'axios'

function SousCategorie(){
    const { categoryKey } = useParams();
    const [categorie, setCategorie] = useState({});
    const [undercategories, setUnderCategories] = useState([]);
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + `category/` + categoryKey)
            .then(res => {
                const tmp = res.data;
                setCategorie(tmp)
            })
        axios.get(process.env.REACT_APP_API_BASE_URL + 'undercategoryofCat/' + categoryKey)
            .then(res => {
                const tmp_2 = res.data;
                setUnderCategories(tmp_2.UnderCategories)
            })
    }
    useEffect(() => {
        getEvents();
    }, [useLocation().pathname])

    // const sousCat =[
    //     {
    //         titre :"Trépied et support ", 
    //         image :appph1 , 
    //         description:"Description de la premier sous categorie de la categorie Stockage  ",
    //         categoryKey :"Appareil Photo",
    //     },
    //     {
    //         titre :"Photography Bags et cases ", 
    //         image :appph2 , 
    //         description:"Description de la deuxieme sous categorie de la categorie Ecairage ",
    //         categoryKey :"Appareil Photo",
    //     },
        
    //     {
    //         titre :"Memory Cards  ", 
    //         image :appph3 , 
    //         description:"Description de la 3eme sous categorie de la categorie appareil photo ",
    //         categoryKey :"Appareil Photo",
    //     },
    //     {
    //         titre :"Batteries et power accessories ", 
    //         image :appph4 , 
    //         description:"Description de la 4 sous categorie de la categorie Objectif ",
    //         categoryKey :"Appareil Photo",
    //     },

    //     {
    //         titre :"Flashes et Camera lighting  ", 
    //         image :appph5 , 
    //         description:"Description de la 5eme sous categorie de la categorie Stockage ",
    //         categoryKey :"Appareil Photo",
    //     },
    //     {
    //         titre :"Lens filtre  ", 
    //         image :appph6 , 
    //         description:"Description de la 2 sous categorie de la categorie Ecairage ",
    //         categoryKey :"Appareil Photo",
    //     },
        
    // ];
    // const sousCatFiltered = sousCat.filter((sousCategorie) =>
    // sousCategorie.categoryKey.toLowerCase() === categoryKey.toLowerCase()
    // );

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
            {/* <FirstNav/> */}
            <div className="font-bold text-slate-100 justify-center pt-10 pb-5 text-center " > Catégorie : {categorie.name}</div>
            <div className=" w-4/5 max-[600px]:w-full  pt-5  pb-10  ml-auto max-[600px]:ml-0 mr-auto flex flex-wrap justify-center rounded-lg ">
            {undercategories.map((sousCategorie) => (
                    <div className="w-1/5  max-[600px]:w-1/2 pb-5 ml-0 pr-2 pl-2 max-h-72  "> 
                              <Link to={`/Catégories/${categorie.id}/${sousCategorie.id}`}>

                    <CatCard image={sousCategorie.image} titre={sousCategorie.name} description={sousCategorie.description} />
                    </Link>
                        </div>
            ))}  
            </div> 
            <FooterOne/>
             <ScrollToTopButton/>
        </div>
    )
}
export default SousCategorie;