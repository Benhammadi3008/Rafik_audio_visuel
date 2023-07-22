import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Upload, Popconfirm, Table, notification } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import authHeader from '../../services/authHeader'

import axios from 'axios'

function BrandTab() {
    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 14,
        },
    };
    const [api, contextHolder] = notification.useNotification();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [BrandId, setBrandId] = useState('');
    const data = [];
    const [confirmLoading, setConfirmLoading] = useState(false);
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + `brand`)
            .then(res => {
                const tmp = res.data.Brands;

                tmp.forEach((brand) => {
                    data.push({
                        key: brand.id,
                        name: brand.name,
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
            .delete(process.env.REACT_APP_API_BASE_URL + 'brand/' + key,
                authHeader())
            .then(({ }) => {
                const newData = dataSource.filter((item) => item.key !== key);
                setDataSource(newData);
                api['success']({
                    message: 'Marque',
                    description:
                        'Marque a été supprimée avec succès.',
                });
            })
            .catch(() => {

            });


    };
    const handleModify = (key) => {
        setBrandId(key);
        axios.get(process.env.REACT_APP_API_BASE_URL + 'brand/' + key,
            authHeader()
        )
            .then(({ data }) => {
                console.log(data);
                setOpen(true);
                form.setFieldValue('name', data.message.name)
            })
            .catch((error) => {
                console.log(error.response.data);
            });

    };

    const columns = [
        {
            title: 'Marque',
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
                        <Button onClick={() => handleModify(record.key)} className="bg-green-500 hover:bg-green-400 text-white hover:text-white hover:border-red-400" style={{ borderColor: "#4ade80", color: 'white' }} shape="circle" icon={<EditOutlined />} size={4} />
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button type="primary" shape="circle" icon={< DeleteOutlined />} size={4} danger />
                        </Popconfirm>
                    </div>
                ) : null,
        },
    ];
    const handleCancel_BrandModal = () => {
        setOpen(false);
    };
    const handleOk_BrandModal = () => {
        setConfirmLoading(true);
        form
            .validateFields()
            .then((values) => {

                let data = new FormData();
                data.append('name', values.name);
                data.append("_method", "PATCH");

                axios.post(process.env.REACT_APP_API_BASE_URL + 'brand/' + BrandId,
                    data
                    , authHeader()
                )
                    .then(({ }) => {
                        setConfirmLoading(false);
                        setOpen(false);
                        dataSource.forEach(function (obj) {
                            if (obj.key === BrandId) {
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
        
        api['success']({
            message: 'Marque',
            description:
                'Marque a été modifié avec succès.',
        });
        setConfirmLoading(false);
    };
    const onFinish_BrandModal = () => {
    };

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
                onOk={handleOk_BrandModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancel_BrandModal}
                footer={[
                    <Button key="back" onClick={handleCancel_BrandModal}>
                        Return
                    </Button>,
                    <Button key="submit" className="bg-blue-300" type="primary" loading={confirmLoading} onClick={handleOk_BrandModal}>
                        Submit
                    </Button>,
                ]}
            >

                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish_BrandModal}
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

                </Form>
                <Form

                    name="dynamic_form_nest_item"
                    onFinish={onFinish_BrandModal}
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
export default BrandTab;