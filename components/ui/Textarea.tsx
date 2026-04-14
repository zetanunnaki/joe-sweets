import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {label && (
          <label htmlFor={textareaId} style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-secondary)', fontFamily: 'var(--font-body)' }}>
            {label}
            {props.required && <span style={{ color: 'var(--color-accent)', marginLeft: '2px' }}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          style={{
            padding: '0.625rem 0.875rem',
            borderRadius: '8px',
            border: `2px solid ${error ? 'var(--color-accent)' : '#e2d9cf'}`,
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            outline: 'none',
            resize: 'vertical',
            width: '100%',
          }}
          {...props}
        />
        {error && <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', margin: 0 }}>{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
