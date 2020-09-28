import db from '@/services/db';

class Api {
  constructor(database) {
    this.database = database;
  }

  get(table = 'members', searchParam, findAll = true) {
    return new Promise((resolve) => {
      const data = this.database.find(table, searchParam, findAll);
      resolve(data);
    });
  }

  getById(table = 'members', id) {
    return new Promise((resolve) => {
      resolve(this.database.find(table, { id }));
    });
  }

  put(table = 'members', id, entity) {
    return new Promise((resolve) => {
      const updatedEntity = this.database.insert(table, id, entity);
      resolve(updatedEntity);
    });
  }

  create(table = 'members', entity) {
    return this.database.save(table, entity);
  }

  remove(table = 'members', id) {
    return this.database.remove(table, id);
  }
}

const api = new Api(db);

export default api;
