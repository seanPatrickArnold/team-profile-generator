const Manager = require('../lib/Manager.js');

testData = {
    name: 'name',
    id: 1,
    email: 'email',
    type: 'type',
    room: '123'
}

test('creates an test Manager', () => {
  const emp = new Manager(testData);

  expect(emp.name).toBe('name');
  expect(emp.email).toBe('email');
  expect(emp.type).toBe('type');
  expect(emp.room).toBe('123');
  expect(emp.id).toEqual(expect.any(Number));
});