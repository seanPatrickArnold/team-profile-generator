const Engineer = require('../lib/Engineer.js');

testData = {
    name: 'name',
    id: 1,
    email: 'email',
    type: 'type',
    username: '123'
}

test('creates an test Engineer', () => {
  const emp = new Engineer(testData);

  expect(emp.name).toBe('name');
  expect(emp.email).toBe('email');
  expect(emp.type).toBe('type');
  expect(emp.username).toBe('123');
  expect(emp.id).toEqual(expect.any(Number));
});