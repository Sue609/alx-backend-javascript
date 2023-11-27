export default function iterateThroughObject(reportWithIterator) {
  const employeeNames = [];

  for (const department in reportWithIterator) {
    const employees = reportWithIterator[department];
    for (const employee of employees) {
      employeeNames.push(employee);
    }
  }

  return employeeNames.join(' | ');
}
