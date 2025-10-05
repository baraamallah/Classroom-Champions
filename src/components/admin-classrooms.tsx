"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  handleAddClassroom,
  handleDeleteClassroom,
  handleUpdateClassroom,
} from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getClassrooms } from "@/lib/data";
import { Classroom } from "@/lib/types";

export default function AdminClassrooms() {
  const { toast } = useToast();
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] =
    useState<Classroom | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getClassrooms();
      setClassrooms(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const teacherName = formData.get("teacherName") as string;

    try {
      if (editingClassroom) {
        await handleUpdateClassroom(editingClassroom.id, { name, teacherName });
        toast({ title: "Success", description: "Classroom updated." });
      } else {
        await handleAddClassroom({ name, teacherName });
        toast({ title: "Success", description: "Classroom added." });
      }
      // Refetch data
      const data = await getClassrooms();
      setClassrooms(data);
      setDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save classroom.",
      });
    } finally {
      setIsSubmitting(false);
      setEditingClassroom(null);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await handleDeleteClassroom(id);
      toast({ title: "Success", description: "Classroom deleted." });
      const data = await getClassrooms();
      setClassrooms(data);
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete classroom.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classroom Management</CardTitle>
        <CardDescription>
          Add, edit, or delete classrooms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingClassroom(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Classroom
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingClassroom ? 'Edit' : 'Add'} Classroom</DialogTitle>
                <DialogDescription>
                  Fill in the details for the classroom.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" name="name" defaultValue={editingClassroom?.name} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="teacherName" className="text-right">
                      Teacher
                    </Label>
                    <Input id="teacherName" name="teacherName" defaultValue={editingClassroom?.teacherName} className="col-span-3" required/>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Points</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              classrooms.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.teacherName}</TableCell>
                  <TableCell>{c.points}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingClassroom(c); setDialogOpen(true); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <Trash2 className="h-4 w-4 text-destructive" />
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the classroom and all its data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(c.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
