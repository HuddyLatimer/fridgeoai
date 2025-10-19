"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Upload,
  X,
  Plus,
  Minus,
  ChefHat,
  Clock,
  Users,
  Flame,
  Leaf,
  Wheat,
  Fish,
  Milk,
  Apple,
  Sparkles,
  ArrowRight,
  Check,
  Edit2,
  Trash2,
  RefreshCw,
  SwitchCamera,
} from "lucide-react";

interface Ingredient {
  name: string;
  quantity: string;
  category?: string;
}

interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: string;
  ingredients: Array<{
    item: string;
    amount: string;
    isFromUserList: boolean;
  }>;
  instructions: Array<{
    step: number;
    instruction: string;
    time?: string;
    tips?: string;
  }>;
  nutritionEstimate: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  tags: string[];
  tips: string[];
  pairingSuggestions: string;
}

export default function GenerateRecipe() {
  const [step, setStep] = useState(1);
  const [storageType, setStorageType] = useState<"fridge" | "pantry">("fridge");
  const [uploadMethod, setUploadMethod] = useState<"photo" | "manual" | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detectedIngredients, setDetectedIngredients] = useState<Ingredient[]>([]);
  const [manualIngredients, setManualIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "" });
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [servings, setServings] = useState(2);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectingIngredients, setDetectingIngredients] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [isMobile, setIsMobile] = useState(false);
  const [originalDetectedIngredients, setOriginalDetectedIngredients] = useState<Ingredient[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Detect if mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dietaryOptions = [
    { id: "vegetarian", label: "Vegetarian", icon: Leaf },
    { id: "vegan", label: "Vegan", icon: Apple },
    { id: "gluten-free", label: "Gluten-Free", icon: Wheat },
    { id: "dairy-free", label: "Dairy-Free", icon: Milk },
    { id: "pescatarian", label: "Pescatarian", icon: Fish },
    { id: "keto", label: "Keto", icon: Flame },
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      detectIngredientsFromImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const detectIngredientsFromImage = async (imageData: string) => {
    setDetectingIngredients(true);
    setError(null);

    try {
      const response = await fetch("/api/detect-ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData,
          storageType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to detect ingredients");
      }

      const data = await response.json();
      const ingredients = data.ingredients || [];
      setDetectedIngredients(ingredients);
      setOriginalDetectedIngredients(JSON.parse(JSON.stringify(ingredients))); // Deep copy
      setStep(2);
    } catch (err) {
      setError("Failed to detect ingredients. Please try again or enter them manually.");
      console.error(err);
    } finally {
      setDetectingIngredients(false);
    }
  };

  // Log detection feedback when user proceeds from step 2 to step 3
  const logDetectionFeedback = async () => {
    if (originalDetectedIngredients.length === 0) return;

    const allCurrentIngredients = [...detectedIngredients, ...manualIngredients];

    try {
      await fetch("/api/log-detection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          detectedIngredients: originalDetectedIngredients,
          userCorrections: allCurrentIngredients,
          storageType,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      // Silent fail - don't interrupt user experience
      console.log("Logging feedback for AI improvement");
    }
  };

  const startCamera = useCallback(async () => {
    try {
      setError(null);

      // Enhanced camera constraints for better mobile support
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920, max: 3840 },
          height: { ideal: 1080, max: 2160 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video to be ready
        await videoRef.current.play();
      }

      setShowCamera(true);
      setUploadMethod("photo");
    } catch (err) {
      console.error("Camera error:", err);
      setError("Unable to access camera. Please check permissions or upload a photo instead.");
      // Fallback to file upload
      fileInputRef.current?.click();
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  }, [stream]);

  const switchCamera = useCallback(() => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    setTimeout(() => startCamera(), 100);
  }, [stopCamera, startCamera]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg", 0.8);

    setImagePreview(imageData);
    stopCamera();
    detectIngredientsFromImage(imageData);
  }, [stopCamera]);

  const addManualIngredient = () => {
    if (newIngredient.name.trim()) {
      setManualIngredients([...manualIngredients, { ...newIngredient }]);
      setNewIngredient({ name: "", quantity: "" });
    }
  };

  const removeIngredient = (index: number, isManual: boolean) => {
    if (isManual) {
      setManualIngredients(manualIngredients.filter((_, i) => i !== index));
    } else {
      setDetectedIngredients(detectedIngredients.filter((_, i) => i !== index));
    }
  };

  const editIngredient = (index: number, field: "name" | "quantity", value: string, isManual: boolean) => {
    if (isManual) {
      const updated = [...manualIngredients];
      updated[index][field] = value;
      setManualIngredients(updated);
    } else {
      const updated = [...detectedIngredients];
      updated[index][field] = value;
      setDetectedIngredients(updated);
    }
  };

  const toggleDietaryPreference = (pref: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const generateRecipe = async () => {
    setLoading(true);
    setError(null);

    const allIngredients = [...detectedIngredients, ...manualIngredients];

    if (allIngredients.length === 0) {
      setError("Please add at least one ingredient");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: allIngredients,
          dietaryPreferences,
          cookingTime,
          skillLevel,
          servings,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      setRecipe(data);
      setStep(4);
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setStep(1);
    setUploadMethod(null);
    setImagePreview(null);
    setDetectedIngredients([]);
    setManualIngredients([]);
    setDietaryPreferences([]);
    setCookingTime("");
    setSkillLevel("");
    setServings(2);
    setRecipe(null);
    setError(null);
  };

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
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      s === step
                        ? "bg-primary text-white scale-110"
                        : s < step
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {s < step ? <Check size={20} /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`w-12 h-1 mx-2 transition-all ${
                        s < step ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 text-sm text-gray-600">
              <span className="font-semibold">
                {step === 1 && "Choose Storage & Upload"}
                {step === 2 && "Review Ingredients"}
                {step === 3 && "Set Preferences"}
                {step === 4 && "Your Recipe"}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)}>
                <X size={20} />
              </button>
            </div>
          )}

          {/* Step 1: Storage Type & Upload Method */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-black">
                  Let's Create Your <span className="gradient-text">Perfect Recipe</span>
                </h1>
                <p className="text-xl text-gray-600">
                  First, tell us where your ingredients are stored
                </p>
              </div>

              {/* Storage Type Selection */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button
                  onClick={() => setStorageType("fridge")}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    storageType === "fridge"
                      ? "border-primary bg-primary/5 shadow-lg scale-105"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="text-6xl mb-4">🧊</div>
                  <h3 className="text-2xl font-bold mb-2 text-black">Fridge</h3>
                  <p className="text-gray-600">
                    Fresh produce, dairy, meats, and perishables
                  </p>
                </button>

                <button
                  onClick={() => setStorageType("pantry")}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    storageType === "pantry"
                      ? "border-primary bg-primary/5 shadow-lg scale-105"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="text-6xl mb-4">🏺</div>
                  <h3 className="text-2xl font-bold mb-2 text-black">Pantry</h3>
                  <p className="text-gray-600">
                    Dry goods, canned items, spices, and shelf-stable foods
                  </p>
                </button>
              </div>

              {/* Upload Method Selection */}
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">
                  How would you like to add ingredients?
                </h2>
                <div className={`grid ${isMobile ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                  {isMobile && (
                    <button
                      onClick={startCamera}
                      disabled={detectingIngredients}
                      className="p-8 rounded-2xl border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-black">
                        Take Photo
                      </h3>
                      <p className="text-gray-600">
                        Use your camera to capture ingredients
                      </p>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUploadMethod("photo");
                      fileInputRef.current?.click();
                    }}
                    disabled={detectingIngredients}
                    className="p-8 rounded-2xl border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-black">
                      Upload Photo
                    </h3>
                    <p className="text-gray-600">
                      Choose an image from your device
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      setUploadMethod("manual");
                      setStep(2);
                    }}
                    className="p-8 rounded-2xl border-2 border-gray-200 hover:border-primary transition-all hover:shadow-lg"
                  >
                    <Edit2 className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-black">
                      Enter Manually
                    </h3>
                    <p className="text-gray-600">
                      Type in your ingredients
                    </p>
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Camera Modal - Fullscreen Native-like Experience */}
              {showCamera && (
                <div className="fixed inset-0 bg-black z-[9999] flex flex-col">
                  {/* Camera Header */}
                  <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4 safe-area-top">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={stopCamera}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                      >
                        <X size={24} className="text-white" />
                      </button>
                      <div className="text-white text-sm font-medium">
                        Capture {storageType === 'fridge' ? 'Fridge' : 'Pantry'}
                      </div>
                      <button
                        onClick={switchCamera}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                      >
                        <SwitchCamera size={24} className="text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Video Feed - Full Screen */}
                  <div className="relative flex-1 overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Overlay Grid for Alignment (optional) */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="w-full h-full border-2 border-white/20 m-8" style={{ borderStyle: 'dashed' }}></div>
                    </div>
                  </div>

                  {/* Camera Controls - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pb-8 safe-area-bottom">
                    <div className="flex items-center justify-center gap-6">
                      <button
                        onClick={capturePhoto}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 relative"
                      >
                        <div className="w-16 h-16 bg-white rounded-full border-4 border-black"></div>
                      </button>
                    </div>
                    <p className="text-white text-center mt-4 text-sm opacity-90">
                      Tap to capture • Position your {storageType} in frame
                    </p>
                  </div>
                </div>
              )}

              {detectingIngredients && (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
                  <p className="text-lg text-gray-600">
                    Analyzing your {storageType} image...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    This may take a few moments
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Review & Edit Ingredients */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-black">
                  Review Your <span className="gradient-text">Ingredients</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Edit quantities, remove items, or add more ingredients
                </p>
              </div>

              {imagePreview && (
                <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Uploaded"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Detected Ingredients */}
              {detectedIngredients.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-black">
                    Detected Ingredients
                  </h3>
                  <div className="space-y-3">
                    {detectedIngredients.map((ing, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <input
                          type="text"
                          value={ing.name}
                          onChange={(e) =>
                            editIngredient(idx, "name", e.target.value, false)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Ingredient name"
                        />
                        <input
                          type="text"
                          value={ing.quantity}
                          onChange={(e) =>
                            editIngredient(idx, "quantity", e.target.value, false)
                          }
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Amount"
                        />
                        <button
                          onClick={() => removeIngredient(idx, false)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Ingredients */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-black">
                  Add More Ingredients
                </h3>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={newIngredient.name}
                    onChange={(e) =>
                      setNewIngredient({ ...newIngredient, name: e.target.value })
                    }
                    onKeyPress={(e) => e.key === "Enter" && addManualIngredient()}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ingredient name (e.g., Tomatoes)"
                  />
                  <input
                    type="text"
                    value={newIngredient.quantity}
                    onChange={(e) =>
                      setNewIngredient({ ...newIngredient, quantity: e.target.value })
                    }
                    onKeyPress={(e) => e.key === "Enter" && addManualIngredient()}
                    className="w-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Amount"
                  />
                  <button
                    onClick={addManualIngredient}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add
                  </button>
                </div>

                {manualIngredients.length > 0 && (
                  <div className="space-y-3">
                    {manualIngredients.map((ing, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20"
                      >
                        <input
                          type="text"
                          value={ing.name}
                          onChange={(e) =>
                            editIngredient(idx, "name", e.target.value, true)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={ing.quantity}
                          onChange={(e) =>
                            editIngredient(idx, "quantity", e.target.value, true)
                          }
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button
                          onClick={() => removeIngredient(idx, true)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    logDetectionFeedback();
                    setStep(3);
                  }}
                  disabled={
                    detectedIngredients.length === 0 &&
                    manualIngredients.length === 0
                  }
                  className="px-8 py-3 gradient-bg text-white rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-black">
                  Customize Your <span className="gradient-text">Recipe</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Tell us about your dietary needs and preferences
                </p>
              </div>

              {/* Dietary Preferences */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-black">
                  Dietary Preferences
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dietaryOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = dietaryPreferences.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleDietaryPreference(option.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 mx-auto mb-2 ${
                            isSelected ? "text-primary" : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-semibold ${
                            isSelected ? "text-primary" : "text-gray-700"
                          }`}
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Preferences */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-black">
                    <Clock className="inline w-4 h-4 mr-2" />
                    Preferred Cooking Time
                  </label>
                  <select
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Any time</option>
                    <option value="under-15">Under 15 minutes</option>
                    <option value="15-30">15-30 minutes</option>
                    <option value="30-60">30-60 minutes</option>
                    <option value="over-60">Over 1 hour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-black">
                    <ChefHat className="inline w-4 h-4 mr-2" />
                    Cooking Skill Level
                  </label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Any level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Servings */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-black">
                  <Users className="inline w-4 h-4 mr-2" />
                  Number of Servings
                </label>
                <div className="flex items-center gap-4 max-w-xs">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-3xl font-bold text-black w-16 text-center">
                    {servings}
                  </span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={generateRecipe}
                  disabled={loading}
                  className="px-8 py-3 gradient-bg text-white rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={20} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Recipe
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Recipe Display */}
          {step === 4 && recipe && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-black">
                  {recipe.recipeName}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {recipe.description}
                </p>
              </div>

              {/* Recipe Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary/5 p-4 rounded-xl text-center border border-primary/20">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Total Time</div>
                  <div className="font-bold text-black">{recipe.totalTime}</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl text-center border border-primary/20">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Servings</div>
                  <div className="font-bold text-black">{recipe.servings}</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl text-center border border-primary/20">
                  <ChefHat className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <div className="font-bold text-black">{recipe.difficulty}</div>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl text-center border border-primary/20">
                  <Flame className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Calories</div>
                  <div className="font-bold text-black">
                    {recipe.nutritionEstimate.calories}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {recipe.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Ingredients */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4 text-black">Ingredients</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {recipe.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        ing.isFromUserList
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-white"
                      }`}
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-gray-700">
                        <span className="font-semibold">{ing.amount}</span> {ing.item}
                      </span>
                      {ing.isFromUserList && (
                        <span className="ml-auto text-xs text-primary font-semibold">
                          From your list
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-black">Instructions</h2>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction) => (
                    <div
                      key={instruction.step}
                      className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {instruction.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">{instruction.instruction}</p>
                        {instruction.time && (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <Clock size={16} />
                            {instruction.time}
                          </div>
                        )}
                        {instruction.tips && (
                          <div className="mt-2 text-sm text-gray-600 italic">
                            💡 Tip: {instruction.tips}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition */}
              <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4 text-black">
                  Nutrition (per serving)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Calories</div>
                    <div className="text-xl font-bold text-black">
                      {recipe.nutritionEstimate.calories}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Protein</div>
                    <div className="text-xl font-bold text-black">
                      {recipe.nutritionEstimate.protein}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Carbs</div>
                    <div className="text-xl font-bold text-black">
                      {recipe.nutritionEstimate.carbs}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Fat</div>
                    <div className="text-xl font-bold text-black">
                      {recipe.nutritionEstimate.fat}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips & Pairing */}
              {recipe.tips && recipe.tips.length > 0 && (
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                  <h2 className="text-2xl font-bold mb-4 text-black">
                    Pro Tips
                  </h2>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.pairingSuggestions && (
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                  <h2 className="text-2xl font-bold mb-4 text-black">
                    Pairing Suggestions
                  </h2>
                  <p className="text-gray-700">{recipe.pairingSuggestions}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetAll}
                  className="px-8 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary/10 transition-all flex items-center gap-2 justify-center"
                >
                  <RefreshCw size={20} />
                  Create Another Recipe
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-8 py-3 gradient-bg text-white rounded-full hover:opacity-90 transition-all"
                >
                  Print Recipe
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
