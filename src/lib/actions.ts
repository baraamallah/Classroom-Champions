"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { 
  getChecklistItems, 
  updateClassroomPoints, 
  resetAllPoints,
  addClassroom,
  updateClassroom,
  deleteClassroom,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem
} from "./data";
import { Classroom, ChecklistItem } from "./types";

export type FormState = {
  message: string;
  isSuccess: boolean;
};

export async function submitChecklist(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const classroomId = formData.get("classroomId") as string;
  const today = formData.get("today") as string;
  const checklistItems = await getChecklistItems();
  const checkedItems = checklistItems.filter(item => formData.has(item.id));
  
  const pointsToAdd = checkedItems.reduce((total, item) => total + item.points, 0);

  try {
    if (pointsToAdd === 0) {
      return { message: "Please select at least one item.", isSuccess: false };
    }
    await updateClassroomPoints(classroomId, pointsToAdd, today);
    revalidatePath("/");
    revalidatePath("/leaderboard");
    return {
      message: `Awesome! You've earned ${pointsToAdd} points today.`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: "Failed to submit checklist. Please try again.",
      isSuccess: false,
    };
  }
}

export async function resetCompetition(): Promise<{ message: string }> {
  try {
    await resetAllPoints();
    revalidatePath("/");
    revalidatePath("/leaderboard");
    revalidatePath("/admin");
    return { message: "Competition has been successfully reset." };
  } catch (error) {
    return { message: "Failed to reset competition." };
  }
}

// Classroom Actions
export async function handleAddClassroom(data: Omit<Classroom, 'id' | 'points' | 'pointHistory'>) {
  await addClassroom(data);
  revalidatePath('/admin');
}

export async function handleUpdateClassroom(id: string, data: Partial<Omit<Classroom, 'id'>>) {
  await updateClassroom(id, data);
  revalidatePath('/admin');
  revalidatePath('/leaderboard');
  revalidatePath('/');
}

export async function handleDeleteClassroom(id: string) {
  await deleteClassroom(id);
  revalidatePath('/admin');
  revalidatePath('/leaderboard');
}

// Checklist Item Actions
export async function handleAddChecklistItem(data: Omit<ChecklistItem, 'id'>) {
  await addChecklistItem(data);
  revalidatePath('/admin');
}

export async function handleUpdateChecklistItem(id: string, data: Partial<Omit<ChecklistItem, 'id'>>) {
  await updateChecklistItem(id, data);
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function handleDeleteChecklistItem(id: string) {
  await deleteChecklistItem(id);
  revalidatePath('/admin');
  revalidatePath('/');
}
