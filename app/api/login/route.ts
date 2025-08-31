import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, registrationNumber } = body

    if (!email || !registrationNumber) {
      return NextResponse.json({ error: "Email and registration number are required" }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    // Find user with matching email and registration number
    const { data: user, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("email", email)
      .eq("registration_number", registrationNumber)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: "Invalid email or registration number" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        registrationNumber: user.registration_number,
        startupName: user.startup_name,
        presenterName: user.presenter_name,
        submissionStatus: user.submission_status,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
