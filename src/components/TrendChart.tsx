import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { formatMoney } from '../lib/stats'

type Props = {
  data: { label: string; total: number }[]
  currency: string
  title: string
}

export function TrendChart({ data, currency, title }: Props) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">{title}</p>
      <div className="mt-3 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#737373' }}
            />
            <Tooltip
              formatter={(value) => formatMoney(Number(value), currency)}
              contentStyle={{ borderRadius: 12, border: '1px solid #e5e5e5', fontSize: 13 }}
            />
            <Bar dataKey="total" fill="#171717" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
