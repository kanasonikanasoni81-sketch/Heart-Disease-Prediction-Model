import React from 'react'

const RangeField = ({
  label,
  value,
  onChange,
  min,
  max,
  step = "1",
  unit = "",
}) => {
  return (
    <div classNmae='Space-y-6'>
      <div className='flex justify-between items-center gap-3 mb-3'>
        <label className='text-sm text-slate-700 font-semibold'>{label}</label>
        <span className='text-blue-600 text-sm px-4 py-1 font-bold bg-slate-50 rounded-lg '>
            {value}
            {unit}
        </span>
      </div>
      <input 
      type="range"
      min = {min}
      max = {max}
      step ={step}
      value = {value}
      onChange={(e) => onChange(e.target.value)}
      className = 'w-full h-2 cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600'
       />

       <div className='mt-2 text-xs text-slate-400 flex justify-between'>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
       </div>
    </div>
  )
}

export default RangeField
