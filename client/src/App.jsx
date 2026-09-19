import { Route, Routes } from "react-router-dom";

const Placeholder = ({ name }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="p-8 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold text-gray-900 text-center">{name}</h1>
      <p className="text-gray-600 mt-2">Coming in the next milestone.</p>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder name="Dashboard" />} />
      <Route path="/login" element={<Placeholder name="Login" />} />
      <Route path="/register" element={<Placeholder name="Register" />} />
      <Route path="*" element={<Placeholder name="404 Not Found" />} />
    </Routes>
  );
}

export default App;
