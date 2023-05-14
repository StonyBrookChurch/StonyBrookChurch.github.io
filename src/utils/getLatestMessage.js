import { getCollection } from 'astro:content';
import assert from 'node:assert/strict';
import getLatestMessages from './getLatestMessages';

export default async function getLatestMessage() {
    const messages = await getLatestMessages();
    const [ message ] = messages.map((message) => message.data).slice(0, 1);
    assert(message, 'Latest message not found');

    return message;
}