# employee-tracker

problems with the tables:
- if a position that manages other positions is empty, employees managed by that position won't be able to select it as their manager
- when someone's role is updated, their manager is not
SOLUTION:
- manager ID should be associated with a role, not an employee. So an employee's role dictates their manager.