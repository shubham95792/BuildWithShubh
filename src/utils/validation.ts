export interface ContactFormData {
  name: string
  email: string
  phone: string
  business_type: string
  message: string
}

export interface ValidationErrors {
  name?: string
  email?: string
  business_type?: string
  message?: string
}

export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }

  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.business_type) {
    errors.business_type = 'Please select your business type.'
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Please describe your project (at least 10 characters).'
  }

  return errors
}

export function isValidForm(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0
}

export function checkAntiSpam(honeypot: string, submittedAt: number): boolean {
  if (honeypot.length > 0) return false
  if (Date.now() - submittedAt < 3000) return false
  return true
}