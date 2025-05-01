import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css' // já que estamos usando Tailwind

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-24 hover:scale-110 transition" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-24 hover:scale-110 transition" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">Vite + React + Tailwind</h1>
      <div className="bg-white shadow-md rounded p-6">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded mb-4"
          onClick={() => setCount((count) => count + 1)}
        >
          Contador: {count}
        </button>
        <p className="text-gray-700">
          Edite <code className="bg-gray-200 px-1 rounded">src/App.tsx</code> e salve para testar HMR.
        </p>
      </div>
      <p className="mt-6 text-gray-500 text-sm">
        Clique nos logos acima para saber mais.
      </p>
    </div>
  )
}

export default App
