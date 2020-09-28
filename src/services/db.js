// eslint-disable-next-line max-classes-per-file
import mockupData from '@/mockupData';
import updateSubordinatesAndSupervisors from '@/Utils/updateSubordinatesAndSupervisors';

class Database {
  constructor() {
    if (Database.exists) {
      this.onError('Database connection should be singleton');
      return Database.instance;
    }
    Database.instance = this;
    Database.exists = true;
  }

  find() {
    this.onError('Method Should be overridden');
  }

  insert() {
    this.onError('Method Should be overridden');
  }

  save() {
    this.onError('Method Should be overridden');
  }

  remove() {
    this.onError('Method Should be overridden');
  }

  // eslint-disable-next-line class-methods-use-this
  onError(errorMessage = '') {
    return new Error(errorMessage);
  }
}

class LocalStorage extends Database {
  constructor(database, databaseKey) {
    super();
    this.databaseKey = databaseKey;
    this.connect(database);
  }

  connect(database) {
    const localStorageDataExist = this.read();
    if (!localStorageDataExist) this.write(database);
  }

  connectTable(data, table) {
    if (!data[table]) {
      this.onError('There are no such table');
    }
    return data[table];
  }

  read() {
    return JSON.parse(localStorage.getItem(this.databaseKey));
  }

  write(data) {
    localStorage.setItem(this.databaseKey, JSON.stringify(data));
  }

  // @toDo update find all
  find(table = '', searchParam = null, findAll = false) {
    const data = this.read();
    const currentTable = this.connectTable(data, table);
    if (!searchParam) return currentTable;
    const searchKey = Object.keys(searchParam)[0];
    const searchValue = Object.values(searchParam)[0];
    if (findAll) {
      return currentTable.filter((entity) => entity[searchKey] === searchValue);
    }
    return currentTable.find((entity) => entity[searchKey] === searchValue);
  }

  // @ToDo related Entities update - move to models
  // ======================

  insert(table = '', entity) {
    const data = this.read();
    const currentTable = this.connectTable(data, table);
    const { id } = entity;
    const idx = currentTable.findIndex((item) => item.id === id);
    if (idx < 0) {
      this.onError('There are no such entity');
    }

    // Updates for entity
    const currentValue = currentTable[idx];
    currentTable[idx] = entity;
    const updatedTable = updateSubordinatesAndSupervisors(currentValue, entity, currentTable);
    data[table] = updatedTable;
    this.write(data);
    return updatedTable;
  }

  save() {
    console.log(this.data);
  }

  remove() {
    console.log(this.data);
  }
}

const database = new LocalStorage(mockupData, 'members');

export default database;
