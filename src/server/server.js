import { createServer, Model } from 'miragejs';

// build an array 
const ticketsList=[...Array(12000).keys()].map(key =>{
  return {
      subject: "add story",
      priority: "High",
      status: "In Progress",
      description: "ticket description"
  }
});


export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    models: {
      tickets: Model,
    },
    seeds(server) {
      ticketsList.map((t)=>{
        server.create('ticket', t);
      }); 
    },
    routes() {
     
      this.namespace = 'api/tickets';
       // api for get all tickets
      this.get('/', (schema, request) => {
        return schema.tickets.all();
      });
       // api for get  ticket
      this.get('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.tickets.find(id);
      });
       // api for add  ticket
      this.post('/', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.tickets.create(attrs);
      });
       // api for edit  ticket
      this.patch('/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let ticket = schema.tickets.find(id);
        return ticket.update(newAttrs);
      });
       // api for delete  ticket
      this.delete('/:id', (schema, request) => {
        let id = request.params.id;
        return schema.tickets.find(id).destroy();
      });
    },
  });
  return server;
}