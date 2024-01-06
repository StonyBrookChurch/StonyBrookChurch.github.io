import { defineCollection, z } from 'astro:content';

const ministries = defineCollection({
  type: 'content',
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

const showcases = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    name: z.string()
  })
});

export const collections = { ministries, about, staff, leaders };
