"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getChecklistItems, updateClassroomPoints, resetAllPoints } from "./data";

const checklistSchema = z.object({
  classroomId: z.string(),
  today: z.string().date(),
  items: z.array(z.string()),
});

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
