import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Video, FileText, Award, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">ISMIT 2026</h1>
              <p className="text-muted-foreground">Start-up Grand Prize Submission Platform</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Future Disruptors Contest</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Submit your innovative startup pitch for the ISMIT 2026 Congress. Present your solution in AI, robotics,
              surgery, med-tech, or digital health.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/submit">
                <Upload className="mr-2 h-5 w-5" />
                Submit Your Pitch
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/guidelines">
                <FileText className="mr-2 h-5 w-5" />
                View Guidelines
              </Link>
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">June 30, 2026</div>
                <p className="text-muted-foreground">Submission Deadline</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Video className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">1 Minute</div>
                <p className="text-muted-foreground">Video Duration</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">Grand Prize</div>
                <p className="text-muted-foreground">Winner Recognition</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Submission Requirements</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Video Submission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• One-minute MP4 video introducing your startup</li>
                  <li>• High-quality video and audio</li>
                  <li>• Clear presentation of your solution</li>
                  <li>• Professional appearance and delivery</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Elevator Pitch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 1000-word written elevator pitch</li>
                  <li>• Clear problem and solution definition</li>
                  <li>• Market potential and innovation</li>
                  <li>• Alignment with congress themes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Complete online registration</li>
                  <li>• Paid participation fee</li>
                  <li>• Startup in relevant technology areas</li>
                  <li>• Presenter available for live pitch</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Evaluation Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Relevance to congress themes</li>
                  <li>• Innovation and originality</li>
                  <li>• Market potential and scalability</li>
                  <li>• Presentation quality and delivery</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2026 ISMIT Congress. All rights reserved.</p>
          <p className="text-sm text-muted-foreground mt-2">For questions, contact: elevatorpeach@ismit2026.com</p>
        </div>
      </footer>
    </div>
  )
}
