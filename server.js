const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const http = require('http'); // Import HTTP module for WebSocket
const { sequelize } = require('./models');  // Import the models from 'models/index.js'
const socketIo = require('socket.io'); // Import Socket.IO

// Swagger Setup
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const protectedRoutes = require('./routes/protected');
const branchRoutes = require('./routes/branch');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const unitRoutes = require('./routes/unit');
const loyaltyRoutes = require('./routes/loyaltyRoutes');
const productRoutes = require('./routes/productRoutes');
const addOnRoutes = require('./routes/addOnRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const transactionRoutes = require('./routes/transaction');

// Seeder
const createAdmin = require('./seeders/createAdmin'); // Import seeder

// Configuration
dotenv.config();

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '0.0.1',
            description: 'API Documentation for Node.js Express App',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Development URL
            },
            {
                url: 'https://api.erictriawan.pro', // Production URL
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your API files for documentation generation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/transaction', transactionRoutes);

// Admin and Product Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/add-ons', addOnRoutes);
app.use('/api/ingredient', ingredientRoutes);

// Loyalty Routes
app.use('/api/loyalty', loyaltyRoutes);

// Database connection with associations and syncing
sequelize.sync({ force: false }) // Set `force: false` to avoid dropping tables
    .then(() => {
        console.log('Database synced successfully');
        createAdmin(); // Optionally run seeders here after sync
    })
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process if there is a DB connection error
    });

// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Error Handling Middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[Error] ${statusCode} - ${message}`);
    res.status(statusCode).json({ error: message });
});

// Create HTTP server to support both Express and WebSocket
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = socketIo(server);

// Handle WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send a message to the client
    socket.emit('notification', { message: 'Welcome to Zus Coffee POS!' });

    // Listen for events from the client
    socket.on('send-notification', (data) => {
        console.log('New notification:', data);

        // Broadcast notification to all clients
        io.emit('notification', data);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
