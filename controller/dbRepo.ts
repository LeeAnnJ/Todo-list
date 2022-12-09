// the database repository class
// this class is responsible for all database operations
// it is a singleton class
// In this project, we use the mysql database(when developing, we will use the mariaDB database when releasing)

import { createPool, Pool } from 'mysql2/promise';
import { DBConfig } from '../config/dbConfig';

export class DBRepo {
    
    // the pool of database connections
    private pool: Pool;
    // the instance of this class
    private static instance: DBRepo;

    // private constructor
    private constructor() {
        this.pool = createPool(DBConfig);
    }

    // get the instance of this class

    public static getInstance(): DBRepo {
        if (!this.instance) {
            this.instance = new DBRepo();
        }
        return this.instance;
    }

    // get the pool of database connections

    public getPool(): Pool {
        return this.pool;
    }

}
