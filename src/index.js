const express = require("express")
const path = require("path")
const app = express()

const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})

app.post('/signup', async (req, res) => {
    try {
        const existingUser = await LogInCollection.findOne({ name: req.body.name });

        if (existingUser) {
            res.send("User already exists");
        } else {
            const newUser = new LogInCollection({
                name: req.body.name,
                password: req.body.password,
                cin: req.body.cin, 
                email: req.body.email, 
                numTel: req.body.numTel, 
                adresse: req.body.adresse, 
                dateOfBirth: req.body.dateOfBirth
            });
            await newUser.save();
            res.status(201).render("home", {
                naming: req.body.name
            });
        }

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
});


// app.post('/signup', async (req, res) => {
    
//    const data = {
//         name: req.body.name,
//         password: req.body.password
//     }

//     const checking = await LogInCollection.findOne({ name: req.body.name })

//    try{
//     if (checking.name === req.body.name && checking.password===req.body.password) {
//         res.send("user details already exists")
//     }
//     else{
//         await LogInCollection.insertMany([data])
//     }
//    }
//    catch{
//     res.send("wrong inputs")
//    }

//     res.status(201).render("home", {
//         naming: req.body.name
//     })
// })


app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ email: req.body.email });

        if (check) { 
            if (check.name === req.body.name && check.password === req.body.password) {
                res.status(201).render("home", { naming: req.body.name });
            } else {
                res.send("Incorrect name or password");
            }
        } else {
            res.send("User not found"); 
        }
    } catch (e) {
        console.error("Error during login:", e);
        res.status(500).send("Internal Server Error");
    }
})


app.listen(port, () => {
    console.log('port connected');
})


