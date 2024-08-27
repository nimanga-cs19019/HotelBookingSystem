// Home.tsx
import "./Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="container">
      <img src="https://wallpaperaccess.com/full/2690563.jpg" alt="Background image" />
      <div className="content">
        <h1>DreamHotel</h1>
        <p>Hotels are not just buildings... They are living, breathing entities with a soul....</p>
        <div className="content2">
          <Link to="/SignUp" className="btn">BOOK NOW</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
