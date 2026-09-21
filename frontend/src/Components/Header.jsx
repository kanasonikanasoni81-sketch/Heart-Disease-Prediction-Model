import React from 'react'

const Header = () => {
  return (
   <header className="mb-8 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-200">
        ❤️
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        HeartCare AI
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
        AI-Based Heart Disease Risk Prediction
      </p>

      <p className="mx-auto mt-1 max-w-2xl text-sm text-slate-400">
        Enter your health information to generate an AI-based risk prediction.
      </p>
    </header>
  )
}

export default Header
