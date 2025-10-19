"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, Bot, Salad, Clock, Smartphone, Lightbulb, ChefHat, Sparkles, UtensilsCrossed, Instagram, Twitter, Facebook, Youtube, MessageCircle } from "lucide-react";
import Script from "next/script";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FridgeoAI",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free AI-powered recipe generator that turns your fridge ingredients into delicious meals. Scan your fridge or pantry, get personalized recipes instantly.",
    "url": "https://fridgeo.app",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1247"
    },
    "featureList": [
      "AI-powered ingredient detection from photos",
      "Personalized recipe generation",
      "Dietary restriction support",
      "Step-by-step cooking instructions",
      "Nutrition information",
      "Fridge and pantry scanning",
      "No signup required",
      "100% free to use"
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I generate a recipe from what's in my fridge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply snap a photo of your fridge or pantry, or manually enter your ingredients. FridgeoAI's AI will analyze your ingredients and generate personalized recipes instantly. No signup or credit card required - it's 100% free!"
        }
      },
      {
        "@type": "Question",
        "name": "What can I make with ingredients I have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FridgeoAI can create unlimited recipe ideas based on any combination of ingredients you have. Whether it's leftovers, pantry staples, or fresh produce, our AI generates creative and delicious meal suggestions tailored to what you have available."
        }
      },
      {
        "@type": "Question",
        "name": "Is FridgeoAI really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! FridgeoAI is 100% free to use with no hidden fees, no signup required, and no credit card needed. Generate unlimited recipes from your ingredients anytime."
        }
      },
      {
        "@type": "Question",
        "name": "Does FridgeoAI support dietary restrictions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! FridgeoAI supports multiple dietary preferences including vegetarian, vegan, gluten-free, dairy-free, pescatarian, and keto diets. You can select your preferences before generating recipes."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo1.png"
                alt="FridgeoAI Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold gradient-text">FridgeoAI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">How It Works</a>
              <a href="#cta" className="text-gray-700 hover:text-primary transition-colors">Get Started</a>
            </div>
            <Link href="/generate" className="gradient-bg text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity inline-block">
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-black">
              Turn Your <span className="gradient-text">Ingredients</span> Into
              <br />
              Delicious Meals
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
              What's in your fridge today? Upload a photo and get instant AI-powered meal ideas. 100% free, no sign-up needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/generate" className="gradient-bg text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 flex items-center gap-2">
                <Camera size={24} />
                Upload Fridge Photo
              </Link>
              <Link href="/generate" className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/10 transition-all flex items-center gap-2">
                <UtensilsCrossed size={24} />
                List Ingredients
              </Link>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="mt-16 relative">
            <div className="gradient-bg rounded-3xl p-8 shadow-2xl animate-float">
              <div className="bg-white rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center gap-8 mb-6">
                    <Camera className="text-primary" size={64} />
                    <ChefHat className="text-primary-dark" size={64} />
                    <Salad className="text-primary" size={64} />
                  </div>
                  <p className="text-gray-500 text-lg font-semibold">AI-Powered Recipe Magic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make cooking easier and more creative
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-slide-up">
              <div className="mb-4 text-primary">
                <Camera size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">Image Recognition</h3>
              <p className="text-gray-600">
                Upload a photo of your fridge and our AI instantly identifies all your ingredients with high accuracy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="mb-4 text-primary">
                <Bot size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">AI-Powered Suggestions</h3>
              <p className="text-gray-600">
                Get personalized recipe recommendations based on what you have and your cooking skill level.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="mb-4 text-primary">
                <Salad size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">Dietary Restrictions</h3>
              <p className="text-gray-600">
                Filter recipes by dietary needs: vegan, vegetarian, gluten-free, keto, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="mb-4 text-primary">
                <Clock size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">Quick & Easy</h3>
              <p className="text-gray-600">
                Find recipes that match your time constraints, from 15-minute meals to elaborate dishes.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="mb-4 text-primary">
                <Smartphone size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">Mobile Friendly</h3>
              <p className="text-gray-600">
                Access your recipes anywhere, anytime. Perfect for grocery shopping or cooking on the go.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="mb-4 text-primary">
                <Lightbulb size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">Smart Substitutions</h3>
              <p className="text-gray-600">
                Missing an ingredient? Get intelligent suggestions for substitutions that work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From ingredients to amazing meals in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="gradient-bg w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Upload or List</h3>
              <p className="text-gray-600 text-lg">
                Take a photo of your fridge or manually enter the ingredients you have available.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="gradient-bg w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">AI Analysis</h3>
              <p className="text-gray-600 text-lg">
                Our AI recognizes your ingredients and analyzes your dietary preferences and restrictions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="gradient-bg w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Get Recipes</h3>
              <p className="text-gray-600 text-lg">
                Receive personalized recipe suggestions with step-by-step instructions and cooking tips.
              </p>
            </div>
          </div>

          {/* Visual Flow */}
          <div className="mt-16 flex justify-center items-center space-x-4 text-primary">
            <Camera size={48} />
            <div className="text-2xl text-gray-400">→</div>
            <Sparkles size={48} />
            <div className="text-2xl text-gray-400">→</div>
            <ChefHat size={48} />
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              What Our Users <span className="gradient-text">Say</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands creating delicious meals from what they have
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400">★★★★★</div>
              </div>
              <p className="text-gray-700 mb-4">
                "Game changer! No more wasting food. Just snap a pic and boom - dinner ideas ready."
              </p>
              <p className="font-semibold text-black">- Sarah M.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400">★★★★★</div>
              </div>
              <p className="text-gray-700 mb-4">
                "I was skeptical but the AI actually recognized everything in my pantry. Recipes were creative and doable!"
              </p>
              <p className="font-semibold text-black">- Mike T.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400">★★★★★</div>
              </div>
              <p className="text-gray-700 mb-4">
                "Best part? It's FREE and I don't need another account. Just works instantly. Love it!"
              </p>
              <p className="font-semibold text-black">- Jessica L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Cooking Smarter Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Unlimited recipe generation. No credit card or sign-up required. Let's cook with what you've got!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate" className="bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2 justify-center">
              <Camera size={24} />
              Start Now - It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Banner */}
      <section className="bg-gradient-to-r from-primary via-primary-dark to-primary py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Growing Community!
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Get daily recipe inspo, cooking tips, and behind-the-scenes content
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            <a
              href="https://instagram.com/fridgeoai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl p-6 text-center transition-all transform hover:scale-105 border-2 border-white/20"
            >
              <Instagram className="mx-auto mb-3 text-white" size={40} />
              <p className="text-white font-semibold">Instagram</p>
              <p className="text-white/80 text-sm">@fridgeoai</p>
            </a>

            <a
              href="https://tiktok.com/@fridgeoai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl p-6 text-center transition-all transform hover:scale-105 border-2 border-white/20"
            >
              <MessageCircle className="mx-auto mb-3 text-white" size={40} />
              <p className="text-white font-semibold">TikTok</p>
              <p className="text-white/80 text-sm">@fridgeoai</p>
            </a>

            <a
              href="https://twitter.com/fridgeoai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl p-6 text-center transition-all transform hover:scale-105 border-2 border-white/20"
            >
              <Twitter className="mx-auto mb-3 text-white" size={40} />
              <p className="text-white font-semibold">Twitter/X</p>
              <p className="text-white/80 text-sm">@fridgeoai</p>
            </a>

            <a
              href="https://youtube.com/@fridgeoai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl p-6 text-center transition-all transform hover:scale-105 border-2 border-white/20"
            >
              <Youtube className="mx-auto mb-3 text-white" size={40} />
              <p className="text-white font-semibold">YouTube</p>
              <p className="text-white/80 text-sm">@fridgeoai</p>
            </a>

            <a
              href="https://facebook.com/fridgeoai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-2xl p-6 text-center transition-all transform hover:scale-105 border-2 border-white/20 col-span-2 md:col-span-1"
            >
              <Facebook className="mx-auto mb-3 text-white" size={40} />
              <p className="text-white font-semibold">Facebook</p>
              <p className="text-white/80 text-sm">fridgeo</p>
            </a>
          </div>

          <div className="text-center mt-10">
            <p className="text-white text-lg font-semibold mb-2">
              Share your creations with us!
            </p>
            <p className="text-white/90 text-xl">
              Use <span className="bg-white/20 px-4 py-2 rounded-full font-bold">#FridgeoAI</span> to get featured
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/logo1.png"
                  alt="FridgeoAI Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold">FridgeoAI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Free AI-powered recipe generation. No sign-up required.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/fridgeoai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://twitter.com/fridgeoai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://facebook.com/fridgeoai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://youtube.com/@fridgeoai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label="Subscribe on YouTube"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://tiktok.com/@fridgeoai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label="Follow us on TikTok"
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#cta" className="hover:text-primary transition-colors">Get Started</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Follow @fridgeoai</h4>
              <p className="text-gray-400 text-sm mb-3">
                Join thousands discovering amazing recipes daily!
              </p>
              <p className="text-primary font-semibold text-sm">
                Tag us in your creations #FridgeoAI
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FridgeoAI. All rights reserved.</p>
            <p className="text-sm mt-2">
              Follow us everywhere: <span className="text-primary font-semibold">@fridgeoai</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
