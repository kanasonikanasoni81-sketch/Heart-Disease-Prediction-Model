import Header from '../Components/Header'
import { useState } from 'react'
import PredictionForm from '../Components/PredictionForm'
import ResultCard from '../Components/ResultCard'

const Home = () => {
  const [result, setResult] = useState(null)
  const handleReset = () => {
    setResult(null);
  };
  return (
     <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Header />

        <PredictionForm onPrediction={setResult} />

        <ResultCard result={result} onReset={handleReset} />

        <footer className="mt-10 text-center text-xs text-slate-400">
          HeartCare AI • AI-Based Heart Disease Risk Prediction
        </footer>
      </div>
    </main>
  )
}

export default Home
