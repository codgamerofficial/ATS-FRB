import { Check, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className="hidden md:block">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-3">
        <ol className="flex items-center space-x-1">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="flex items-center">
              {stepIdx !== 0 && (
                <div className="flex-1 flex items-center mx-2">
                  <div
                    className={`h-0.5 w-6 rounded-full transition-all duration-500 ${
                      stepIdx <= currentStep 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                        : 'bg-gray-600'
                    }`}
                    style={{ 
                      transform: `scaleX(${stepIdx <= currentStep ? 1 : 0.3})`,
                      transformOrigin: 'left'
                    }}
                  />
                </div>
              )}
              <div className="relative group">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
                    stepIdx < currentStep
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                      : stepIdx === currentStep
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25 pulse-glow'
                      : 'bg-gray-700 text-gray-400 border border-gray-600'
                  }`}
                >
                  {stepIdx < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : stepIdx === currentStep ? (
                    <Circle className="w-4 h-4 fill-current" />
                  ) : (
                    <span>{step.id + 1}</span>
                  )}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap border border-cyan-500/30">
                    <div className="font-medium">{step.name}</div>
                    <div className="text-gray-300 text-xs mt-1">{step.description}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        
        {/* Progress percentage */}
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-400">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
      </div>
    </nav>
  );
}