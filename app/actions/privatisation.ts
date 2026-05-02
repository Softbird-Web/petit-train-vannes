'use server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PrivatisationData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  companyName: string
  departureLocation: string
  departureTime: string
  eventType: string
  eventDate: string
  guestCount: number
  additionalInfo: string
}

export type PrivatisationResult = { success: true } | { success: false; error: string }

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ---------------------------------------------------------------------------
// Server action
// ---------------------------------------------------------------------------

export async function submitPrivatisation(data: PrivatisationData): Promise<PrivatisationResult> {
  if (!data.firstName.trim()) return { success: false, error: 'First name is required.' }
  if (!data.lastName.trim()) return { success: false, error: 'Last name is required.' }
  if (!data.phone.trim()) return { success: false, error: 'Phone number is required.' }
  if (!data.email.trim() || !EMAIL_RE.test(data.email))
    return { success: false, error: 'A valid email address is required.' }
  if (!data.departureLocation) return { success: false, error: 'Please select a departure location.' }
  if (!data.departureTime) return { success: false, error: 'Please enter a departure time.' }
  if (!data.eventType.trim()) return { success: false, error: 'Event type is required.' }
  if (!data.eventDate) return { success: false, error: 'Please enter the event date.' }
  if (data.guestCount < 10)
    return { success: false, error: 'A minimum of 10 guests is required for privatisation.' }

  const payload = {
    type: 'privatisation',
    submittedAt: new Date().toISOString(),
    contact: {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      companyName: data.companyName.trim(),
    },
    event: {
      departureLocation: data.departureLocation,
      departureTime: data.departureTime,
      eventType: data.eventType.trim(),
      eventDate: data.eventDate,
      guestCount: data.guestCount,
      additionalInfo: data.additionalInfo.trim(),
    },
  }

  // ── TODO: Add MAKE_PRIVATISATION_WEBHOOK_URL to .env.local + Vercel settings ──
  const webhookUrl = process.env.MAKE_PRIVATISATION_WEBHOOK_URL

  if (!webhookUrl) {
    console.error(
      '[privatisation] MAKE_PRIVATISATION_WEBHOOK_URL is not set. Payload:',
      JSON.stringify(payload, null, 2),
    )
    return {
      success: false,
      error: 'The privatisation service is not configured yet. Please contact us directly.',
    }
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('[privatisation] Make webhook responded with', res.status)
      return {
        success: false,
        error: 'We could not process your request. Please try again or contact us.',
      }
    }
    return { success: true }
  } catch (err) {
    console.error('[privatisation] Error reaching Make webhook:', err)
    return { success: false, error: 'A network error occurred. Please try again.' }
  }
}
