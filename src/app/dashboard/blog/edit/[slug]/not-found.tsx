import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex text-dark-500 items-center content-center justify-center text-base pt-8">
        <h1>404 Not Found</h1>
      </div>
      <div className="flex text-dark-500 items-center content-center justify-center text-base">
        <p>Could not find requested resource</p>
      </div>
      <div className="flex text-dark-500 items-center content-center justify-center text-base mt-3">
        <Link href="/dashboard/tutorial">Back</Link>
      </div>
    </>
  );
}
