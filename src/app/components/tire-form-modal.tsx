'use client';

import React from 'react';
import Modal, { ModalProps } from './modal';
import TireForm, { TireFormProps } from './tire-form';

export interface TireFormModalProps extends Omit<ModalProps, 'children'> {
  onSubmit: TireFormProps['onSubmit'];
}

export default function TireFormModal({ onSubmit, ...rest }: TireFormModalProps) {
  return (
    <Modal {...rest}>
      <TireForm onSubmit={onSubmit} />
    </Modal>
  );
}