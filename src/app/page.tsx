import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChecklistItems, getClassroom } from "@/lib/data";
import { CheckCircle2, Star } from "lucide-react";
import TeacherDashboard from "@/components/teacher-dashboard";
import { Classroom } from "@/lib/types";

// Hardcoded user for demo purposes
const USER_CLASSROOM_ID = "cls-1";

export default async function TeacherHomePage() {
  const classroom = await getClassroom(USER_CLASSROOM_ID);
  const checklistItems = await getChecklistItems();
  const today = new Date().toISOString().split("T")[0];
  const isSubmittedToday = classroom?.pointHistory[today] !== undefined;

  if (!classroom) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Could not find your classroom data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Welcome, {classroom.teacherName}!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Ready to make today another champion day for the {classroom.name}?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Daily Classroom Checklist
              </CardTitle>
              <CardDescription>
                Complete the checklist to earn points for your class. Submissions
                are final for the day.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TeacherDashboard
                classroom={classroom}
                checklistItems={checklistItems}
                isSubmittedToday={isSubmittedToday}
                today={today}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Star className="h-4 w-4 text-primary-foreground/80" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold">{classroom.points}</div>
              <p className="text-xs text-primary-foreground/80">
                Great job! Keep up the excellent work.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
