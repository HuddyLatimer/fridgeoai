import Image from "next/image";
import Link from "next/link";

export default function Privacy() {
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

      {/* Privacy Content */}
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-black">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: October 2025</p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">1. Overview</h2>
              <p className="mb-4">
                FridgeoAI is a 100% free service that requires no account creation or sign-up. We are committed to protecting your privacy and being transparent about how we handle your data.
              </p>
              <p>
                <strong>Key Points:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>No account required - use FridgeoAI instantly</li>
                <li>Photos are processed and immediately deleted</li>
                <li>We don't store your personal information</li>
                <li>No selling of data to third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">2. Information We Process</h2>
              <p className="mb-4">
                When you use FridgeoAI, we temporarily process:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Photos:</strong> Images of your fridge or ingredients (processed via AI, then immediately deleted)</li>
                <li><strong>Ingredient lists:</strong> Manually entered ingredients (used for recipe generation only)</li>
                <li><strong>Preferences:</strong> Dietary restrictions, cooking time, skill level (used for that session only)</li>
                <li><strong>Anonymous usage data:</strong> General analytics to improve our service (no personal identifiers)</li>
              </ul>
              <p className="mt-4">
                <strong>Important:</strong> Since there are no accounts, we cannot link any data to you personally. All processing is session-based and temporary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">3. How We Use Your Data</h2>
              <p className="mb-4">We process your data solely to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identify ingredients from your photos using Google Gemini AI</li>
                <li>Generate personalized recipe suggestions based on your ingredients</li>
                <li>Apply your dietary preferences to recipe recommendations</li>
                <li>Improve our AI accuracy through anonymous feedback analysis</li>
              </ul>
              <p className="mt-4">
                All photo processing happens in real-time. Once the AI identifies your ingredients, the photo is permanently deleted from our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">4. Data Retention</h2>
              <p className="mb-4">
                <strong>Photos:</strong> Deleted immediately after AI processing (within seconds)
              </p>
              <p className="mb-4">
                <strong>Recipes & Preferences:</strong> Stored only in your browser's session. Cleared when you close your browser.
              </p>
              <p className="mb-4">
                <strong>Analytics:</strong> Anonymous usage statistics (no personal data) kept for service improvement purposes
              </p>
              <p className="mt-4">
                Since we don't require accounts, we have no way to permanently store or track your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">5. Third-Party Services</h2>
              <p className="mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Gemini AI:</strong> For ingredient detection and recipe generation (subject to Google's privacy policy)</li>
                <li><strong>Formspree:</strong> For contact form submissions only (when you choose to contact us)</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or share your data with advertisers or marketing companies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">6. Your Privacy Rights</h2>
              <p className="mb-4">
                Since we don't collect or store personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>There's no account data to access or delete</li>
                <li>Photos are automatically deleted after processing</li>
                <li>You can clear browser data anytime to remove session information</li>
                <li>No tracking across devices or sessions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">7. Cookies and Local Storage</h2>
              <p className="mb-4">
                We use minimal cookies and browser local storage only for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining your session while using the app</li>
                <li>Remembering your preferences during your visit</li>
                <li>Anonymous analytics to understand how people use FridgeoAI</li>
              </ul>
              <p className="mt-4">
                No cookies are used for tracking, advertising, or cross-site data collection. You can clear all cookies and local storage through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">8. Children's Privacy</h2>
              <p>
                FridgeoAI is designed for general audiences. We do not knowingly collect personal information from children under 13. Since we don't require accounts or collect personal data, children can use FridgeoAI safely under parental supervision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time to reflect changes in our practices or for legal reasons. We will post any updates on this page with a new "Last updated" date. Continued use of FridgeoAI after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy or how we handle your data, please reach out:
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
