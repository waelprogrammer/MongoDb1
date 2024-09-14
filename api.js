import express from 'express';
import { config } from 'dotenv';
import { insertStudent, deleteStudent, updateStudent } from './index1.js';
import cors from 'cors';


config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 1000;
app.get("/", (req, res) => {
    res.send("API is working");
});

app.post('/addstudent', async (req, res) => {
    try {
        await insertStudent(req.body);
        res.send('Student added successfully');
    } catch (error) {
        res.status(500).send('Error adding student');
    }
});

app.put('/updatestudent', async (req, res) => {
    const { name, updatefield } = req.body;
    try {
        await updateStudent(name, updatefield);
        res.send('Student updated successfully');
    } catch (error) {
        res.status(500).send('Error updating student');
    }
});

app.delete('/deletestudent', async (req, res) => {
    const { name } = req.body;
    try {
        await deleteStudent(name);
        res.send('Student deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting student');
    }
});


