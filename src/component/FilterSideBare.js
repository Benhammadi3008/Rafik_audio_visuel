import React, { useState } from 'react';
import { Button, Drawer, Select, Space } from 'antd';
import { FaBars  } from 'react-icons/fa'

const FilterSideBare = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  
  const handleChange = (value) => {
    console.log({value});}
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
  
          <Button key="back"  className='w-8/12 flex  justify-center ml-auto mr-auto text-xl h-auto ' onClick={onClose}
          >
             Filter
          </Button>
      ]}
      > <div className='pl-auto pr-auto w-full  h-full text-center space-y-3' >
        <p className='font-bold '>Categories : </p>
        <Select
      defaultValue="C1"
      onChange={handleChange}
      style={{
        width: 220,
        marginBottom: "30px"
      }}
      options={[
        {
          value: 'C1',
          label: 'C1',
        },
        {
          value: 'C2',
          label: 'C2',
        }
      ]}
     
    />
       <p className='font-bold'>Sous-Categorie : </p>
        <Select
      defaultValue="SC1"
      style={{
        width: 220,
        marginBottom: "30px"
      }}
      onChange={handleChange}
      options={[
        {
          value: 'SC1',
          label: 'SC1',
        },
        {
          value: 'SC2',
          label: 'SC2',
        }
      ]}
    />
    <p className='font-bold'>Marque : </p>
        <Select
      defaultValue="M1"
      style={{
        width: 220,
        marginBottom: "30px"
      }}
      onChange={handleChange}
      options={[
        {
          value: 'M1',
          label: 'M1',
        },
        {
          value: 'M2',
          label: 'M2',
        }
      ]}
    />
    <p className='font-bold'>Prix : </p>
        <Select
              onChange={handleChange}

      style={{
        width: 220,
        marginBottom: "30px"
      }}
            options={[
        
        {
          value: 'Plus Petit',
          label: 'Plus Petit',
        },
        {
          value: 'Plus Grand',
          label: 'Plus Grand',
        }
      ]}
    />
    </div>
      </Drawer>
    </>
  );
};
export default FilterSideBare;