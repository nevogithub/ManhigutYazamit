import React, { useState } from 'react';
import { QuestionnaireResponse } from '../types';
import { ClipboardCheck, Scale, Building, BookOpen, MessageCircle } from 'lucide-react';

interface DebateQuestionnaireProps {
  topic: string;
  onComplete: (response: QuestionnaireResponse) => void;
  onCancel: () => void;
}

export function DebateQuestionnaire({ topic, onComplete, onCancel }: DebateQuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [response, setResponse] = useState<Partial<QuestionnaireResponse>>({
    stance: 'neutral',
    politicalSpectrum: 'center',
    mainArguments: [],
    keyPolicies: {
      twoStateSolution: 'neutral',
      settlementPolicy: 'freeze',
      religiousState: 'secular',
      economicPolicy: 'mixed'
    },
    preferredDebateStyle: 'factual',
    timeNeededToPrep: 5,
    matchPreference: 'any'
  });

  const [currentArgument, setCurrentArgument] = useState('');

  const handleAddArgument = () => {
    if (currentArgument.trim()) {
      setResponse(prev => ({
        ...prev,
        mainArguments: [...(prev.mainArguments || []), currentArgument.trim()]
      }));
      setCurrentArgument('');
    }
  };

  const handleComplete = () => {
    onComplete(response as QuestionnaireResponse);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Israeli Political Debate Preparation</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Topic:</h3>
        <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{topic}</p>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Political Alignment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Political Spectrum
                </label>
                <div className="flex space-x-2">
                  {['left', 'center-left', 'center', 'center-right', 'right'].map((position) => (
                    <button
                      key={position}
                      onClick={() => setResponse(prev => ({ ...prev, politicalSpectrum: position as any }))}
                      className={`px-4 py-2 rounded-md ${
                        response.politicalSpectrum === position
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {position.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <Scale className="inline-block mr-2" />
              Key Policy Positions
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Two-State Solution
                </label>
                <div className="flex space-x-2">
                  {['support', 'oppose', 'neutral'].map((position) => (
                    <button
                      key={position}
                      onClick={() => setResponse(prev => ({
                        ...prev,
                        keyPolicies: {
                          ...prev.keyPolicies,
                          twoStateSolution: position as any
                        }
                      }))}
                      className={`px-4 py-2 rounded-md ${
                        response.keyPolicies?.twoStateSolution === position
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {position.charAt(0).toUpperCase() + position.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Settlement Policy
                </label>
                <div className="flex space-x-2">
                  {['expand', 'freeze', 'withdraw'].map((policy) => (
                    <button
                      key={policy}
                      onClick={() => setResponse(prev => ({
                        ...prev,
                        keyPolicies: {
                          ...prev.keyPolicies,
                          settlementPolicy: policy as any
                        }
                      }))}
                      className={`px-4 py-2 rounded-md ${
                        response.keyPolicies?.settlementPolicy === policy
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {policy.charAt(0).toUpperCase() + policy.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Religion and State
                </label>
                <div className="flex space-x-2">
                  {['secular', 'traditional', 'religious'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setResponse(prev => ({
                        ...prev,
                        keyPolicies: {
                          ...prev.keyPolicies,
                          religiousState: type as any
                        }
                      }))}
                      className={`px-4 py-2 rounded-md ${
                        response.keyPolicies?.religiousState === type
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Economic Policy
                </label>
                <div className="flex space-x-2">
                  {['socialist', 'mixed', 'capitalist'].map((policy) => (
                    <button
                      key={policy}
                      onClick={() => setResponse(prev => ({
                        ...prev,
                        keyPolicies: {
                          ...prev.keyPolicies,
                          economicPolicy: policy as any
                        }
                      }))}
                      className={`px-4 py-2 rounded-md ${
                        response.keyPolicies?.economicPolicy === policy
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {policy.charAt(0).toUpperCase() + policy.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <Building className="inline-block mr-2" />
              Main Arguments
            </h3>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentArgument}
                  onChange={(e) => setCurrentArgument(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                  placeholder="Enter your argument"
                />
                <button
                  onClick={handleAddArgument}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {response.mainArguments?.map((arg, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="flex-1 bg-gray-50 p-2 rounded-md">{arg}</span>
                    <button
                      onClick={() => setResponse(prev => ({
                        ...prev,
                        mainArguments: prev.mainArguments?.filter((_, i) => i !== index)
                      }))}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <MessageCircle className="inline-block mr-2" />
              Debate Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Match Preference
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'similar', label: 'Similar Views' },
                    { value: 'opposite', label: 'Opposing Views' },
                    { value: 'any', label: 'Any' }
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setResponse(prev => ({ ...prev, matchPreference: value as any }))}
                      className={`px-4 py-2 rounded-md ${
                        response.matchPreference === value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Debate Style
                </label>
                <div className="flex space-x-4">
                  {['factual', 'philosophical', 'casual'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setResponse(prev => ({ ...prev, preferredDebateStyle: style as any }))}
                      className={`px-4 py-2 rounded-md ${
                        response.preferredDebateStyle === style
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Start Debate
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onCancel}
        className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
    </div>
  );
}