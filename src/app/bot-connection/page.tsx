import { Suspense } from "react";
import BotConnectionClient from "./BotConnectionClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <BotConnectionClient />
    </Suspense>
  );
}
