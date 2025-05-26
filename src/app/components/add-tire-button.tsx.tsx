'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from './button';
import { TireFieldValues } from './tire-form';
import { ModalProps } from './modal';

const TireFormModal = dynamic(() => import('./tire-form-modal'), {
  ssr: false,
});

interface AddTireButtonProps {
  onAddTire: (tire: TireFieldValues) => void;
}

export default function AddTireButton({ onAddTire }: AddTireButtonProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>Додати шину/диск</Button>
      <TireFormModal
        onSubmit={(values) => {
          onAddTire(values);
          setShow(false);
        }}
        show={show}
        onClose={() => setShow(false)}
      />
    </>
  );
}