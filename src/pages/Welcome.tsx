import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card} from 'antd';
// import { useIntl, FormattedMessage } from 'umi';
// import styles from './Welcome.less';


export default (): React.ReactNode => {
  // const intl = useIntl();
  return (
    <PageContainer fixedHeader title={'欢迎登录FRID系统'}>
      <Card>
          FRID系统
      </Card>
    </PageContainer>
  );
};
