import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
api_key = os.getenv("EMERGENT_LLM_KEY")

OUT = "/app/frontend/src/assets/planets"
os.makedirs(OUT, exist_ok=True)

COMMON = " A single perfectly round planet centered and filling the square frame, floating in deep dark starry cosmic space, cinematic volumetric lighting, hyperrealistic, ultra detailed, 8k, no text, no watermark."

PROMPTS = {
    "water": "A glowing planet made entirely of luminous bioluminescent ocean water, deep blue and teal glow, dolphins and a majestic whale swimming across the sphere surface, hints of a submerged golden Atlantis city with softly glowing structures beneath the waves, magical, serene." + COMMON,
    "wood": "A glowing living forest planet covered in towering giant sequoia redwood trees and lush emerald canopy, tiny magical glowing green tree-elves and warm fireflies among the branches, soft golden light streaming where the forest grows toward the light, enchanted, alive." + COMMON,
    "fire": "A glowing planet of living flame and molten golden light, radiant divine golden sparks (божі іскри) flying off the surface like embers and sacred sparks, intense warm orange and gold glow, powerful and pure energy." + COMMON,
    "earth": "A grounded planet of rich dark soil, stone, moss and glowing crystal caves, tiny magical gnomes and dwarves with warm lanterns near glowing cave entrances, amber and green grounding glow, cozy and mystical." + COMMON,
    "metal": "A sleek chrome-silver planet with an intricate mechanical circuit and gear surface, elegant sacred-geometry engravings, soft AI blue-white glow, precise reflective automated structure symbolizing systems and automation, futuristic and refined." + COMMON,
}

async def gen(name, prompt):
    chat = LlmChat(api_key=api_key, session_id=f"planet-{name}", system_message="You are an expert cinematic concept artist.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt)
    _, images = await chat.send_message_multimodal_response(msg)
    if images:
        data = base64.b64decode(images[0]["data"])
        p = f"{OUT}/{name}.png"
        with open(p, "wb") as f:
            f.write(data)
        print("SAVED", name, len(data))
    else:
        print("NO IMAGE", name)

async def main():
    for name, prompt in PROMPTS.items():
        try:
            await gen(name, prompt)
        except Exception as e:
            print("ERR", name, str(e)[:120])

asyncio.run(main())
