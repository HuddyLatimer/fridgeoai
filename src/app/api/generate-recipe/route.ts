import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { ingredients, dietaryPreferences, cookingTime, skillLevel, servings } = await request.json();

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: "No ingredients provided" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const ingredientsList = ingredients.map((ing: any) =>
      `${ing.quantity ? ing.quantity + ' ' : ''}${ing.name}`
    ).join(', ');

    const dietaryRestrictions = dietaryPreferences && dietaryPreferences.length > 0
      ? `\nDietary restrictions: ${dietaryPreferences.join(', ')}`
      : '';

    const timeConstraint = cookingTime
      ? `\nPreferred cooking time: ${cookingTime}`
      : '';

    const skillConstraint = skillLevel
      ? `\nCooking skill level: ${skillLevel}`
      : '';

    const servingsInfo = servings
      ? `\nNumber of servings: ${servings}`
      : '';

    const prompt = `You are an expert chef and recipe creator. Create a delicious, practical recipe using the following ingredients:

Available ingredients: ${ingredientsList}${dietaryRestrictions}${timeConstraint}${skillConstraint}${servingsInfo}

IMPORTANT INSTRUCTIONS:
- Create ONE complete recipe that uses as many of the available ingredients as possible
- The recipe MUST be feasible with the provided ingredients
- If you need a few common pantry staples (salt, pepper, oil, water), you may include them
- Be creative but practical
- Provide clear, step-by-step instructions
- Include cooking times and temperatures
- Suggest substitutions if helpful
- Consider the dietary restrictions carefully

Return the recipe as a JSON object with this EXACT structure:
{
  "recipeName": "Name of the dish",
  "description": "Brief description of the dish (2-3 sentences)",
  "prepTime": "X minutes",
  "cookTime": "X minutes",
  "totalTime": "X minutes",
  "servings": number,
  "difficulty": "Easy/Medium/Hard",
  "ingredients": [
    {
      "item": "ingredient name",
      "amount": "quantity and unit",
      "isFromUserList": true/false
    }
  ],
  "instructions": [
    {
      "step": 1,
      "instruction": "Detailed instruction",
      "time": "X minutes (optional)",
      "tips": "Helpful tip (optional)"
    }
  ],
  "nutritionEstimate": {
    "calories": "approximate per serving",
    "protein": "approximate",
    "carbs": "approximate",
    "fat": "approximate"
  },
  "tags": ["tag1", "tag2"],
  "tips": [
    "Helpful cooking tip or variation"
  ],
  "pairingSuggestions": "What to serve with this dish"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe. Please try again." },
      { status: 500 }
    );
  }
}
