import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-5xl font-bold text-red-600">
        Oops!
      </h1>

      <h2 className="text-2xl font-semibold">
        Something went wrong.
      </h2>

      <p className="text-gray-600">
        {error?.statusText || error?.message}
      </p>

      <Link
        to="/home"
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;