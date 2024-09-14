from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from datetime import datetime

app = FastAPI()

HACKER_NEWS_TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/newstories.json"
HACKER_NEWS_ITEM_URL = "https://hacker-news.firebaseio.com/v0/item/{}.json"

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

@app.get('/')
def index():
    return {'message': 'Welcome'}

@app.get("/top-stories/")
async def get_top_stories():
    try:
        response = requests.get(HACKER_NEWS_TOP_STORIES_URL)
        response.raise_for_status()
        story_id = response.json()

        stories = []
        for i in story_id[:10]:
            story_response = requests.get(HACKER_NEWS_ITEM_URL.format(i))
            story_response.raise_for_status()
            story_data = story_response.json()

            formatted_time = datetime.fromtimestamp(story_data["time"]).strftime('%d-%m-%Y %H:%M:%S')

            story = {
                "title": story_data.get("title"),
                "author": story_data.get("by"),
                "url": story_data.get("url"),
                "score": story_data.get("score"),
                "time": formatted_time
            }
            stories.append(story)

        return stories
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=503, detail="Unable to fetch data from HackerNews API")
