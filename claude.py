import re
import os
import anthropic
from dotenv import load_dotenv

load_dotenv()


def log(text):
    print(text)


def claude(user_prompt: str, max_tokens_to_sample: int = 7000):
    c = anthropic.Client(os.environ["ANTHROPIC_API_KEY"])
    prompt = f"{anthropic.HUMAN_PROMPT} {user_prompt}{anthropic.AI_PROMPT}"
    log(prompt)
    resp = c.completion(
        prompt=prompt,
        stop_sequences=[anthropic.HUMAN_PROMPT],
        temperature=0.8,
        model="claude-v1",
        max_tokens_to_sample=max_tokens_to_sample,
    )
    res = resp["completion"].strip()
    log(res)
    return res


def extract_tag_value(tag, text):
    matches = re.findall(f"<{tag}>(.*?)</{tag}>", text, re.DOTALL)
    values = []
    for match in matches:
        values.append(match.strip())
    return values


def generate_image_description_for_a_word(word: str):
    if not word:
        return

    prompt = f"""
    I give you a word, you generate a vivid story, and the main idea of the story is to explain the word so that the person who has seen it can make a connection with the word in his or her head and remember the word by understanding it.
    the story should not exceed 300 words
    the story should avoid text on paper or dialog
    Use high-frequency words commonly used in life to generate stories as much as possible, avoiding out-of-the-way words
  
    word: <word/>
    output: <story></story>

    word: <word>{word}</word>
    output:
    """
    res = claude(prompt)

    prompt = f"""
    I will give you a story, please break this story into smaller pieces, each piece should not exceed 60 words
    story: <story/>
    output:
    <part_of_story></part_of_story>
    <part_of_story></part_of_story>
    <part_of_story></part_of_story>

    story: <story>{res}</story>
    output:
    """
    res = claude(prompt)
    part_of_stories = extract_tag_value("part_of_story", res)

    prompt = f"""
    generate a detailed midjourney prompt for every part of story

    story_parts:
    <part_of_story></part_of_story>
    <part_of_story></part_of_story>
    <part_of_story></part_of_story>
    output:
    <midjourney_prompt></midjourney_prompt>
    <midjourney_prompt></midjourney_prompt>
    <midjourney_prompt></midjourney_prompt>

    story_parts: {res}
    output:
    """
    res = claude(prompt)

    mj_prompts = extract_tag_value("midjourney_prompt", res)

    return {"part_of_stories": part_of_stories, "mj_prompts": mj_prompts}


# generate_image_description_for_a_word("reverberate")
