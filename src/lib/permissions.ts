const checkCameraPermissions = async () => {
  if ("permissions" in navigator) {
    try {
      const result = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      console.log(`Camera permission state: ${result.state}`);
      if (result.state === "denied") {
        alert("Camera access is denied. Enable it in browser settings.");
      } else if (result.state === "prompt") {
        alert("Camera permission will be requested upon access.");
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  } else {
    alert("Permission API is not supported in your browser.");
  }
};

const checkMicrophonePermissions = async () => {
  if ("permissions" in navigator) {
    try {
      const result = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      console.log(`Microphone permission state: ${result.state}`);
      if (result.state === "denied") {
        alert("Microphone access is denied. Enable it in browser settings.");
      } else if (result.state === "prompt") {
        alert("Microphone permission will be requested upon access.");
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  } else {
    alert("Permission API is not supported in your browser.");
  }
};

export { checkCameraPermissions, checkMicrophonePermissions };
