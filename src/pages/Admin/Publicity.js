import { Button, Modal, Form, Input, Upload, notification, Select, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import PublicityTab from '../../component/Admin/PublicityTab'
import axios from 'axios'

function Publicity() {
    const { Option } = Select;
    const { TextArea } = Input;
    const layout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const [api, contextHolder] = notification.useNotification();
    const [products, setProducts] = useState([]);
    function getEvents() {
        axios.get(process.env.REACT_APP_API_BASE_URL + 'product')
            .then(res => {
                const tmp = res.data;
                setProducts(tmp.Products)
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


    /* Hellooo */

    const showPublicityModal = () => {
        setOpen(true);
    };
    const handleOk_PublicityModal = () => {
        setConfirmLoading(true);
        if (fileList.length > 0) {
            form
                .validateFields()
                .then((values) => {

                    let data = new FormData();
                    data.append("image", fileList[0].originFileObj);
                    data.append('text', values.text);
                    data.append('product_id', values.product_id);
                    values.is_actif ? data.append('is_actif','1') : data.append('is_actif','0')
                    
                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

                    axios.post(process.env.REACT_APP_API_BASE_URL + 'publicity',
                        data
                        , config
                    )
                        .then(({ data }) => {
                            setOpen(false);
                            setConfirmLoading(false);
                            setFileList([])
                            form.resetFields();
                            api['success']({
                                message: 'Publicité',
                                description:
                                    'Publicité créée avec succès.',
                            });
                        })
                        .catch(() => {
                            api['error']({
                                message: "Publicité",
                                description: "Erreur d'ajout de la publicité",
                            });
                        });
                    setConfirmLoading(false);
                })
                .catch((info) => {
                    console.log(info);
                    // info.errorFields.forEach(element => {
                    //     api['error']({
                    //         message: "Erreur de saisie",
                    //         description: element.errors[0],
                    //     });
                    // });
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


    const handleCancel_PublicityModal = () => {
        setOpen(false);
        setFileList([])
        form.resetFields();

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
                    <Button type="primary" className='bg-blue-300 text-base mr-4 ' onClick={showPublicityModal}>
                        Ajouter une publicité
                    </Button>
                </div>
                <div className="my-4 inline-block">
                    <PublicityTab />
                </div>
            </div >
            <Modal
                title="Ajouter une publicité"
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
                    initialValues={{
                        is_actif: true,
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
        </>
    )
}
export default Publicity;