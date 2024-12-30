import { redirect } from "next/navigation";
import Range from "@/components/range/Range";
import {
  API_URL_EXERCISE2,
  NO_VALUES_MESSAGE,
  FAILED_FETCH_MESSAGE,
  PAGE_TITLE_EXERCISE2,
  PAGE_DESCRIPTION_EXERCISE2,
} from "@/constants";
import Link from "next/link";

export const metadata = {
  title: PAGE_TITLE_EXERCISE2,
  description: PAGE_DESCRIPTION_EXERCISE2,
};

async function fetchRangeData() {
  try {
    const response = await fetch(API_URL_EXERCISE2, { cache: 'no-store' });
    return await response.json();
  } catch (error) {
    console.error(FAILED_FETCH_MESSAGE, error);
    return null;
  }
}

export default async function Exercise2() {
  const data = await fetchRangeData();
  if (!data || !data.rangeValues || data.rangeValues.length === 0) {
    console.log(NO_VALUES_MESSAGE);
    redirect(`/?message=${NO_VALUES_MESSAGE}`);
    return;
  }
  const min = Math.min(...data.rangeValues);
  const max = Math.max(...data.rangeValues);

  return (
    <div>
      <h1>Fixed Values</h1>
      <Range min={min} max={max} rangeValues={data.rangeValues} />
      <Link href="/" className="btn btn-primary">
          Go back
      </Link>
    </div>
  );
}