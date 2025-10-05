"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminCompetition from "@/components/admin-competition";
import AdminClassrooms from "@/components/admin-classrooms";
import AdminChecklist from "@/components/admin-checklist";

export default function AdminPanel() {
  return (
    <Tabs defaultValue="competition">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="competition">Competition</TabsTrigger>
        <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
        <TabsTrigger value="checklist">Checklist Items</TabsTrigger>
      </TabsList>
      <TabsContent value="competition">
        <AdminCompetition />
      </TabsContent>
      <TabsContent value="classrooms">
        <AdminClassrooms />
      </TabsContent>
      <TabsContent value="checklist">
        <AdminChecklist />
      </TabsContent>
    </Tabs>
  );
}
