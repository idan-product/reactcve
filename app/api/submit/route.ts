import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Intentionally unsafe: no validation, no sanitization, no authentication
  const contentType = request.headers.get('content-type') || ''
  
  let body
  if (contentType.includes('application/json')) {
    body = await request.json()
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData()
    body = Object.fromEntries(formData.entries())
  } else {
    body = await request.text()
  }
  
  // Log everything without any sanitization
  console.log('Received POST data:', body)
  console.log('Content-Type:', contentType)
  
  return NextResponse.json({ 
    success: true, 
    message: 'Data received (no validation performed)',
    received: body
  })
}

