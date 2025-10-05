import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-extrabold tracking-tighter text-primary sm:text-8xl">
          404
        </h1>
        <p className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Page Not Found
        </p>
        <p className="max-w-md text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>
      </div>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Go back to Homepage
        </Link>
      </Button>
    </div>
  );
}
