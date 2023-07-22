import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, Table, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import authHeader from '../../services/authHeader'

import axios from 'axios'

function OrderTab() {
    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 14,
        },
    };
    const [dataSource, setDataSource] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    const columns = [
        {
            title: 'Commande',
            dataIndex: 'name',
            fixed: 'left',
        },
        {
            title: 'Quantite',
            dataIndex: 'quantity',
            width: 90,
        },
        {
            title: 'Nom',
            dataIndex: 'lastname',
        },
        {
            title: 'Prenom',
            dataIndex: 'firstname',
        },
        {
            title: 'Telephone',
            dataIndex: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Adresse',
            dataIndex: 'address',
            width:200
        },
        {
            title: 'Commentaire',
            dataIndex: 'comment',
            width: 200
        }, 
        {
            title: '',
            dataIndex: '',
            key: 'x',
            width: 50,
            fixed:'right',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <div className="flex flex-row justify-around">
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Button type="primary" shape="circle" icon={< DeleteOutlined />} size={4} danger />
                        </Popconfirm>
                    </div>
                ) : null,
        },
    ];
    const handleDelete = (key) => {
        axios
            .delete(process.env.REACT_APP_API_BASE_URL + 'order/' + key,
                authHeader())
            .then(({ }) => {
                const newData = dataSource.filter((item) => item.key !== key);
                setDataSource(newData);
                api['success']({
                    message: 'Commande',
                    description:
                        'La Commande a été supprimée avec succès.',
                });
            })
            .catch(() => {

            });
    }
    const data = [];
    const [confirmLoading, setConfirmLoading] = useState(false);
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + `order`)
            .then(res => {
                const tmp = res.data.message;

                tmp.forEach((order) => {
                    data.push({
                        key: order.id,
                        name: order.product.name,
                        lastname: order.lastname,
                        firstname : order.firstname,
                        quantity: order.quantity,
                        phone_number: order.phone_number,
                        email: order.email,
                        address: order.address,
                        comment:order.comment
                    })
                })
                setDataSource(data)

            })
    }
    useEffect(() => {
        getEvents();
    }, [])

    return (
        <div className="w-full h-full inline-block">
            {contextHolder}
            <Table
                columns={columns}
                dataSource={dataSource}
                className="inline-block"
                scroll={{
                    y: 320,
                    x:1300
                }}

            />
            
        </div>
    );
}
export default OrderTab;