type ButtonProps = {
    label: string,
    variant: 'primary' | 'secondary'
    onClick: () => void
    disabled?: boolean
}

export function Button({ label, variant, disabled, onClick }: ButtonProps) {
    const variantClasses = variant === 'primary' ? 'bg-red-600 text-white' :
        'bg-white text-red-600 border border-red-600'

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md ${variantClasses}`}
            disabled={disabled}>
            {label}
        </button>)
}