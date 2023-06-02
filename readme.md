# Antropic hackathon Chatty Tutor Team

The main purpose of this project is to genereate a comic strip from a single word.

NOTE: the backend code is not integrated with the frontend, because we deployed it manually on the GPU server.

## Generating the story

check `claude.py`, the chain of thoughts's prompts is as follows:

1. I give you a word, you generate a vivid story, and the main idea of the story is to explain the word so that the person who has seen it can make a connection with the word in his or her head and remember the word by understanding it.
2. I will give you a story, please break this story into smaller pieces, each piece should not exceed 60 words
3. generate a detailed midjourney prompt for every part of story

## Stable Diffusion Deploy

We use the https://github.com/AUTOMATIC1111/stable-diffusion-webui to generate images for the story.

Also a simple Flask service (check `image_service.py`) to handle the request and upload image to Cloudflare.
