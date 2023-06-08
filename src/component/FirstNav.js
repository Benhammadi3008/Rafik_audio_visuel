import React , { useState } from "react";
import logo from "../images/RAFIK AUDIO VISUEL FINAL 2 .png" 
import { Col, Row ,Dropdown, Space} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import navBack from "../images/Background.jpg"
const { Search } = Input;

function FirstNav() {
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
        key: 'Stockage4',
      },
  ];
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
        <Col push={4} className=" mt-2" > <img src={logo} alt="Logo"  className="w-20 " /> </Col>
        <Col  span={12}  offset={6} className="pt-2" >
        <Search placeholder="Rechercher un article ..." onSearch={onSearch} style={{ width: "60%" }} />
        </Col>
    </Row>
    <Row   className="space-y-3 space-x-7 text-center   bg-slate-400/20 pb-2" align={"center"} >
        <Col span={2} className="bg-slate-100 rounded-lg mt-3 text-neutral-600  "> Menu</Col>
        <Col span={2} className="bg-slate-100  rounded-lg text-neutral-600 h-7" > 
            <Dropdown
                menu={{
                    items,
                    onClick: handleMenuClick,
                }}
                onOpenChange={handleOpenChange}
                open={open}
                >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                    Catégories
                    <DownOutlined />
                    </Space>
                </a>
            </Dropdown> 
        </Col>
        <Col span={2} className="bg-slate-100  rounded-lg text-neutral-600"> Shop </Col>
        <Col span={2} className="bg-slate-100   rounded-lg text-neutral-600"> Contact Us  </Col>
    </Row>
     </div>            
    )
}
export default FirstNav ;