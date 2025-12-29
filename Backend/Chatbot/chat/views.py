from django.shortcuts import render
import json
from django.http import JsonResponse
import os
# from google import genai
import litellm
from .models import Message
from django.views.decorators.csrf import csrf_exempt
from pathlib import Path
from django.conf import settings

KB_PATH = Path(settings.BASE_DIR) / "chat.txt"
KB_TEXT = KB_PATH.read_text(encoding="utf-8")



# Create your views here.
@csrf_exempt
def chat_api(request):
    if request.method!="POST":
        return JsonResponse({"response":"method not allowed"})
    
    try:
        body=json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"response":"Invalid json"})
    
    msg=(body.get("message") or "").strip()
    Message.objects.create(sender="user",text=msg)
    
    prompt = f"""
    You are a helpful assistant for Aspire Internship Program.
    Answer ONLY using the facts in the KNOWLEDGE BASE.
    If the answer isn't in the knowledge base, say: "I don't have that info in my file."

    KNOWLEDGE BASE:
    {KB_TEXT}

    User question: {msg}
    """

    # api_key = os.environ.get("GEMINI_API_KEY")
    # client = genai.Client(api_key=api_key)

    # gemini-2.5-flash
    # response = client.models.generate_content(
    #     model="gemini-3-flash-preview",
    #     contents=prompt,
    # )

    # gemini=response.text
    
    api_key = os.environ.get('GROQ_API_KEY')
    if not api_key:
        return JsonResponse({"response": "Missing GROQ_API_KEY"}, status=500)


    response = litellm.completion(
        model="groq/llama-3.3-70b-versatile", 
        messages=[
        {"role": "user", "content": prompt}
    ],
    )
    
    bot_text = response["choices"][0]["message"]["content"]

    Message.objects.create(sender="bot", text=bot_text)
    return JsonResponse({"response": bot_text})

    
    # echo $env:GEMINI_API_KEY


@csrf_exempt

def history_api(request):
    msgs=Message.objects.order_by("created_at")
    
    data=[{"sender": m.sender,
          "text":m.text,
          "time":m.created_at.strftime("%H:%M")} for m in msgs]
    return JsonResponse({"messages":data})
    
    