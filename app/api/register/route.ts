import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, startupName, presenterName, phone, congressThemes, registrationNumber } = body

    // Validate required fields
    if (!email || !startupName || !presenterName || !registrationNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!congressThemes || congressThemes.length === 0) {
      return NextResponse.json({ error: "Please select at least one congress theme" }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    // Check if email or registration number already exists
    const { data: existingUser } = await supabase
      .from("submissions")
      .select("email, registration_number")
      .or(`email.eq.${email},registration_number.eq.${registrationNumber}`)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "Email or registration number already exists" }, { status: 409 })
    }

    // Insert new registration
    const { data, error } = await supabase
      .from("submissions")
      .insert({
        email,
        startup_name: startupName,
        presenter_name: presenterName,
        phone,
        congress_themes: congressThemes,
        registration_number: registrationNumber,
        submission_status: "registered",
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create registration" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      registrationNumber,
      message: "Registration successful",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
