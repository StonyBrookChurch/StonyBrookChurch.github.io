import { getCollection } from 'astro:content';

export default async function getLatestMessages() {
    const messages = await getCollection('messages');
    return messages.sort((a, b) => compare(a.data, b.data));
}

function compare(a, b) {
    return a.position < b.position ? -1 : a.position > b.position ? 1 : 0;
}