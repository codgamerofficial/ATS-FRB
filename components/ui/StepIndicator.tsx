import { Check } from 'lucide-react';

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
    <nav aria-label="Progress">
      <ol className="flex items-center space-x-2">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="flex items-center">
            {stepIdx !== 0 && (
              <div className="flex-1 flex items-center">
                <div
                  className={`w-8 h-0.5 ${
                    stepIdx <= currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepIdx < currentStep
                    ? 'bg-primary-600 text-white'
                    : stepIdx === currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {stepIdx < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{step.id + 1}</span>
                )}
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 hidden sm:block">
                <p className="text-xs font-medium text-gray-900 whitespace-nowrap">
                  {step.name}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}