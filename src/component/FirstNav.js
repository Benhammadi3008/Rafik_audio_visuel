import React , { useState,useEffect } from "react";
import logo from "../images/RAFIK AUDIO VISUEL FINAL 2 .png" 
import { Col, Row  , Menu  , theme} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import navBack from "../images/Background.jpg"
import { Link } from 'react-router-dom';

import axios from 'axios'



function FirstNav(props) {
  
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
    const onSearch = (value) => console.log(value);
    
  const handleMenuClick = (e) => {
    if (e.key === 'Appareil Photo','Objectif','Eclairage','Stockage') {
        console.log (e.key) ; 
      // setOpen(false);
      
    }
  };
  const handleOpenChange = (flag) => {
    // setOpen(flag);
  };
  // const items = [
  //   {
  //     label: 'Appareil Photo',
  //     key: 'Appareil Photo',
  //     // image : Nikon,
  //   },
  //   {
  //     label: 'Objectif',
  //     key: 'Objectif',
  //   },
  //   {
  //     label: 'Eclairage',
  //     key: 'Eclairage',
  //   },
  //   {
  //       label: 'Stockage ',
  //       key: 'Stockage',
  //     },
  // ];
  const menu = (
    <Menu mode="horizontal">
      {items.map((category) => (
        <Menu.Item key={category.id}>
          <Link to={`/Catégories/${category.id}`}>
            <img className="w-5 h-5" src={category.image} alt={category.name}/>
            {category.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
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
       className="h-auto w-full"  >
       
        
        <Row className="pb-2 w-full" >           
        <Col push={4} className=" mt-2" > <Link to={`/`}> <img src={logo} alt="Logo"  className="w-20 " /> </Link> </Col>
        <Col  span={12}  offset={6} className="pt-2" >
        <Search placeholder="Rechercher un article ..." onSearch={onSearch} style={{ width: "60%" }} />
        </Col>
    </Row>
    <Row   className=" w-full justify-center   bg-slate-400/20 pb-2 pt-5 flex space-x-9 max-[600px]:justify-between max-[600px]:space-x-0 "  >
        <Col  className="bg-slate-100 rounded-lg  text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 font-semibold "> Menu</Col>
        <Col  className="bg-slate-100  rounded-lg text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 font-semibold" > 
            {/* <Dropdown
                menu={{
                    items,
                    onClick: handleMenuClick,
                }}
                onOpenChange={handleOpenChange}
                open={open}
                >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                    Categories
                    <DownOutlined />
                    </Space>
                </a>
            </Dropdown>  */}
             {/* <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Catégories <DownOutlined />
      </a>
    </Dropdown> */}
    
      <a className="" onClick={()=>props.sendToParent(showDrawer())}>
        Catégories <DownOutlined /> 
      </a>
    
    
        </Col>
        <Col  className="bg-slate-100  rounded-lg text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 font-semibold"> Shop </Col>
        <Col  className="bg-slate-100   rounded-lg text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 font-semibold"> Contact Us  </Col>
    </Row>
    
    {/* <div className="h-48 bg-white inline-block rel z-10 " ></div> */}
     </div> 
     </div>
    )
}
export default FirstNav ;