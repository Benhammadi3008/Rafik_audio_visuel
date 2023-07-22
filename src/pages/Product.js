import React, {  useState , useEffect } from "react";

import { Link, useParams , useLocation } from "react-router-dom";
import { Row, Col, Rate, Button, Modal, Form, Input, InputNumber, notification } from "antd";
import backGround from"../images/Background2.jpg"

import axios from 'axios'
import FooterOne from "../component/FooterOne";
import ScrollToTopButton from "../component/ScrolToTopButton"

import empty from "../images/empty.png"
import TextArea from "antd/es/input/TextArea";

function Product (){
    const onFinish = (values) => {
        form
    .validateFields()
    .then((values) => {

        let data = new FormData();
        
        data.append('lastname', values.Nom);
        data.append('email', values.mail);
        data.append('address', values.adress);
        data.append('phone_number', values.number);
        data.append('firstname', values.Prenom);
        data.append('quantity', values.quantite);
        data.append('comment', values.Commentaire);
        data.append('product_id', ProductId );
        

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        axios.post(process.env.REACT_APP_API_BASE_URL + 'order',
            data
            , config
        )
            .then(({  }) => {
                setOpen(false);
                form.resetFields();
                api['success']({
                    message: 'Commande',
                    description:
                        'Commande ajoutee avec succès.',
                });
            })
            .catch(() => {
                api['error']({
                    message: "Commande",
                    description: "Erreur d'ajout de la commande",
                });
            });
    })
    .catch((info) => {
        console.log(info);
        info.errorFields.forEach(element => {
            api['error']({
                message: "Erreur de saisie",
                description: element.errors[0],
            });
        });
    });
    setOpen(false)
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

      
    const [open, setOpen] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);
    const { ProductId } = useParams();
    const [Souscategory, setSouscategory] = useState([]);
    const [category, setcategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [PrimaryImage, setPrimaryImage] = useState('');

    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL +'product/' + ProductId)
            .then(res => {
                const tmp = res.data.undercategory;
                setSouscategory(tmp)
                const tmp2 = res.data.category;
                setcategory(tmp2)
                const tmp3 = res.data.message;
                setProduct(tmp3) 
                setPrimaryImage(GetProductImage(tmp3.products_images_primary))
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getEvents();
    }, [useLocation().pathname])
    function GetNotation(val){
        // return 3 ; 
        if (val.length === 0){
            return 0
        }else{
            return val[0].avgnotation
        }
    }

    function GetProductImage(val) {
            // return empty ; 
        if (val.length === 0) {
            return empty
        } else {
            return val[0].image
        }
    }

    const OnClickPrimaryImage = (key) => {
        setPrimaryImage(key)
        console.log(PrimaryImage);
    }

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

        <div style={{
            backgroundImage: `url(${backGround})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: "100%" ,

            }}
            className="justify-center">
                {contextHolder}
                {/* -------------------------- STEPPER --------------------------------- */}
         <Row className="  text-justify pt-6 pl-16 font-bold  text-blue-900  opacity-80 hover:opacity-100">
                <p className="underline pr-3">
                    <Link to={`/`}>
                    Acceuil 
                    </Link>
                </p>
                <p className="underline pr-3">
                    <Link to={`/`}>
                    - Catégorie  
                    </Link>
                </p>
                <p className="underline pr-3" > 
                    <Link to={`/Catégories/${category.id}`}>
                       - {category.name} 
                    </Link>
                </p>
                <p className="underline pr-3">
                    <Link to={`/Catégories/${category.id}/${Souscategory.id}`}>    
                    -{Souscategory.name}
                    </Link>
                </p>
                <p className="underline pr-3">
                      
                    -{product.name}
                    
                </p>
                
            </Row>
            <Row className=" w-screen flex justify-between mt-6 "> 
                <Col className="w-2/5   max-[600px]:w-4/5  ml-7" >
                    <Row className=" flex  w-full justify-around ">
                        <p className="font-black text-2xl  ">
                            {product.name} 
                        </p>
                        <div className="w-2/4 mb-2 ">
                            <Rate allowHalf  value={GetNotation(product.avg_notations)}  />
                            <p className="font-black "> 
                                # {product.serial_number}
                            </p>
                        </div>
                    </Row>
                    <Row className="w-full h-4/5 justify-around " >
                    <div className="w-1/5 h-4/5 overflow-y-scroll overflow-x-hidden mb-3  " >
                        {product.products_images.map((image) => (
                            <img src={image.image} alt=" " onClick={() => OnClickPrimaryImage(image.image)} className="h-2/6  mb-2  rounded-md cursor-pointer  max-[600px]:max-h-32 max-[600px]:w-52 " />
                        ))}
                        </div>
                        <img src={PrimaryImage} alt={product.name}  className="h-4/5 w-4/5 pl-2 rounded-lg" />
                    </Row>
                    
                </Col>
               
                <Col className="w-2/5  flex flex-col max-[600px]:w-4/5 ml-auto mr-auto max-[600px]:mb-5" >
                    <Row className=" font-black   w-full flex justify-center ">
                            
                            {(product.is_reduced === '1' ) ? (
                            <div className="block ml-auto mr-auto ">
                            <p className=" text-xl font-normal rounded-lg h-7 mx-10  mt-1 text-gray-600 line-through	 ">
                            {product.price} DA  
                            </p>
                            <p className=" text-2xl rounded-lg h-3  mb-2  text-gray-700  ">
                            {product.reduced_price} DA 
                            </p>
                            </div>
                             ) : (
                            <p className=" text-2xl rounded-lg  h-10  w-1/3   text-blue-700  border border-red-500   max-[600px]:w-1/2">
                            {product.price} DA 
                            </p>                     
                           )}
                    </Row>
                    <Row className="block mt-5 h-2/4">
                        <p className="font-black text-2xl text-gray-700"> Caractéristiques : </p> 
                        <p className="font-bold overflow-y-scroll "> {product.description} </p>
                    </Row>
                    <Row className="  ">
                        <Button type="primary" onClick={() => setOpen(true)} className="h-16 ml-auto mr-auto border-none bg-gradient-to-r from-red-600 to-purple-600 opacity-80 hover:opacity-100 font-bold text-xl  w-3/6  rounded-lg  " >

                            Commander
                        </Button>
                    <Modal
                        title="Ajouter Une Commande "
                        centered
                        open={open}
                        
                        onCancel={() => setOpen(false)}
                        width={800}
                        footer={[
  
                            <Button key="back" onClick={()=>{setOpen(false)}}>
                                Annuler 
                            </Button>,
                            <Button key="submit" className="bg-blue-300" type="primary"  onClick={onFinish}>
                                Confirmer
                            </Button>,
                        ]}
        
                    >
                         <Form
                            form={form}
                            autoComplete="off"
                            style={{ 
                               
                            }}
                        >
                        <div className=" flex justify-center mb-5 max-[600px]:mb-20">
                            <Form.Item
                            label="Nom"
                            name="Nom"
                            rules={[
                                {
                                required: true,
                                message: 'Inserer votre Nom!',
                                },
                            ]}
                            className="w-2/5  h-11 italic text-start mb-4   px-4 py-2 rounded-md mr-4 ml-4  "
                            >
                            <Input  />
                            </Form.Item>
                            <Form.Item
                            label="Prenom"
                            name="Prenom"
                            rules={[
                                {
                                    required: true,
                                    message: 'Inserer votre Prenom!',
                                },
                            ]}
                            
                            className="w-2/5  h-11 italic text-start mb-4  px-4 py-2 rounded-md mr-4 ml-4 "
                            >
                            <Input  style={{ display: 'inline-block', width: 'calc(100% - 12px)' , marginLeft:"20px" }} />
                            
                            </Form.Item>
                            </div>                            

                            <div className=" flex justify-center ml-4 mb-5 max-[600px]:mb-20">

                            <Form.Item
                            label="Mail"
                            name="mail"
                            rules={[
                                {
                                required: false,
                                },
                            ]}
                            className="w-2/5  h-11 italic text-start mb-4   px-4 py-2 rounded-md mr-4 ml-4  "
                            >
                            <Input  />
                            </Form.Item>
                           <Form.Item
                            label="Numero"
                            name="number"
                            rules={[
                                {
                                required: true,
                                message: 'Inserer votre Numero!',
                                },
                            ]}
                            className="w-2/5  h-11 italic text-start mb-4   px-4 py-2 rounded-md mr-4 ml-4  "
                            >
                            <Input />
                            </Form.Item>
                            </div>  
                            <div className="flex justify-center mb-5 max-[600px]:mb-20">
                            <Form.Item
                            label="Adresse"
                            name="adress"
                            rules={[
                                {
                                    required: true,
                                    message: 'Inserer votre Adresse!',
                                },
                            ]}
                            className="  w-10/12 max-[600px]:w-11/12 italic  px-4 py-2 h-11 text-start  mb-4   rounded-md  " 
                            >
                            <Input  />
                            </Form.Item>
                            </div>                          
                           
                            <div className="flex justify-center mb-5 max-[600px]:mb-20">
                             <Form.Item
                            label="Quantite"
                            name="quantite"
                            rules={[
                                {
                                required: true,
                                message: 'Inserer la quantite!',
                                
                                },
                                
                            ]}
                            className="w-2/5 max-[600px]:w-2/5  italic h-11 text-center mb-4  py-2 rounded-md  ml-4  "
                            >
                            <InputNumber min={1}  />
                            </Form.Item>
                            </div>
                            
                            <Form.Item
                            wrapperCol={{
                                
                            }}
                            >
                            <Form.Item
                            label="Commentaire"
                            name="Commentaire"
                            rules={[
                                {
                                    required: false,
                                    message: 'Inserer votre Adresse!',
                                },
                            ]}
                            className=""
                            >
                            <TextArea  className="" />
                            </Form.Item>
                           
                            
                            </Form.Item>
                        </Form>

                    </Modal>
                    </Row>
                </Col>
                
            </Row>
            <Row className="block ml-6 mb-11">
                <p className="font-black text-xl underline decoration-black  mb-8 "> Plus d'informations  :   </p>
                {product.features.map((features) => (        
                <div className="flex flex-row ">
                    <p className="font-black text-xl ml-4"> {features.type} :  </p>
                    <p className="ml-5  font-black text-l mt-1 " > {features.text} </p>
                    </div>
                    ))}
            </Row>
            <FooterOne />
            <ScrollToTopButton/>
        </div>
    )
}
export default Product ; 