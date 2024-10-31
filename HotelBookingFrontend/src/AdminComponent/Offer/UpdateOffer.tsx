import{ useState, FormEvent } from 'react';
import {useNavigate } from 'react-router-dom';

//Offer interface
interface OfferUpdate {
    description?: string;
    image?: string;
}

function UpdateOffer() {
     //capture input field values
    const [offerId, setOfferId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const navigate = useNavigate();

    //close UpdateOffer
    const closeForm = () => {
        navigate("/admin");
    };
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        //construct the update offer
        const updatePayload: OfferUpdate = {
            description: description || undefined,
            image: image || undefined,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/offers/${offerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatePayload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Updated successfully!');

            setOfferId('');
            setDescription('');
            setImage('');
        } catch {
            alert('Error updating offer');
        }
    };
  return (
    <div className='change'>
            <h1>Update Offer</h1>
             {/* Form submission is handled by the handleSubmit function */}
            <form onSubmit={handleSubmit}>
              <div className='row'>
              <div className='col'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Offer ID"
                        value={offerId}
                        onChange={(e) => setOfferId((e.target.value))}
                        required
                    />
              </div>
              <div className='col'>
                    <textarea 
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
              </div>
              </div>
              <div className='row'>
              <div className='col'>
                 <input
                        type="text"
                        className="form-control"
                        placeholder='Image URL'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                </div>
                <div className="row">
                    <div className='col'><button type="submit" className="btn btn-primary">UPDATE</button></div>
                    <div className='col'><button className="btn btn-primary" onClick={closeForm}>CLSOE</button></div>
                </div>
            </form>

            
        </div>
  )
}

export default UpdateOffer
