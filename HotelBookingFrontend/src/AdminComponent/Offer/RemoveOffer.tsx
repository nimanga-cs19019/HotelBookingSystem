import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RemoveOffer() {
    const [offerId, setOfferId] = useState<string>("");

    const navigate=useNavigate();

    //close RemoveOffer page
    const closeForm = () => {
          navigate("/admin");
    };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        // Send the DELETE request
        await axios.delete(`http://localhost:8080/api/offers/${offerId}`);
        alert("Offer deleted successfully!");
        setOfferId('');
      } catch{
        alert("Failed to delete the offer.");
      }
    };
  
    return (
      <div className="change">
        <h1>DELETE ROOM</h1>
         {/* Form submission is handled by the handleSubmit function */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Offer ID"
                value={offerId}
                onChange={(e) => setOfferId(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
                    <div className='col'><button type="submit" className="btn btn-primary">DELETE</button></div>
                    <div className='col'><button className="btn btn-primary" onClick={closeForm}>CLSOE</button>
          </div>
          </div>
        </form>
      </div>
    );
}

export default RemoveOffer
