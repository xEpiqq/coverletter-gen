import db from '../../../utils/db';


export async function POST(requeset) {
  try {
    const { slug } = requeset.body;
    const entries = await db.collection('entries').get();
    const entriesData = entries.docs.map(entry => entry.data());

    // Check if slug entry already exists
    // This is for testing purposes only
    if (entriesData.some(entry => entry.slug === slug)) {
        return new Response(JSON.stringify({ error: "Slug already exists" })).status(400);
    } else {
      const { id } = await db.collection('entries').add({
        ...requeset.body,
        created: new Date().toISOString(),
      });
      return new Response(JSON.stringify({ id })).status(200);
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: "Something went wrong" })).status(400);
  }
}