import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, Popconfirm, Table, notification, Select, Checkbox, InputNumber, Space ,Row,Col,Card} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, FileImageOutlined, MinusCircleOutlined } from '@ant-design/icons';
import authHeader from '../../services/authHeader'

import axios from 'axios'

function ProductTab() {
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
    const [ChangedImage, setChangedImage] = useState(false);
    const [ChangedFeature, setChangedFeature] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const data = [];
    const [openSetImage, setopenSetImage] = useState(false);
    const [products, setProducts] = useState([]);
    const [undercategories, setUnderCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [ReduceDisabled, setReduceDisabled] = useState(false);
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + `product`)
            .then(res => {
                const tmp = res.data.Products;
                tmp.forEach((product) => {
                    data.push({
                        key: product.id,
                        text: product.name,
                        under_category: product.under_category.name,
                        brand: product.brand.name,
                        serial_number: product.serial_number,
                        stock:product.stock,
                        price:(product.price + "  DA")
                    })
                })
                setDataSource(data)

            })

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


    const handleDelete = (key) => {

        axios
            .delete(process.env.REACT_APP_API_BASE_URL + 'product/' + key,
                authHeader())
            .then(({ }) => {
                const newData = dataSource.filter((item) => item.key !== key);
                setDataSource(newData);
                api['success']({
                    message: 'Produit',
                    description:
                        'Produit a été supprimée avec succès.',
                });
            })
            .catch(() => {

            });


    };
    const [ProductId, setProductId] = useState('');
    const [ProductImages, setProductImages] = useState([]);
    const handlePrimaryImage= (key) => {

        axios.get(process.env.REACT_APP_API_BASE_URL + 'product/' + key,
            authHeader()
        )
            .then(({ data }) => {
                const tmp_data = []
                data.message.products_images.forEach((product_image) => {
                    tmp_data.push({
                        uid: product_image.id,
                        name: 'image.png',
                        status: 'done',
                        url: product_image.image
                    }
                    )
                })
                setProductImages(tmp_data)
                setopenSetImage(true);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    const handleModify = (key) => {
        setProductId(key);
        axios.get(process.env.REACT_APP_API_BASE_URL + 'product/' + key,
            authHeader()
        )
            .then(({ data }) => {
                setOpen(true);
                form.setFieldValue('name', data.message.name)
                form.setFieldValue('under_category_id', data.message.under_category_id)
                form.setFieldValue('brand_id', data.message.brand_id)
                form.setFieldValue('serial_number', data.message.serial_number)
                form.setFieldValue('price', data.message.price)
                form.setFieldValue('description', data.message.description)

                form.setFieldValue('stock', data.message.stock)
                form.setFieldValue('reduced_price', data.message.reduced_price)
                setReduceDisabled((data.message.is_reduced === '1'))

                const tmp_data = []
                data.message.products_images.forEach((product_image) => {
                    tmp_data.push({
                        uid: product_image.id,
                        name: 'image.png',
                        status: 'done',
                        url: product_image.image}
                        )
                    })
                setFileList(tmp_data)
                const tmp_feature = []
                data.message.features.forEach((feature) => {
                    tmp_feature.push({
                        type: feature.type,
                        text: feature.text,
                    }
                    )
                })
                form.setFieldValue('features', tmp_feature )
                })
                
                
            .catch((error) => {
                console.log(error.response.data);
            });

    };

    const columns = [
        {
            title: 'Produit',
            dataIndex: 'text',
        },
        {
            title: 'Sous categorie',
            dataIndex: 'under_category',
        },
        {
            title: 'Marque',
            dataIndex: 'brand',
        },
        {
            title: 'Numero de serie',
            dataIndex: 'serial_number',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
        },
        {
            title: 'Prix',
            dataIndex: 'price',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: 150,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <div className="flex flex-row justify-around">
                        <Button onClick={() => handlePrimaryImage(record.key)} className="bg-blue-400 hover:bg-blue-300 text-white hover:text-white hover:border-blue-400" style={{ borderColor: "#60a5fa", color: 'white' }} shape="circle" icon={< FileImageOutlined />} size={2} />
                        <Button onClick={() => handleModify(record.key)} className="bg-green-500 hover:bg-green-400 text-white hover:text-white hover:border-red-400" style={{ borderColor: "#4ade80", color: 'white' }} shape="circle" icon={<EditOutlined />} size={2} />
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button type="primary" shape="circle" icon={< DeleteOutlined />} size={2} danger />
                        </Popconfirm>
                    </div>
                ) : null,
        },
    ];

    // Upload 
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    // Upload Image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    // End Upload 

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const handleCancel_ProductImageModal = () => {
        setopenSetImage(false)
    };
    const handleConfirm_ProductImageModal = (key) => {
        let image_data = new FormData();
        image_data.append('is_primary', '1');
        image_data.append("_method", "PATCH");

        axios.post(process.env.REACT_APP_API_BASE_URL + 'productimage/' + key,
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
    const handleCancel_ProductModal = () => {
        setOpen(false);
        setChangedFeature(false)
        setChangedImage(false)
    };

    const [form] = Form.useForm();

    const handleOk_ProductModal = () => {
        setConfirmLoading(true);

      
        form
            .validateFields()
            .then((values) => {
                let data = new FormData();

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
                }else{
                    data.append('is_reduced', "0");
                    data.append('reduced_price', "");
                }

                data.append("_method", "PATCH");

                axios.post(process.env.REACT_APP_API_BASE_URL + 'product/' + ProductId,
                    data
                    , config
                )
                    .then(({ }) => {
                        setOpen(false);
                        setConfirmLoading(false);
                        form.resetFields();
                     })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
        console.log(fileList);
        if(ChangedImage){
            let images_data = new FormData();
            
            console.log(fileList);
            for (var x = 0; x < fileList.length; x++) {
                images_data.append("images[]", fileList[x].originFileObj);
                if (typeof fileList[x].url !== "undefined") {
                    images_data.append("imagesUrls[]", fileList[x].url);
                }
            }

            axios.post(process.env.REACT_APP_API_BASE_URL + 'productimages/' + ProductId,
                images_data
                , config
            )
                .then(({ data }) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
        if(ChangedFeature){
            let features_data = new FormData();
            console.log(form.getFieldValue('features')); 
            features_data.append('features[]', form.getFieldValue('features'));
            
            axios.post(process.env.REACT_APP_API_BASE_URL + 'features/' + ProductId,
                {features : form.getFieldValue('features')}
                , config
            )
                .then(({data }) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
        
        api['success']({
            message: 'Produit',
            description:
                'Produit a été modifié avec succès.',
        });
        setConfirmLoading(false);
        // setChangedFeature(false)
        // setChangedImage(false)
    };
    const onFinish_ProductModal = () => {
    };
    const handleCancelUpload = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
        setChangedImage(true)
    };

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


    return (
        <div className="w-full h-full inline-block">
            {contextHolder}
            <Table
                columns={columns}
                dataSource={dataSource}
                className="inline-block"
                scroll={{
                    y: 320,
                }}

            />
            <Modal
                title="Modifier un produit"
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
                                        <MinusCircleOutlined onClick={() => { remove(name); setChangedFeature(true) }} />
                                    </Space>
                                ))}
                                <Form.Item style={{ width: "100%", marginLeft: 130 }} >
                                    <Button type="dashed" onClick={() => { add(); setChangedFeature(true)}} block icon={<PlusOutlined />}>
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
                                <Popconfirm title="Sure to select?" className="flex justify-center" onConfirm={() => handleConfirm_ProductImageModal(productimage.uid)}>
                                    <Card bodyStyle={{ padding: '5px' }} hoverable className='hover:bg-gray-50' bordered={false}>
                                        <img className="w-40 h-40"
                                            
                                            alt="example"
                                            src={productimage.url}
                                        />
                                    </Card>
                                </Popconfirm>
                            </Col>))}
                    </Row>
                </div>
            </Modal>
        </div>
    );

}
export default ProductTab;