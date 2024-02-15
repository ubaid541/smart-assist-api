# AI Tools Hub (APIs)

AI Tools Hub is a cutting-edge suite of APIs designed to offer a variety of AI-powered tools through a single interface. These APIs enable developers to integrate functionalities such as image generation, summary creation, writing assistance, and interactive AI chatbots into their applications. With a focus on enhancing user experiences, AI Tools Hub features a secure authentication system to manage user sessions and access.

## Features

- **Image Generation API:** Generate images based on textual descriptions using OpenAI's image generation capabilities.
- **Summary Generation API:** Create concise summaries from extensive text inputs leveraging advanced NLP algorithms.
- **Writing Assistant API:** Offer real-time writing suggestions and improvements with AI-based text analysis.
- **AI Chatbot API:** Enable applications to incorporate conversational AI for user assistance and engagement.
- **Authentication System:** Utilize JWT (JSON Web Tokens) for secure and scalable user authentication.

## Tech Stack

- **Frontend:** ReactJS with Vite. Explore the frontend [here](https://github.com/ubaid541/ai-tool-hub).
- **Styling:** Bootstrap for modern and responsive UI components.
- **Backend:** Node.js with Express.js for RESTful API development.
- **Database:** MongoDB for storing user data and application states efficiently.
- **Authentication:** JWT for secure authentication and session management.
- **AI Integration:** OpenAI APIs for powering the AI features within the platform.

## Installation Guide

To set up AI Tools Hub's backend on your local environment, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/ubaid541/smart-assist-api.git
   cd smart-assist-api
   ```
   
2. **Install Dependencies**
   
   ```bash
   npm install
   ```
   
4. Configure Enviroment Variables
   
   Set up your .env file with the necessary configurations (e.g., MongoDB URI, JWT secret, OpenAI API key).

  *MONGOBD*
  *OPENAI_API*
  *JWT*

5. **Start the server**
6. 
   ```bash
   npm start
   ```
