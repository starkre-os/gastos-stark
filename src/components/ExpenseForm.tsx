import { useState } from 'react'
import { CATEGORIES } from '../lib/categories'
import { today } from '../lib/stats'
import { useStore } from '../store'

export function ExpenseForm() {
  const addExpense = useStore((s) => s.addExpense)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<string>(CATEGORIES[0])
  const [note, setNote] = useState('')
  const [date, setDate] = useState(today())
  const [error, setError] = useState('')

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const parsed = Number(amount.replace(',', '.'))
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError('Ingresa un monto mayor a 0.')
      return
    }
    addExpense({ amount: parsed, category, note: note.trim(), date })
    setAmount('')
    setNote('')
    setError('')
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Monto</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
            placeholder="0.00"
            aria-label="Monto"
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-lg outline-none focus:border-neutral-900"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-500">Categoría</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Categoría"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 outline-none focus:border-neutral-900"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="h-11 rounded-xl bg-neutral-900 px-5 font-medium text-white transition hover:bg-neutral-700"
        >
          Agregar
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nota (opcional)"
          aria-label="Nota"
          className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Fecha"
          className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  )
}
