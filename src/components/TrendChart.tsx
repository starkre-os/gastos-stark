import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { formatMoney } from '../lib/stats'

type Props = {
  data: { label: string; total: number }[]
  currency: string
  title: string
}

export function TrendChart({ data, currency, title }: Props) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
      <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase">{title}</p>
      <div className="mt-3 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
            <CartesianGrid vertical={false} stroke="#262626" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#a3a3a3' }}
            />
            <Tooltip
              formatter={(value) => formatMoney(Number(value), currency)}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #404040',
                backgroundColor: '#171717',
                fontSize: 13,
              }}
              itemStyle={{ color: '#f5f5f5' }}
              cursor={{ fill: '#ffffff14' }}
            />
            <Bar dataKey="total" fill="#e5e5e5" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
