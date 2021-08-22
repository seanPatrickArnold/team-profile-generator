const Intern = require('../lib/Intern.js');

testData = {
    name: 'name',
    id: 1,
    email: 'email',
    type: 'type',
    school: '123'
}

test('creates an test Intern', () => {
  const emp = new Intern(testData);

  expect(emp.name).toBe('name');
  expect(emp.email).toBe('email');
  expect(emp.type).toBe('type');
  expect(emp.school).toBe('123');
  expect(emp.id).toEqual(expect.any(Number));
});