import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import empty from "../images/empty.png"
import backGround from "../images/Background2.jpg"
import { Empty, Pagination } from 'antd';
import ArtCard from "../component/ArtCard";

import axios from 'axios'
import FooterOne from "../component/FooterOne";
import ScrollToTopButton from "../component/ScrolToTopButton";

function FiltredProducts() {
    const [IsLoading, setIsLoading] = useState(true);
    const { search } = useParams();
    const { filter } = useParams();
    const [products, setProduct] = useState([]);
    const [totalPages, settotalPages] = useState([]);
    const [path_api, setPath] = useState([]);
    const location = useLocation();
    function getEvents() {

        let s = (typeof search === 'undefined' ? "" : search);
        let f = (typeof filter === 'undefined' ? "" : filter);
       
        const path = location.pathname.split('/');
        
        if (path[2] === "search"){
            axios.get(process.env.REACT_APP_API_BASE_URL + 'productssearch/' + s)
                .then(res => {
                    const tmp = res.data.Products.data;
                    setProduct(tmp)
                    settotalPages(res.data.Products.total)
                    setPath(res.data.Products.path)
                    setIsLoading(false)
                })
        } 
        else if (path[2] === "filter"){
            const dataToFilter = location.pathname.replaceAll('%2F', '/').split('/');

            let data = new FormData();

            if (dataToFilter[3] === '%20') { data.append('category', " "); } else { data.append('category', dataToFilter[3]); }
            if (dataToFilter[4] === '%20') { data.append('undercategory', " "); } else { data.append('undercategory', dataToFilter[4]); }
            if (dataToFilter[5] === '%20') { data.append('brand', " "); } else { data.append('brand', dataToFilter[5]); }
            if (dataToFilter[6] === '%20') { data.append('price', " "); } else { data.append('price', dataToFilter[6]); }

            axios.post(process.env.REACT_APP_API_BASE_URL + 'productsside',data)
                .then(res => {
                    const tmp = res.data.Products.data;
                    setProduct(tmp)
                    settotalPages(res.data.Products.total)
                    setPath(res.data.Products.path)
                    setIsLoading(false)

                })
        }
    }
    const onChange = (pageNumber) => {
        axios.get(path_api+"?page="+pageNumber)
            .then(res => {
                const tmp = res.data.Products.data;
                setProduct(tmp)
                setIsLoading(false)

            })
    };
    useEffect(() => {
        getEvents();
    }, [useLocation().pathname])

    function GetNotation(val) {

        if (val.length === 0) {
            return 0
        } else {
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
    if (IsLoading) {
        return <div style=
            {{
                backgroundImage: `url(${backGround})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: "100%",
            }} id="preloader" > 
            <div id="loader"></div>
        </div>
    }
    return(
        <div  className="block h-full w-full "
            style=
            {{
                backgroundImage: `url(${backGround})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                opacity: "100%",
            }}  >
                
                <p className="font-bold text-xl text-slate-100 justify-center pt-14 pb-5 text-center  "> Resultats :  </p>
            {products.length > 0 &&
            <div className=" w-4/5 max-[600px]:w-full  pt-5  pb-10  ml-auto max-[600px]:ml-0 mr-auto flex flex-wrap justify-center rounded-lg" >
            {products.map((product) => (
                <div className="pt-2 pb-3 w-full" >
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
                </div>}
            {products.length === 0 &&
                <div className="w-4/5 h-screen  max-[600px]:w-full justify-center mr-auto ml-auto pt-3 pb-4">
                    <Empty />
            </div>
                
            }
            <ScrollToTopButton/>
            <Pagination hideOnSinglePage className="my-4" defaultCurrent={1} total={totalPages} onChange={onChange} />
            <FooterOne/>
        </div>
    )
}

export default FiltredProducts;