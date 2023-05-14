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
  return await fetchVideos(VIMEO_ACCESS_TOKEN, '10085736', 'manual', 'desc');
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

function template(str, item, index, thumbnailSize) {
  const thumbnail = findThumbnail(item.pictures.sizes, thumbnailSize) || items.pictures.base_link;
  return str
    .replaceAll('${uri}', item.uri)
    .replaceAll('${name}', clean(item.name))
    .replaceAll('${description}', clean(item.description))
    .replaceAll('${thumbnailLink}', thumbnail.link)
    .replaceAll('${link}', item.link)
    .replaceAll('${playerEmbedUrl}', item.player_embed_url)
    .replaceAll('${duration}', item.duration)
    .replaceAll('${width}', item.width)
    .replaceAll('${height}', item.height)
    .replaceAll('${userName}', clean(item.user.name))
    .replaceAll('${userUri}', item.user.uri)
    .replaceAll('${userLink}', item.user.link)
    .replaceAll('${userBio}', clean(item.user.bio))
    .replaceAll('${userShortBio}', clean(item.user.short_bio))
    .replaceAll('${position}', Number.parseInt(index) + 1)
    .replaceAll('${videoId}', item.uri.replace(/\/videos\//, ''))
    .replaceAll('${createdTime}', item.created_time)
    .replaceAll('${modifiedTime}', item.modified_time)
    .replaceAll('${releaseTime}', item.release_time);
}

function clean(str) {
  return str == null ? null : str
    .replaceAll('\n', '\\n')
    .replaceAll('\'', '\'\'')
    .replaceAll('"', '\\"');
}

function findThumbnail(sizes, thumbnailSize) {
  const width = THUMBNAIL_SIZE_WIDTHS[thumbnailSize];
  return sizes.find((item) => item.width === width);
}

function mapThumbnails(sizes) {
  const thumbnails = {};
  sizes.forEach((item) => THUMBNAIL_SIZE_WIDTHS[item.width] = item.link);
  return thumbnails;
}