const { MongoClient } = require('mongodb');
let clientPromise;

function getClient() {
  if (!clientPromise) {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');
    const client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect();
  }
  return clientPromise;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode:405, headers:{Allow:'POST'}, body:JSON.stringify({error:'Method not allowed'}) };
  try {
    const data = JSON.parse(event.body || '{}');
    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const message = String(data.message || '').trim();
    if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) return { statusCode:400, body:JSON.stringify({error:'Please provide a valid name, email, and message.'}) };
    const client = await getClient();
    await client.db(process.env.MONGODB_DB || 'portfolio').collection('messages').insertOne({ name, email, message, createdAt:new Date() });
    return { statusCode:201, body:JSON.stringify({message:'Message received'}) };
  } catch (error) { console.error(error); return { statusCode:500, body:JSON.stringify({error:'Something went wrong. Please try again later.'}) }; }
};
