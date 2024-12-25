import { Skeleton } from "./ui/skeleton";

interface SceneOuputProps {
  outputUrl: string | null;
}

const SceneOuput = ({ outputUrl }: SceneOuputProps) => {
  return (
    <div className="h-max bg-foreground rounded-xl w-full max-w-sm">
      <h2 className="text-center py-2 text-background">Scene Output</h2>
      <div className="w-full p-4 bg-background border-2 border-foreground rounded-xl flex flex-col gap-4 ">
        <h3>Processed Audio</h3>
        {outputUrl ? (
          <>
            <audio controls className="w-full">
              <source src={outputUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </>
        ) : (
          <Skeleton className="h-14 w-full rounded-xl" />
        )}
      </div>
    </div>
  );
};

export default SceneOuput;
