export class ScholarshipApplicationAlreadyExistsConflict extends Error {
  constructor() {
    super('Scholarship Application already exists');
  }
}
