import AppRoutes from "./routes/AppRoutes";
import { SidebarProvider } from "./context/SidebarContext";
import AutoLogout from "./pages/auth/AutoLogout";
function App() {
  return (
    <SidebarProvider>
      <AutoLogout />
      <AppRoutes />
    </SidebarProvider>
  );
}

export default App;
