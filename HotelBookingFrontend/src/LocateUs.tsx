import { Link} from 'react-router-dom';
import Nav from './Nav';
function LocateUs () {
    
    return (
            <section className="container">
            <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
            <div className="content">
              <Nav/>
              <p className="home"><span>Locate Us</span></p>
              <section className="map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7699906429852!2d79.8459780735073!3d6.918078718455368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25940ed9b9633%3A0xb0658168859e3c0e!2sCinnamon%20Grand%20Colombo!5e0!3m2!1sen!2slk!4v1725855684159!5m2!1sen!2slk" 
               width="500" height="350" 
               loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </section>
              <section className="mapbtn">
              <div className='address'>
                <p>Dream Hotel</p>
                <p>77 Lotus Rd</p>
                <p>Colombo 00300</p>
                <p>Sri Lanka</p>
                <Link to="https://maps.app.goo.gl/UEV8yetmMwzaCEfE8" className='btn'>GET DERECTIONS</Link>
              </div>
              </section>
             
            </div>
          </section>
          
          
        );
    };
export default LocateUs;
