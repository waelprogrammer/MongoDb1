import { MongoClient } from 'mongodb';
let mongoClient;

async function connectToDB(uri) {
    if (!mongoClient) {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        console.log('MongoDB connected successfully');
    }
    return mongoClient;
}

async function createStudentDocument(collection, studentObj) {
    await collection.insertOne(studentObj);
}

async function findStudentByName(collection, name) {
    return collection.find({ name }).toArray();
}

async function updateStudentByName(collection, name, updateFields) {
    await collection.updateMany({ name }, { $set: updateFields });
}

async function deleteStudentsByName(collection, name) {
    await collection.deleteMany({ name });
}

export async function deleteStudent(name) {
    const uri = process.env.DB_URI;
    const client = await connectToDB(uri);
    const db = client.db('school55');
    const collection = db.collection('students155');
    await deleteStudentsByName(collection, name);
}

export async function insertStudent(studentObj) {
    const uri = process.env.DB_URI;
    const client = await connectToDB(uri);
    const db = client.db('school55');
    const collection = db.collection('students155');
    await createStudentDocument(collection, studentObj);
}

export async function updateStudent(name, updateFields) {
    const uri = process.env.DB_URI;
    const client = await connectToDB(uri);
    const db = client.db('school55');
    const collection = db.collection('students155');
    await updateStudentByName(collection, name, updateFields);
}
