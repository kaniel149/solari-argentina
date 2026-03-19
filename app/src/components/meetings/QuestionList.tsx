import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface QuestionListProps {
  questions: { en: string[]; he: string[] };
}

export function QuestionList({ questions }: QuestionListProps) {
  const { language } = useTranslation();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const items = questions[language];

  return (
    <div className="space-y-2">
      {items.map((question, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03, duration: 0.2 }}
          className="flex items-start gap-3 glass rounded-xl px-4 py-3 group"
        >
          <span className="text-xs font-bold text-solar-400 bg-solar-500/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            {index + 1}
          </span>
          <p className="flex-1 text-sm text-dark-300 leading-relaxed">{question}</p>
          <button
            onClick={() => handleCopy(question, index)}
            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex-shrink-0 mt-0.5"
            title="Copy"
          >
            {copiedIndex === index ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-dark-500 hover:text-dark-300" />
            )}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
