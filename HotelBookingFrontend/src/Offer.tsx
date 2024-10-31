import axios from 'axios'
import { useEffect, useState } from 'react'
import Nav from './Nav';

//Offer interface
interface Offer {
    id: number;
    description: string;
    image: string;
}
function Offer() {
    const [offers, setoffers] = useState<Offer[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                 //getting all offers
                const data = (await axios.get<Offer[]>('http://localhost:8080/api/offers/fetch')).data;
                setoffers(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []);
    return (
        <section className="container">
            <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background image" />
            <div className="content">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <Nav />
                <article className="scroller">
                    <section className="room">
                        <div className=''>
                            <div className="room-list">
                                {/* Offer list */}
                                <div>
                                    {offers.length > 0 ? (
                                        offers.map((offer) => (
                                            <div className="box" key={offer.id}>
                                                <section className="offercontent3" key={offer.id}>
                                                    <p>{offer.description}</p>
                                                </section>
                                                {/*Image */}
                                                <section className="offercontent4">
                                                    {offer.image ? (
                                                        <img
                                                            src={offer.image}
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <p>No image URL provided yet.</p>
                                                    )}
                                                </section>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No rooms available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </section>
    )
}
export default Offer
