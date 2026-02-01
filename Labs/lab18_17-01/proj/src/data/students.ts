export type Status = "active" | "graduated";

export type Student = {
  id: string;
  name: string;
  status: Status;
};

export const students: Student[] = [
  { id: "1", name: "Ali", status: "active" },
  { id: "2", name: "Aysel", status: "graduated" },
  { id: "3", name: "Murad", status: "active" },
];
