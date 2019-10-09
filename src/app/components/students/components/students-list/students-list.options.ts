export class StudentListOptions {
  public tableHeaders: Array<string>;
  public tableObjects: object;

  constructor(objects: Array<object>) {
    this.tableHeaders = ['Id', 'Name', 'Last Name', 'Address', 'Description'];
    this.tableObjects = objects;
  }
}
