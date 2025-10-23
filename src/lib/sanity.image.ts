import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function getImageUrl(image: any, width?: number, height?: number) {
  if (!image) return null
  
  // Handle external URLs
  if (typeof image === 'string') {
    return image
  }
  
  // Handle Sanity image objects
  if (image._type === 'image' || image.asset) {
    let urlBuilder = urlFor(image)
    
    if (width) {
      urlBuilder = urlBuilder.width(width)
    }
    
    if (height) {
      urlBuilder = urlBuilder.height(height)
    }
    
    return urlBuilder.url()
  }
  
  // Handle cover image objects with type field
  if (image.type === 'external' && image.externalUrl) {
    return image.externalUrl
  }
  
  if (image.type === 'sanity' && image.sanityImage) {
    let urlBuilder = urlFor(image.sanityImage)
    
    if (width) {
      urlBuilder = urlBuilder.width(width)
    }
    
    if (height) {
      urlBuilder = urlBuilder.height(height)
    }
    
    return urlBuilder.url()
  }
  
  return null
}
