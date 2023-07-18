import { Button, Modal, Form, Input, Upload, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CatgoryTab from '../../component/Admin/CatgoryTab'
import axios from 'axios'

function Category() {
    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 14,
        },
    };
    const [api, contextHolder] = notification.useNotification();

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

    const [form] = Form.useForm();
    const showCategoryModal = () => {
        setOpen(true);
    };
    const handleOk_CategoryModal = () => {
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        if (fileList.length > 0) {
            form
                .validateFields()
                .then((values) => {

                    let data = new FormData();
                    data.append("image", fileList[0].originFileObj);
                    data.append('name', values.name);

                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

                    axios.post(process.env.REACT_APP_API_BASE_URL + 'category',
                        data
                        , config
                    )
                        .then(({ data }) => {
                            console.log(data);
                            setOpen(false);
                            setConfirmLoading(false);
                            api['success']({
                                message: 'Catégorie',
                                description:
                                    'Catégorie créée avec succès.',
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

        } else {
            api['error']({
                message: 'L\'image est obligatoire',
                description:
                    'Veuillez ajouter une image pour pouvoir enregistrer.',
            });
            console.log("Hello");
            // <Alert message="Error" type="error" showIcon />
            setConfirmLoading(false);
        }
    };


    const handleCancel_CategoryModal = () => {
        setOpen(false);
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
    return (
        <>
        {contextHolder}
       <div class="h-full w-full flex flex-col my-4 " >

            <div className="flex justify-end">
                    <Button type="primary" className='bg-blue-300 text-base mr-4 ' onClick={showCategoryModal}>
                        Ajouter une categorie
                    </Button>
            </div>
            <div className="my-4 inline-block">
                    <CatgoryTab />
            </div>
        </div >
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
        </>
    )
}
export default Category;