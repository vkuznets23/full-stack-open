const http = require('http')

//createServer is used to create server
/*response.writeHead(200, { 'Content-Type': 'text/plain' }):

writeHead sets the HTTP status code and headers for the response.
200 is the HTTP status code, meaning "OK," indicating that the request was successfully processed.
{ 'Content-Type': 'text/plain' } is an object specifying HTTP headers. In this case, it tells the client that the content being sent back is in plain text format.*/
 //end finalizes the response and sends it back to the client.

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
