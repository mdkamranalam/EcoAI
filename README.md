# EcoAI: GenAI-Powered Climate Action Advisor

## Setup Instructions

1. Clone: `git clone <repo-url>`.
2. Install:
   - Frontend: `cd frontend; npm install`.
   - Backend: `cd backend; npm install`.
   - AI: `cd ai-service; pip install -r requirements.txt`.
3. Set env: Add `HUGGINGFACEHUB_API_TOKEN` for Llama; Cerebras creds post-registration.
4. Run: `docker-compose up`.
5. Access: Frontend at `localhost:3000`, API at `localhost:3001`.
6. Deploy: Vercel (`vercel --prod`), Render (`render deploy`).

## Architecture Diagram

![ecoAI Architecture](docs/ecoAI-architecture.png)  
_Diagram created with Draw.io, showing Next.js → Express → Python AI flow._

## Project Demo Video
![ecoAI Demo Video](docs/project_demo_video.mp4)

## Project Demo Video
![EcoAI Demo Video](https://github.com/user-attachments/assets/2c68898f-cf4e-40b0-9731-036114070b18)

## Learning & Growth

As a team, we tackled Cerebras' SDK for the first time, cutting inference from 10s to <1s with batching optimizations. LangChain's RAG was a new tool, enabling cited responses in hours. Docker networking challenges taught us robust service isolation, boosting our DevOps skills.

## Presentation

- **Demo Video**: 2-min Loom showcasing input → footprint → plan → sims.
- **Repo**: Clean code, Prettier/ESLint-formatted, with CI via GitHub Actions.
- **Live Demo**: Hosted on Vercel/Render, accessible to judges.

ecoAI is our bid to make climate action personal and impactful. Let's build a greener future! 🌍 #FutureStackGenAI
