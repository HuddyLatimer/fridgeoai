import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { image, storageType } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const storageContext = storageType === "pantry"
      ? "This is a pantry storage area. Look for dry goods, canned items, packaged foods, spices, oils, grains, pasta, baking ingredients, snacks, and shelf-stable items."
      : "This is a refrigerator/fridge. Look for fresh produce, dairy products, meats, beverages, condiments, leftovers, eggs, and perishable items.";

    const prompt = `${storageContext}

You are an expert food recognition AI specializing in analyzing real-world food storage images. Your task is to identify visible food items with maximum accuracy while handling various conditions (messy, cluttered, well-organized, bright, dim lighting, etc.).

CORE MISSION: Achieve ZERO false positives while maintaining high detection rate for visible items.

DETECTION STRATEGY - COMPREHENSIVE ANALYSIS:

1. VISUAL SCANNING METHODOLOGY:
   - Systematically scan the entire image: top to bottom, left to right
   - Examine ALL visible areas including corners, shelves, drawers, door compartments
   - Look at foreground AND background items
   - Check items that are stacked, overlapping, or partially obscured
   - Identify items even in disorganized or cluttered arrangements

2. MULTI-LAYER IDENTIFICATION APPROACH:

   A. PRIMARY IDENTIFIERS (Highest Confidence):
      - Direct label reading: Brand names, product labels, text on packaging
      - Distinctive packaging: Unique shapes, logos, color combinations
      - Clear product visibility: Unobstructed view of the item

   B. SECONDARY IDENTIFIERS (High Confidence):
      - Color + Shape combinations (e.g., red sphere + apple texture = apple)
      - Partial labels or packaging visible (50%+ of identifying features)
      - Context clues (e.g., egg carton shape, milk jug silhouette)

   C. TERTIARY IDENTIFIERS (Use with Caution):
      - Texture and surface patterns (produce skin, meat marbling)
      - Size and proportion relative to known items
      - Standard container shapes (ketchup bottle shape, yogurt cup)

3. ACCURACY RULES - ABSOLUTE REQUIREMENTS:

   ✓ INCLUDE IF:
   - You can see 50%+ of the item AND can identify it with 90%+ confidence
   - Clear distinguishing features are visible (labels, colors, shapes, textures)
   - Multiple identification clues confirm the same item
   - Partial visibility still shows unmistakable characteristics

   ✗ EXCLUDE IF:
   - Item is too blurry, dark, or out of focus to identify clearly
   - Only seeing generic shapes without distinguishing features
   - Making assumptions based on what "typically" is stored there
   - Less than 90% confident in your identification
   - Could be multiple different items (ambiguous)

4. CATEGORY-SPECIFIC DETECTION:

   PRODUCE:
   - Look for: Natural colors, organic textures, characteristic shapes
   - Confirm with: Skin texture (citrus dimples, apple smoothness, leafy veins)
   - Common items: Apples, oranges, bananas, lettuce, tomatoes, carrots, onions, peppers

   DAIRY:
   - Look for: Carton shapes, white/cream colors, brand logos
   - Confirm with: Container shapes (milk jugs, yogurt cups, cheese blocks)
   - Common items: Milk, yogurt, cheese, butter, cream

   PROTEINS/MEATS:
   - Look for: Styrofoam trays, plastic wrap, butcher paper, red/pink colors
   - Confirm with: Meat texture, packaging labels (beef, chicken, pork)
   - Common items: Chicken breast, ground beef, bacon, deli meat, fish

   CONDIMENTS/SAUCES:
   - Look for: Bottle/jar shapes, distinctive caps, label colors
   - Confirm with: Brand recognition, typical containers (ketchup squeeze, mayo jar)
   - Common items: Ketchup, mustard, mayo, salad dressing, soy sauce, hot sauce

   BEVERAGES:
   - Look for: Can/bottle shapes, brand logos, distinctive colors
   - Confirm with: Container types (soda cans, juice cartons, water bottles)
   - Common items: Soda, juice, beer, wine, sparkling water

   PACKAGED/SHELF-STABLE:
   - Look for: Box shapes, bag packaging, clear labels, brand logos
   - Confirm with: Product type text, nutritional labels, recognizable branding
   - Common items: Cereal, pasta boxes, canned goods, bread bags, tortillas

5. QUANTITY ESTIMATION:
   - Count exact numbers when items are clearly visible (e.g., "3 apples")
   - Use approximate language when stacked/unclear (e.g., "several", "multiple")
   - Leave blank if quantity cannot be reasonably estimated
   - Consider: Is item individual or bulk container?

6. LIGHTING & IMAGE QUALITY HANDLING:
   - Bright/well-lit: Higher confidence, more detail visible
   - Dim/shadowy: Reduce confidence, focus on high-certainty items only
   - Blurry: Skip items unless distinctive features still clear
   - Partial obstruction: Identify only if remaining visible portion is conclusive

7. COMMON PITFALLS TO AVOID:
   - DON'T confuse similar produce (oranges vs grapefruits without size context)
   - DON'T assume generic white bottles are milk without confirmation
   - DON'T list condiments you can't distinguish (generic brown sauce bottles)
   - DON'T guess items based on typical fridge contents
   - DON'T include reflections, shadows, or image artifacts as items

RESPONSE FORMATTING:
- Use specific, recognizable names (e.g., "red bell pepper" not just "pepper")
- Include descriptive details that help user confirm (e.g., "sliced deli turkey" vs "turkey")
- Categorize accurately to help recipe generation
- Set confidence level honestly based on image quality and detection certainty
- In notes, briefly mention image conditions and detection approach used

QUALITY MANTRA: It's better to identify 10 items with 100% accuracy than 20 items with 80% accuracy. User trust depends on ZERO false positives.

Return the results as a JSON object with this exact structure:
{
  "ingredients": [
    {
      "name": "specific ingredient name",
      "quantity": "amount if countable, or empty string",
      "category": "produce/dairy/meat/grains/condiments/beverages/other"
    }
  ],
  "confidence": "high/medium/low",
  "notes": "brief observation about image quality, organization, and detection approach used"
}`;

    const imageData = image.split(",")[1];
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData,
        },
      },
    ]);

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
    console.error("Error detecting ingredients:", error);
    return NextResponse.json(
      { error: "Failed to detect ingredients. Please try again." },
      { status: 500 }
    );
  }
}
