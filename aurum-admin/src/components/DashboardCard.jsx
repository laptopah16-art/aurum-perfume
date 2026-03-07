export default function DashboardCard({ title, value, icon: Icon, change, changeType }) {
  return (
    <div className="bg-aurum-surface border border-aurum-border rounded-xl p-6 hover:border-aurum-gold/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-aurum-textMuted mb-1">{title}</p>
          <p className="text-3xl font-semibold text-aurum-text">{value}</p>
          {change && (
            <p className={`text-xs mt-2 ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
              {changeType === 'positive' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-aurum-gold/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-aurum-gold" />
        </div>
      </div>
    </div>
  );
}

