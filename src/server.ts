import fastify from "fastify";
import cors from '@fastify/cors';

const server = fastify({logger: true});

server.register(cors, {
    origin: "*",
});

const teams = [
    { id: 1, name: "McLaren", base: "Woking, UK" },
    { id: 2, name: "Mercedes", base: "Brackley, UK" },
    { id: 3, name: "Red Bull", base: "Milton Keynes, UK" },
    { id: 4, name: "Ferrari", base: "Maranello, Italy" },
    { id: 5, name: "Aston Martin", base: "Silverstone, UK" },
    { id: 6, name: "Audi", base: "Hinwil, Switzerland" },
];

const drivers = [
    // McLaren
    { id: 1, name: "Lando Norris", team: "McLaren" },
    { id: 2, name: "Oscar Piastri", team: "McLaren" },

    // Mercedes
    { id: 3, name: "George Russell", team: "Mercedes" },
    { id: 4, name: "Kimi Antonelli", team: "Mercedes" },

    // Red Bull
    { id: 5, name: "Max Verstappen", team: "Red Bull" },
    { id: 6, name: "Isack Hadjar", team: "Red Bull" },

    // Ferrari
    { id: 7, name: "Charles Leclerc", team: "Ferrari" },
    { id: 8, name: "Lewis Hamilton", team: "Ferrari" },

    // Aston Martin
    { id: 9, name: "Fernando Alonso", team: "Aston Martin" },
    { id: 10, name: "Lance Stroll", team: "Aston Martin" },
    
    // Audi
    { id: 11, name: "Nico Hulkenberg", team: "Audi" },
    { id: 12, name: "Gabriel Bortoleto", team: "Audi" },
];

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);

    return {teams};
});

server.get("/drivers", async (request, response) =>{
    response.type("application/json").code(200);
    return {drivers};
});

interface driverParams{
    id: string
}

server.get<{Params: driverParams}>("/drivers/:id", async (
    request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return { message: "Driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return { driver };
    }
});

server.listen({ port: 3333 }, () => {
    console.log("Server connected on port 3333")
});