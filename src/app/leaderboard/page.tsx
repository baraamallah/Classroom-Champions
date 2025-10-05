import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getClassrooms } from "@/lib/data";
import { Trophy } from "lucide-react";
import LeaderboardTable from "@/components/leaderboard-table";

export default async function LeaderboardPage() {
  const classrooms = await getClassrooms();
  const sortedClassrooms = classrooms.sort((a, b) => b.points - a.points);
  
  const maxPoints = Math.max(...sortedClassrooms.map(c => c.points), 1);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Classroom Champions Leaderboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          See who's leading the charge in building the best learning environment!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Current Rankings
          </CardTitle>
          <CardDescription>
            Points are updated daily. The competition is fierce!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaderboardTable classrooms={sortedClassrooms} maxPoints={maxPoints} />
        </CardContent>
      </Card>
    </div>
  );
}
