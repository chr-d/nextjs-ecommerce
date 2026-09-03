"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-error">
        Something went wrong!
      </h2>
      <p className="text-base-content mb-6 max-w-md">
        {error.message || "An unexpected error occurred."}
      </p>
      <button onClick={() => reset()} className="btn btn-primary">
        Try again
      </button>
    </div>
  );
}
