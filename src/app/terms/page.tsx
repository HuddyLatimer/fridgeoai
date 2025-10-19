import Image from "next/image";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo1.png"
                alt="FridgeoAI Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold gradient-text">FridgeoAI</span>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Terms Content */}
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-black">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: October 2025</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">1. Acceptance of Terms</h2>
              <p>
                By accessing and using FridgeoAI's smart recipe generator service, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">2. Description of Service</h2>
              <p className="mb-4">
                FridgeoAI provides an AI-powered recipe generation service that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identifies ingredients from uploaded photos using image recognition technology</li>
                <li>Generates personalized recipe suggestions based on available ingredients</li>
                <li>Supports dietary restrictions and preferences</li>
                <li>Provides cooking instructions and nutritional information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">3. Service Usage</h2>
              <p className="mb-4">
                FridgeoAI is a free service that does not require account creation or sign-up. By using our service, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service responsibly and in accordance with these terms</li>
                <li>Not abuse or overload our servers with excessive requests</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Verify all recipe information before use, especially for dietary restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">4. User Content</h2>
              <p className="mb-4">
                When you upload photos or provide ingredient information, you retain ownership of your content. However, you grant FridgeoAI a license to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your content to provide recipe suggestions</li>
                <li>Use anonymized and aggregated data to improve our AI algorithms</li>
              </ul>
              <p className="mt-4">
                Your photos are immediately deleted after processing. We do not store your personal content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">5. Prohibited Uses</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for any illegal purpose or in violation of any laws</li>
                <li>Upload content that infringes on intellectual property rights</li>
                <li>Attempt to reverse engineer or extract our AI algorithms</li>
                <li>Use automated systems to access the service without permission</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Upload malicious code or harmful content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">6. Recipe Accuracy and Dietary Information</h2>
              <p className="mb-4">
                While we strive to provide accurate recipe suggestions and dietary information, FridgeoAI does not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>100% accuracy of ingredient identification from photos</li>
                <li>Complete nutritional information for all recipes</li>
                <li>Suitability for specific medical or dietary conditions</li>
              </ul>
              <p className="mt-4">
                Users with allergies or specific dietary requirements should verify all ingredients and nutritional information before preparing any recipe. Consult with healthcare professionals for medical dietary advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">7. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the FridgeoAI service, including but not limited to text, graphics, logos, and software, are the exclusive property of FridgeoAI and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">8. Limitation of Liability</h2>
              <p>
                FridgeoAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. This includes but is not limited to food-related injuries, allergic reactions, or damages from following recipe instructions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">9. Service Modifications</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of our service at any time without notice. We may also impose limits on certain features or restrict access to parts or all of the service without liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">10. Service Access</h2>
              <p>
                We reserve the right to restrict or deny access to the service for any reason, including violation of these Terms of Service or abuse of the platform. Since no account is required, access restrictions may be implemented through technical measures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page with an updated revision date. Your continued use of the service after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">12. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">13. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Email: <a href="mailto:fridgeoai@proton.me" className="text-primary hover:underline">fridgeoai@proton.me</a>
                </li>
                <li>
                  Contact Form: <Link href="/contact" className="text-primary hover:underline">fridgeo.app/contact</Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FridgeoAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
