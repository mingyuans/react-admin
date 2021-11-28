/**
 * Created by hao.cheng on 2017/4/16.
 */
import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { PwaInstaller } from '../widget';
import { useAlita } from 'redux-alita';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';
import umbrella from 'umbrella-storage';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';

const FormItem = Form.Item;
type LoginProps = {
    setAlitaState: (param: any) => void;
    auth: any;
} & RouteComponentProps &
    FormProps;

const Login = (props: LoginProps) => {
    const { history } = props;
    const [auth, setAlita] = useAlita({ auth: {} }, { light: true });

    useEffect(() => {
        setAlita('auth', null);
    }, [setAlita]);

    useUpdateEffect(() => {
        if (auth && auth.uid) {
            // 判断是否登陆
            umbrella.setLocalStorage('user', auth);
            history.push('/');
        }
    }, [history, auth]);

    const handleSubmit = (values: any) => {
        if (checkUser(values)) {
            setAlita({ funcName: values.userName, stateName: 'auth' });
        }
    };
    const checkUser = (values: any) => {
        const users = [
            ['admin', 'admin'],
            ['guest', 'guest'],
        ];
        return users.some((user) => user[0] === values.userName && user[1] === values.password);
    };

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-logo">
                    <span>管理系统</span>
                    <PwaInstaller />
                </div>
                <Form onFinish={handleSubmit} style={{ maxWidth: '300px' }}>
                    <FormItem
                        name="userName"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input prefix={<UserOutlined size={13} />} placeholder="用户名" />
                    </FormItem>
                    <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input
                            prefix={<LockOutlined size={13} />}
                            type="password"
                            placeholder="密码"
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ width: '100%' }}
                        >
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    );
};

export default Login;
