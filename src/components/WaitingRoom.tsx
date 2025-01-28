import React from 'react';
import { User } from '../types';
import { Users } from 'lucide-react';

interface WaitingRoomProps {
  user: User;
  onStartMatching: () => void;
  isMatching: boolean;
}

export function WaitingRoom({ user, onStartMatching, isMatching }: WaitingRoomProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <div className="flex items-center space-x-3">
        <Users className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Debate Hub</h2>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <h3 className="font-medium text-gray-700">Your Profile</h3>
          <p className="text-gray-600">Experience: {user.experience}</p>
          <p className="text-gray-600">Interests: {user.interests.join(', ')}</p>
        </div>
        
        <button
          onClick={onStartMatching}
          disabled={isMatching}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors
            ${isMatching 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {isMatching ? 'Finding a debate partner...' : 'Start Matching'}
        </button>
      </div>
      
      {isMatching && (
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>
          <p>Looking for someone to debate with...</p>
        </div>
      )}
    </div>
  );
}