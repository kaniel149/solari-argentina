import { useTranslation } from '../../i18n';

interface CategoryFilterProps {
  category: string;
  difficulty: string;
  onCategoryChange: (cat: string) => void;
  onDifficultyChange: (diff: string) => void;
}

const categories = [
  { value: 'all', key: 'common.all', activeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  { value: 'fundamentals', key: 'category.fundamentals', activeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  { value: 'technology', key: 'category.technology', activeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { value: 'economics', key: 'category.economics', activeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { value: 'regulatory', key: 'category.regulatory', activeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  { value: 'operations', key: 'category.operations', activeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
];

const difficulties = [
  { value: 'all', key: 'common.all', activeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  { value: 'beginner', key: 'difficulty.beginner', activeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { value: 'intermediate', key: 'difficulty.intermediate', activeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { value: 'advanced', key: 'difficulty.advanced', activeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
];

const inactiveClass = 'bg-zinc-800 text-zinc-400 border-transparent hover:text-zinc-300 hover:bg-zinc-700/60';

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
              px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer
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
              px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer
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
