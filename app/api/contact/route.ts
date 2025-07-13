import { NextRequest, NextResponse } from 'next/server';
import { sendPropertyInquiry } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, phone, message, propertyTitle, propertyPrice, propertyAddress, propertyUrl } = body;
    
    // Validate required fields
    if (!name || !email || !message || !propertyTitle || !propertyPrice || !propertyAddress || !propertyUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    const result = await sendPropertyInquiry({
      name,
      email,
      phone,
      message,
      propertyTitle,
      propertyPrice,
      propertyAddress,
      propertyUrl,
    });
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}