import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, Popconfirm, Table, notification, Select, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import authHeader from '../../services/authHeader'

import axios from 'axios'

function PublicityTab() {
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
    const [dataSource, setDataSource] = useState([]);
    const data = [];
    const [products, setProducts] = useState([]);
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + `publicities`)
            .then(res => {
                const tmp = res.data.message;
                tmp.forEach((publicity) => {
                    data.push({
                        key: publicity.id,
                        text: publicity.text,
                        product: publicity.product.name,
                        is_actif: (publicity.is_actif === '1') ? 'Oui' : 'Non',
                    })
                })
                setDataSource(data)

            })

        axios.get(process.env.REACT_APP_API_BASE_URL + 'product')
            .then(res => {
                const tmp = res.data;
                setProducts(tmp.Products)
            })
    }
    useEffect(() => {
        getEvents();
    }, [])


    const handleDelete = (key) => {

        axios
            .delete(process.env.REACT_APP_API_BASE_URL + 'publicity/' + key,
                authHeader())
            .then(({ }) => {
                const newData = dataSource.filter((item) => item.key !== key);
                setDataSource(newData);
                api['success']({
                    message: 'Publicity',
                    description:
                        'Publicity a été supprimée avec succès.',
                });
            })
            .catch(() => {

            });


    };
    const [PublicityId, setPublicityId] = useState('');

    const handleModify = (key) => {
        setPublicityId(key);
        axios.get(process.env.REACT_APP_API_BASE_URL + 'publicity/' + key,
            authHeader()
        )
            .then(({ data }) => {
                setOpen(true);
                form.setFieldValue('text', data.message.text)
                form.setFieldValue('is_actif', (data.message.is_actif=== '1'))
                form.setFieldValue('product_id', data.message.product_id)

                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data.message.image,
                    }])
            })
            .catch((error) => {
                console.log(error.response.data);
            });

    };

    const columns = [
        {
            title: 'Publicity',
            dataIndex: 'text',
        },
        {
            title: 'Produit',
            dataIndex: 'product',
        },
        {
            title: 'Affichage',
            dataIndex: 'is_actif',
            width: 100
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: 150,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <div className="flex flex-row justify-around">
                        <Button onClick={() => handleModify(record.key)} className="bg-green-500 hover:bg-green-400 text-white hover:text-white hover:border-red-400" style={{ borderColor: "#4ade80", color: 'white' }} shape="circle" icon={<EditOutlined />} size={4} />
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button type="primary" shape="circle" icon={< DeleteOutlined />} size={4} danger />
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


    const handleCancel_PublicityModal = () => {
        setOpen(false);
    };

    const [form] = Form.useForm();

    const handleOk_PublicityModal = () => {
        setConfirmLoading(true);
        form
            .validateFields()
            .then((values) => {

                let data = new FormData();
                
                data.append('text', values.text);
                data.append('product_id', values.product_id);
                values.is_actif ? data.append('is_actif', '1') : data.append('is_actif', '0');

                data.append("_method", "PATCH");

                axios.post(process.env.REACT_APP_API_BASE_URL + 'publicity/' + PublicityId,
                    data
                    , authHeader()
                )
                    .then(({}) => {
                        setConfirmLoading(false);
                        setOpen(false);
                        dataSource.forEach(function (obj) {
                            if (obj.key === PublicityId) {
                                obj.text = values.text;
                                obj.is_actif = (values.is_actif ? 'Oui' : 'Non')
                            }
                        });

                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
                setConfirmLoading(false);
            })
            .catch((info) => {

            });
        if (ChangedImage) {
            let dataImage = new FormData();
            dataImage.append("image", fileList[0].originFileObj);

            axios.post(process.env.REACT_APP_API_BASE_URL + 'imageofpublicity/' + PublicityId,
                dataImage
                , authHeader()
            )
                .then(({ }) => {
                    setConfirmLoading(false);
                    setOpen(false);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
        api['success']({
            message: 'Publicite',
            description:
                'Publicite a été modifié avec succès.',
        });
        setConfirmLoading(false);
    };
    const onFinish_PublicityModal = () => {
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
                title="Ajouter une publicite"
                open={open}
                onOk={handleOk_PublicityModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancel_PublicityModal}
                footer={[
                    <Button key="back" onClick={handleCancel_PublicityModal}>
                        Return
                    </Button>,
                    <Button key="submit" className="bg-blue-300" type="primary" loading={confirmLoading} onClick={handleOk_PublicityModal}>
                        Submit
                    </Button>,
                ]}
            >

                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish_PublicityModal}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        name="product_id"
                        label="Produit"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir la catégorie',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Choisissez une catégorie"
                            allowClear
                        >
                            {products.map((product) => <Option value={product.id} > {product.name} <div className="text-xs text-blue-300">{product.under_category.name}</div></Option>)}

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Text"
                        name="text"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir la description',
                            },
                        ]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="is_actif"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 7,
                            span: 16,
                        }}
                    >
                        <Checkbox>Afficher la publication</Checkbox>
                    </Form.Item>



                    <Upload
                        multiple={true}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}

                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelUpload}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </Form>
                <Form

                    name="dynamic_form_nest_item"
                    onFinish={onFinish_PublicityModal}
                    style={{
                        maxWidth: 600,
                    }}
                    autoComplete="off"
                >

                </Form>
            </Modal>

        </div>
    );

}
export default PublicityTab;