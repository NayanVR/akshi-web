import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import AudioInput from "./audio-input";
import ImageInput from "./image-input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/utils";

interface SceneInputProps {
  setOutputUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const SceneInput = ({ setOutputUrl }: SceneInputProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!imageFile || !audioFile) {
      toast.error("Please select an image and audio file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("audio", audioFile);

    try {
      const res = await axiosInstance.post("/process-scene", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setOutputUrl(axiosInstance.getUri() + "/" + res.data);
    } catch {
      toast.error("An error occurred while processing the scene");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-max bg-foreground rounded-xl w-full max-w-sm">
      <h2 className="text-center py-2 text-background">Scene Input</h2>
      <div className="w-full p-4 bg-background border-2 border-foreground rounded-xl flex flex-col gap-4 ">
        <ImageInput imageFile={imageFile} setImageFile={setImageFile} />
        <Separator />
        <AudioInput audioFile={audioFile} setAudioFile={setAudioFile} />
        <Separator />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full disabled:opacity-100"
        >
          {loading ? <LoaderCircleIcon className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default SceneInput;
