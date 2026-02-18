import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { validateContactForm, isValidForm, checkAntiSpam } from '@/utils/validation'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, business_type, message, _honeypot, _submitted_at } = body

    // Anti-spam check
    if (!checkAntiSpam(_honeypot ?? '', _submitted_at ?? 0)) {
      return NextResponse.json({ error: 'Submission rejected.' }, { status: 400 })
    }

    // Validate
    const errors = validateContactForm({ name, email, phone, business_type, message })
    if (!isValidForm(errors)) {
      return NextResponse.json({ errors }, { status: 422 })
    }

    // Sanitize
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      business_type: business_type.trim(),
      message: message.trim(),
    }

    // Save to Supabase
    const { error } = await supabase
      .from('contact_submissions')
      .insert([payload])

    if (error) {
      console.error('Supabase error:', error)

      const errorMessage = error.code === '42501'
        ? 'Database permissions are not configured for form submissions yet (RLS 42501).'
        : `Failed to save. Please try again. (${error.code ?? 'unknown'})`

      return NextResponse.json(
        {
          error: errorMessage,
          details: error.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
