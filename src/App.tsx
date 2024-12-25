import { useState } from "react";
import SceneInput from "./components/scene-input";
import SceneOuput from "./components/scene-output";
import { ArrowRightIcon } from "lucide-react";

function App() {
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  return (
    <main className="flex gap-4 min-h-screen min-w-screen justify-center items-center px-2 my-4 bg-background">
      <SceneInput setOutputUrl={setOutputUrl} />
      <ArrowRightIcon />
      <SceneOuput outputUrl={outputUrl} />
    </main>
  );
}

export default App;
