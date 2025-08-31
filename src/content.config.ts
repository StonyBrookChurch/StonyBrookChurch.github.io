import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ministries = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/ministries" }),
  schema: z.object({
    title: z.string(),
    heading: z.string(),
    description: z.string(),
    image: z.string(),
    hero: z.string(),
    gallery: z.array(z.object({
      image: z.string(),
      title: z.string().optional(),
      caption: z.string()
    })).optional(),
    banner: z.object({
      title: z.string(),
      image: z.string().optional(),
      description: z.string(),
      action: z.string(),
      url: z.string(),
      style: z.string()
    }).optional(),
    logo: z.string().optional(),
    url: z.string().optional()
  })
});

const about = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/about" }),
  schema: z.object({
    title: z.string()
  })
});

const staff = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/staff" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string()
  })
});

const leaders = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/leaders" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string()
  })
});

const showcases = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/showcases" }),
  schema: z.object({
    id: z.string(),
    name: z.string()
  })
});

export const collections = { ministries, about, staff, leaders, showcases };
