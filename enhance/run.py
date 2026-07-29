import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv("/app/backend/.env")
api_key = os.getenv("EMERGENT_LLM_KEY")

PROMPT = (
    "Using the young man's face in this photo as the exact identity reference, create a "
    "high-quality, photorealistic, cinematic portrait of the SAME person. IMPORTANT: remove "
    "the safety glasses/eyewear completely so his natural eyes are fully visible and clear. "
    "Keep his real facial features, warm calm expression, light stubble, and youthful look. "
    "Dress him in a clean off-white / cream hoodie. Place him standing calmly in a serene "
    "mystical mountain landscape at golden-hour twilight with a deep starry cosmic sky, subtle "
    "gold and teal light, soft glow, spiritual meditative atmosphere. Ethical, grounded, alive, "
    "modern-yogi vibe. Ultra sharp, high detail, natural skin, professional photography, 4k."
)

async def main():
    with open("/app/enhance/p1.jpg", "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    chat = LlmChat(api_key=api_key, session_id="enhance-face-1", system_message="You are an expert portrait photo editor.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=PROMPT, file_contents=[ImageContent(b64)])
    text, images = await chat.send_message_multimodal_response(msg)
    print("TEXT:", (text or "")[:120])
    if images:
        for i, img in enumerate(images):
            data = base64.b64decode(img["data"])
            out = f"/app/frontend/src/assets/portrait.png"
            os.makedirs(os.path.dirname(out), exist_ok=True)
            with open(out, "wb") as f:
                f.write(data)
            print("SAVED", out, len(data))
    else:
        print("NO IMAGES")

asyncio.run(main())
