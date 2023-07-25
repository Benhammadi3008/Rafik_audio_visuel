import React, { useState, useEffect } from 'react';
import { Button, Drawer, Select, Space , Form } from 'antd';
import { FaBars  } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const FilterSideBare = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [undercategories, setUnderCategories] = useState([]);
  const [brands, setbrands] = useState([]);

  function getEvents() {
    axios.get(process.env.REACT_APP_API_BASE_URL + `category`)
      .then(res => {
        const tmp = res.data.Categories;
        setCategories(tmp)
      })
    axios.get(process.env.REACT_APP_API_BASE_URL + `undercategory`)
      .then(res => {
        const tmp = res.data.UnderCategories;
        setUnderCategories(tmp)
      })
    axios.get(process.env.REACT_APP_API_BASE_URL + `brand`)
      .then(res => {
        const tmp = res.data.Brands;
        setbrands(tmp)
      })
  }

  const filter = () => {
    let query = ""

    form
      .validateFields()
      .then((values) => {
          if (typeof values.cat === "undefined")
          { query += " %2F" } else {query += values.cat+"%2F"}
          if (typeof values.under_cat === "undefined") 
          { query += " %2F" } else { query += values.under_cat + "%2F"}
        if (typeof values.brand === "undefined") 
          { query += " %2F" } else {query += values.brand + "%2F"}
        if (typeof values.price === "undefined") 
          { query += " %2F" } else { query += values.price + "%2F" }
        navigate('/Products/filter/' + query, { replace: true });
            
      })
  }
  useEffect(() => {
    getEvents();
  }, [])

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  
  const handleChangeCat = (value) => {
    form.setFieldValue('under_cat',)
    if(typeof value === 'undefined'){
      axios.get(process.env.REACT_APP_API_BASE_URL + `undercategory`)
        .then(res => {
          const tmp = res.data.UnderCategories;
          setUnderCategories(tmp)
        })
    }else{
      axios.get(process.env.REACT_APP_API_BASE_URL + 'undercategoryofCat/' + value)
        .then(res => {
          const tmp_2 = res.data;
          setUnderCategories(tmp_2.UnderCategories)
        })
    }    
  }
  return (
    <>
      <Space>
        
        <Button type="primary" onClick={showDrawer} className='bg-inherit  w-auto h-auto hover:bg-red-600'>
          <FaBars className='w-7 h-7' />
        </Button>
      </Space>
      <Drawer
        title="Filtre Par :"
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={open}
        style={{backgroundColor:"rgb(241 245 249)" , color:"rgb(100 116 139)" }}
        footer={[
  
          <Button key="back" className='w-8/12 flex  justify-center ml-auto mr-auto text-xl h-auto ' onClick={filter}
          >
             Filter
          </Button>
      ]}
      >
        <Form form={form} >
         <div className='pl-auto pr-auto w-full  h-full text-center space-y-3' >
        <p className='font-bold '>Categories : </p>
            <Form.Item
              name="cat"
              rules={[
                {
                  required: false
                },
              ]}
            >
              
          <Select
            allowClear
                onChange={handleChangeCat}
            style={{
              width: 220,
              marginBottom: "30px"
            }}
            
          >
            {categories.map((categorie) => <Option value={categorie.id} > {categorie.name} </Option>)}
          </Select>
            </Form.Item>
       <p className='font-bold'>Sous-Categorie : </p>
          <Form.Item
              name="under_cat"
              rules={[
                {
                  required: false,
                },
              ]}
            >
        <Select
            allowClear
            style={{
              width: 220,
              marginBottom: "30px"
            }}
              
        >
            {undercategories.map((categorie) => <Option value={categorie.id} > {categorie.name} </Option>)}
    </Select>
    </Form.Item>
    <p className='font-bold'>Marque : </p>
            <Form.Item
              name="brand"
              rules={[
                {
                  required: false
                },
              ]}
            >
          <Select
            allowClear
            style={{
              width: 220,
              marginBottom: "30px"
            }}
           
          >
            {brands.map((categorie) => <Option value={categorie.id} > {categorie.name} </Option>)}
          </Select>
          </Form.Item>
    <p className='font-bold'>Prix : </p>
            <Form.Item
              name="price"
              rules={[
                {
                  required: false
                },
              ]}
            >
        <Select
              
            allowClear
      style={{
        width: 220,
        marginBottom: "30px"
        
      }}
            options={[
        
        {
          value: 'asc',
          label: 'Plus Petit',
        },
        {
          value: 'desc',
          label: 'Plus Grand',
        }
      ]}
    />
    </Form.Item>
    </div>
        </Form>
      </Drawer>
    </>
  );
};
export default FilterSideBare;