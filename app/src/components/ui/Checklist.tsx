import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

interface ChecklistProps {
  items: ChecklistItem[];
  checked: Set<string>;
  onToggle: (id: string) => void;
  className?: string;
}

export function Checklist({ items, checked, onToggle, className = '' }: ChecklistProps) {
  const completedCount = items.filter((item) => checked.has(item.id)).length;

  return (
    <div className={className}>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sky-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / items.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs text-zinc-500 whitespace-nowrap">
          {completedCount}/{items.length}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`
                w-full flex items-start gap-3 p-3 rounded-lg text-start
                transition-colors cursor-pointer
                ${isChecked ? 'bg-zinc-900/50' : 'bg-zinc-900/30 hover:bg-zinc-900/50'}
              `}
            >
              <div
                className={`
                  mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                  ${isChecked ? 'bg-sky-500 border-sky-500' : 'border-zinc-700'}
                `}
              >
                {isChecked && <Check className="w-3 h-3 text-white" />}
              </div>
              <div>
                <span
                  className={`text-sm ${isChecked ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}
                >
                  {item.label}
                </span>
                {item.description && (
                  <p className="text-xs text-zinc-600 mt-0.5">{item.description}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
