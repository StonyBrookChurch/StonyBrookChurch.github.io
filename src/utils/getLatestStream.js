import { YOUTUBE_CHANNEL_ID } from '@consts';

const { YOUTUBE_URL, YOUTUBE_API_KEY } = import.meta.env;

export default async function getLatestStream(eventType = 'completed') {
  const videos = await fetchVideos(YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID, eventType, 1);
  const [ latestVideo ] = videos
    // .filter((video) => {
    //   const start = Date.parse(video.actualStartTime);
    //   const end = Date.parse(video.actualEndTime);
    //   // get rid of videos 5-minutes and under
    //   return ((end - start) / 1000) > 300;
    // })
    .sort((a, b) => {
      const delta = Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
      return delta < 0 ? -1 : delta > 0 ? 1 : 0;
    })
    .reverse()
    .slice(0, 1);

    return latestVideo;
}

async function fetchVideos(apiKey, channelId, eventType, maxResults) {
  const items = [];

  let nextPageToken = null;
  do {
    const data = await fetchPage(apiKey, channelId, eventType, maxResults, nextPageToken);
    console.log(`found ${data.pageInfo.totalResults} total results`);
    // console.log(JSON.stringify(data, null, 2));
    const videoIds = data.items.map(item => item.id.videoId);
    const videoDetails = await fetchDetails(apiKey, videoIds);
    // console.log(JSON.stringify(videoDetails, null, 2));
    for (let index in data.items) {
      const item = data.items[index];
      if (Object.keys(item.snippet.thumbnails).length === 0) {
        continue;
      }

      const details = videoDetails.items.find(video => video.id === item.id.videoId);
      // Copy over additional or richer details
      if (details !== undefined) {
        item.snippet.thumbnails = details.snippet.thumbnails;
        item.contentDetails = details.contentDetails;
        item.liveStreamingDetails = details.liveStreamingDetails;
      } else {
        console.log(`details not found for ${item.id.videoId}`);
      }
      items.push(item);
    }

    nextPageToken = data.nextPageToken;
  } while (nextPageToken !== undefined && items.length < maxResults);

  return items.map((item) => normalizeVideo(item));
}

async function fetchPage(apiKey, channelId, eventType, maxResults, pageToken) {
  let url = `${YOUTUBE_URL}/youtube/v3/search?key=${apiKey}&channelId=${channelId}&maxResults=${maxResults}&part=snippet&type=video&eventType=${eventType}&order=date`;
  if (pageToken !== null) {
    url = `${url}&pageToken=${pageToken}`;
    console.log(`streams: fetching page ${pageToken} of ${channelId}`);
  } else {
    console.log(`streams: fetching first page of ${channelId}`);
  }
  const options = {
    'method': 'GET',
    'headers': {}
  };
  return fetch(url, options).then((response) => response.json());
}

async function fetchDetails(apiKey, videoIds) {
  const url = `${YOUTUBE_URL}/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(',')}&part=snippet,contentDetails,liveStreamingDetails`;
  const options = {
    'method': 'GET',
    'headers': {}
  };
  return fetch(url, options).then((response) => response.json());
}

function normalizeVideo(item) {
  // console.log(JSON.stringify(item, null, 2));
  return {
    'id': item.id.videoId,
    'etag': item.etag,
    'title': clean(item.snippet.title),
    'description': clean(item.snippet.description),
    'thumbnails': item.snippet.thumbnails,
    'channelId': item.snippet.channelId,
    'channelTitle': clean(item.snippet.channelTitle),
    'videoId': item.id.videoId,
    'publishedAt': item.snippet.publishedAt,
    'publishTime': item.snippet.publishTime,
    //'duration': item.contentDetails.duration,
    'actualStartTime': item.liveStreamingDetails?.actualStartTime,
    'actualEndTime': item.liveStreamingDetails?.actualEndTime
  };
}

function clean(str) {
  return str == null ? "" : str.trim();
}