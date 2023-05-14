import express, { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'todolist';
const collectionName = process.env.COLLECTION_NAME || 'tasks';

app.use(express.json());
app.use(cors());

// Endpoint para crear una tarea
app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { userId, title, description } = req.body;

    if (!userId || !title) {
      res.status(400).json({
        message: 'User ID and title are required'
      });
      return;
    }

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const tasks = db.collection(collectionName);
    const newTask = { userId, title, description };
    const result = await tasks.insertOne(newTask);

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Endpoint para actualizar una tarea
app.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { title, description } = req.body;

    if (!title) {
      res.status(400).json({
        message: 'Title is required'
      });
      return;
    }

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const tasks = db.collection(collectionName);
    const result = await tasks.updateOne({ _id: new ObjectId(taskId) }, { $set: { title, description } });

    if (result.modifiedCount === 0) {
      res.status(404).json({
        message: 'Task not found'
      });
      return;
    }

    res.status(200).json({
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Endpoint para eliminar una tarea
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const tasks = db.collection(collectionName);
    const result = await tasks.deleteOne({ _id: new ObjectId(taskId) });

    if (result.deletedCount === 0) {
      res.status(404).json({
        message: 'Task not found'
      });
      return;
    }

    res.status(200).json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Endpoint para obtener todas las tareas por usuario
app.get('/tasks/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const tasks = db.collection(collectionName);
    const result = await tasks.find({ userId }).toArray();
    if (result.length === 0) {
      res.status(404).json({
        message: 'Tasks not found'
      });
    }
    res.status(200).json(result);
  } catch (error) {
    return error;
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});