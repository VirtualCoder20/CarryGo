import { useUser } from '@/contexts/user-context';
import CommuterDashboard from '../../components/commuter-dashboard';
import DriverDashboard from '../../components/driver-dashboard';

export default function HomeScreen() {
  const { user } = useUser();

  // Route to appropriate dashboard based on user role
  if (user?.role === 'driver') {
    return <DriverDashboard />;
  }

  return <CommuterDashboard />;
}
