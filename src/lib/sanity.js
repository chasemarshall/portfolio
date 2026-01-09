import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'jekwnx4q',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(sanity)

export function urlFor(source) {
  return builder.image(source)
}

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

export async function getSocials() {
  return sanity.fetch(`
    *[_type == "social"] | order(order asc) {
      _id,
      platform,
      url
    }
  `)
}

export async function getPhotos() {
  return sanity.fetch(`
    *[_type == "photo"] | order(order asc) {
      _id,
      title,
      image
    }
  `)
}
