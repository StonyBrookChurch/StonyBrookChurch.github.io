import { defineCollection, z } from 'astro:content';

const ministries = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    heading: z.string(),
    description: z.string(),
    image: z.string(),
    hero: z.string().optional(),
    banner: z.object({
      title: z.string(),
      image: z.string(),
      logo: z.string().optional()
    }).optional(),
    logo: z.string().optional(),
    url: z.string().optional()
  })
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string()
  })
});

const staff = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string()
  })
});

const leaders = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string()
  })
});

export const collections = { ministries, about, staff, leaders };
