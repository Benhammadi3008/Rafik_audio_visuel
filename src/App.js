import React , { useEffect,useState  } from "react";
import { Drawer, theme, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Acceuil from "./pages/Accueil";
import SousCategorie from "./pages/SousCategorie";
import Article from "./pages/Atricle";
import MainDash from "./pages/Admin/MainDash";
import Brand from "./pages/Admin/Brand";
import Category from "./pages/Admin/Category";
import UnderCategory from "./pages/Admin/UnderCategory";
import Product_ADM from "./pages/Admin/Product";
import Publicity from "./pages/Admin/Publicity";
import Product from "./pages/Product";

import FirstNav from "./component/FirstNav";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";

import axios from 'axios'
import Login from "./pages/Login";
import SideBar from "./component/SideBar";


function Layout(getChildData,onClose,openChild,categories){


  const { token } = theme.useToken();
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    background: token.colorFillAlter,
  };
  return(
  <>
  <FirstNav sendToParent={getChildData} />
  <div style={containerStyle} >
  <Drawer       
        placement="top"
        closable={false}
        onClose={onClose}
        open={openChild}
        getContainer={false}
        height={180}
        bodyStyle={{paddingTop:"0px" , paddingBottom:"0px" , paddingLeft:"0px" , paddingRight:"0px"}}
       >
        <div className="h-full" >
                <Row className=" flex flex-col  justify-center h-full " >
                  {categories.map((Categorie) => (
                  <Col className="bg-white mx-auto rounded-lg max-[600px]:ml-0  text-slate-400  hover:text-slate-700 max-[600px]:bg-inherit  h-full cursor-pointer opacity-60 hover:opacity-90 w-1/6  max-[600px]:w-1/2 ">
                    <Link  onClick={onClose} className=" flex justify-center" to={`/Catégories/` + Categorie.id}>
                      <img className="rounded-lg w-3/5 h-24 my-4  " src={Categorie.image} alt={Categorie.name} />
                    </Link>
                    <p className="font-extrabold text-center absolute inset-x-0 mt-0 ">{Categorie.name}</p>
                  </Col>
                  
                ))}
                </Row>
              </div>
      </Drawer>
    <Outlet />
  </div>
</>)
}

function ProtectedRoutes(){
  const Authenticated = localStorage.getItem('Authenticated');
  if(Authenticated !== 'true'){
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex flex-row max-w-full inline-block">
      <div className="min-h-screen">
      <SideBar />
      </div>
      <div className=" p-2 main w-full overflow-y-hidden bg-gray-200">
          <div className="rounded-xl p-2 max-w-full h-full bg-white">
            <Outlet />
        </div>
      </div>
    </div>
  )
}
function LoginRoute() {
  const Authenticated = localStorage.getItem('Authenticated');

  if (Authenticated === 'true') {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}

function App() {
  const location = window.location;
  
  const [categories, setCategories] = useState([]);
  function getEvents() {
    axios.get(process.env.REACT_APP_API_BASE_URL + `category`)
      .then(res => {
        const tmp = res.data;
        setCategories(tmp.Categories)
      })}
   useEffect(() => {
    getEvents();
   }, [])
    
  const[openChild,SetopenChild] = useState()
  const getChildData=(val) =>{
    SetopenChild(val)
  }
  const onClose = () => {
    SetopenChild(false)
  };
  
  
  return (
    <div class="w-full h-full">
     <BrowserRouter>
    
     <Routes>
          <Route element={ProtectedRoutes()}>
            <Route path="/dashboard/Main" element={<MainDash />} />
            <Route path="/dashboard/brand" element={<Brand />} />
            <Route path="/dashboard/category" element={<Category />} />
            <Route path="/dashboard/undercategory" element={<UnderCategory />} />
            <Route path="/dashboard/product" element={<Product_ADM />} />
            <Route path="/dashboard/publicity" element={<Publicity />} />
          </Route>

          <Route element={LoginRoute()}>
            <Route path ="/login" element={ <Login/>} />
          </Route>

          <Route element={Layout(getChildData,onClose,openChild,categories)}>
            <Route path="/" element={ <Acceuil/>} />
            <Route path="/Catégories/:categoryKey" element={ <SousCategorie/>} />
            <Route path="/Catégories/:categoryKey/:SouscategoryKey" element={ <Article/>} />
            <Route path="/Product/:ProductId" element={ <Product/>} />
          </Route>

      </Routes>
        
      
      
     </BrowserRouter>
     <style>
      {`
      ::-webkit-scrollbar {
        width: 10px;
    }
      
    /* Track */
    ::-webkit-scrollbar-track {
        background: inherit;
    }
      
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }
      
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
      `}
      
     </style>
    </div>
  );
}

export default App;
