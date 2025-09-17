import { Suspense } from 'react';
import ChoseTreeWrapper from '../../_components/garden/choseForm/ChoseTreeWrapper';
import CallToDonate from '@/app/_components/garden/CalltoDonate';

export default function chooseTree() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <ChoseTreeWrapper />
      <CallToDonate
        title="Або підтримайте наш проект"
        btn="залишити донат"
        slug='https://shorts.pb.ua/-/dd6a6af5'
        desc="пам'ятайте, що кожен внесок важливий, незалежно від розміру"
      />
    </Suspense>
  );
}
