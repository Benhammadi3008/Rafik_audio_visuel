import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, Popconfirm, Table, notification, Select } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import authHeader from '../../services/authHeader'

import axios from 'axios'

function UnderCatgoryTab() {
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
    const [categories, setCategories] = useState([]);
    
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + `undercategory`)
            .then(res => {
                const tmp = res.data.UnderCategories;
                tmp.forEach((undercategory) => {
                    data.push({
                        key: undercategory.id,
                        name: undercategory.name,
                        category: undercategory.category.name,
                        description: undercategory.description
                    })
                })
                setDataSource(data)

            })

        axios.get(process.env.REACT_APP_API_BASE_URL + 'category')
            .then(res => {
                const tmp = res.data;
                setCategories(tmp.Categories)
            })
    }
    useEffect(() => {
        getEvents();
    }, [])


    const handleDelete = (key) => {

        axios
            .delete(process.env.REACT_APP_API_BASE_URL + 'undercategory/' + key,
                authHeader())
            .then(({ }) => {
                const newData = dataSource.filter((item) => item.key !== key);
                setDataSource(newData);
                api['success']({
                    message: 'Sous catégorie',
                    description:
                        'Sous catégorie a été supprimée avec succès.',
                });
            })
            .catch(() => {

            });


    };
    const [UnderCategoryId, setUnderCategoryId] = useState('');

    const handleModify = (key) => {
        setUnderCategoryId(key);
        axios.get(process.env.REACT_APP_API_BASE_URL + 'undercategory/' + key,
            authHeader()
        )
            .then(({ data }) => {
                setOpen(true);
                form.setFieldValue('name', data.undercategory.name)
                form.setFieldValue('description', data.undercategory.description)
                form.setFieldValue('category_id', data.undercategory.category_id)

                console.log(data);
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data.undercategory.image,
                    }])
            })
            .catch((error) => {
                console.log(error.response.data);
            });

    };

    const columns = [
        {
            title: 'Sous catégorie',
            dataIndex: 'name',
            width: 170
        },
        {
            title: 'Catégorie',
            dataIndex: 'category',
            width: 170
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: 150,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <div className="flex flex-row justify-around">
                        <Button onClick={() => handleModify(record.key)} className="bg-green-500 hover:bg-green-400 text-white hover:text-white hover:border-red-400" style={{ borderColor: "#4ade80", color: 'white' }} shape="round" icon={<EditOutlined />} size={4} />
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button type="primary" shape="round" icon={< DeleteOutlined />} size={4} danger />
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

    const handleOk_UnderCategoryModal = () => {
        setConfirmLoading(true);
        form
            .validateFields()
            .then((values) => {

                let data = new FormData();
                data.append('name', values.name);
                data.append('category_id', values.category_id);
                data.append('description', values.description);
                data.append("_method", "PATCH");

                axios.post(process.env.REACT_APP_API_BASE_URL + 'undercategory/' + UnderCategoryId,
                    data
                    , authHeader()
                )
                    .then(({ }) => {
                        setConfirmLoading(false);
                        setOpen(false);
                        dataSource.forEach(function (obj) {
                            if (obj.key === UnderCategoryId) {
                                obj.name = values.name;
                               
                                obj.description = values.description;
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

            axios.post(process.env.REACT_APP_API_BASE_URL + 'imageofundercategory/' + UnderCategoryId,
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
            message: 'Sous catégorie',
            description:
                'Sous catégorie a été modifié avec succès.',
        });
        setConfirmLoading(false);
    };
    const onFinish_UnderCategoryModal = () => {
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
                title="Ajouter une categorie"
                open={open}
                onOk={handleOk_UnderCategoryModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancel_CategoryModal}
                footer={[
                    <Button key="back" onClick={handleCancel_CategoryModal}>
                        Return
                    </Button>,
                    <Button key="submit" className="bg-blue-300" type="primary" loading={confirmLoading} onClick={handleOk_UnderCategoryModal}>
                        Submit
                    </Button>,
                ]}
            >

                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish_UnderCategoryModal}
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
                                message: 'Veuillez saisir le nom',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="category_id"
                        label="Catégorie"
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
                            {categories.map((categorie) => <Option value={categorie.id} >{categorie.name}</Option>)}

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir la description',
                            },
                        ]}>
                        <TextArea rows={4} />
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
                    onFinish={onFinish_UnderCategoryModal}
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
export default UnderCatgoryTab;