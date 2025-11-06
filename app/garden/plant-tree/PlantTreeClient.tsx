import { Suspense } from "react";
import ChoseTreeWrapper from "../../_components/garden/choseForm/ChoseTreeWrapper";
import CallToDonate from "@/app/_components/garden/CalltoDonate";

// Проксі-компонент: отримує дані із page і передає далі у клієнтський компонент-обгортку
export default function PlantTreeClient(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  alleyTitleParam: string | null;
  error: string | null;
  queried: boolean;
}) {
  const { data, alleyTitleParam, error, queried } = props;

  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <ChoseTreeWrapper
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={data as any[]}
        alleyTitleParam={alleyTitleParam}
        error={error}
        queried={queried}
      />
      <CallToDonate
        title="Або підтримайте наш проект"
        btn="залишити донат"
        slug="https://shorts.pb.ua/-/dd6a6af5"
        desc="пам'ятайте, що кожен внесок важливий, незалежно від розміру"
      />
    </Suspense>
  );
}