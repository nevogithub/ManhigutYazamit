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
    matchPreference: 'any',
    reformProposalBy: '',
    yearOfJudicialReformProposal: '',
    yearBasicLawPassed: '',
    courtPowersScope: '',
    reformObjective: '',
    reformConsequences: ''
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">הכנה לדיון בנושא הרפורמה המשפטית</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">נושא:</h3>
        <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{topic}</p>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">בחירת העמדה הפוליטית שלך</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  בחר מגמה:
                </label>
                <div className="flex space-x-2">
                  {['left', 'center-left', 'center', 'center-right', 'right'].map((position) => {
                    const labels: Record<string, string> = {
                      left: 'שמאלה',
                      'center-left': 'מרכז שמאל',
                      center: 'מרכז',
                      'center-right': 'מרכז ימין',
                      right: 'ימינה'
                    };
                    let bgColor = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                    if (position === 'left' || position === 'center-left') {
                      bgColor = response.politicalSpectrum === position ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200';
                    }
                    if (position === 'right' || position === 'center-right') {
                      bgColor = response.politicalSpectrum === position ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200';
                    }
                    return (
                      <button
                        key={position}
                        onClick={() => setResponse(prev => ({ ...prev, politicalSpectrum: position as any }))}
                        className={`px-4 py-2 rounded-md ${bgColor}`}
                      >
                        {labels[position]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            הבא
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">עקרונות הרפורמה</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מהו היקף שינוי הסמכויות של בית המשפט העליון?
                </label>
                <div className="flex space-x-2">
                  {['רחב', 'בינוני', 'צמצום'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setResponse(prev => ({ ...prev, courtPowersScope: option }))}
                      className={`px-4 py-2 rounded-md ${
                        response.courtPowersScope === option
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מהי מטרת הרפורמה המשפטית?
                </label>
                <div className="flex space-x-2">
                  {['שיפור היעילות', 'חיזוק האיזונים', 'מדיניות פוליטית'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setResponse(prev => ({ ...prev, reformObjective: option }))}
                      className={`px-4 py-2 rounded-md ${
                        response.reformObjective === option
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
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
              חזור
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              הבא
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <Building className="inline-block mr-2" />
              טיעונים עיקריים
            </h3>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentArgument}
                  onChange={(e) => setCurrentArgument(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                  placeholder="הכנס את הטיעון שלך"
                />
                <button
                  onClick={handleAddArgument}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  הוסף
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
                      הסר
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
              חזור
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              הבא
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <MessageCircle className="inline-block mr-2" />
              העדפות דיון
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  העדפת התאמה
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'similar', label: 'דומות' },
                    { value: 'opposite', label: 'נגדיות' },
                    { value: 'any', label: 'כלשהן' }
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
                  סגנון דיון מועדף
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
                      {style === 'factual' ? 'עובדתי' : style === 'philosophical' ? 'פילוסופי' : 'משוחרר'}
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
              חזור
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              הבא
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">שאלות ידע נוספות</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                מי השר שהציע לראשונה את שינויי המשטר?
              </label>
              <div className="flex space-x-2">
                {[
                  { value: 'נתניהו', label: 'בנימין נתניהו' },
                  { value: 'לוין', label: 'יריב לוין' },
                  { value: 'לפיד', label: 'יאיר לפיד' },
                  { value: 'אוחנה', label: 'אמיר אוחנה' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setResponse(prev => ({ ...prev, reformProposalBy: value }))}
                    className={`px-4 py-2 rounded-md ${
                      response.reformProposalBy === value
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                באיזה שנה הוצעה הרפורמה המשפטית?
              </label>
              <div className="flex space-x-2">
                {['2020', '2018', '2023', '1995'].map((year) => (
                  <button
                    key={year}
                    onClick={() => setResponse(prev => ({ ...prev, yearOfJudicialReformProposal: year }))}
                    className={`px-4 py-2 rounded-md ${
                      response.yearOfJudicialReformProposal === year
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                באיזה שנה חוקק חוק היסוד כבוד האדם וחירותו?
              </label>
              <div className="flex space-x-2">
                {['1992', '2001', '1998', '2003'].map((year) => (
                  <button
                    key={year}
                    onClick={() => setResponse(prev => ({ ...prev, yearBasicLawPassed: year }))}
                    className={`px-4 py-2 rounded-md ${
                      response.yearBasicLawPassed === year
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                מהו תפקיד הכנסת ברפורמה המשפטית?
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setResponse(prev => ({ ...prev, knessetRole: e.target.value }))}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                כיצד משפיעה הרפורמה על הרכב ועדת הבחירה לשופטים?
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setResponse(prev => ({ ...prev, judgeSelectionImpact: e.target.value }))}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                מהן ההשלכות האפשריות של הרפורמה המשפטית על מערכת המשפט?
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setResponse(prev => ({ ...prev, reformConsequences: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              חזור
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              התחל דיון
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onCancel}
        className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
      >
        ביטול
      </button>
    </div>
  );
}