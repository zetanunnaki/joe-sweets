import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, style, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: 'var(--color-secondary)',
            }}
          >
            {label}
            {props.required && <span style={{ color: 'var(--color-accent)', marginLeft: '2px' }}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          style={{
            padding: '0.625rem 0.875rem',
            borderRadius: '8px',
            border: `2px solid ${error ? 'var(--color-accent)' : '#e2d9cf'}`,
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 200ms',
            width: '100%',
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? 'var(--color-accent)' : '#e2d9cf';
          }}
          {...props}
        />
        {error && (
          <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', margin: 0 }}>{error}</p>
        )}
        {helperText && !error && (
          <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
