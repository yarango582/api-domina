import React from 'react';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

interface LayoutAppProps {
    children: React.ReactNode;
}

const LayoutApp = ({children} : LayoutAppProps) => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      </Header>
      <Content className="site-layout" style={{ padding: '110px 50px', marginTop: 64}}>
          {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}> Domina web ©2023</Footer>
    </Layout>
  );
};

export default LayoutApp;