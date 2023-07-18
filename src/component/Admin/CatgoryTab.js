import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, Popconfirm, Table, notification } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import authHeader from '../../services/authHeader'

import axios from 'axios'

function CatgoryTab() {
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
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + `category`)
            .then(res => {
                const tmp = res.data.Categories;
                tmp.forEach((category) =>{
                    data.push({
                        key: category.id,
                        name: category.name,
                    })
                })
                setDataSource(data)
                
            })
        }
    useEffect(() => {
        getEvents();
    }, [])
    
    
    const handleDelete = (key) => {
      
        axios
            .delete(process.env.REACT_APP_API_BASE_URL + 'category/'+key ,
                authHeader() )
            .then(({}) => {
                const newData = dataSource.filter((item) => item.key !== key);
                setDataSource(newData);
                api['success']({
                    message: 'Catégorie',
                    description:
                        'Catégorie a été supprimée avec succès.',
                });
            })
            .catch(() => {
                
            });

        
    };
    const [CategoryId, setCategoryId] = useState('');
    const handleModify = (key) => {
        setCategoryId(key);
        axios.get(process.env.REACT_APP_API_BASE_URL + 'category/'+key,
            authHeader()
        )
            .then(({ data }) => {
                setOpen(true);
                form.setFieldValue('name', data.name)
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data.image,
                    }])
            })
            .catch((error) => {
                console.log(error.response.data);
        });
       
    };
    
    const columns = [
        {
            title: 'Catégorie',
            dataIndex: 'name',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: 150,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <div className="flex flex-row justify-around">
                        <Button onClick={() => handleModify(record.key)} className="bg-green-500 hover:bg-green-400 text-white hover:text-white hover:border-red-400" style={{ borderColor: "#4ade80", color:'white'}} shape="round" icon={ <EditOutlined /> } size={4} />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button type="primary" shape="round" icon={< DeleteOutlined  />} size={4} danger />
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

    const handleCancel_CategoryModal = () => {
        setOpen(false);
    };

    const [form] = Form.useForm();
    
    const handleOk_CategoryModal = () => {
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
            form
                .validateFields()
                .then((values) => {

                    let data = new FormData();
                    data.append('name', values.name);
                    data.append("_method", "PATCH");

                    axios.post(process.env.REACT_APP_API_BASE_URL + 'category/' + CategoryId,
                        data
                        , authHeader()
                    )
                        .then(({ }) => {
                            setConfirmLoading(false);
                            setOpen(false);
                            dataSource.forEach(function (obj) {
                                if (obj.key === CategoryId) {
                                    obj.name = values.name;
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
                if (ChangedImage){
                    let dataImage = new FormData();
                    dataImage.append("image", fileList[0].originFileObj);

                    axios.post(process.env.REACT_APP_API_BASE_URL + 'imageofcategory/' + CategoryId,
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
            message: 'Catégorie',
            description:
                'Catégorie a été modifié avec succès.',
        });
            setConfirmLoading(false);
    };
    const onFinish_CategoryModal = () => {
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
    const handleChange = ({ fileList: newFileList }) => {setFileList(newFileList)
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


    return(
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
                title="Ajouter une categorie"
                open={open}
                onOk={handleOk_CategoryModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancel_CategoryModal}
                footer={[
                    <Button key="back" onClick={handleCancel_CategoryModal}>
                        Return
                    </Button>,
                    <Button key="submit" className="bg-blue-300" type="primary" loading={confirmLoading} onClick={handleOk_CategoryModal}>
                        Submit
                    </Button>,
                ]}
            >

                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish_CategoryModal}
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
                            },
                        ]}
                    >
                        <Input />
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
                    onFinish={onFinish_CategoryModal}
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
export default CatgoryTab;