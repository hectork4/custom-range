import Link from 'next/link';

export default async function Page({searchParams}) {
  const { message } = await searchParams;

  return (
    <div>
      {message && (
        <pre className="alert-message">
          {message}
        </pre>
      )}

      <div className="mt-4">
        <Link href="/exercise1" className="btn btn-primary">
          Go to Exercise 1
        </Link>
        <Link href="/exercise2" className="btn btn-secondary ml-4">
          Go to Exercise 2
        </Link>
      </div>
    </div>
  );
}
