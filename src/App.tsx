import { useState } from "react";
import SceneInput from "./components/scene-input";
import SceneOuput from "./components/scene-output";
import { ArrowRightIcon } from "lucide-react";

function App() {
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  return (
    <main className="flex flex-col md:flex-row gap-4 min-h-screen min-w-screen justify-center items-center px-2 my-4 bg-background">
      <SceneInput setOutputUrl={setOutputUrl} />
      <ArrowRightIcon className="rotate-90 md:rotate-0" />
      <SceneOuput outputUrl={outputUrl} />
    </main>
  );
}

export default App;
