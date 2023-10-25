# Yona Forms
## Assignment Description
Develop a browser-based form creator (similar to `Google Forms`).
- User can toggle between **Edit Mode**, **Entry Mode** and **View Mode**
  - **Edit Mode** - The user can add/remove fields. A field has a label and a type: number (form validates that this is a number), string (1-50 chars) or single selection (via radio button)
  - **Entry Mode** - The user can add new entries, the newly rendered form abides by latest definitions in **Edit Mode**
  - **View mode** - The user can view all past entries across all definitions of forms (can be simple string concatenation per entry)
- No need for user mgmt. of any sort, this is a single user system
- All data is stored in a local `PostgreSQL` database
- Tech stack is `Angular` + `Redux` or `NGRX`, `NodeJS`/`Express` + `PostgreSQL`

