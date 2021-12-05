/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { WechatStatus } from './WechatStatus';
import { KttStatus } from './KTTStatus';

class Dashboard extends React.Component {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <WechatStatus />
                <KttStatus />
            </div>
        );
    }
}

export default Dashboard;
