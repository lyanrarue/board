import "./App.css";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";
import SettingsIconButton from "./components/Settings/SettingsIconButton";
import ProtocolDashboard from "./components/ProtocolDashboard/ProtocolDashboard";

const App = () => {
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 relative">
      <div className="absolute top-4 right-4">
        <div className="flex flex-row items-center">
          <DarkModeToggle />
          <SettingsIconButton />
        </div>
      </div>
      <div>
        <ProtocolDashboard />
      </div>
    </div>
  );
};

export default App;
