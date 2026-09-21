import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import RangeField from "./RangeField";

function PredictionForm({ onPrediction }) {
  const [age, setAge] = useState(40);
  const [sex, setSex] = useState("M");
  const [chestPain, setChestPain] = useState("ATA");
  const [restingBP, setRestingBP] = useState(120);
  const [cholesterol, setCholesterol] = useState(200);
  const [fastingBS, setFastingBS] = useState(0);
  const [restingECG, setRestingECG] = useState("Normal");
  const [maxHR, setMaxHR] = useState(150);
  const [exerciseAngina, setExerciseAngina] = useState("N");
  const [oldpeak, setOldpeak] = useState(1.0);
  const [stSlope, setStSlope] = useState("Up");
  const [loading, setLoading] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault();

  const patientData = {
    age,
    sex,
    chest_pain: chestPain,
    resting_bp: restingBP,
    cholesterol,
    fasting_bs: fastingBS,
    resting_ecg: restingECG,
    max_hr: maxHR,
    exercise_angina: exerciseAngina,
    oldpeak,
    st_slope: stSlope,
  };

  setLoading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      throw new Error("Prediction request failed");
    }

    const result = await response.json();

    onPrediction({
      risk: result.risk,
      probability: `${(result.probability * 100).toFixed(0)}%`,
      data: patientData,
    });
  } catch (error) {
    console.error("Prediction error:", error);
    alert("Unable to connect to the prediction server.");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Personal Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
            👤
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="text-sm text-slate-500">
              Basic patient details
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <RangeField
            label="Age"
            value={age}
            onChange={setAge}
            min={18}
            max={100}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Sex"
              value={sex}
              onChange={setSex}
              options={[
                { value: "M", label: "Male" },
                { value: "F", label: "Female" },
              ]}
            />

            <SelectField
              label="Chest Pain Type"
              value={chestPain}
              onChange={setChestPain}
              options={[
                { value: "ATA", label: "ATA - Atypical Angina" },
                { value: "NAP", label: "NAP - Non-Anginal Pain" },
                { value: "TA", label: "TA - Typical Angina" },
                { value: "ASY", label: "ASY - Asymptomatic" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Heart & Blood Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-xl">
            ❤️
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Heart & Blood Information
            </h2>

            <p className="text-sm text-slate-500">
              Blood pressure and cholesterol details
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="Resting Blood Pressure"
            value={restingBP}
            onChange={(value) => setRestingBP(value === "" ? "" : Number(value))}
            min={80}
            max={200}
            unit="mm Hg"
          />

          <InputField
            label="Cholesterol"
            value={cholesterol}
            onChange={(value) => setCholesterol(value === "" ? "" : Number(value))}
            min={100}
            max={600}
            unit="mg/dL"
          />

          <SelectField
            label="Fasting Blood Sugar > 120 mg/dL"
            value={String(fastingBS)}
            onChange={(value) => setFastingBS(Number(value))}
            options={[
              { value: "0", label: "0 - No" },
              { value: "1", label: "1 - Yes" },
            ]}
          />

          <SelectField
            label="Resting ECG"
            value={restingECG}
            onChange={setRestingECG}
            options={[
              { value: "Normal", label: "Normal" },
              { value: "ST", label: "ST" },
              { value: "LVH", label: "LVH" },
            ]}
          />
        </div>
      </section>

      {/* ECG & Exercise Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
            📊
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              ECG & Exercise Information
            </h2>

            <p className="text-sm text-slate-500">
              Heart rate and exercise-related information
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <RangeField
            label="Maximum Heart Rate"
            value={maxHR}
            onChange={setMaxHR}
            min={60}
            max={220}
            unit=" bpm"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Exercise-Induced Angina"
              value={exerciseAngina}
              onChange={setExerciseAngina}
              options={[
                { value: "N", label: "N - No" },
                { value: "Y", label: "Y - Yes" },
              ]}
            />

            <RangeField
              label="Oldpeak (ST Depression)"
              value={oldpeak}
              onChange={setOldpeak}
              min={0}
              max={6}
              step={0.1}
            />

            <SelectField
              label="ST Slope"
              value={stSlope}
              onChange={setStSlope}
              options={[
                { value: "Up", label: "Up" },
                { value: "Flat", label: "Flat" },
                { value: "Down", label: "Down" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span>{loading ? "⏳" : "🔍"}</span>
        {loading ? "Predicting..." : "Predict Heart Disease Risk"}
      </button>

      <p className="text-center text-xs leading-5 text-slate-400">
        This tool provides an AI-based risk prediction and is not a medical
        diagnosis.
      </p>
    </form>
  );
}

export default PredictionForm;