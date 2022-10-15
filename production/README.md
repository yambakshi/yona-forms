# Create PostgreSQL Instance
1. [Create Instance](https://cloud.google.com/sql/docs/postgres/create-instance)
   1. **Create DB**
      1. In your `PostgreSQL` instance go to `Databases` in the left-hand side menu.
      2. Click `ADD DATABASE` and fill the `Database name` field.
      3. Click `Create`.
   2. **Create User**
      1. In your `PostgreSQL` instance go to `Users` in the left-hand side menu.
      2. Click `ADD USER ACCOUNT` and make sure the default `Built-in authentication` option is selected.
      3. Set a `username` and a `password` (some special chars may cause problems when connecting so try to keep it alphanumeric) and click `ADD`.
2. [Configure Access](https://cloud.google.com/sql/docs/mysql/connect-admin-ip#:~:text=In%20the%20Google%20Cloud%20console,the%20Cloud%20SQL%20Instances%20page.&text=To%20open%20the%20Overview%20page,where%20the%20client%20is%20installed.)
   1. Copy the `External IP` of the VM instance where the app that uses `PostgreSQL` is running.
   2. Go to `Cloud SQL` and select the `PostgreSQL` instance.
   3. In your `PostgreSQL` instance go to `Connections` in the left-hand side menu.
   4. Under `Authorized networks` click `ADD NETWORK` and paste the VM's IP.
   5. If you want to connect from you local machine you can also add the local machine's IP here.