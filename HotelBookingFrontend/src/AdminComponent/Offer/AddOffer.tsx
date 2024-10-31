import { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function AddOffer() {
    //capture input field values
    const [offerId, setOfferId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');

    const navigate = useNavigate();

    //close AddOffer form
    const closeForm = () => {
        navigate("/admin");
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
         
        //Construct new offer
        const newOffer = {
            id: offerId,
            image: imageURL,
            description: description,
        };

        try {
            // Send the POST request
            await axios.post('http://localhost:8080/api/offers/save', newOffer);
            alert('Added successfully!');
            setOfferId('');
            setDescription('');
            setImageURL('');
        } catch {
            alert('Fail to add');
        }
    };
    
    return (
        <div className="change">
            <h1>ADD OFFER</h1>
             {/* Form submission is handled by the handleSubmit function */}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <textarea
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Image URL"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}// Update the imageURL state on change
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col'><button type="submit" className="btn btn-primary">ADD</button></div>
                    <div className='col'><button className="btn btn-primary" onClick={closeForm}>CLSOE</button>
                    </div>
                </div>


            </form>
        </div>
    );
}

export default AddOffer
