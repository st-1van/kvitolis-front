import { notFound } from "next/navigation";
import GardenClient from "./GardenClient";
import fetchAPI from "@/lib/strapi";


export default async function Page() {
  try {
    const path = `/alleys-col`;
    const urlParamsObject = {
      sort: { priority: "desc" },
      populate: {
        tree: {
          populate: ['img']
        },
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData : any = await fetchAPI(path, urlParamsObject, { timeout: 15000, retries: 1 });

    return <GardenClient 
              alleyData={responseData.data}
            />;

  } catch (err) {
    console.error(`Failed to render garden page:`, err);
    return notFound();
  }
}