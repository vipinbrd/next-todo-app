import { MongoClient ,ObjectId } from 'mongodb';

const uri = "mongodb+srv://vipinbrd:Vipin%40123@cluster0.tuzd14u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


export async function POST(request) {
console.log("hi there")

  const client = new MongoClient(uri);

  try {
     console.log('📡 Connecting to MongoDB...');
    const body = await request.json(); 
 console.log('📡 Connected to MongoDB...');
    await client.connect();

    const db = client.db('todo');
    console.log(db+"    hi")
    const result = await db.collection('tasks').insertOne(body);

    return new Response(
      JSON.stringify({ message: 'User added', id: result.insertedId }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response('Error inserting data', { status: 500 });
  } finally {
    await client.close();
  }
}



export async function GET() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('todo');
    const tasks = await db.collection('tasks').find().toArray();

    return new Response(
      JSON.stringify(tasks),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ GET Error:', error.message);
    return new Response('Failed to fetch tasks', { status: 500 });
  } finally {
    await client.close();
  }
}



export async function DELETE(request, { params }) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('todo');

    const taskId = params.id;
    console.log('🗑 Deleting task with ID:', taskId);

    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ message: 'Task deleted' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Task not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('❌ DELETE Error:', error.message);
    return new Response('Failed to delete task', { status: 500 });
  } finally {
    await client.close();
  }
}
