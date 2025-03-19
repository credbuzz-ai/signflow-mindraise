
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectionCardProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  maxWidth?: string;
  className?: string;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  id,
  title,
  icon,
  isSelected,
  onClick,
  maxWidth = 'max-w-full',
  className,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={cn(
        'option-card relative',
        isSelected ? 'selected' : 'hover:border-gray-400',
        maxWidth,
        className
      )}
    >
      <div className="flex items-center">
        {icon && <div className="mr-3">{icon}</div>}
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className={cn(
          'w-5 h-5 rounded-full border flex items-center justify-center transition-all',
          isSelected 
            ? 'bg-primary border-primary text-white'
            : 'border-gray-300'
        )}>
          {isSelected && <Check className="w-3 h-3" />}
        </div>
      </div>
    </div>
  );
};

export default SelectionCard;
