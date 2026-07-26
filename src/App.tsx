import { useMemo } from 'react'
import { DataToolbar } from './components/DataToolbar'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { PeriodTabs } from './components/PeriodTabs'
import { Summary } from './components/Summary'
import { TrendChart } from './components/TrendChart'
import {
  filterByInterval,
  intervalFor,
  labelFor,
  series,
  total,
  totalsByCategory,
} from './lib/stats'
import { useStore } from './store'

const CHART_TITLES = {
  day: 'Últimos 7 días',
  week: 'Últimas 8 semanas',
  month: 'Últimos 6 meses',
} as const

export default function App() {
  const { expenses, currency, period, setPeriod, removeExpense } = useStore()

  const view = useMemo(() => {
    const reference = new Date()
    const inPeriod = filterByInterval(expenses, intervalFor(period, reference))
    return {
      label: labelFor(period, reference),
      expenses: inPeriod,
      total: total(inPeriod),
      byCategory: totalsByCategory(inPeriod),
      chart: series(expenses, period, reference),
    }
  }, [expenses, period])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gastos</h1>
          <p className="text-sm text-neutral-500">
            Tus datos se guardan solo en este navegador.
          </p>
        </div>
        <DataToolbar />
      </header>

      <ExpenseForm />

      <div className="mt-8 flex items-center justify-between">
        <PeriodTabs value={period} onChange={setPeriod} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Summary
          label={view.label}
          total={view.total}
          count={view.expenses.length}
          currency={currency}
          byCategory={view.byCategory}
        />
        <TrendChart data={view.chart} currency={currency} title={CHART_TITLES[period]} />
      </div>

      <h2 className="mt-8 mb-3 text-sm font-medium text-neutral-500">Movimientos del periodo</h2>
      <ExpenseList expenses={view.expenses} currency={currency} onRemove={removeExpense} />
    </div>
  )
}
