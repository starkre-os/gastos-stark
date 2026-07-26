import { useRef, useState } from 'react'
import { download, parseBackup } from '../lib/backup'
import { useStore } from '../store'

const CURRENCIES = ['USD', 'EUR', 'MXN', 'COP', 'PEN', 'CLP', 'ARS']

export function DataToolbar() {
  const { expenses, currency, setCurrency, replaceAll, clearAll } = useStore()
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  function exportJson() {
    download({ version: 1, exportedAt: new Date().toISOString(), currency, expenses })
  }

  async function importJson(file: File) {
    try {
      replaceAll(parseBackup(await file.text()))
      setMessage('Respaldo importado.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo leer el archivo.')
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        aria-label="Moneda"
        className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 outline-none focus:border-neutral-900"
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        onClick={exportJson}
        className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 transition hover:border-neutral-900"
      >
        Exportar
      </button>

      <button
        onClick={() => fileInput.current?.click()}
        className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 transition hover:border-neutral-900"
      >
        Importar
      </button>
      <input
        ref={fileInput}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void importJson(file)
          e.target.value = ''
        }}
      />

      <button
        onClick={() => {
          if (window.confirm('¿Borrar todos los gastos guardados?')) {
            clearAll()
            setMessage('Datos borrados.')
          }
        }}
        className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-red-600 transition hover:border-red-500"
      >
        Borrar todo
      </button>

      {message && <span className="text-xs text-neutral-500">{message}</span>}
    </div>
  )
}
