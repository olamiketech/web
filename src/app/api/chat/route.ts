import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { SYSTEM_PROMPT } from '@/lib/context';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const result = await streamText({
            model: openai('gpt-4o'), // You can change this to 'gpt-4o-mini' or another supported model
            system: SYSTEM_PROMPT,
            messages,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.error("Error in chat API:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}
