import { Form, Input, Button, Layout, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth/auth.service";

export const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    login({ email: values.username, password: values.password })
      .then((response) => {
        message.success("Bienvenido");
        window.localStorage.setItem("token", response.id);
        navigate("/");
      })
      .catch((error) => {
        if (error?.response?.status === 401)
          message.error("Usuario o contraseña incorrectos");
        else  {
          message.error("Ha ocurrido un error");
          console.log(error);
        }
        return;
      });
  };

  return (
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
          <Form.Item style={{ marginTop: "20px" }}>
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>{" "}
            ¿Aún no tienes una cuenta? <Link to="/register">Regístrate</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
