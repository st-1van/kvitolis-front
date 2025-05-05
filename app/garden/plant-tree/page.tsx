import { Suspense } from 'react';
import PlantTreeWrapper from '@/app/_components/garden/alley/PlantTreeWrapper';

export default function Page() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <PlantTreeWrapper />
    </Suspense>
  );
}
