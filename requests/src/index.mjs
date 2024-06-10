import express, { response } from 'express';

const app = express();
app.use(express.json());

//get request
app.get('/', (request, response) => {
  response.send('Hello World');
});
// get json with a status code
app.get('/json', (request, response) => {
  response.status(200).json({ message: 'Hello World' });
});
// another example
app.get('/api/users', (request, response) => {
    console.log('GET first /api/users');
    response.json(users);
//   response.send ([{ name: 'John Doe', age: 26 }, { name: 'Jane Doe', age: 25 }]);
});
// 
app.get('/api/products', (request, response) => {
  response.send([{ name: 'Product 1', price: 100 }, { name: 'Product 2', price: 200 }]);
});


// ROUTE PARAMETERS
const users = [
    { name: 'Taro Yamada', age: 20, id: 1 },
    { name: 'Hanako Suzuki', age: 25, id: 2 },
    { name: 'Ichiro Tanaka', age: 30, id: 3 },
    { name: 'Yuko Sato', age: 35, id: 4 },
    { name: 'Ryo Nakamura', age: 40, id: 5 },
    { name: 'Aya Kobayashi', age: 45, id: 6 },
    { name: 'Hiroshi Ito', age: 50, id: 7 },
    { name: 'Miyuki Watanabe', age: 55, id: 8 },
    { name: 'Kazuki Nakajima', age: 60, id: 9 },
    { name: 'Sakura Tanaka', age: 65, id: 10 }
];

app.get('/api/users/:id', (request, response) => {
    let id = Number(request.params.id) || null;
    if (!id) {
        response.status(400).json({ message: 'Invalid ID' });
    }
    let user = users.find(user => user.id === id);
    if (!user) {
        response.status(404).json({ message: 'User not found' });
    } else {
        response.json(user);
    }
});
// query parameters
 app.get('/api/queryusers', (request, response) => {
    let result = [...users];
    let { query: { filter } } = request;
    if (filter) {
        result = users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));
    }
    result.map(user => {
        user.name = `hello im ${user.name} and my age is ${user.age} years old \n`
        delete user.id;
        delete user.age;
    })
    let res = ""
    for (const user of result) {
         res += `<p>${user.name}</p>`
    }
    response.send(res);
});

//POST requests
app.post('/api/users', (request, response) => {
    let { name, age } = request.body;
    if (!name  || !age) {
        response.status(400).json({ message: 'Name and age are required' });
    };
    let id = users.length + 1;
    users.push({ name, age, id });
    response.status(201).json({ message: 'User created', id });
});

//put requests
//used to update an object fully

app.put('/api/users/:id', (request, response) => {
    const { body, params: { id } } = request;
    const idParsed = parseInt(id);
    const idx = users.findIndex((user)=> user.id === idParsed)
    if (idx === -1) return response.status(400).send('invalid id');
    users[idx] = {id: idParsed, ...body}
    response.status(200).json({"information": "user updated successfully"})
})
// PATCH requests
// used to update an object partially 
app.patch('/api/users/:id', (request, response) => {
    const {body, params: {id}} = request;
    const idParsed = parseInt(id);
    if (!isNaN(id)) {
        const idx =  users.findIndex((user) => user.id === idParsed);
        users[idx] = {...users[idx], ...body}
        return response.status(201).json(users[idx])
    }
    return response.status(404);
})
// // DELETE request
// app.delete('/api/users/:id', (request, response) => {
    
//     console.log("delete");
//     const { params: { id } } = request;
//     const idParsed = parseInt(id);
//     if (isNaN(idParsed)) return response.status(400).json({"message": "no user found"});
//     const idx = users.findIndex((user) => user.id === idParsed);
//     if (idx === -1) return response.status(400).json({"message": "no user found"});
//     users.splice(idx, 1);
//     return response.status(200)
// })
// DELETE request
app.delete('/api/users/:id', (request, response) => {
    console.log("delete");
    const { params: { id } } = request;
    const idParsed = parseInt(id);
    if (isNaN(idParsed)) return response.status(400).json({"message": "no user found"});
    const idx = users.findIndex((user) => user.id === idParsed);
    if (idx === -1) return response.status(400).json({"message": "no user found"});
    users.splice(idx, 1);
    return response.status(200).json({"message": "user deleted successfully"})
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 