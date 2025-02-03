import React, { useState, useEffect } from 'react';
import { WaitingRoom } from './components/WaitingRoom';
import { DebateRoom } from './components/DebateRoom';
import { DebateQuestionnaire } from './components/DebateQuestionnaire';
import { User, DebateRoom as DebateRoomType, Message, QuestionnaireResponse } from './types';
import { calculateMatchScore } from './utils/matchingAlgorithm';
import { generateAIResponse } from './utils/aiOpponent';
import { v4 as uuidv4 } from 'uuid';

// Mock user for demo
const currentUser: User = {
  id: uuidv4(),
  name: 'Demo User',
  experience: 'intermediate',
  politicalSpectrum: 'center',
  interests: ['Israeli Politics', 'Middle East'],
};

// Sample debate topics
const israeliPoliticalTopics = ['הרפורמה המשפטית'];

function App() {
  const [isMatching, setIsMatching] = useState(false);
  const [activeRoom, setActiveRoom] = useState<DebateRoomType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [currentTopic] = useState(israeliPoliticalTopics[0]);
  const [userResponse, setUserResponse] = useState<QuestionnaireResponse | null>(null);

  const handleStartMatching = () => {
    setShowQuestionnaire(true);
  };

  // Mock opponent responses for demo
  const mockOpponentResponses: QuestionnaireResponse = {
    stance: 'against',
    politicalSpectrum: 'center-right',
    mainArguments: [],
    keyPolicies: {
      twoStateSolution: 'oppose',
      settlementPolicy: 'expand',
      religiousState: 'traditional',
      economicPolicy: 'capitalist'
    },
    preferredDebateStyle: 'factual',
    timeNeededToPrep: 5,
    matchPreference: 'any'
  };

  const handleQuestionnaireComplete = (response: QuestionnaireResponse) => {
    setUserResponse(response);
    setShowQuestionnaire(false);
    setIsMatching(true);
    
    // Calculate match score
    const matchResult = calculateMatchScore(response, mockOpponentResponses);
    
    // Simulate finding a match after 2 seconds
    setTimeout(() => {
      setIsMatching(false);
      setActiveRoom({
        id: uuidv4(),
        participants: [currentUser],
        topic: currentTopic,
        mode: 'freeform',
        duration: 15,
        status: 'active'
      });
      
      // Add system message with match information
      const systemMessage: Message = {
        id: uuidv4(),
        userId: 'system',
        content: `Debate started! Match score: ${matchResult.score}%\n${matchResult.explanation.join('\n')}`,
        timestamp: Date.now(),
      };
      setMessages([systemMessage]);
    }, 2000);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      userId: currentUser.id,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Generate AI response after a short delay
    setTimeout(() => {
      if (userResponse) {
        const aiResponse = generateAIResponse(userResponse, [...messages, newMessage]);
        const aiMessage: Message = {
          id: uuidv4(),
          userId: 'ai',
          content: aiResponse,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleLeaveRoom = () => {
    setActiveRoom(null);
    setMessages([]);
    setUserResponse(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showQuestionnaire ? (
        <div className="p-4">
          <DebateQuestionnaire
            topic={currentTopic}
            onComplete={handleQuestionnaireComplete}
            onCancel={() => setShowQuestionnaire(false)}
          />
        </div>
      ) : !activeRoom ? (
        <WaitingRoom
          user={currentUser}
          onStartMatching={handleStartMatching}
          isMatching={isMatching}
        />
      ) : (
        <DebateRoom
          room={activeRoom}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
          messages={messages}
          onLeave={handleLeaveRoom}
        />
      )}
    </div>
  );
}

export default App;