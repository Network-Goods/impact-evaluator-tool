import { ErrorBoundary } from "react-error-boundary";

type LayoutProps = {
  children?: React.ReactNode;
};

function fallbackRender({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  console.log("caught error", error);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      className="w-full min-h-screen h-full bg-[#fafafa] text-offblack flex flex-col relative"
      onDragOver={(evt) => evt.preventDefault()}
      onDrop={(evt) => evt.preventDefault()}
    >
      <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
    </div>
  );
}
