import getListStudents from "./0-get_list_students.js";

function updateStudentGradeByCity(students, city, newGrades) {
  return students
    .filter(student => student.location === city)
    .map(student => {
      const matchingGrade = newGrades.find(grade => grade.studentId === student.id);
      if (matchingGrade) {
        return {
          id: student.id,
          firstName: student.firstName,
          location: student.location,
          grade: matchingGrade.grade
        };
      } else {
        return {
          id: student.id,
          firstName: student.firstName,
          location: student.location,
          grade: 'N/A'
        };
      }
    });
}

export default updateStudentGradeByCity;
