import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

import {
    AppstoreOutlined,
    UnorderedListOutlined,
    CopyrightOutlined,
    InboxOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
    DashboardOutlined,
    LogoutOutlined
} from '@ant-design/icons';

function SideBar(){
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const onClick = (info) => {
        console.log(info);
        if(info.key === 'button'){
            toggleCollapsed()
        }
        if (info.key === 'dash') {
            navigate('/dashboard/Main', { replace: true });
        }
        if (info.key === 'brand') {
            navigate('/dashboard/brand', { replace: true });
        }
        if (info.key === 'cat') {
            navigate('/dashboard/category', { replace: true });
        }
        if (info.key === 'under_cat') {
            navigate('/dashboard/undercategory', { replace: true });
        }
        if (info.key === 'prod') {
            navigate('/dashboard/product', { replace: true });
        }
        if (info.key === 'pub') {
            navigate('/dashboard/publicity', { replace: true });
        }
        if (info.key === 'logout') {
            const authorization = JSON.parse(localStorage.getItem('authorization'));

            if (authorization && authorization.token) {
                localStorage.clear();
                navigate('/', { replace: true });
            } 
        }
        
    };

    const items = [
        getItem('', 'button', collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />),
        getItem('Tableau de bord', 'dash', <DashboardOutlined />),
        getItem('Marque', 'brand', <CopyrightOutlined />),
        getItem('Catégorie', 'cat', <AppstoreOutlined />),
        getItem('Sous Catégorie', 'under_cat', <UnorderedListOutlined />),
        getItem('Produit', 'prod', <InboxOutlined />),
        getItem('Publicite', 'pub', <NotificationOutlined />),   
    ];
    const logoutItem = getItem('Logout', 'logout', <LogoutOutlined />);
    return (
        <>
        <aside
                className={'max-h-screen min-h-screen sticky top-0 left-0 overflow-y-auto sm:block hidden ' + (collapsed ? 'w-20' : 'w-60')}
        >
            <Menu
                onClick={onClick}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                style={{
                    margin: '0px',
                    width: '100%',
                    }}
                className='max-h-screen min-h-screen bg-slate-400 text-xs text-black sm:text-base sm:text-white'
                >
                
                {items.map(props => (
                    
                        <Menu.Item key={props.key}{...props}>{props.label}</Menu.Item>
                    
                ))}
                
                
                <Menu.Item {...logoutItem} className='text-red-500 ' style={{
                    position: 'absolute',
                    bottom: 0,
                }}>
                    Logout
                </Menu.Item>
                
            </Menu>
            
        </aside>
        <aside
                className={'max-h-screen min-h-screen sticky top-0 left-0 overflow-y-auto w-20 sm:hidden block'}
            >
                <Menu
                    onClick={onClick}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={true}
                    style={{
                        margin: '0px',
                        width: '100%',
                    }}
                    className='max-h-screen min-h-screen bg-slate-400 text-xs text-white'
                >

                    {items.map(props => (

                        <Menu.Item key={props.key}{...props}>{props.label}</Menu.Item>

                    ))}


                    <Menu.Item {...logoutItem} className='text-red-500 ' style={{
                        position: 'absolute',
                        bottom: 0,
                    }}>
                        Logout
                    </Menu.Item>

                </Menu>

            </aside>
        </>
        
    );
};
export default SideBar;