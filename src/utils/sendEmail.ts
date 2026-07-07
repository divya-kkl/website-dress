import fetch from 'node-fetch'; // if node-fetch is needed, or just use native fetch if Node >= 18
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (options: { to: string, subject: string, payload: any }) => {
    try {
        const formSubmitEndpoint = process.env.FORMSUBMIT_ENDPOINT as string;
        const frontendUrl = process.env.FRONTEND_URL as string;

        // Use FormSubmit.co just like the Contact Us page
        const response = await fetch(formSubmitEndpoint, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': frontendUrl,
                'Referer': frontendUrl.endsWith('/') ? frontendUrl : frontendUrl + '/'
            },
            body: JSON.stringify({
                _subject: options.subject,
                _template: "table",
                ...options.payload
            })
        });

        const data = await response.json();
        console.log('Email sent successfully via FormSubmit!', data);
        return true;
    } catch (error) {
        console.error('Error sending email via FormSubmit:', error);
        return false;
    }
};
