import assert from 'node:assert/strict';
import { DateTime } from 'luxon';

import type { PostOrPage } from '@tryghost/content-api';

export default function permalink(post: PostOrPage, template: string): string {
  assert(post.published_at, 'published_at is required');
  assert(post.primary_author, 'primary author is required')

  const publishedDate = DateTime.fromISO(post.published_at);
  return template
    .replace(':year', publishedDate.toFormat('yyyy'))
    .replace(':month', publishedDate.toFormat('MM'))
    .replace(':day', publishedDate.toFormat('dd'))
    .replace(':hour', publishedDate.toFormat('HH'))
    .replace(':minute', publishedDate.toFormat('mm'))
    .replace(':second', publishedDate.toFormat('ss'))
    .replace(':author', post.primary_author.slug)
    .replace(':slug', post.slug);
}