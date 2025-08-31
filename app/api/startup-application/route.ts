import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const applicationData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      organization: formData.get("organization") as string,
      startupName: formData.get("startupName") as string,
      industryFocus: formData.get("industryFocus") as string,
      developmentStage: formData.get("developmentStage") as string,
      elevatorPitch: formData.get("elevatorPitch") as string,
      termsAccepted: formData.get("termsAccepted") === "true",
      submittedAt: new Date().toISOString(),
    }

    const videoFile = formData.get("video") as File | null

    // Generate application ID
    const applicationId = `STARTUP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Here you would typically:
    // 1. Save to database
    // 2. Upload video file to storage
    // 3. Send confirmation email

    // For now, we'll simulate the process
    console.log("[v0] Startup application received:", {
      applicationId,
      applicant: `${applicationData.firstName} ${applicationData.lastName}`,
      startup: applicationData.startupName,
      hasVideo: !!videoFile,
    })

    // Simulate email sending
    const emailContent = `
      Dear ${applicationData.firstName} ${applicationData.lastName},

      Thank you for submitting your application to the Start-up Grand Prize – Future Disruptors Contest!

      Application Details:
      - Application ID: ${applicationId}
      - Startup Name: ${applicationData.startupName}
      - Industry Focus: ${applicationData.industryFocus}
      - Submission Date: ${new Date().toLocaleDateString()}

      Your application has been received and will be reviewed by our panel of experts. 
      You will be notified of the results by email.

      The winner will be announced during the iSMIT 2026 Congress (19-21 November 2026) in Nürnberg, Germany.

      Best regards,
      iSMIT 2026 Organizing Committee
    `

    console.log("[v0] Confirmation email would be sent to:", applicationData.email)
    console.log("[v0] Email content:", emailContent)

    return NextResponse.json({
      success: true,
      applicationId,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Error processing startup application:", error)
    return NextResponse.json({ success: false, message: "Failed to process application" }, { status: 500 })
  }
}
