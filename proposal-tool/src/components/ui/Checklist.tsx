import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

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
        <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-solar-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / items.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs text-dark-400 whitespace-nowrap">
          {completedCount}/{items.length}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <motion.button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`
                w-full flex items-start gap-3 p-3 rounded-xl text-start
                transition-all cursor-pointer
                ${isChecked ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-white/3 border border-white/5 hover:border-white/10'}
              `}
              whileTap={{ scale: 0.99 }}
            >
              <div
                className={`
                  mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all
                  ${isChecked ? 'bg-emerald-500 text-white' : 'border border-dark-600 text-transparent'}
                `}
              >
                {isChecked ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Circle className="w-3.5 h-3.5" />
                )}
              </div>
              <div>
                <span
                  className={`text-sm font-medium ${isChecked ? 'text-dark-400 line-through' : 'text-dark-200'}`}
                >
                  {item.label}
                </span>
                {item.description && (
                  <p className="text-xs text-dark-500 mt-0.5">{item.description}</p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
