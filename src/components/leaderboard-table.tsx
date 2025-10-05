import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Classroom } from "@/lib/types";
import { Crown, Star } from "lucide-react";

type LeaderboardTableProps = {
    classrooms: Classroom[];
    maxPoints: number;
}

const getTrophyColor = (rank: number) => {
    if (rank === 0) return "text-yellow-400";
    if (rank === 1) return "text-gray-400";
    if (rank === 2) return "text-yellow-600";
    return "text-muted-foreground";
}

export default function LeaderboardTable({ classrooms, maxPoints }: LeaderboardTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead>Class</TableHead>
          <TableHead className="hidden sm:table-cell">Teacher</TableHead>
          <TableHead className="text-right">Points</TableHead>
          <TableHead className="hidden md:table-cell w-[200px]">Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {classrooms.map((classroom, index) => (
          <TableRow key={classroom.id} className={index === 0 ? "bg-accent/50" : ""}>
            <TableCell className="font-medium">
                <div className="flex items-center justify-center">
                    {index < 3 ? (
                        <Crown className={`h-6 w-6 ${getTrophyColor(index)}`} />
                    ) : (
                        <span>{index + 1}</span>
                    )}
                </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://picsum.photos/seed/${classroom.id}/40/40`} alt={classroom.name} />
                  <AvatarFallback>{classroom.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{classroom.name}</span>
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell text-muted-foreground">{classroom.teacherName}</TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1 font-bold text-lg">
                    <span>{classroom.points}</span>
                    <Star className="h-4 w-4 text-yellow-500" />
                </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                    <Progress value={(classroom.points / maxPoints) * 100} className="h-2" />
                    <span>{Math.round((classroom.points / maxPoints) * 100)}%</span>
                </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
