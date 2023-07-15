import React , { useEffect,useState  } from "react";
import { Drawer , theme} from 'antd';
import { Link } from 'react-router-dom';
import { Col, Row } from "antd";
import Acceuil from "./pages/Accueil";
import SousCategorie from "./pages/SousCategorie";
import Article from "./pages/Atricle";
import FirstNav from "./component/FirstNav";
import { BrowserRouter , Route , Routes ,Outlet } from "react-router-dom";
import Loading from "./component/Loading";

import axios from 'axios'
import Login from "./pages/Login";

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
          <Route path ="/login" element={ <Login/>} />
          <Route element={Layout(getChildData,onClose,openChild,categories)}>
            <Route path="/" element={ <Acceuil/>} />
            <Route path="/Catégories/:categoryKey" element={ <SousCategorie/>} />
            <Route path="/Catégories/:categoryKey/:SouscategoryKey" element={ <Article/>} />
          </Route>

      </Routes>
        
      
      
     </BrowserRouter>
    </div>
  );
}

export default App;
