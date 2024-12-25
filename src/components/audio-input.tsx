import { CircleStopIcon, MicIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { useRef, useState } from "react";
import { checkMicrophonePermissions } from "@/lib/permissions";

interface AudioInputProps {
  audioFile: File | null;
  setAudioFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const AudioInput = ({ audioFile, setAudioFile }: AudioInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    setAudioFile(null);
    await checkMicrophonePermissions();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const file = new File([audioBlob], "recorded-audio.wav", {
          type: "audio/wav",
        });
        setAudioFile(file);

        // Stop the audio stream
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting audio recording:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <div>
      <h2>Audio</h2>
      <div className="flex items-center w-full h-full gap-2 my-2">
        <Input
          type="file"
          id="audio"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setAudioFile(file);
          }}
        />
        <p>or</p>
        {isRecording ? (
          <Button
            variant={"outline"}
            className="h-10 w-10"
            onClick={stopRecording}
          >
            <CircleStopIcon className="scale-125 text-red-600" />
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="h-10 w-10"
            onClick={startRecording}
          >
            <MicIcon className="scale-125" />
          </Button>
        )}
      </div>
      {audioFile ? (
        <audio controls className="w-full">
          <source src={URL.createObjectURL(audioFile)} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <Skeleton className="h-14 w-full rounded-md flex items-center justify-center">
          <p className="text-zinc-800">Preview Audio</p>
        </Skeleton>
      )}
    </div>
  );
};

export default AudioInput;
