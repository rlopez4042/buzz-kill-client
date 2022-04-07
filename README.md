# Project 4 – Buzz-Kill

- App is fully deployed (both front and back)
  - Frontend created with React | Deployed on `GitHub`: https://rlopez4042.github.io/buzz-kill-client/
  - Backend created with MongoDB/Express | Repo link on `Heroku`: https://github.com/rlopez4042/buzz-kill-mern-api

## Project Description

- Bug Tracker App

‘Buzz-Kill’

A bug tacker for users to report issues they’ve run into with their own code. 
-	Users will be required to sign in or create an account before accessing the app.
-	Users can create their own projects and add other users to their projects. In the project tab, users can create a ‘Sting’ or a trouble ticket, some error they’ve run into with their code block
-	Each sting will have a section for the ‘Date/Time’, ‘Code Block’, and ‘Comments’.
-	Once published, the ticket will appear in a list of ‘Stings’. Other users can select and provide feedback for each ‘Sting’. Solution button for comments by other users.

### Back-End MVP

- Uses MongoDB to implement a back end to collect user profile data and track projects created by users.
- Uses all CRUD (create, read, update, delete) functionality throughout the project (where it makes sense)

### Front-End MVP

- Uses React to leverage the backend API
- Must communicate with the back-end API RESTfully to CRUD resources 

### Version 1:
-	User authentication
-	No specific project, users submit code errors, and other users can make comments
-	Original user can mark trouble ticket either complete or incomplete

### Version 2:
-	Users can also create a project and specify tickets to the project.
-	Same functionality, except users will be submitting comments under the project name

### Version 3:
-	Users can create a project and assign other users to that project
-	Only users assigned to a project can see the contents and add to the project.
