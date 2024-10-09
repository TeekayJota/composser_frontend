// ./src/App.tsx
import AppRoutes from './routes';
import { AuthProvider } from './contexts/authProvider';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
