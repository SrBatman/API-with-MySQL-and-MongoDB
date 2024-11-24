const app = require('./app');

const PORT = process.env.PORT || 5500;

const server = app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}/api/`);
});

// Manejo de errores
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${PORT} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${PORT} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});
