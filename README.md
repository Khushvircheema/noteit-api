# Backend Readme for noteit app
Note IT

## Description

You can make API calls to the following routes

### login

`router.get("/login", loginget);`

`router.post("/login", loginpost);`

### register

`router.post("/register", registerpost);`

### render all personnal on page
`router.get("/notes/:id", renderNotes);`

### post note to the database
`router.post("/notes/:id", createNote);`

`router.delete("/notes/:object/:note", deleteNote);`

### update a note
`router.patch("/notes/:object/:note", updateNote);`


You can create update and delete notes.

## Technologies Used
1. JavaScript
2. Node.js
3. Express.js
4. MongoDB
5. Render for deployment
6. npm
