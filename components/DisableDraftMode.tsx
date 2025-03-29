"use client";
import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const DisableDraftMode = () => {
  const environment = useDraftModeEnvironment();
  const router = useRouter();
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  const handleClick = async () => {
    await fetch("/draftmode/disable");
    router.refresh();
  };
  return (
    <Button
      className="fixed bottom-4 right-4 px-4 py-2 bg-gray-50 z-50 text-black"
      onClick={handleClick}
    >
      Disable Draft Mode
    </Button>
  );
};

export default DisableDraftMode;
