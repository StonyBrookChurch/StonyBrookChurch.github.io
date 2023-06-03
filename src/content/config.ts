import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
  type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional()
	})
});

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
})

export const collections = { blog, ministries, about };
