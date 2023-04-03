import db from '../../../utils/db';

export async function POST(request) {
  try {
    const entries = await db.collection('entries').orderBy('created').get();
    const entriesData = entries.docs.map(entry => ({
      id: entry.id,
      ...entry.data()
    }));
    return new Response(JSON.stringify(entriesData)).status(200);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Something went wrong" })).status(400);
  }
}