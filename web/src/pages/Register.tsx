import { Form, Input, Button, Layout, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Content } = Layout;

interface RegisterFormProps {
  onSubmit: (values: any) => void;
}

export const Register = ({ onSubmit }: RegisterFormProps) => {
  const onFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col span={6}>
            <h1>Registro</h1>
            <Form onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nombre" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Correo electrónico" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Por favor confirma tu contraseña' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Las contraseñas no coinciden'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirmar contraseña" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                  Registrar
                </Button>
                <Link to="/login">
                  <Button type="default">
                    Atrás
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};