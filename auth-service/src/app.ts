import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'todolist';
const collectionName  = process.env.COLLECTION_NAME || 'auth';

app.use(express.json());

// Endpoint para registrar un usuario
app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if(!username || !password || !email){
      res.status(400).json({
        message: 'Username, email and password are required'
      });
      return;
    }

    // Verificar si el usuario ya existe
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const users = db.collection(collectionName);
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      res.status(409).json({
        message: 'User already exists'
      });
      return;
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el usuario en la base de datos
    const newUser = { username, email, password: hashedPassword };
    const result = await users.insertOne(newUser);

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Endpoint para autenticar un usuario
app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      res.status(400).json({
        message: 'Email and password are required'
      });
      return;
    }

    // Buscar el usuario en la base de datos
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const users = db.collection(collectionName);
    const user = await users.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: 'Invalid email or password'
      });
      return;
    }

    // Verificar la contraseña
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      res.status(401).json({
        message: 'Invalid username or password'
      });
      return;
    }

    res.status(200).json({ message: 'Authenticated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});