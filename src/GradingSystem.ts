// 🎓 Student Grading System
// 🏫 Create a system that manages student records and calculates their average grade.
//
// 1. Implement a class `Gradebook<T>` to store student records.
// 2. Implement a method `addStudent` that adds a new student with an empty grade list.
// 3. Implement a method `addGrade` that records a new grade for a student.
// 4. Implement a method `getAverageGrade` that returns a student’s average grade.
// 5. Implement a method `getStudentGrades` that returns all recorded grades for a student. Formula to get average: sumOfAllGrades / numberOfSubjects.
// 6. Implement a method `updateSubjectGrade` that updates a subject grade for a student.

interface Grade {
  subject: string;
  grade: number;
}

interface Student {
  id: number;
  name: string;
  grades: Grade[];
}

class Gradebook<T extends Student> {
  students: T[] = [];

  addStudent(student: T): string {
    this.students.push(student);
    return `${student.name} added to the gradebook.`;
  }

  addGrade(id: number, grade: Grade): string {
    const student: Student = this.students.find((student) => student.id === id);
    student?.grades.push(grade);
    return `Grade recorded for ${grade.subject}.`;
  }

  getAverageGrade(id: number): string {
    const student: Student = this.students.find((student) => student.id === id);
    const totalGrades: number = student?.grades.reduce((acc: number, grade: Grade) => acc + grade.grade, 0);
    return `Average grade for ${student?.name} is ${totalGrades / student?.grades.length}.`;
  }

  getStudentGrades(id: number): string {
    const student: Student = this.students.find((student) => student.id === id);
    return `Grades for ${student?.name}: ${student?.grades.map((grade: Grade) => `${grade.subject}: ${grade.grade}`).join(", ")}`;
  }

  updateSubjectGrade(id: number, subject: string, newGrade: number): string {
    const student: Student = this.students.find((student) => student.id === id);
    const gradeIndex: number = student?.grades.findIndex((grade: Grade) => grade.subject === subject);
    if (student && gradeIndex !== undefined && gradeIndex >= 0) {
      student.grades[gradeIndex].grade = newGrade;
    }
    return `Grade updated for ${subject}.`;
  }
}

// Test cases
const gradebook = new Gradebook();

console.log(gradebook.addStudent({ id: 1, name: "Alice", grades: [] })); // "Alice added to the gradebook."
console.log(gradebook.addGrade(1, { subject: "Math", grade: 90 })); // "Grade recorded for Math."
console.log(gradebook.addGrade(1, { subject: "English", grade: 80 })); // "Grade recorded for English."
console.log(gradebook.addGrade(1, { subject: "Science", grade: 85 })); // "Grade recorded for Science."
console.log(gradebook.getAverageGrade(1)); // Should return Alice's average grade
console.log(gradebook.getStudentGrades(1)); // Should return all grades for Alice
console.log(gradebook.updateSubjectGrade(1, "English", 95)); // Should update Alice's English grade to 95
console.log(gradebook.getStudentGrades(1));