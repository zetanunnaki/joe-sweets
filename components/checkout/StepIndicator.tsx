interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: '2.5rem' }}>
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: isDone ? 'var(--color-primary)' : isActive ? 'var(--color-secondary)' : 'var(--color-bg-alt)',
                color: isDone || isActive ? 'var(--color-white)' : 'var(--color-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-body)',
                border: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                transition: 'all 200ms',
              }}>
                {isDone ? '✓' : stepNum}
              </div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-body)', color: isActive ? 'var(--color-primary)' : 'var(--color-muted)', fontWeight: isActive ? 600 : 400, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: '60px', height: '2px', backgroundColor: isDone ? 'var(--color-primary)' : 'var(--color-bg-alt)', marginBottom: '18px', transition: 'background 300ms' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
