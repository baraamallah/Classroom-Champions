export type Classroom = {
  id: string;
  name: string;
  teacherName: string;
  points: number;
  // Represents points earned on a specific day 'YYYY-MM-DD'
  pointHistory: Record<string, number>;
};

export type ChecklistItem = {
  id: string;
  label: string;
  points: number;
};
