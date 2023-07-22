import { Button, Modal, Form, Input, Upload, notification, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import UnderCatgoryTab from '../../component/Admin/UnderCatgoryTab'
import axios from 'axios'

function UnderCategory() {
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
    const [api, contextHolder] = notification.useNotification();
    const [categories, setCategories] = useState([]);
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + 'category')
            .then(res => {
                const tmp = res.data;
                console.log(tmp);
                setCategories(tmp.Categories)
            })
    }
    useEffect(() => {
        getEvents();
    }, [])

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
    const showUnderCategoryModal = () => {
        setOpen(true);
    };
    const handleOk_UnderCategoryModal = () => {
        // setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        if (fileList.length > 0) {
            form
                .validateFields()
                .then((values) => {

                    let data = new FormData();
                    data.append("image", fileList[0].originFileObj);
                    data.append('name', values.name);
                    data.append('category_id', values.category_id);
                    data.append('description', values.description);

                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

                    axios.post(process.env.REACT_APP_API_BASE_URL + 'undercategory',
                        data
                        , config
                    )
                        .then(({ data }) => {
                            console.log(data);
                            setOpen(false);
                            setConfirmLoading(false);
                            setFileList([])
                            form.resetFields();
                            api['success']({
                                message: 'Sous catégorie',
                                description:
                                    'Sous catégorie créée avec succès.',
                            });
                        })
                        .catch(() => {
                            api['error']({
                                message: "Sous catégorie",
                                description: "Erreur d'ajout de la sous catégorie",
                            });
                        });
                    setConfirmLoading(false);
                })
                .catch((info) => {
                    info.errorFields.forEach(element => {
                        api['error']({
                            message: "Erreur de saisie",
                            description: element.errors[0],
                        });
                    });
                });

            setConfirmLoading(false);

        } else {
            api['error']({
                message: 'L\'image est obligatoire',
                description:
                    'Veuillez ajouter une image pour pouvoir enregistrer.',
            });
            setConfirmLoading(false);
        }
    };


    const handleCancel_UnderCategoryModal = () => {
        setOpen(false);
        setFileList([])
        form.resetFields();

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
                    <Button type="primary" className='bg-blue-300 text-base mr-4 ' onClick={showUnderCategoryModal}>
                        Ajouter une sous categorie
                    </Button>
                </div>
                <div className="my-4 inline-block">
                    <UnderCatgoryTab />
                </div>
            </div >
            <Modal
                title="Ajouter une sous categorie"
                open={open}
                onOk={handleOk_UnderCategoryModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancel_UnderCategoryModal}
                footer={[
                    <Button key="back" onClick={handleCancel_UnderCategoryModal}>
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
                        beforeUpload={file => {
                            getBase64(file)
                            // Prevent upload
                            return false;
                        }}

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
        </>
    )
}
export default UnderCategory;