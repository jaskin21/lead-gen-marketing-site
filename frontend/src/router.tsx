import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const NotFound = lazy(() => import("./pages/NotFound"));

function withSuspense(element: ReactNode) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: withSuspense(<LandingPage />) },
  { path: "/thank-you", element: withSuspense(<ThankYou />) },
  { path: "*", element: withSuspense(<NotFound />) },
]);
