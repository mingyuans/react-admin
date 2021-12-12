/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Wechat } from './Wechat';
import { Tuantuan } from './Tuantuan';

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
                <Wechat />
                <Tuantuan />
            </div>
        );
    }
}

export default Dashboard;
