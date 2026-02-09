import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/ui/page-header"

export default function VenuePage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Venue & Travel"
          subtitle="A historic setting for future innovations in Nuremberg, Germany."
        />
        <section className="py-20">
          <div className="container mx-auto px-6">
            {/* Main Venue */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Congress Venue</h2>
                <div className="space-y-4 text-slate-600">
                  <p className="text-lg">
                    The congress will take place in the historic Old Town Hall (Altes Rathaus) of Nuremberg, with plenary sessions held inside the majestic Imperial Castle (Kaiserburg) overlooking the city.
                  </p>
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Altes Rathaus</h3>
                    <p className="text-slate-600">
                      <strong>Address:</strong> Rathausplatz 2, 90403 Nuremberg, Germany
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Presidential Gala Dinner */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-8 border border-purple-200">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🎩</span>
                  <h2 className="text-3xl font-bold text-slate-800">Presidential Gala Dinner</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Venue:</h4>
                      <p className="text-slate-700">Germanisches Nationalmuseum</p>
                      <p className="text-slate-600">Kartäusergasse 1, 90402 Nuremberg</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Date & Time:</h4>
                      <p className="text-slate-700">Friday, December 11, 2026</p>
                      <p className="text-slate-600">17:30</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-purple-100">
                    <p className="text-slate-600 leading-relaxed">
                      Join us for an elegant evening at Germany's largest museum of cultural history. The Germanisches Nationalmuseum provides a unique setting where centuries of innovation meet the future of medical technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting There */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Getting There</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">✈️</span>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-2">By Plane</h4>
                      <p className="text-slate-600">
                        Nuremberg Airport (NUE) is a 20-minute subway ride to the city center. The airport offers excellent connections to major European cities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">🚂</span>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-2">By Train</h4>
                      <p className="text-slate-600">
                        Nuremberg Main Station (Hauptbahnhof) is a major hub with excellent connections throughout Germany and Europe. The historic city center is within walking distance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">🚗</span>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-2">By Car</h4>
                      <p className="text-slate-600">
                        Easily reachable via the A3, A6, and A9 motorways. Multiple parking facilities are available near the city center.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Message */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🌳</span>
                  <h3 className="text-2xl font-bold text-green-800">Going Green</h3>
                </div>
                <p className="text-green-800 text-lg leading-relaxed">
                  We are going paperless. For every congress participant, we will plant a tree — a tangible contribution to environmental protection.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
