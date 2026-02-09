import { useTranslation } from '../../i18n';

interface CategoryFilterProps {
  category: string;
  difficulty: string;
  onCategoryChange: (cat: string) => void;
  onDifficultyChange: (diff: string) => void;
}

const categories = [
  { value: 'all', key: 'common.all', activeClass: 'bg-solar-500/20 text-solar-300 border-solar-500/30' },
  { value: 'fundamentals', key: 'category.fundamentals', activeClass: 'bg-solar-500/20 text-solar-300 border-solar-500/30' },
  { value: 'technology', key: 'category.technology', activeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { value: 'economics', key: 'category.economics', activeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { value: 'regulatory', key: 'category.regulatory', activeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  { value: 'operations', key: 'category.operations', activeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
];

const difficulties = [
  { value: 'all', key: 'common.all', activeClass: 'bg-solar-500/20 text-solar-300 border-solar-500/30' },
  { value: 'beginner', key: 'difficulty.beginner', activeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { value: 'intermediate', key: 'difficulty.intermediate', activeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { value: 'advanced', key: 'difficulty.advanced', activeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
];

const inactiveClass = 'bg-white/5 text-dark-400 border-white/10 hover:text-dark-200 hover:border-white/20';

export function CategoryFilter({
  category,
  difficulty,
  onCategoryChange,
  onDifficultyChange,
}: CategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer
              ${category === cat.value ? cat.activeClass : inactiveClass}
            `}
          >
            {t(cat.key as Parameters<typeof t>[0])}
          </button>
        ))}
      </div>

      {/* Difficulty pills */}
      <div className="flex flex-wrap gap-2">
        {difficulties.map((diff) => (
          <button
            key={diff.value}
            onClick={() => onDifficultyChange(diff.value)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer
              ${difficulty === diff.value ? diff.activeClass : inactiveClass}
            `}
          >
            {t(diff.key as Parameters<typeof t>[0])}
          </button>
        ))}
      </div>
    </div>
  );
}
