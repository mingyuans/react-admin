// @flow
import * as React from 'react';
import { useEffect, useRef } from 'react';
import './WechatStatus.css';
import axios from 'axios';
import { Button, Space } from 'antd';

type Props = {};

type QRCodeProps = {
    onWechatLogged: () => void;
};

const WeChatQRCode = (props: QRCodeProps) => {
    const [qrcode, setQrcode] = React.useState(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAAHCAQAAAABUY/ToAAACiUlEQVR4nO3aW26sMAyAYUssIEti67MkFjCSS31LSNL2qI89fx5mBshHXyzbmIr+cr0EiUQikUgk8g9JiXXcZ9p9eF73L73uM6c+Dm2dSOQq7UCvlHYPv2VTP+dX+2YkcpIWafc1C68IPDt0+a6rBxL5g7Rfcm+NmPNdgkT+q+z7M/o+72EJDYn8VtpXNkwWbp63IqEd+nP9RP7fMtahmcZ2H7kLiVzlsKIbjw1+N7FOatqHRE7S+m2JitebKL8w7D+QyK18VZBJ76Q04jCe6LSKIhK5ke3Bz6sH2eeqnspnl0jkXlp8DY24J7THUMlvjkSuMq9J5agIN09j51AjRZDIjYzXaJmosh7m/rgafyHiFYmcZDz3+2RJaxZQb0miRm6iD4lUTaTZg1s9HC/ESxODj+hDIjP6bOslwzxJX/2j1T2uuQdDIj3IIqqi9nlLHkOlOtfeEYeKRO5kVsHXUPZ6Viu0iT4k0mR71y87LcPTW7ZT+aFI5CLnflsSBc/JUp9/I5GLtK/Ng1v24MN4CYlcpUQVPOYCmGWvHvC8u0IiZ+mJKpruZ7hlzNnqD31I5CRtJmkTAA/GnGZLnw9oxiYSuZEi+Rb2MUCygUDdo4+XkMiNrLdqNRWINGYx5792GQyJzA5pONPjsP5NxKpg08xlSOROWp0bg0xVx4gcghGJXGVfkcs02ql4wLMCqMGRyI2MkifZP8V8wK7ljfqI8kQiV2kHetWDm2UrreirylhvU5DIWXoBzPiSlPlRzfnyxh+JnGVPXt4/eQ8uz6yGRH4tYyDQsqfyYGxTCCKRq7SvrIK2P+vhMV4YpwdI5ChjVY4yXnF4qg6pDYncyF8sJBKJRCKRyD8iPwBfeEgtuAaCMwAAAABJRU5ErkJggg=='
    );

    const requestQRCode = () => {
        axios
            .get('http://0.0.0.0:8080/haotuanzhushou/v1/wechats?type=qrcode')
            .then((response) => response.data['data']['qrcode'])
            .then((value) => {
                setQrcode(value);
            });
    };

    return (
        <Space style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <text style={{ fontSize: 18, textAlign: 'center' }}>
                    当前微信登录状态: 未登录, 请点击按钮进行扫描登录
                </text>
                <Button style={{ marginLeft: 18 }} onClick={requestQRCode}>
                    刷新微信二维码
                </Button>
            </div>
            <img style={{ width: 450, height: 450, marginTop: 8 }} src={qrcode} />
        </Space>
    );
};

const WeChatLogged = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <text>当前微信登录状态: 已登录</text>
        </div>
    );
};

export const WechatStatus = (props: Props) => {
    const [isLogged, setIsLogged] = React.useState(false);

    const refreshWechatStatus = () => {
        axios
            .get('http://0.0.0.0:8080/haotuanzhushou/v1/wechats')
            .then((response) => response.data['is_logged'])
            .then((value) => {
                setIsLogged(value);
            });
    };

    React.useEffect(() => {
        refreshWechatStatus();
    }, []);

    const timer = useRef<NodeJS.Timeout | null>(null);

    const onQRCodeShowed = () => {
        // @ts-ignore
        timer.current = setInterval(() => {
            console.log('setInterval');
            refreshWechatStatus();
        }, 1000);
    };

    React.useEffect(() => {
        if (timer.current !== null) {
            console.log('clearInterval');
            clearInterval(timer.current);
        }
    }, [isLogged]);

    // @ts-ignore
    return (
        <div>{isLogged ? <WeChatLogged /> : <WeChatQRCode onWechatLogged={onQRCodeShowed} />}</div>
    );
};
