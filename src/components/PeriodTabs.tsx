import type { Period } from '../types'

const OPTIONS: { value: Period; label: string }[] = [
  { value: 'day', label: 'Diario' },
  { value: 'week', label: 'Semanal' },
  { value: 'month', label: 'Mensual' },
]

type Props = {
  value: Period
  onChange: (period: Period) => void
}

export function PeriodTabs({ value, onChange }: Props) {
  return (
    <div role="tablist" className="inline-flex rounded-xl bg-neutral-200/60 p-1">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
            value === option.value
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
