import { Message, QuestionnaireResponse } from '../types';

const stanceResponses = {
  twoStateSolution: {
    support: [
      "A two-state solution remains the most viable path to lasting peace.",
      "International consensus supports the establishment of two states.",
      "Economic cooperation would benefit both societies."
    ],
    oppose: [
      "Historical and security concerns make a two-state solution impractical.",
      "Past attempts at territorial compromise have led to increased security risks.",
      "A single state with strong security measures is more viable."
    ],
    neutral: [
      "The situation requires careful consideration of both perspectives.",
      "Alternative solutions might be worth exploring.",
      "The focus should be on immediate practical improvements."
    ]
  },
  settlementPolicy: {
    expand: [
      "Settlement expansion is crucial for security and historical rights.",
      "These communities are vital for Israel's strategic depth.",
      "Development in these areas strengthens Israel's position."
    ],
    freeze: [
      "A settlement freeze could create conditions for negotiations.",
      "The current scope of settlements is sufficient.",
      "We should focus on developing existing communities."
    ],
    withdraw: [
      "Settlement withdrawal is necessary for peace prospects.",
      "The cost of maintaining settlements outweighs benefits.",
      "Withdrawal would improve international relations."
    ]
  }
};

function getResponseBasedOnStance(userStance: QuestionnaireResponse): string[] {
  const responses: string[] = [];
  
  // Add response based on two-state solution stance
  const twoStateResponses = stanceResponses.twoStateSolution[userStance.keyPolicies.twoStateSolution];
  responses.push(twoStateResponses[Math.floor(Math.random() * twoStateResponses.length)]);
  
  // Add response based on settlement policy
  const settlementResponses = stanceResponses.settlementPolicy[userStance.keyPolicies.settlementPolicy];
  responses.push(settlementResponses[Math.floor(Math.random() * settlementResponses.length)]);
  
  return responses;
}

export function generateAIResponse(
  userResponse: QuestionnaireResponse,
  messages: Message[]
): string {
  // If this is the first message, use stance-based response
  if (messages.length <= 1) {
    const responses = getResponseBasedOnStance(userResponse);
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // For subsequent messages, use more contextual responses
  const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
  
  // Generate response based on keywords in the last message
  if (lastUserMessage.includes("security")) {
    return "Security considerations must be balanced with other factors. What specific security concerns are you most focused on?";
  } else if (lastUserMessage.includes("peace") || lastUserMessage.includes("negotiation")) {
    return "Peace negotiations require compromises from all sides. Which compromises do you think are most crucial?";
  } else if (lastUserMessage.includes("economy") || lastUserMessage.includes("economic")) {
    return "Economic factors are indeed important. How do you see economic cooperation developing in your proposed solution?";
  }

  // Default responses for continuing the debate
  const defaultResponses = [
    "That's an interesting perspective. Could you elaborate on your reasoning?",
    "How would you address the practical challenges of implementing that approach?",
    "What evidence supports your position on this matter?",
    "Have you considered the long-term implications of that stance?"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}