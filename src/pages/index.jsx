import { Link } from 'react-router-dom';
import '../styles/index.css'; // Import the CSS file

function Index() {
  return (
      <div className="index-page">
        <h1>Hello, welcome to the main page!</h1>
        <div className="index-buttons">
          <button><Link to="/signup">Signup</Link></button>
          <button><Link to="/login">Login</Link></button>
        </div>
      </div>
  );
}

export default Index;
