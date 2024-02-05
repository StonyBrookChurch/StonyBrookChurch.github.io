import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

const ignoredPaths = [
  '/leaders',
  '/staff',
  '/give',
  '/prayer',
  '/connect',
  '/special-events',
  '/events/calendar'
].map((path) => new RegExp(path));

// https://astro.build/config
export default defineConfig({
	site: 'https://stonybrookchurch.com',
	integrations: [mdx(), sitemap({
    filter: (page) => !ignoredPaths.some((ignoredPath) => ignoredPath.test(page))
  })],
  build: {
    format: 'file',
    inlineStylesheets: 'always'
  }
});
