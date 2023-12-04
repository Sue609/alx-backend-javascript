export default function(students) {
  return students.reduce((total, student) => total + student.id, 0);
}
