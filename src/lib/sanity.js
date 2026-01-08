import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'jekwnx4q',
  dataset: 'projects',
  useCdn: false,
  apiVersion: '2024-01-01',
})

export async function getProjects() {
  return sanity.fetch(`
    *[_type == "project"] | order(order asc, name asc) {
      _id,
      name,
      description,
      url,
      github,
      tech
    }
  `)
}
