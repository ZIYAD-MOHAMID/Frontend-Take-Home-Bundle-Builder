import rawData from "./data/builderData.json";
import type { BuilderData } from "./Types/types";
import "./index.css";

import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import { useSystemConfig } from "./hooks/useSystemConfig";

const initialData: BuilderData = rawData as BuilderData;

export default function App() {
  const system = useSystemConfig(initialData);

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
