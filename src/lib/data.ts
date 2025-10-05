import type { Classroom, ChecklistItem } from "./types";

let classrooms: Classroom[] = [
  {
    id: "cls-1",
    name: "Starlight Scholars",
    teacherName: "Ms. Evelyn Reed",
    points: 125,
    pointHistory: { "2024-07-15": 20, "2024-07-16": 25, "2024-07-17": 25, "2024-07-18": 25, "2024-07-19": 30 },
  },
  {
    id: "cls-2",
    name: "Cosmic Voyagers",
    teacherName: "Mr. Leo Martinez",
    points: 110,
    pointHistory: { "2024-07-15": 15, "2024-07-16": 20, "2024-07-17": 30, "2024-07-18": 20, "2024-07-19": 25 },
  },
  {
    id: "cls-3",
    name: "Quantum Questers",
    teacherName: "Dr. Aris Thorne",
    points: 140,
    pointHistory: { "2024-07-15": 30, "2024-07-16": 30, "2024-07-17": 20, "2024-07-18": 30, "2024-07-19": 30 },
  },
  {
    id: "cls-4",
    name: "Phoenix Learners",
    teacherName: "Mrs. Iris Chen",
    points: 95,
    pointHistory: { "2024-07-15": 25, "2024-07-16": 15, "2024-07-17": 20, "2024-07-18": 15, "2024-07-19": 20 },
  },
];

const checklistItems: ChecklistItem[] = [
  { id: "item-1", label: "Classroom is tidy and organized", points: 10 },
  { id: "item-2", label: "Whiteboard is clean and ready for the next day", points: 5 },
  { id: "item-3", label: "All learning materials are returned to their designated spots", points: 5 },
  { id: "item-4", label: "Chairs are pushed in or stacked properly", points: 5 },
  { id: "item-5", label: "Technology (tablets, laptops) is charging correctly", points: 5 },
];

// Simulate a database call
export const getClassrooms = async (): Promise<Classroom[]> => {
  return Promise.resolve(JSON.parse(JSON.stringify(classrooms)));
};

export const getClassroom = async (id: string): Promise<Classroom | undefined> => {
  return Promise.resolve(JSON.parse(JSON.stringify(classrooms.find((c) => c.id === id))));
};

export const getChecklistItems = async (): Promise<ChecklistItem[]> => {
  return Promise.resolve(checklistItems);
};

export const updateClassroomPoints = async (id: string, pointsToAdd: number, date: string): Promise<Classroom> => {
  const classroomIndex = classrooms.findIndex((c) => c.id === id);
  if (classroomIndex === -1) throw new Error("Classroom not found");

  classrooms[classroomIndex].points += pointsToAdd;
  classrooms[classroomIndex].pointHistory[date] = pointsToAdd;
  return Promise.resolve(JSON.parse(JSON.stringify(classrooms[classroomIndex])));
};

export const resetAllPoints = async (): Promise<Classroom[]> => {
  classrooms = classrooms.map((c) => ({
    ...c,
    points: 0,
    pointHistory: {},
  }));
  return Promise.resolve(JSON.parse(JSON.stringify(classrooms)));
};
