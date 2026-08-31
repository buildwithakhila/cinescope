type ButtonProps = {
    label: string,
    variant: 'primary' | 'secondary'
    onClick: () => void
    disabled?: boolean
}

export function Button({ label, variant, disabled, onClick }: ButtonProps) {
    const variantClasses = variant === 'primary'
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'

    return (
        <button
            onClick={onClick}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${variantClasses}`}
            disabled={disabled}>
            {label}
        </button>)
}
