import db from '../../../utils/db';

export async function POST(request) {
  const { id } = request.query;

  try {
    if (request.method === 'PUT') {
      await db.collection('entries').doc(id).update({
        ...request.body,
        updated: new Date().toISOString(),
      });
    } else if (request.method === 'GET') {
      const doc = await db.collection('entries').doc(id).get();
      if (!doc.exists) {
        return new Response(JSON.stringify({ error: "Entry doesn't exist" })).status(400);
      } else {
        return new Response(JSON.stringify(doc.data())).status(200);
      }
    } else if (request.method === 'DELETE') {
      await db.collection('entries').doc(id).delete();
    }
    return new Response(JSON.stringify({})).status(200);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Something went wrong" })).status(400);
  }
}