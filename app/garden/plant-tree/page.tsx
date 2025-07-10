import { Suspense } from 'react';
import ChoseTreeWrapper from '../../_components/garden/choseForm/ChoseTreeWrapper';

export default function chooseTree() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <ChoseTreeWrapper />
    </Suspense>
  );
}
