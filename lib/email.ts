import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface PropertyInquiry {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyTitle: string;
  propertyPrice: string;
  propertyAddress: string;
  propertyUrl: string;
}

export async function sendPropertyInquiry(inquiry: PropertyInquiry): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `Property Inquiry: ${inquiry.propertyTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">New Property Inquiry</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Property Details</h3>
            <p><strong>Property:</strong> ${inquiry.propertyTitle}</p>
            <p><strong>Price:</strong> ${inquiry.propertyPrice}</p>
            <p><strong>Address:</strong> ${inquiry.propertyAddress}</p>
            <p><strong>Property URL:</strong> <a href="${inquiry.propertyUrl}" style="color: #2563eb;">${inquiry.propertyUrl}</a></p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${inquiry.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${inquiry.email}" style="color: #2563eb;">${inquiry.email}</a></p>
            ${inquiry.phone ? `<p><strong>Phone:</strong> <a href="tel:${inquiry.phone}" style="color: #2563eb;">${inquiry.phone}</a></p>` : ''}
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${inquiry.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This inquiry was submitted through the Elite Real Estate Platform.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}