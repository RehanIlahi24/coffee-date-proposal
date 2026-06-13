// EmailJS configuration.
//
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an Email Service (Gmail, Outlook, etc.) -> copy the Service ID.
// 3. Create an Email Template -> copy the Template ID. Use these variables in
//    the template body so the answers come through:
//      {{date_answer}}, {{confirm_answer}}, {{place}}, {{food}},
//      {{dessert}}, {{timestamp}}
// 4. Account -> General -> copy your Public Key.
//
// You can hardcode the values below, OR (recommended for Vercel) set them as
// environment variables prefixed with VITE_ in your Vercel project settings:
//      VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

const env = import.meta.env

export const EMAILJS_CONFIG = {
  serviceId: env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
}

// Returns true once all three placeholders have been replaced with real keys.
export const isEmailConfigured = () =>
  EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
  EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
  EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY'
