"use client";

import type { Classroom, ChecklistItem } from "@/lib/types";
import { useActionState } from "react";
import { submitChecklist, type FormState } from "@/lib/actions";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import PointsChart from "./points-chart";

type TeacherDashboardProps = {
  classroom: Classroom;
  checklistItems: ChecklistItem[];
  isSubmittedToday: boolean;
  today: string;
};

export default function TeacherDashboard({
  classroom,
  checklistItems,
  isSubmittedToday,
  today,
}: TeacherDashboardProps) {
  const initialState: FormState = { message: "", isSuccess: false };
  const [state, formAction] = useActionState(submitChecklist, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.isSuccess ? "Success!" : "Uh oh!",
        description: state.message,
        variant: state.isSuccess ? "default" : "destructive",
      });
      if (state.isSuccess) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <form ref={formRef} action={formAction} className="space-y-6">
        <input type="hidden" name="classroomId" value={classroom.id} />
        <input type="hidden" name="today" value={today} />
        <div className="space-y-4">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 rounded-lg border p-4 transition-colors has-[:checked]:bg-accent has-[:disabled]:opacity-50"
            >
              <Checkbox
                id={item.id}
                name={item.id}
                value={item.id}
                disabled={isSubmittedToday}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor={item.id} className="font-medium cursor-pointer">
                  {item.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  +{item.points} points
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button type="submit" disabled={isSubmittedToday} className="w-full sm:w-auto">
          <Send className="mr-2 h-4 w-4" />
          {isSubmittedToday ? "Submitted for Today" : "Submit Checklist"}
        </Button>
      </form>
      <PointsChart classroom={classroom} />
    </div>
  );
}
