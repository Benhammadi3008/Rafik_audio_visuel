import { Button, Modal, Form, Input, Card, Avatar, Select, Upload, InputNumber, Checkbox, Space, notification, Popconfirm , Row , Col } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import ProductTab from '../../component/Admin/ProductTab'
import axios from 'axios'
function Product() {
    const { Meta } = Card;
    const [api, contextHolder] = notification.useNotification();
    const { TextArea } = Input;
    const { Option } = Select;
    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 14,
        },
    };
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    // Upload 
    const getBase64 = (file) =>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            
        };
    const [ProductImages, setProductImages] = useState([]);
    const [undercategories, setUnderCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [ReduceDisabled, setReduceDisabled] = useState(false);

    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + 'undercategory')
            .then(res => {
                const tmp_2 = res.data;
                setUnderCategories(tmp_2.UnderCategories)
            })
        axios.get(process.env.REACT_APP_API_BASE_URL + 'brand')
            .then(res => {
                const tmp = res.data;
                setBrands(tmp.Brands)
            })
    }
    useEffect(() => {
        getEvents();
    }, [])
    // Upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    // const [SelectedImage, setSelectedImage] = useState('');
    // const [PrimaryImage, setPrimaryImage] = useState('');
    const [fileList, setFileList] = useState([]);
    // End Upload 

    const [open, setOpen] = useState(false);
    const [openSetImage, setopenSetImage] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [form] = Form.useForm();
    const showProductModal = () => {
        setOpen(true);
    };
    const handleOk_ProductModal = () => {
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        form
            .validateFields()
            .then((values) => {
                console.log(values);
                let data = new FormData();

                for (var x = 0; x < fileList.length; x++) {
                    data.append("images[]", fileList[x].originFileObj);
                }

                data.append('name', values.name);
                data.append('brand_id', values.brand_id);
                data.append('description', values.description);
                data.append('price', values.price);
                data.append('serial_number', values.serial_number);
                data.append('stock', values.stock);
                data.append('under_category_id', values.under_category_id);
                if (ReduceDisabled) {
                    data.append('is_reduced', "1");
                    data.append('reduced_price', values.reduced_price);
                }

                

                axios.post(process.env.REACT_APP_API_BASE_URL + 'product',
                    data
                    , config
                )
                    .then(({ data }) => {
                        values.features.forEach(feature => {
                            let feature_data = new FormData();
                            feature_data.append('product_id', data.product_id);
                            feature_data.append('type', feature.type);
                            feature_data.append('text', feature.text);

                            axios.post(process.env.REACT_APP_API_BASE_URL + 'feature',
                                feature_data
                                , config
                            )
                                .then(({ data }) => {
                                    console.log(data);
                                    form.resetFields();
                                })
                                .catch((error) => {
                                    console.log(error.response.data);
                                });
                        });
                        const tmp_img = data.images;
                        setProductImages(tmp_img);
                        setOpen(false);
                        setConfirmLoading(false);
                        setopenSetImage(true)
                        
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
                setConfirmLoading(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
        setConfirmLoading(false);
        setOpen(false);
    };


    const handleCancel_ProductModal = () => {
        setOpen(false);
    };
    const handleCancel_ProductImageModal = () => {
        setopenSetImage(false)
    };
    const onFinish_ProductModal = () => {
    };

    const handleConfirm_ProductImageModal = (key) => {
        let image_data = new FormData();
        image_data.append('is_primary', '1');
        image_data.append("_method", "PATCH");

        axios.post(process.env.REACT_APP_API_BASE_URL + 'productimage/' +key,
            image_data
            , config
        )
            .then(({ data }) => {
                setopenSetImage(false)
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        
    };



    const handleCancelUpload = () => setPreviewOpen(false);
    

    const handlePreview = async (file) => {
        console.log(file);
        if (!file.url && !file.preview) {
            file.preview = getBase64(file.originFileObj);
        }
        
        setPreviewImage(file.url || file.thumbUrl);
        // setSelectedImage(file.uid);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    // SetPrimary 
    /* 
    const SetPrimaryImage = () => {
        setPrimaryImage(SelectedImage)
    };
    */

    return (
        <>
            {contextHolder}
            <div class="h-full w-full flex flex-col my-4 " >

                <div className="flex justify-end">
                    <Button type="primary" className='bg-blue-300 text-base mr-4 ' onClick={showProductModal}>
                        Ajouter un produit
                    </Button>
                </div>
                <div className="my-4 inline-block">
                    <ProductTab />                
                </div>
            </div >
            <Modal
                title="Ajouter un produit"
                open={open}
                onOk={handleOk_ProductModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancel_ProductModal}
                footer={[
                    <Button key="back" onClick={handleCancel_ProductModal}>
                        Return
                    </Button>,
                    <Button key="submit" className="bg-blue-300" type="primary" loading={confirmLoading} onClick={handleOk_ProductModal}>
                        Submit
                    </Button>,
                ]}
            >

                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish_ProductModal}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Nom"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir le nom du produit',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="under_category_id"
                        label="Sous catégorie"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez mentionner la sous categorie',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Choisissez une sous catégorie"
                            allowClear
                        >
                            {undercategories.map((undercategorie) => <Option value={undercategorie.id} >{undercategorie.name}</Option>)}

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="brand_id"
                        label="Marque"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez mentionner la marque',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Choisissez une Marque"
                            allowClear
                        >
                            {brands.map((brand) => <Option value={brand.id} >{brand.name}</Option>)}

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="serial_number"
                        label="Numéro de série"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir le numero de serie',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Prix"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir le prix',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="DA" min={0} style={{ width: '100%' }} />

                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir une description',
                            },
                        ]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[
                            {
                                required: false,
                                message: 'Veuillez saisir le stock',
                            },
                        ]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />

                    </Form.Item>

                    <Form.Item
                        name="reduced_price"
                        label="Reduction"
                        rules={[
                            {
                                required: false,
                                
                            },
                        ]}
                    >
                        <InputNumber disabled={!ReduceDisabled} addonBefore={<Checkbox
                            checked={ReduceDisabled}
                            onChange={(e) => setReduceDisabled(e.target.checked)}
                        >

                        </Checkbox>} addonAfter="DA" min={0} style={{ width: '100%' }} />

                    </Form.Item>
                    <Form.Item label="Caractéristiques" >
                    </Form.Item>
                    <Form.List name="features">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        className='flex justify-center w-full'
                                        key={key}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'type']}
                                            className='w-full'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing Type',
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: "100%", marginRight: -24 }} placeholder="Type" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'text']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing Text',
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: "250%", marginLeft: -60 }} placeholder="Text" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item style={{ width: "100%", marginLeft: 130 }} >
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Upload
                    
                        multiple={true}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        beforeUpload={file => {
                            getBase64(file)
                            // Prevent upload
                            return false;
                        }}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} footer={[]} onCancel={handleCancelUpload}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>

                </Form>
               
            </Modal>
            <Modal
                title="Selectionner l'image principale"
                open={openSetImage}
                width={1000}
                onCancel={handleCancel_ProductImageModal}
                footer={[
                    
                ]}
            >
                <div className="">
                    <Row className="my-4 inline-block flex flex-row flex-wrap">
                        {ProductImages.map((productimage) => (
                        <Col className='w-1/5 mx-5 my-1'>
                                <Popconfirm title="Sure to select?" onConfirm={() => handleConfirm_ProductImageModal(productimage.id)}>
                                    <Card bodyStyle={{ padding: '5px' }}  hoverable className='hover:bg-gray-50' bordered={false}>
                                        <img style={{ height: '100%', width: '100%' }}
                                        className=''
                                        alt="example"
                                        src={productimage.image}
                                    />
                            </Card>
                                </Popconfirm>                                
                        </Col>))}
                    </Row>
                </div>
            </Modal>
        </>
    )
}
export default Product;