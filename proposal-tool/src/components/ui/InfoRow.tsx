interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function InfoRow({ label, value, icon, className = '' }: InfoRowProps) {
  return (
    <div className={`flex items-center justify-between py-2.5 border-b border-white/5 last:border-0 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-dark-400">
        {icon && <span className="text-dark-500">{icon}</span>}
        {label}
      </div>
      <div className="text-sm font-medium text-dark-200">{value}</div>
    </div>
  );
}
