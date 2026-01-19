'use client';

import { useFormStatus } from 'react-dom';

export default function DeleteButton({ handleOnClick }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={handleOnClick}
      className={pending ? 'pending' : ''}
    >
      מחיקה
    </button>
  );
}