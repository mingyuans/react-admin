// @flow
import * as React from 'react';
import './WechatStatus.css';
import axios from 'axios';
import { Button, Space } from 'antd';
import { API_DOMAIN } from '../../service/config';

type Props = {};

type QRCodeProps = {
    onWechatLogged: () => void;
};

export const Wechat = (props: Props) => {
    const [isLogged, setIsLogged] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const refreshWechatStatus = () => {
        axios
            .get(API_DOMAIN + '/haotuanzhushou/v1/wechats')
            .then((response) => response.data['data']['is_logged'])
            .then((value) => {
                setIsLogged(value);
            });
    };

    React.useEffect(() => {
        refreshWechatStatus();
    }, []);

    const [qrcode, setQrcode] = React.useState('');

    const requestQRCode = () => {
        setIsLoading(true);
        axios
            .get(API_DOMAIN + '/haotuanzhushou/v1/wechats?type=qrcode')
            .then((response) => response.data['data']['qrcode'])
            .then((value) => {
                setIsLoading(false);
                setQrcode(value);
            });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}>
            <Space style={{ display: 'flex', flexDirection: 'row', height: 36 }}>
                <div
                    style={{
                        fontSize: 14,
                        textAlign: 'left',
                        height: '100%',
                        alignContent: 'center',
                    }}
                >
                    当前微信登录状态: {isLogged ? '已成功登录' : '没有登录'},
                    可以点击按钮进行重新登录。
                </div>

                <Button style={{ marginLeft: 14 }} onClick={requestQRCode} loading={isLoading}>
                    刷新微信二维码
                </Button>
            </Space>
            <img
                style={{ width: 250, height: 250, marginTop: 8 }}
                src={qrcode}
                alt={''}
                hidden={'' === qrcode}
            />
        </div>
    );
};
