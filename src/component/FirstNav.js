import React , { useState,useEffect } from "react";
import logo from "../images/RAFIK AUDIO VISUEL FINAL 2 .png" 
import { Col, Row  , Menu  , theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import FilterSideBare from './FilterSideBare.js'
import { Link, useNavigate } from 'react-router-dom';
import navBack from "../images/Background.jpg"
import { FaBars  } from 'react-icons/fa'

import axios from 'axios'



function FirstNav(props  ) {
  const navigate = useNavigate();
 
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const [items, setItems] = useState([]);
  function getEvents() {
    axios.get(process.env.REACT_APP_API_BASE_URL + `category`)
      .then(res => {
        const tmp = res.data;
        setItems(tmp.Categories)
      })

  }
  useEffect(() => {
    getEvents();
  }, [])

  const { Search } = Input;

    // recuperer le texte depuis le searchBar
    const onSearch = (value) => {
      navigate('/Products/search/'+value, { replace: true });
    }
    
  

  const { token } = theme.useToken();
  const containerStyle = {
    position: 'relative',
    height: 600,
    padding: 48,
    overflow: 'hidden',
    textAlign: 'center',
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
      setOpen(!open);
    return open
  };
    return(
    <div>
    <div 
    style={{
        backgroundImage: `url(${navBack})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height : '17%'
       }}  
       className="h-full w-full"  >
       
        
        <Row className="pb-2 w-full flex justify-between  " >   
        <Col className="mt-2  "><FilterSideBare titre= {<FaBars className='w-7 h-7' />}   /> </Col>        
        <Col  className=" mt-2 max-[600px]:mt-4 max-[600px]:text-center" > <Link to={`/`}> <img src={logo} alt="Logo"  className="w-20 max-[600px]:w-14 " /> </Link> </Col>
        <Col     className="pt-2 w-2/3  max-[600px]:mt-1 max-[600px]:text-center" >
        <Search placeholder="Rechercher un article ..." onSearch={onSearch} style={{ width: "50%" }}   />
        </Col>
    </Row>
    <Row   className=" w-full justify-center   bg-slate-400/20 pb-2 pt-5 flex space-x-9 max-[600px]:justify-between max-[600px]:space-x-0 "  >
        <Col onClick={showDrawer} className="bg-slate-100 rounded-lg  text-neutral-600 w-auto pl-3 pr-3  font-semibold cursor-pointer "> <FilterSideBare titre= "Menu"   /> </Col>
      
        <Col  className="bg-slate-100   rounded-lg text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 font-semibold" > 
            
    
      <a className="" onClick={()=>props.sendToParent(showDrawer())}>
        Catégories <DownOutlined /> 
      </a>
    
    
        </Col>
            <Col onClick={() => navigate('/Products/filter/ %2F %2F %2Fdesc%2F', { replace: true })} className="bg-slate-100  rounded-lg text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 font-semibold cursor-pointer"> Shop </Col>
        <Col onClick={scrollToBottom} className="bg-slate-100   rounded-lg text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 cursor-pointer font-semibold hover:text-sky-400"> Contact Us  </Col>
    </Row>
    
    {/* <div className="h-48 bg-white inline-block rel z-10 " ></div> */}
     </div> 
     </div>
    )
}
export default FirstNav ;