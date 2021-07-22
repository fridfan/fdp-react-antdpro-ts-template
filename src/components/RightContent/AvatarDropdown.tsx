import React, {useCallback} from 'react';
import {LogoutOutlined} from '@ant-design/icons';
import {Avatar, Menu, Spin} from 'antd';
import {useSelector} from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import {removeToken} from "@/utils/cookie";
import {gotoLogin} from "@/utils/utils";

export type GlobalHeaderRightProps = {
    menu?: boolean;
};


const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props) => {
    const {currentUser} = useSelector((state: any) => state.user);
    /**
     * 退出登录，并且将当前的 url 保存
     */
    const loginOut = () => {
        if (window.location.pathname !== '/user/login') {
            removeToken();
            gotoLogin();
        }
    };
    const onMenuClick = useCallback(
        (event: {
            key: React.Key;
            keyPath: React.Key[];
            item: React.ReactInstance;
            domEvent: React.MouseEvent<HTMLElement>;
        }) => {
            const {key} = event;
            if (key === 'logout' && currentUser) {
                loginOut();
                return;
            }
        },
        [currentUser],
    );

    const loading = (
        <span className={`${styles.action} ${styles.account}`}>
      <Spin
          size="small"
          style={{
              marginLeft: 8,
              marginRight: 8,
          }}
      />
    </span>
    );

    if (!currentUser) {
        return loading;
    }

    if (!currentUser || !currentUser.username) {
        return loading;
    }

    const menuHeaderDropdown = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="logout">
                <LogoutOutlined/>
                退出登录
            </Menu.Item>
        </Menu>
    );
    return (
        <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
          {
              currentUser.avatar ?
                  <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar"/> :
                  <Avatar size="small" className={`${styles.avatar} ${styles.font}`} alt="avatar">
                      {currentUser.username.substr(0, 1).toLocaleUpperCase()}
                  </Avatar>
          }
          <span className={`${styles.name} anticon`}>{currentUser.username}</span>
      </span>
        </HeaderDropdown>
    );
};

export default AvatarDropdown;
