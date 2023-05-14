import { Form, Input, Button, Layout, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Content } = Layout;
interface LoginFormProps {
  onSubmit: (values: any) => void;
}

export const Login = ({ onSubmit }: LoginFormProps) => {
  const onFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={6}>
            <h1>Iniciar sesión</h1>
            <Form onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Por favor ingresa tu usuario" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Usuario" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu contraseña",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Contraseña"
                />
              </Form.Item>
              <Form.Item style={{marginTop: "20px"}}>
                <Button type="primary" htmlType="submit">
                  Iniciar sesión
                </Button>
                {" "} ¿Aún no tienes una cuenta? {" "}
                <Link to="/register">Regístrate</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
