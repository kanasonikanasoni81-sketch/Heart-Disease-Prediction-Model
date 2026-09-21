const InputField = ({
    label,
    value,
    onChange,
    type = "number",
    min,
    max,
    step = "1",
    placeholder,
    unit
}) => {
    return (
        <div>
         <div className='mb-2 block text-sm font-semibold text-slate-700'>{label}</div>
         <div className ='relative'>
            <input
            type = {type}
            value = {value}
            min = {min}
            max = {max}
            step ={step}
            placeholder={placeholder}
            onChange = {(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
            className ='w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue focus:bg-white focus:ring-4 focus:ring-blue-100'
              />
              {unit && (
                <span className='pointer-events-none absolute right-3 top-1/2 -translate-1/2 text-xs text-slate-400'>{unit}</span>
              )}
         </div>
        </div>
    )
}

export default InputField
