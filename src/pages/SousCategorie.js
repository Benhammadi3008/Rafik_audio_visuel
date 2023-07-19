import React, { useEffect, useState }  from "react";
import FirstNav from "../component/FirstNav";
import FooterOne from "../component/FooterOne";
import backGround from"../images/Background2.jpg"
import { useParams  ,useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';

import CatCard from "../component/CatCard";
import ScrollToTopButton from "../component/ScrolToTopButton";

import axios from 'axios'

function SousCategorie(){
    const [IsLoading, setIsLoading] = useState(true);
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
                setIsLoading(false)
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