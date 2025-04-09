import "./App.css";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 relative">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div>Placeholder</div>
    </div>
  );
};

export default App;
