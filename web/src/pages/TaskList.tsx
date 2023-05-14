import { Form, Input, Button, Layout, Row, Col, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
// import { API_TASK_BASE, API_TASK_OPERATIONS } from "../config/api";

const { Content } = Layout;
interface TaskFormProps {
  onCreate: (values: any) => void;
  onEdit: (values: any, id: number) => void;
  onCancel: () => void;
  tasks: any[];
}

export const TaskList = ({
  onCreate,
  onEdit,
  onCancel,
  tasks,
}: TaskFormProps) => {
  const [form] = Form.useForm();
  tasks = [
    { id: "2223", title: "hacer oficion" },
    { id: "22223", title: " lavar la ropa" },
    { id: "222423", title: "hacer de comer" },
  ];

  useEffect(() => {
    form.resetFields();
  }, [tasks]);

  const onFinish = (values: any) => {
    if (values.id) {
      onEdit(values, values.id);
    } else {
      onCreate(values);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col span={6}>
        <h1 style={{ textAlign: "center" }}>Lista de tareas</h1>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="id" label="Tareas">
            <Select placeholder="Selecciona una tarea">
              {tasks.length > 0 &&
                tasks.map((task) => (
                  <Select.Option value={task.id}>{task.title}</Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            label="Título"
            rules={[
              { required: true, message: "Ingresa el título de la tarea" },
            ]}
          >
            <Input placeholder="Título de la tarea" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descripción"
            rules={[
              {
                required: true,
                message: "Ingresa una descripción para la tarea",
              },
            ]}
          >
            <Input.TextArea placeholder="Descripción de la tarea" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              {form.getFieldValue("id") ? "Editar tarea" : "Agregar tarea"}
            </Button>
            <Button onClick={onCancel} style={{ marginLeft: "10px" }}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
