'use client';

import { useFormStatus } from 'react-dom';

export default function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={pending ? 'pending' : ''}
    >
      עדכון
    </button>
  );
}