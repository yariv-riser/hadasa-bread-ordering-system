'use client';

import { useFormStatus } from "react-dom";

export default function OrderFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? 'שולח...' : 'אישור ושליחה'}
    </button>
  )
}