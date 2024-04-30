import assert from 'node:assert/strict';

import { ghostClient } from '@lib/ghost';
import type { PostsOrPages } from '@tryghost/content-api';

const FEATURED_POSTS = 2;

export default async function getFeaturedPosts(): Promise<PostsOrPages> {
  const posts = await ghostClient.posts
    .browse({ limit: FEATURED_POSTS, filter: 'featured:true', include: ['tags', 'authors'] })
    .catch((err) => console.error(err));
  assert(posts, 'posts not found');

  return posts;
}