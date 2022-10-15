# Yona Forms - Server

## Technologies

This project was generated with:
- Typescript 4.3.5
- NodeJS 12.14.1
- NPM 6.13.4
- PostgreSQL 14.5
- PostgreSQL NPM (NodeJS Driver) 8.8.0 ([PostgreSQL Compatibility](https://node-postgres.com/))

## PostgreSQL

### Connecting

- Connect as default user `postgres`
  ```
  psql -U postgres
  ```

- Connect to DB `yona-forms` as user `yona-forms-admin`
  ```
  psql -U yona-forms-admin yona-forms
  ```

- Connect to remote DB `yona-forms` as user `yona-forms-admin`
  ```
  psql -h 34.79.9.100 -p 5432 -U yona-forms-admin yona-forms
  ```

### Useful Commands
- **Show Tables**
  ```
  \dt
  ```

- **Create Table**
  ```
  CREATE TABLE IF NOT EXISTS entry_mode_forms(
      id serial PRIMARY KEY,
      title VARCHAR (50) NOT NULL,
      created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  ```

- **Drop Table**
  ```
  DROP TABLE entry-mode-forms;
   ```

- **Describe Table**
  ```
  \d entry-mode-forms
  ```


## Development

If `typescript` is installed globally link it to current project
```
npm link typescript
```

Then run `nodemon`
```
npm run start:dev
```

## Deployment

Run `npm run build` to build the server on local machine.  
WinSCP `out` and `package.json` into `~/server` on CentOS 7 machine.
```
cd /var/www/html/yona-forms/server
mv ~/server/* .
npm i
mkdir log tmp
sudo chmod 777 log tmp
pm2 start out/main.js --name server
tail -f log/yona-forms.log
```