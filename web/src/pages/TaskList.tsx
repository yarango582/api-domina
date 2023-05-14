import { Form, Input, Button, Row, Col, Select, message, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasksByUserId,
  deleteTask,
  createTask,
  updateTask,
} from "../services/task/task.service";

export const TaskList = () => {
  const [form] = Form.useForm();
  const [token, setToken] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
    } else {
      setToken(storedToken);
      getTasksByUserId(storedToken)
        .then((result) => {
          setTasks(result);
        })
        .catch((error) => console.error(error));
    }
  }, [navigate, token]);

  useEffect(() => {
    if (selectedTask) {
      const task = tasks.find((task) => task.title === selectedTask);
      if (task) {
        form.setFieldsValue({
          id: task.title,
          title: task.title,
          description: task.description,
        });
      }
    } else {
      form.resetFields();
    }
  }, [selectedTask, tasks, form]);

  const onFinish = (values: any) => {
    if (selectedTask) {
      const task = tasks.find((task) => task.title === selectedTask);
      const taskSelected  = {
        title: values.title,
        description: values.description
      }
      const id = task._id;
      updateTask(taskSelected, id)
        .then((result) => {
          message.success("Tarea actualizada con éxito");
          getTasksByUserId(token!).then((result) => {
            setTasks(result);
          })
          .catch((error) => {
            console.error(`Error al recargar las tareas: ${error}`);
          })
          setSelectedTask(null);
          form.resetFields();
        })
        .catch((error) => {
          message.error("Error al actualizar la tarea");
          console.error(error);
        });
    } else {
      const task = {
        userId: token,
        title: values.title,
        description: values.description,
      };
      createTask(task)
        .then((result) => {
          message.success("Tarea creada con éxito");
          form.resetFields();
          setSelectedTask(null);
          getTasksByUserId(token!).then((result) => {
            setTasks(result);
          });
        })
        .catch((error) => {
          message.error("Error al crear la tarea");
          console.error(error);
        });
    }
    form.resetFields();
  };
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
  };

  return token ? (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col span={6}>
        <h1 style={{ textAlign: "center" }}>Lista de tareas</h1>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="id" label="Tareas">
            <Select
              placeholder="Selecciona una tarea"
              onChange={(value) => setSelectedTask(value)}
              value={selectedTask}
            >
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <Select.Option key={index} value={task.title}>
                    {task.title}
                  </Select.Option>
                ))
              ) : (
                <Select.Option disabled>
                  No hay tareas disponibles
                </Select.Option>
              )}
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
            <Input.TextArea placeholder="Descripción de la tarea" rows={7} />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Agregar/Edita tarea
              </Button>
              {selectedTask && (
              <Space>
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    const task = tasks.find(
                      (task) => task.title === selectedTask
                    );
                    const isDeleteTask = confirm(
                      "Esta seguro que desea eliminar esta tarea?"
                    );
                    if (isDeleteTask) {
                      deleteTask(task._id)
                        .then((result) => {
                          message.success("Tarea eliminada");
                          const updatedTasks = tasks.filter((t) => t._id !== task._id);
                          setTasks(updatedTasks);
                          setSelectedTask(null);
                          form.resetFields();
                        })
                        .catch((error) => {
                          message.error(
                            "Ha ocurrido un error al eliminar la tarea"
                          );
                          console.error(error);
                        });
                    }
                  }}
                >
                  Borrar
                </Button>
                <Button
                onClick={() => {
                  form.resetFields();
                  setSelectedTask(null);
                }}
              >
                Cancelar
              </Button>
              </Space>
            )}
              <Button onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Space>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  ) : null;
};
