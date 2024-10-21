import app from './app';
import { AppDataSource } from './config/database';
import { fetchRecentUsers } from './services/fetchRecentUsers';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        console.log('Data Source has been initialized!');

        // Fetch recent users and log them
        try {
            const recentUsers = await fetchRecentUsers();
            console.log('Users registered in the last 7 days:', recentUsers);
          } catch (err) {
            console.error('Error fetching recent users:', err);
          }

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });