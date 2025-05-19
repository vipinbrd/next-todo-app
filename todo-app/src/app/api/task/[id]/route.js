import { MongoClient, ObjectId } from "mongodb";
const uri = "mongodb+srv://vipinbrd:Vipin%40123@cluster0.tuzd14u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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
