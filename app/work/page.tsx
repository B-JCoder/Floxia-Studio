import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Work() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>Work</h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </>
  );
}
