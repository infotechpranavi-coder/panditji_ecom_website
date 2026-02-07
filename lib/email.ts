import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendBookingEmail(bookingData: any) {
    const { customerName, customerEmail, customerPhone, pujaName, date, totalPrice, japa } = bookingData;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'vishwajeetpandit01@gmail.com', // Admin email
        subject: `New Puja Booking Request: ${pujaName}`,
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">New Puja Booking Details</h2>
        <p>You have received a new booking request from <strong>Book Panditji Seva</strong>.</p>
        
        <div style="background: #fdf2f2; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #b91c1c;">Puja Information</h3>
          <p><strong>Puja Name:</strong> ${pujaName}</p>
          <p><strong>Selected Date:</strong> ${date}</p>
          <p><strong>Japa:</strong> ${japa || 'N/A'}</p>
          <p><strong>Total Price:</strong> ₹${totalPrice}</p>
        </div>

        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #15803d;">Customer Details</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Phone:</strong> ${customerPhone}</p>
        </div>

        <p style="font-size: 0.9em; color: #666;">This is an automated notification. Please contact the customer to confirm the booking.</p>
        <footer style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center; color: #999;">
          &copy; 2026 Book Panditji Seva | Powered by Pranavi Infotech
        </footer>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error: any) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}
