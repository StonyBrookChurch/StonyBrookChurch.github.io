const { VIMEO_URL, VIMEO_ACCESS_TOKEN } = process.env;
const THUMBNAIL_SIZE_WIDTHS = {
  100: 'xs',
  200: 'sm',
  295: 'ms',
  640: 'md',
  960: 'ml',
  1280: 'lg',
  1920: 'xl'
};

export default async function getLatestMessages() {
  const messages = await fetchVideos(VIMEO_ACCESS_TOKEN, '10085736', 'manual', 'desc');
  return messages.map((message) => {
    const [ title, description, series ] = message.description.split('\n');
    const date = parseDate(message.name);
    return {
      ...message,
      title,
      description,
      series,
      date
    };
  });
}

async function fetchVideos(accessToken, showcaseId, sort, order) {
  const items = [];

  let paging = null;
  do {
    let data = await fetchPage(accessToken, showcaseId, sort, order, paging ? paging.next : null);
    // console.log(JSON.stringify(data, null, 2));
    data.data.forEach(item => items.push(item));
    paging = data.paging;
  } while (paging && paging.next);

  items.forEach((item) => {
    item.videoId = item.uri.replace(/\/videos\//, '');
    item.thumbnails = mapThumbnails(item.pictures.sizes);
  });

  return items;
}

async function fetchPage(accessToken, showcaseId, sort, order, page) {
  let url = `${VIMEO_URL}/me/albums/${showcaseId}/videos?per_page=100&sort=${sort}`;
  if (order !== null) {
    url = `${url}&direction=${order}`;
  }
  if (page !== null) {
    url = `${url}&page=${page}`;
    console.log(`videos: fetching page ${page} of ${showcaseId}`);
  } else {
    console.log(`videos: fetching first page of ${showcaseId}`);
  }
  const options = {
    'method': 'GET',
    'headers': {
      'Authorization': `Bearer ${accessToken}`
    }
  };
  return fetch(url, options).then((response) => response.json());
}

function mapThumbnails(sizes) {
  const thumbnails = {};
  sizes.forEach((item) => thumbnails[THUMBNAIL_SIZE_WIDTHS[item.width]] = item.link);
  return thumbnails;
}

function parseDate(title) {
  const words = title.split(' ');
  if (words.length > 0) {
    const parts = words[0].split(/[.\-]/);
    if (parts.length === 3) {
      let year = parts[2];
      let month = parts[0];
      if (month.length < 2) {
        month = `0${month}`;
      }
      let day = parts[1];
      if (day.length < 2) {
        day = `0${day}`;
      }
      return `${year}-${month}-${day}`;
    }
  }
  return null;
}