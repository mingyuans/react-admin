/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { useEffect, useState } from 'react';
import avater from '../style/imgs/b1.jpg';
import { Badge, Layout, Menu } from 'antd';
import { gitOauthInfo, gitOauthToken } from '../service';
import { parseQuery } from '../utils';
import { useHistory } from 'react-router-dom';
import { useAlita } from 'redux-alita';
import umbrella from 'umbrella-storage';
import { useSwitch } from '../utils/hooks';
import { NotificationOutlined } from '@ant-design/icons';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

type HeaderCustomProps = {
    toggle: () => void;
    collapsed: boolean;
    user: any;
    responsive?: any;
    path?: string;
};

const HeaderCustom = (props: HeaderCustomProps) => {
    const [user, setUser] = useState<any>();
    const [responsive] = useAlita('responsive', { light: true });
    const [visible, turn] = useSwitch();
    const history = useHistory();

    useEffect(() => {
        const query = parseQuery();
        let storageUser = umbrella.getLocalStorage('user');

        if (!storageUser && query.code) {
            gitOauthToken(query.code as string).then((res: any) => {
                gitOauthInfo(res.access_token).then((info: any) => {
                    setUser({
                        user: info,
                    });
                    umbrella.setLocalStorage('user', info);
                });
            });
        } else {
            setUser({
                user: storageUser,
            });
        }
    }, []);

    const menuClick = (e: any) => {
        e.key === 'logout' && logout();
    };
    const logout = () => {
        umbrella.removeLocalStorage('user');
        history.push('/login');
    };
    return (
        <Header className="custom-theme header">
            {/*{responsive?.isMobile ? (*/}
            {/*    <Popover*/}
            {/*        content={<SiderCustom popoverHide={turn.turnOff} />}*/}
            {/*        trigger="click"*/}
            {/*        placement="bottomLeft"*/}
            {/*        visible={visible}*/}
            {/*        onVisibleChange={(visible) => (visible ? turn.turnOn() : turn.turnOff())}*/}
            {/*    >*/}
            {/*        <BarsOutlined className="header__trigger custom-trigger" />*/}
            {/*    </Popover>*/}
            {/*) : props.collapsed ? (*/}
            {/*    <MenuUnfoldOutlined*/}
            {/*        className="header__trigger custom-trigger"*/}
            {/*        onClick={props.toggle}*/}
            {/*    />*/}
            {/*) : (*/}
            {/*    <MenuFoldOutlined*/}
            {/*        className="header__trigger custom-trigger"*/}
            {/*        onClick={props.toggle}*/}
            {/*    />*/}
            {/*)}*/}
            <Menu mode="horizontal" style={{ float: 'right' }} onClick={menuClick}>
                <Menu.Item key="1">
                    <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
                        <NotificationOutlined />
                    </Badge>
                </Menu.Item>
                <Menu.Item key="logout">
                    <span onClick={logout}>退出登录</span>
                </Menu.Item>
                <SubMenu
                    title={
                        <span className="avatar">
                            <img src={avater} alt="头像" />
                            <i className="on bottom b-white" />
                        </span>
                    }
                >
                    <MenuItemGroup title="用户中心">
                        <Menu.Item key="setting:1">你好 - {user?.userName}</Menu.Item>
                        <Menu.Item key="setting:2">个人信息</Menu.Item>
                        <Menu.Item key="logout">
                            <span onClick={logout}>退出登录</span>
                        </Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="设置中心">
                        <Menu.Item key="setting:3">个人设置</Menu.Item>
                        <Menu.Item key="setting:4">系统设置</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        </Header>
    );
};

export default HeaderCustom;
