import { CameraIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { checkCameraPermissions } from "@/lib/permissions";

interface ImageInputProps {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageInput = ({ imageFile, setImageFile }: ImageInputProps) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const openCamera = async () => {
    if (imageFile) setImageFile(null);
    setIsCameraOpen(true);
    await checkCameraPermissions();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const closeCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "webcam-image.jpg", {
              type: "image/jpeg",
            });
            setImageFile(file);
            closeCamera();
          }
        }, "image/jpeg");
      }
    }
  };

  const clearImage = () => {
    setImageFile(null);
  };

  return (
    <div>
      <h2>Image</h2>
      <div className="w-full flex gap-2 h-full items-center my-2">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImageFile(file);
          }}
        />
        <p>or</p>
        <Button variant="outline" className="h-10 w-10" onClick={openCamera}>
          <CameraIcon className="scale-125" />
        </Button>
      </div>
      <div className="relative">
        {imageFile || isCameraOpen ? (
          imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Selected Image"
              className="w-full h-48 object-cover rounded-md"
            />
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-48 object-cover rounded-md"
              />
              <canvas
                ref={canvasRef}
                className="hidden"
                width={640}
                height={480}
              />
              <div className="absolute bottom-2 right-2 flex gap-2">
                <Button onClick={captureImage}>Capture</Button>
                <Button variant="outline" onClick={closeCamera}>
                  Close
                </Button>
              </div>
            </div>
          )
        ) : (
          <Skeleton className="h-48 w-full rounded-md flex items-center justify-center">
            <p className="text-zinc-800">Preview Image</p>
          </Skeleton>
        )}
        {imageFile && (
          <Button
            onClick={clearImage}
            className="h-8 w-8 absolute right-0 top-0 mt-2 mr-2"
          >
            <XIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
