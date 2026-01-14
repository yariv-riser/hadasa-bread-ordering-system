'use client'; // This must be a Client Component

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: '10px 20px',
        cursor: pending ? 'not-allowed' : 'pointer',
        backgroundColor: pending ? '#ccc' : '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      }}
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}