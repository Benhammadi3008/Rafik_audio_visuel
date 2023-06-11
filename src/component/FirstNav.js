import React , { useState } from "react";
import logo from "../images/RAFIK AUDIO VISUEL FINAL 2 .png" 
import { Col, Row ,Dropdown, Space , Menu} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import navBack from "../images/Background.jpg"
import { Link } from 'react-router-dom';


function FirstNav() {
  const { Search } = Input;

    // recuperer le texte depuis le searchBar
    const onSearch = (value) => console.log(value);
    const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === 'Appareil Photo','Objectif','Eclairage','Stockage') {
        console.log (e.key) ; 
      setOpen(false);
      
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };
  const items = [
    {
      label: 'Appareil Photo',
      key: 'Appareil Photo',
    },
    {
      label: 'Objectif',
      key: 'Objectif',
    },
    {
      label: 'Eclairage',
      key: 'Eclairage',
    },
    {
        label: 'Stockage ',
        key: 'Stockage',
      },
  ];
  const menu = (
    <Menu>
      {items.map((category) => (
        <Menu.Item key={category.key}>
          <Link to={`/Catégories/${category.key}`}>{category.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
    return(
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
             <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Catégories <DownOutlined />
      </a>
    </Dropdown>
        </Col>
        <Col  className="bg-slate-100  rounded-lg text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 font-semibold"> Shop </Col>
        <Col  className="bg-slate-100   rounded-lg text-neutral-600 w-auto pl-3 pr-3 pt-2 pb-2 font-semibold"> Contact Us  </Col>
    </Row>
     </div>            
    )
}
export default FirstNav ;