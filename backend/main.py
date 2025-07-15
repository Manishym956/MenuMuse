# import os
# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from dotenv import load_dotenv
# import google.generativeai as genai

# load_dotenv()

# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# genai.configure(api_key=GEMINI_API_KEY)

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class MenuRequest(BaseModel):
#     menu_text: str

# @app.post("/recommend")
# async def recommend(request: MenuRequest):
#     prompt = f"""
#     Here is a restaurant menu:
#     {request.menu_text}
    
#     Please pick ONE standout dish from this menu and explain your choice in a fun, foodie way. Respond in JSON like this: {{\"dish\": \"Dish Name\", \"reason\": \"Your reasoning here\"}}
#     """
#     model = genai.GenerativeModel('models/gemini-pro')
#     response = model.generate_content(prompt)
#     # Try to extract JSON from the response
#     import json
#     import re
#     match = re.search(r'\{.*\}', response.text, re.DOTALL)
#     if match:
#         try:
#             return json.loads(match.group(0))
#         except Exception:
#             pass
#     return {"dish": "Could not parse response", "reason": response.text} 

import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MenuRequest(BaseModel):
    menu_text: str

@app.post("/recommend")
async def recommend(request: MenuRequest):
    prompt = f"""
    You are a professional food critic.
    Here is a restaurant menu:
    {request.menu_text}

    From Only the dishes available in menu, DO NOT add or recommend any other dishes outside the menu.
    
    Please pick ONE standout dish from this menu and explain your choice in a fun, foodie way. Respond in JSON like this: {{\"dish\": \"Dish Name\", \"reason\": \"Your reasoning here\"}}

    Imortant Rules YOU HAVE TO FOLLOW:
    - Do NOT mention yourself, the AI, or the model.
    - Only pick dishes from the menu.
    - NEVER list multiple dishes.
    - Do NOT include apologies, disclaimers, or any text outside the JSON.
    - Do NOT say "I can't" or similar phrases.
    """
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        print(response.text)
        # Try to extract JSON from the response
        import json
        import re
        match = re.search(r'\{.*\}', response.text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(0))
            except Exception:
                pass
        return {"dish": "Could not parse response", "reason": response.text} 
    except Exception as e:
        print(f"Error: {e}")
        return {"dish": "Error", "reason": "Could not get recommendation."}