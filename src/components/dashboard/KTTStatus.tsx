// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import { get, post } from '../../service/tools';

type Props = {};

export const KttStatus = (props: Props) => {
    const [merchantName, setMerchantName] = useState('');

    useEffect(() => {
        setMerchantName('有颜家');
        let responseText = post({
            url: 'https://api.pinduoduo.com/api/cupid/query_qr_code',
            data: {
                pdd_biz_scene: 'OPEN_AUTH_BASE',
                anti_content: '',
                scene_data: {
                    pdd_open_app_id: 'pddpUWNEPBcFzjn',
                    scope: 'login',
                    open: true,
                },
            },
        });
        console.log(responseText);
    }, []);

    return (
        <div>
            <span>当前快团团绑定账号: </span>
            <span> {merchantName}</span>
        </div>
    );
};
