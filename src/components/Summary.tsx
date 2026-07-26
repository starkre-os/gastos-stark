import { colorFor } from '../lib/categories'
import { formatMoney } from '../lib/stats'

type Props = {
  label: string
  total: number
  count: number
  currency: string
  byCategory: { category: string; total: number }[]
}

export function Summary({ label, total, count, currency, byCategory }: Props) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">{label}</p>
      <p className="mt-1 text-4xl font-semibold tabular-nums">{formatMoney(total, currency)}</p>
      <p className="mt-1 text-sm text-neutral-500">
        {count} {count === 1 ? 'gasto' : 'gastos'} en el periodo
      </p>

      {byCategory.length > 0 && (
        <ul className="mt-4 space-y-2">
          {byCategory.map((item) => (
            <li key={item.category} className="text-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-neutral-600">{item.category}</span>
                <span className="tabular-nums">{formatMoney(item.total, currency)}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${total > 0 ? (item.total / total) * 100 : 0}%`,
                    backgroundColor: colorFor(item.category),
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
