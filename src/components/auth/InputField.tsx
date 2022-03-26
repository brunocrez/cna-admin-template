type InputFieldProps = {
  label: string
  value: string
  onChange?: React.Dispatch<React.SetStateAction<string>>
  type?: 'password' | 'email' | 'text'
  required?: boolean
}

export function InputField(props: InputFieldProps) {
  return (
    <div className='flex flex-col mt-4'>
      <label>{props.label}</label>
      <input
        type={props.type ?? 'text'}
        value={props.value}
        onChange={e => props.onChange?.(e.target.value)}
        required={props.required}
        className={`
          px-4 py-3 bg-gray-200 mt-2
          border focus:border-blue-500 focus:bg-gray-50
          focus:outline-none rounded-lg
        `}
      />
    </div>
  )
}