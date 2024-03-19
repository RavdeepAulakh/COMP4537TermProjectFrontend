import { Link } from 'react-router-dom';

function Index() {
  return (
    <div>
      <h1>Hello welcome to main page!</h1>
        <button><Link to="/signup">Signup</Link></button>
        <button><Link to="/login">Login</Link></button>
    </div>
  );
}

export default Index;