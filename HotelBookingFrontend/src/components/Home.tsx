// Home.tsx
import "./Home.css";
import { Link } from 'react-router-dom';

function Home () {
  return (
    <section className="container">
      <img className="imgback"src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background image" />
      <div className="content">
        <h1 className="hometext">DreamHotel</h1>
        <p className="text"><span style={{fontWeight:'bold'}}>Hotels are not just buildings... They are living, breathing entities with a soul....</span></p>
        <div className="content2">
          <Link to="/SignUp" className="btn">BOOK NOW</Link>
        </div>
      </div>
    </section>
  );
}
export default Home;
