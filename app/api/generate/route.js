import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines when creating the flashcards.

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preference.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.

Remember the goal is to facilitate effective learning and retention of information through these flashcards.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": str,
      "back": str
    }
  ]
}
`;

/*export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Load the API key from the environment variable
  });

  const data = await req.text()

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data },
    ],
    model: 'gpt-3.5-turbo',
    response_format: { type: 'json_object' },
  })

  // Parse the JSON response from the OpenAI API
  const flashcards = JSON.parse(completion.choices[0].message.content)

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards)
}*/
export async function POST(req) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Load the API key from the environment variable
  });

  try {
    const data = await req.text();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
    });

    // Directly accessing the generated content
    const flashcardsContent = completion.choices[0].message.content;

    // Parse the JSON response from the OpenAI API
    let flashcards;
    try {
      flashcards = JSON.parse(flashcardsContent);
    } catch (error) {
      throw new Error('Failed to parse the OpenAI response as JSON.');
    }

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
  }
}
