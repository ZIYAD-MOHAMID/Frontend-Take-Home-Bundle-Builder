import type { BuilderData } from "./Types/types";
import "./index.css";

import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import { useSystemConfig } from "./hooks/useSystemConfig";
import { useBuilderData } from "./hooks/useBuilderData";

export default function App() {
  const { data: initialData, loading, error } = useBuilderData();

  // Guard the hook call so it only runs when initialData is available
  const system = useSystemConfig(
    initialData ?? {
      steps: [],
      initialState: { quantities: {}, selectedVariants: {} },
    },
  );

  if (loading)
    return <div className="loading">Loading security bundle builder...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!initialData) return null;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 max-[500px]:p-0 max-[500px]:py-5 max-[500px]:m-0">
      <div className="flex flex-col 2xl:block lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Steps & Builder */}
        <LeftSide initialData={initialData} {...system} />

        {/* Right Column: Sticky Summary Panel */}
        <RightSide initialData={initialData} {...system} />
      </div>
    </div>
  );
}
