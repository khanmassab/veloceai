import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './sanity.config'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
})

export const getClient = (preview = false) => (preview ? previewClient : client)
