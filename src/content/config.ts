import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    sortOrder: z.number().default(0),
    icon: z.string().default('wrench'),
    summary: z.string(),
    materials: z.array(z.string()),
    specifications: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    applications: z.array(z.string()),
    image: z.string().optional(),
  }),
});

const equipmentCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    model: z.string(),
    sortOrder: z.number().default(0),
    image: z.string().optional(),
    specs: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    quantity: z.number().default(1),
    featured: z.boolean().default(false),
  }),
});

const casesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    industry: z.string(),
    date: z.date(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    challenge: z.string(),
    solution: z.string(),
    results: z.string(),
    client: z.string().optional(),
  }),
});

export const collections = {
  services: servicesCollection,
  equipment: equipmentCollection,
  cases: casesCollection,
};
