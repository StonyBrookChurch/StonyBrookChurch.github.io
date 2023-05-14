import { DateTime } from 'luxon';

const { PLANNING_CENTER_URL, CHURCH_CENTER_USERNAME, CHURCH_CENTER_PASSWORD } = process.env;

export default async function getLatestEvents(days, tag) {
  const apiKey = Buffer.from(`${CHURCH_CENTER_USERNAME}:${CHURCH_CENTER_PASSWORD}`).toString('base64');
  const start = DateTime.now()
    .setZone('America/Chicago')
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .setZone('UTC');
  const end = start.plus({ days: days });

  return fetchEvents(apiKey, start, end, tag);
}

async function fetchEvents(apiKey, start, end, tag) {
  let data = await fetchPage(apiKey, start, end, null);
  console.log(`events: found ${data.meta.total_count} total results`);
  let eventInstances = new EventInstances(data);
  const items = eventInstances.findAllByTag(tag);
  while (data.meta.next !== undefined) {
    data = await fetchPage(apiKey, start, end, data.meta.next.offset);
    eventInstances = new EventInstances(data);
    eventInstances.findAllByTag(tag)
      .forEach((item) => items.push(item));
  }

  return items.map((item) => formatEvent(item));
}

async function fetchPage(apiKey, start, end, offset) {
  let url = `${PLANNING_CENTER_URL}/calendar/v2/event_instances?include=event,tags&per_page=50&order=starts_at&where[starts_at][lte]=${end.toISO()}&where[ends_at][gte]=${start.toISO()}`;
  if (offset !== null) {
    url = `${url}&offset=${offset}`;
    console.log(`events: fetching offset ${offset}`);
  } else {
    console.log(`events: fetching first page`);
  }
  const options = {
    'method': 'GET',
    'headers': {
      'Authorization': `Basic ${apiKey}`
    }
  };
  return fetch(url, options).then((response) => response.json());
}

function formatEvent(event) {
  //console.log(JSON.stringify(event));
  return {
    name: clean(event.name),
    description: clean(event.description),
    summary: clean(event.summary),
    image: event.image_url,
    recurrence: event.recurrence,
    recurrence_description: event.recurrence_description,
    start: date(event.starts_at),
    end: date(event.ends_at),
    location: parseLocation(event.location),
    address: parseAddress(event.location),
    url: event.church_center_url,
    registration_url: event.registration_url,
    all_day_event: event.all_day_event,
    tags: event.tags
  };
}

function clean(str) {
  return str == null ? "" : str.trim();
}

function quote(str) {
  return str !== null && str !== '' ? `'${str}'` : null;
}

function date(str) {
  return DateTime.fromISO(str).setZone('America/Chicago').toISO();
}

function parseLocation(str) {
  const empty = str === null || str.trim() === '';
  if (!empty) {
    const index = str.indexOf('-');
    return index > -1 ? str.substring(0, index).trim() : str;
  }
  return null;
}

function parseAddress(str) {
  const empty = str === null || str.trim() === '';
  if (!empty) {
    const index = str.indexOf('-');
    return index > -1 ? str.substring(index + 1).trim() : str;
  }
  return null;
}

class EventInstances {
  events;
  tags;
  eventInstances;

  constructor(data) {
    this.eventInstances = data.data;
    this.events = data.included.filter(e => e.type === 'Event');
    this.tags = data.included.filter(e => e.type === 'Tag');
  }

  findAllByTag(tag) {
    return this.eventInstances
      .map(e => this.normalizeEvent(e))
      .filter(e => e.tags.some(t => t === tag));
  }

  findTagById(id) {
    return this.tags.find(t => t.id === id);
  }

  findEventById(id) {
    return this.events.find(e => e.id === id);
  }

  normalizeEvent(event) {
    const parent = this.findEventById(event.relationships.event.data.id);
    const tags = event.relationships.tags.data.map(t => this.findTagById(t.id));
    return {
      id: event.id,
      ...parent.attributes,
      ...event.attributes,
      tags: tags.map(t => t.attributes.name)
    };
  }
}