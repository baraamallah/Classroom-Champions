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
  handleAddChecklistItem,
  handleDeleteChecklistItem,
  handleUpdateChecklistItem,
} from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getChecklistItems } from "@/lib/data";
import { ChecklistItem } from "@/lib/types";

export default function AdminChecklist() {
  const { toast } = useToast();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<ChecklistItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getChecklistItems();
      setItems(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const label = formData.get("label") as string;
    const points = parseInt(formData.get("points") as string, 10);

    try {
      if (editingItem) {
        await handleUpdateChecklistItem(editingItem.id, { label, points });
        toast({ title: "Success", description: "Checklist item updated." });
      } else {
        await handleAddChecklistItem({ label, points });
        toast({ title: "Success", description: "Checklist item added." });
      }
      // Refetch data
      const data = await getChecklistItems();
      setItems(data);
      setDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save item.",
      });
    } finally {
      setIsSubmitting(false);
      setEditingItem(null);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await handleDeleteChecklistItem(id);
      toast({ title: "Success", description: "Item deleted." });
      const data = await getChecklistItems();
      setItems(data);
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete item.",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checklist Management</CardTitle>
        <CardDescription>
          Add, edit, or delete checklist items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit' : 'Add'} Item</DialogTitle>
                <DialogDescription>
                  Fill in the details for the checklist item.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="label" className="text-right">
                      Label
                    </Label>
                    <Input id="label" name="label" defaultValue={editingItem?.label} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="points" className="text-right">
                      Points
                    </Label>
                    <Input id="points" name="points" type="number" defaultValue={editingItem?.points} className="col-span-3" required/>
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
              <TableHead>Label</TableHead>
              <TableHead>Points</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>{item.points}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingItem(item); setDialogOpen(true); }}>
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
                            This will permanently delete this checklist item.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
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
