import AdminPanel from "@/components/admin-panel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage the Classroom Champions competition.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Competition Controls
          </CardTitle>
          <CardDescription>
            Use these tools to finalize competitions and prepare for the next round.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminPanel />
        </CardContent>
      </Card>
    </div>
  );
}
