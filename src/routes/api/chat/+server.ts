import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { SYSTEM_CONTEXT } from '$lib/server/assistantContext';
import type { RequestHandler } from './$types';

const MAX_MESSAGES = 12; // most recent turns forwarded to the model
const MAX_USER_LENGTH = 1000; // characters per visitor message
const MAX_ASSISTANT_LENGTH = 4000; // earlier replies (some canned answers are long)

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function isChatMessage(m: unknown): m is ChatMessage {
  if (typeof m !== 'object' || m === null) return false;
  const { role, content } = m as Record<string, unknown>;
  return (
    (role === 'user' || role === 'assistant') &&
    typeof content === 'string' &&
    content.trim().length > 0 &&
    content.length <= (role === 'user' ? MAX_USER_LENGTH : MAX_ASSISTANT_LENGTH)
  );
}

export const POST: RequestHandler = async ({ request, fetch }) => {
  const apiKey = env.COHERE_API_KEY;
  if (!apiKey) throw error(503, 'Assistant is not configured');

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON');
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isChatMessage)) {
    throw error(400, 'Invalid messages');
  }
  if (messages[messages.length - 1].role !== 'user') {
    throw error(400, 'Last message must be from the user');
  }

  // The system prompt is set here, never taken from the client.
  const response = await fetch('https://api.cohere.com/v2/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'command-r',
      messages: [
        { role: 'system', content: SYSTEM_CONTEXT },
        ...messages.slice(-MAX_MESSAGES),
      ],
    }),
  });

  if (!response.ok) {
    console.error('Cohere error', response.status);
    throw error(502, 'Assistant is unavailable');
  }

  const data = await response.json();
  const reply: string =
    data.message?.content?.[0]?.text ?? "I couldn't generate a response. Please try again.";

  return json({ reply });
};
