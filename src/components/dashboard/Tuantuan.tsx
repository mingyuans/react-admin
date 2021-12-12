// @flow
import * as React from 'react';
import { useEffect } from 'react';
import { Button, Space } from 'antd';
import axios from 'axios';
import { API_DOMAIN } from '../../service/config';
import QRCode from 'qrcode.react';

type Props = {};

export const Tuantuan = (props: Props) => {
    const [isLogged, setIsLogged] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [qrcode, setQRCode] = React.useState('');
    const checkTimer = React.useRef<NodeJS.Timeout | null>(null);
    const secretKey = React.useRef('');

    useEffect(() => {
        axios
            .get(API_DOMAIN + '/haotuanzhushou/v1/users')
            .then((response) => response.data['data']['user_id'])
            .then((value) => {
                console.log(value);
                setIsLogged(value !== '');
            })
            .catch((error) => {
                setIsLogged(false);
            });
    }, []);

    const requestQRCode = () => {
        setIsLoading(true);
        axios
            .post(API_DOMAIN + '/haotuanzhushou/v1/authorizes?action=createQRCode&scene=ktt')
            .then((response) => {
                setIsLoading(false);
                setQRCode(response.data['data']);
                secretKey.current = response.data['secret_key'];
                startInternal();
            });
    };

    const authorize = (outCode: string) => {
        const data = { outCode: outCode };
        axios
            .post(API_DOMAIN + '/haotuanzhushou/v1/authorizes?action=authorize&scene=ktt', data)
            .then((response) => {
                console.log(response);
                setIsLogged(true);
                setQRCode('');
            });
    };

    const checkQRCode = () => {
        const data = { secret_key: secretKey.current };
        axios
            .post(API_DOMAIN + '/haotuanzhushou/v1/authorizes?action=checkQRCode&scene=ktt', data)
            .then((response) => {
                if (response.data['data']['ticket'] !== '') {
                    cancelInternal();
                    const ticket = response.data['data']['ticket'];
                    if (ticket.length !== 0) {
                        authorize(ticket);
                    }
                }
            });
    };

    const startInternal = () => {
        checkTimer.current = setInterval(() => {
            checkQRCode();
        }, 1000);
    };

    const cancelInternal = () => {
        if (checkTimer.current != null) {
            clearInterval(checkTimer.current);
        }
        checkTimer.current = null;
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
                    当前快团团登录状态: {isLogged ? '已成功登录' : '没有登录'},
                    可以点击按钮进行重新登录。
                </div>

                <Button style={{ marginLeft: 14 }} onClick={requestQRCode} loading={isLoading}>
                    刷新快团团二维码
                </Button>
            </Space>
            <QRCode value={qrcode} size={250} hidden={'' === qrcode} style={{ marginTop: 8 }} />
        </div>
    );
};
