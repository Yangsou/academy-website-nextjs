import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    const { documentId } = params

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.STRAPI_API_URL}/api/articles/${documentId}?populate=category&populate=author&populate=cover`,
      headers: { 
        'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`
      }
    }

    const response = await axios.request(config)
    
    // Process the cover image URL if it exists
    if (response.data.data?.cover?.url) {
      const coverUrl = process.env.ENVIRONMENT === 'development' ? `${process.env.STRAPI_API_URL}${response.data.data.cover.url}` : response.data.data.cover.url
      console.log('coverUrl', coverUrl)
      response.data.data.cover_url = coverUrl
    }

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Article detail fetch error:', error)
    
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: 'Failed to fetch article details. Please try again later.' },
      { status: 500 }
    )
  }
} 