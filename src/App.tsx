import { useState } from "react";
import st from "./App.module.scss";
import { Button, Input, Card } from "antd";

const steps = [
  {
    input: `
  Human:
  I give you a word, you generate a vivid story, and the main idea of the story is to explain the word so that the person who has seen it can make a connection with the word in his or her head and remember the word by understanding it.
  the story should not exceed 300 words
  the story should avoid text on paper or dialog

  word: <word/>
  output: <story></story>

  word: <word>proximity</word>
  output:


Assistant:
  `,
    output: `Assistant:
  <story>
  The old abandoned factory loomed over the neighborhood, a relic of a bygone era. Most of the windows were shattered, the walls covered in graffiti. The rusty metal door creaked as Mark slowly pushed it open. His friends had dared him to explore the inside of the factory at night.
  
  Mark's heart raced as he turned on his flashlight and entered the cavernous space. Moonlight filtered in through the broken windows, casting an eerie glow over the debris and discarded machinery inside. He walked down a corridor, his footsteps echoing loudly.
  
  As Mark turned a corner, a loud crash rang out close by. He froze in place, his breath catching in his throat. It sounded like something heavy had fallen over. He swept his flashlight around but couldn't see anything out of the ordinary.
  
  His imagination began to run wild. What if there were other people inside? Homeless squatters, vandals, or worse? Mark realized with dawning fear that danger could be lurking just outside the beam of his flashlight, hidden in the shadows. The thought of the unknown threats in close proximity, unseen but near at hand, made his skin crawl.
  
  Summoning his courage, Mark hurried toward the exit as fast as he dared. He burst through the rusty door, his heart pounding with relief and residual fear. He had survived his brush with the perils that proximity to the abandoned factory held. Mark decided his friends' dares weren't worth risking his life over. Some places were better left unexplored.
  </story>`,
  },
  {
    input: `
  Human:
  I will give you a story, please break this story into smaller pieces, each piece should not exceed 60 words, the total pieces count should not exceed 6.

  story: <story/>
  output:
  <part_of_story></part_of_story>
  <part_of_story></part_of_story>
  <part_of_story></part_of_story>

  story:   <story>
  The old abandoned factory loomed over the neighborhood, a relic of a bygone era. Most of the windows were shattered, the walls covered in graffiti. The rusty metal door creaked as Mark slowly pushed it open. His friends had dared him to explore the inside of the factory at night.
  
  Mark's heart raced as he turned on his flashlight and entered the cavernous space. Moonlight filtered in through the broken windows, casting an eerie glow over the debris and discarded machinery inside. He walked down a corridor, his footsteps echoing loudly.
  
  As Mark turned a corner, a loud crash rang out close by. He froze in place, his breath catching in his throat. It sounded like something heavy had fallen over. He swept his flashlight around but couldn't see anything out of the ordinary.
  
  His imagination began to run wild. What if there were other people inside? Homeless squatters, vandals, or worse? Mark realized with dawning fear that danger could be lurking just outside the beam of his flashlight, hidden in the shadows. The thought of the unknown threats in close proximity, unseen but near at hand, made his skin crawl.
  
  Summoning his courage, Mark hurried toward the exit as fast as he dared. He burst through the rusty door, his heart pounding with relief and residual fear. He had survived his brush with the perils that proximity to the abandoned factory held. Mark decided his friends' dares weren't worth risking his life over. Some places were better left unexplored.
  </story>
  output:
  `,
    output: `Assistant:
  <part_of_story>
  The old abandoned factory loomed over the neighborhood, a relic of a bygone era. Most of the windows were shattered, the walls covered in graffiti. The rusty metal door creaked as Mark slowly pushed it open. His friends had dared him to explore the inside of the factory at night.
  </part_of_story>

  <part_of_story>
  Mark's heart raced as he turned on his flashlight and entered the cavernous space. Moonlight filtered in through the broken windows, casting an eerie glow over the debris and discarded machinery inside. He walked down a corridor, his footsteps echoing loudly.
  </part_of_story>

  <part_of_story>
  As Mark turned a corner, a loud crash rang out close by. He froze in place, his breath catching in his throat. It sounded like something heavy had fallen over. He swept his flashlight around but couldn't see anything out of the ordinary.
  </part_of_story>

  <part_of_story>
  His imagination began to run wild. What if there were other people inside? Homeless squatters, vandals, or worse? Mark realized with dawning fear that danger could be lurking just outside the beam of his flashlight, hidden in the shadows. The thought of the unknown threats in close proximity, unseen but near at hand, made his skin crawl.
  </part_of_story>

  <part_of_story>
  Summoning his courage, Mark hurried toward the exit as fast as he dared. He burst through the rusty door, his heart pounding with relief and residual fear. He had survived his brush with the perils that proximity to the abandoned factory held. Mark decided his friends' dares weren't worth risking his life over. Some places were better left unexplored.
  </part_of_story>
  `,
  },
  {
    input: `
  generate a detailed midjourney prompt for every part of story

  story_parts:
  <part_of_story></part_of_story>
  <part_of_story></part_of_story>
  <part_of_story></part_of_story>
  output:
  <midjourney_prompt></midjourney_prompt>
  <midjourney_prompt></midjourney_prompt>
  <midjourney_prompt></midjourney_prompt>

  story_parts: 
  <part_of_story>
  The old abandoned factory loomed over the neighborhood, a relic of a bygone era. Most of the windows were shattered, the walls covered in graffiti. The rusty metal door creaked as Mark slowly pushed it open. His friends had dared him to explore the inside of the factory at night.
  </part_of_story>

  <part_of_story>
  Mark's heart raced as he turned on his flashlight and entered the cavernous space. Moonlight filtered in through the broken windows, casting an eerie glow over the debris and discarded machinery inside. He walked down a corridor, his footsteps echoing loudly.
  </part_of_story>

  <part_of_story>
  As Mark turned a corner, a loud crash rang out close by. He froze in place, his breath catching in his throat. It sounded like something heavy had fallen over. He swept his flashlight around but couldn't see anything out of the ordinary.
  </part_of_story>

  <part_of_story>
  His imagination began to run wild. What if there were other people inside? Homeless squatters, vandals, or worse? Mark realized with dawning fear that danger could be lurking just outside the beam of his flashlight, hidden in the shadows. The thought of the unknown threats in close proximity, unseen but near at hand, made his skin crawl.
  </part_of_story>

  <part_of_story>
  Summoning his courage, Mark hurried toward the exit as fast as he dared. He burst through the rusty door, his heart pounding with relief and residual fear. He had survived his brush with the perils that proximity to the abandoned factory held. Mark decided his friends' dares weren't worth risking his life over. Some places were better left unexplored.
  </part_of_story>
  output:
  `,
    output: `
  <midjourney_prompt>
  An old abandoned factory with shattered windows and graffiti-covered walls.
  </midjourney_prompt>
  <midjourney_prompt>
  A person named Mark exploring the abandoned factory at night, shining a flashlight. The moonlight filtering through the windows gives the place an eerie look.
  </midjourney_prompt>
  <midjourney_prompt>
  Mark hears a loud crash while exploring the factory. He freezes in fear, not knowing the source of the sound. His imagination starts worrying it could be dangerous people or things hiding in the darkness.
  </midjourney_prompt>
  <midjourney_prompt>
  Mark hurriedly leaves the factory, heart pounding with fear and relief at surviving the dangers of exploring the place.
  </midjourney_prompt>
  <midjourney_prompt>
  Mark decides not to take any more dares from friends to explore abandoned and potentially dangerous places.
  </midjourney_prompt>
  `,
  },
];

const stories = [
  "The old abandoned factory loomed over the neighborhood, a relic of a bygone era. Most of the windows were shattered, the walls covered in graffiti.",
  "Mark's heart raced as he turned on his flashlight and entered the cavernous space. Moonlight filtered in through the broken windows, casting an eerie glow over the debris and discarded machinery inside.",
  "As Mark turned a corner, a loud crash rang out close by. He froze in place, his breath catching in his throat. It sounded like something heavy had fallen over. He swept his flashlight around but couldn't see anything out of the ordinary.",
  "His imagination began to run wild. What if there were other people inside? Homeless squatters, vandals, or worse? Mark realized with dawning fear that danger could be lurking just outside the beam of his flashlight, hidden in the shadows.",
  "Summoning his courage, Mark hurried toward the exit as fast as he dared. He burst through the rusty door, his heart pounding with relief and residual fear. He had survived his brush with the perils that proximity to the abandoned factory held.",
];

function App() {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState("proximity");

  return (
    <div className={st.App}>
      <h1>Genereate a comic strip from a single word</h1>
      <Input
        value={word}
        disabled
        style={{ width: "25%", marginRight: "14px" }}
      ></Input>
      <Button type="primary">Run</Button>

      <div className={st.Step}>
        {steps.map((step, index) => (
          <Card
            title={`Chain of Thought ${index + 1}:`}
            style={{ marginTop: "20px" }}
          >
            <div className={st.StepItem} key={index}>
              Input:<pre>{step.input}</pre>
              Output:<pre>{step.output}</pre>
            </div>
          </Card>
        ))}
        <h2>Comic strip: </h2>
        {stories.map((story, index) => (
          <Card title={`${index + 1}`} style={{ marginTop: "20px" }}>
            <div className={st.StepItem} key={index}>
              <span>{story}</span>
              <img alt={stories[index]} src={`${index + 1}.png`}></img>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
