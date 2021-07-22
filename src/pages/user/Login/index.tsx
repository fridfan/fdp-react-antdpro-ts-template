import {
    LockOutlined,
    MobileOutlined,
    UserOutlined,
    SafetyCertificateTwoTone
} from '@ant-design/icons';
import {Input, message, Tabs, Row, Col} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormCaptcha, ProFormCheckbox, ProFormText} from '@ant-design/pro-form';
import {Link, useModel, connect} from 'umi';
// import VerificationCode from './VerificationCode'

import styles from './index.less';


const Login: React.FC = (props: any) => {
    const {initialState} = useModel('@@initialState');
    const {settings: {logo, title}}: any = initialState;
    const {subLoading, dispatch, codeUrl} = props;
    const [type, setType] = useState<string>('account');

    // const refreshCode = React.useCallback(() => {
    //     dispatch({
    //         type: 'login/fetchCodeUrl'
    //     })
    // }, []);
    const handleSubmit = React.useCallback(({autoLogin, ...values}: any) => {
        dispatch({
            type: 'login/fetchLogin',
            payload: {...values, key: codeUrl.key || ''}
        });
    }, [codeUrl]);

    return (
        <div className={styles.container}>
            <div className={styles.lang}/>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <Link to="/">
                            <img alt="logo" className={styles.logo} src={logo}/>
                            <span className={styles.title}>{title}</span>
                        </Link>
                    </div>
                    <div className={styles.desc}>
                        欢迎登录 {title} 系统
                    </div>
                </div>

                <div className={styles.main}>
                    <ProForm
                        initialValues={{
                            autoLogin: true,
                        }}
                        submitter={{
                            searchConfig: {
                                submitText: '登录',
                            },
                            render: (_, dom) => dom.pop(),
                            submitButtonProps: {
                                loading: subLoading,
                                size: 'large',
                                style: {
                                    width: '100%',
                                },
                            },
                        }}
                        onFinish={async (values) => {
                            handleSubmit(values);
                        }}
                    >
                        <Tabs activeKey={type} onChange={setType}>
                            <Tabs.TabPane
                                key="account"
                                tab="账户密码登录"
                            />
                            {/*<Tabs.TabPane*/}
                            {/*  key="mobile"*/}
                            {/*  tab={intl.formatMessage({*/}
                            {/*    id: 'pages.login.phoneLogin.tab',*/}
                            {/*    defaultMessage: '手机号登录',*/}
                            {/*  })}*/}
                            {/*/>*/}
                        </Tabs>

                        {type === 'account' && (
                            <>
                                <ProFormText
                                    name="username"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <UserOutlined className={styles.prefixIcon}/>,
                                    }}
                                    placeholder="用户名:admin"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入用户名!',
                                        },
                                    ]}
                                />
                                <ProFormText.Password
                                    name="password"
                                    fieldProps={{
                                        visibilityToggle: false,
                                        size: 'large',
                                        prefix: <LockOutlined className={styles.prefixIcon}/>,
                                    }}
                                    placeholder="密码:admin"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码！',
                                        },
                                    ]}
                                />

                                {/* <Row gutter={8}>
                                    <Col span={16}>
                                        <ProForm.Item
                                            name="code"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入验证码!',
                                                },
                                            ]}
                                        >
                                            <Input size="large"
                                                   prefix={<SafetyCertificateTwoTone
                                                       className={styles.prefixIcon}/>}
                                                   placeholder="图形验证码"/>
                                        </ProForm.Item>
                                    </Col>
                                    <Col span={8}>
                                        <VerificationCode src={codeUrl.code} refreshCode={refreshCode}/>
                                    </Col>
                                </Row> */}
                            </>
                        )}
                        {type === 'mobile' && (
                            <>
                                <ProFormText
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <MobileOutlined className={styles.prefixIcon}/>,
                                    }}
                                    name="mobile"
                                    placeholder="手机号"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入手机号！',
                                        },
                                        {
                                            pattern: /^1\d{10}$/,
                                            message: '手机号格式错误！',
                                        },
                                    ]}
                                />
                                <ProFormCaptcha
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={styles.prefixIcon}/>,
                                    }}
                                    captchaProps={{
                                        size: 'large',
                                    }}
                                    placeholder="请输入验证码"
                                    captchaTextRender={(timing, count) => {
                                        if (timing) {
                                            return `${count} 获取验证码`;
                                        }
                                        return '获取验证码';
                                    }}
                                    name="captcha"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码！',
                                        },
                                    ]}
                                    onGetCaptcha={async (phone) => {
                                        message.success('获取验证码成功！验证码为：1234');
                                    }}
                                />
                            </>
                        )}
                        <div
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <ProFormCheckbox noStyle name="autoLogin">
                                自动登录
                            </ProFormCheckbox>
                            {/* <a style={{ float: 'right', }}> 忘记密码 </a> */}
                        </div>
                    </ProForm>
                </div>
            </div>
        </div>
    );
};

export default connect(({login, loading}: any) => ({
    subLoading: loading.effects['login/fetchLogin'],
    codeUrl: login.codeUrl
}))(Login);
