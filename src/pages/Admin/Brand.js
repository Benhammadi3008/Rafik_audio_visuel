import { Button, Modal, Form, Input, notification } from 'antd';
import { useState } from 'react';
import axios from 'axios'
import BrandTab from '../../component/Admin/BrandTab';


function Brand() {
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
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    const handleOk_BrandModal = () => {
        setConfirmLoading(true);
            form
                .validateFields()
                .then((values) => {

                    let data = new FormData();
                    data.append('name', values.name);

                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

                    axios.post(process.env.REACT_APP_API_BASE_URL + 'brand',
                        data
                        , config
                    )
                        .then(({ data }) => {
                            console.log(data);
                            setOpen(false);
                            setConfirmLoading(false);
                            api['success']({
                                message: 'Marque',
                                description:
                                    'Marque créée avec succès.',
                            });
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
    };
    const showBrandModal = () => {
        setOpen(true);
    };

    const handleCancel_BrandModal = () => {
        setOpen(false);
    };
    const onFinish_BrandModal = () => {
    };
    return (
        <>
            {contextHolder}
            <div class="h-full w-full flex flex-col my-4 " >

                <div className="flex justify-end">
                    <Button type="primary" className='bg-blue-300 text-base mr-4 ' onClick={showBrandModal} >
                        Ajouter une marque
                    </Button>
                </div>
                <div className="my-4 inline-block">
                    <BrandTab />
                </div>
            </div >
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
            </Modal>
        </>
    )
}
export default Brand;