import { redirect } from "next/navigation";
import Range from "@/components/range/Range";
import {
  API_URL_EXERCISE1,
  NO_VALUES_MESSAGE,
  FAILED_FETCH_MESSAGE,
  PAGE_TITLE_EXERCISE1,
  PAGE_DESCRIPTION_EXERCISE1,
} from "@/constants";
import Link from "next/link";

export const metadata = {
  title: PAGE_TITLE_EXERCISE1,
  description: PAGE_DESCRIPTION_EXERCISE1,
};

async function fetchRangeData() {
  try {
    const response = await fetch(API_URL_EXERCISE1, { cache: 'no-store' });
    return await response.json();
  } catch (error) {
    console.error(FAILED_FETCH_MESSAGE, error);
    return null;
  }
}

export default async function Exercise1() {
  const data = await fetchRangeData();
  if (!data || typeof data.min !== 'number' || typeof data.max !== 'number' || data.min > data.max) {
    console.log(NO_VALUES_MESSAGE);
    redirect(`/?message=${NO_VALUES_MESSAGE}`);
    return;
  }
  const { min, max } = data;
  return (
    <div>
      <h1>Normal Range</h1>
      <Range min={min} max={max} />
      <Link href="/" className="btn btn-primary">
          Go back
      </Link>
    </div>
  );
}