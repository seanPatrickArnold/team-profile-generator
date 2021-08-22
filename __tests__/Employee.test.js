const Employee = require('../lib/Employee.js');

testData = {
    name: 'name',
    id: 1,
    email: 'email',
    type: 'type'
}

test('creates an test Employee', () => {
  const emp = new Employee(testData);

  expect(emp.name).toBe('name');
  expect(emp.email).toBe('email');
  expect(emp.type).toBe('type');
  expect(emp.id).toEqual(expect.any(Number));
});