import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")
api_key = os.getenv("EMERGENT_LLM_KEY")
OUT = "/app/frontend/src/assets/planets"
os.makedirs(OUT, exist_ok=True)

COMMON = " A single perfectly round planet centered and filling the square frame, floating in deep dark starry cosmic space, cinematic volumetric lighting, hyperrealistic, ultra detailed, 8k, no text, no watermark."

PROMPTS = {
    "fire": "A glowing circular orb planet of living divine fire, a radiant ethereal phoenix-like fire spirit woman made of living flames and golden sacred sparks (divine sparks / божі іскри) rising within the blaze, intense orange and gold glow, swirling embers, powerful pure sacred energy." + COMMON,
    "wood": "A glowing circular orb planet of a living enchanted forest, a graceful green forest elf woman sitting beside a majestic giant sacred tree with lush emerald canopy, soft golden light beams, glowing fireflies, magical and alive." + COMMON,
    "earth": "A grounded circular orb planet of earth, cozy magical gnomes and dwarves with warm glowing lanterns beside a little enchanted cottage among giant mushrooms, roots, rich soil and glowing crystal caves, warm amber and green light, homely and mystical." + COMMON,
}

async def gen(name, prompt):
    chat = LlmChat(api_key=api_key, session_id=f"planet2-{name}", system_message="You are an expert cinematic concept artist.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    _, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        with open(f"{OUT}/{name}.png", "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print("SAVED", name, len(images[0]["data"]))
    else:
        print("NO IMAGE", name)

async def main():
    for n, p in PROMPTS.items():
        try:
            await gen(n, p)
        except Exception as e:
            print("ERR", n, str(e)[:100])

asyncio.run(main())
