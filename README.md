API for Events Creation

To setup the backend, clone the respositry and open in any IDE(vscode or any other) and navigate to root folder in which files are placed then run the below commands in terminal

1-> npm install
2-> create a .env file in root folder, make fields as

    MONGODB_CONNECTION_URL = your mongodb connection url
    DB_NAME = name of your mongodb database
    DB_NAME_COLLECTION = name of your collection in database
    PORT = any port on which you want to run the service    (optional) 

3-> npm start

ALL set API will be live on your specified port.


API CRUD operation are defined below

To get an event with the specific unique id
Request Type    API url
GET             /api/v3/app/events?id=:event_id   

To get an event by type with limit and paginated result
Request Type    API url
GET             /api/v3/app/events?type=latest&limit=5&page=1


To create an event
Request Type    API url               
POST            /api/v3/app/events

payload-> {
    name, files[image], tagline, schedule, description, moderator, category, sub_category, rigor_rank
}

To update an specific existing event 
Request Type    API url
PUT             /api/v3/app/events/:id

payload-> {
    name, files[image], tagline, schedule, description, moderator, category, sub_category, rigor_rank
}

To delete an event
Request Type    API url
DELETE             /api/v3/app/events/:id