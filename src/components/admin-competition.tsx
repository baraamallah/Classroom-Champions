"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resetCompetition } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, Trophy } from "lucide-react";
import { useState } from "react";

export default function AdminCompetition() {
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    const result = await resetCompetition();
    toast({
      title: "Competition Reset",
      description: result.message,
    });
    setIsResetting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competition Management</CardTitle>
        <CardDescription>
          Finalize the current competition or announce a winner.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">End of Month Finalization</h3>
          <p className="text-sm text-muted-foreground">
            Announce the winner and reset scores for a new competition.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" disabled>
            <Trophy className="mr-2 h-4 w-4" /> Announce Winner (Coming Soon)
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isResetting}>
                <RotateCcw
                  className={`mr-2 h-4 w-4 ${
                    isResetting ? "animate-spin" : ""
                  }`}
                />
                {isResetting ? "Resetting..." : "Reset Competition"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will reset all classroom points to zero. This
                  cannot be undone and will start a new competition period.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
