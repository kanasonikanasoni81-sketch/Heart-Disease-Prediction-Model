function ResultCard({ result, onReset }) {
  if (!result) return null;

  const isHighRisk = result.risk === "High Risk";

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg sm:p-8">
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${
          isHighRisk
            ? "bg-red-100 text-red-600"
            : "bg-emerald-100 text-emerald-600"
        }`}
      >
        {isHighRisk ? "⚠️" : "✓"}
      </div>

      <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Prediction Result
      </p>

      <h2
        className={`mt-2 text-3xl font-bold ${
          isHighRisk ? "text-red-600" : "text-emerald-600"
        }`}
      >
        {result.risk}
      </h2>

      <p className="mt-4 text-slate-600">
        AI Prediction Probability:{" "}
        <strong className="text-slate-900">
          {result.probability}
        </strong>
      </p>

      <div className="mt-6 rounded-xl bg-amber-50 p-4 text-left text-sm leading-6 text-amber-800">
        <strong>Important:</strong> This is an AI-based risk prediction, not a
        medical diagnosis. Please consult a qualified healthcare professional
        for proper evaluation.
      </div>

      <button
        onClick={onReset}
        className="mt-6 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Check Again
      </button>
    </section>
  );
}

export default ResultCard;