import express from 'express'
import {engine} from 'express-handlebars'
import morgan from 'morgan'
import {join, dirname} from 'path'
import {fileURLToPath} from 'url'
import suculentasRoutes from './routes/suculentas.routes.js'

//Inicializar
const app = express();
const __dirname = dirname (fileURLToPath(import.meta.url));

//Ajustes
app.set('port', process.env.PORT || 4000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    suculentasDir: join(app.get('views'), 'suculentas'),
    extname: '.hbs'
}
))
app.set('view engine', '.hbs');

// ---Middlewares----
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// ----Routes----
app.get('/', (req,res)=>{
    res.render('index');
})

app.use(suculentasRoutes);

//----Public Files---
app.use(express.static(join(__dirname, 'public')));

//---Ejecutar servidor----
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
} );