import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddRoom() {
  // capture input field values
  const [roomId, setRoomId] = useState<string>('');
  const [roomType, setRoomType] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [rentPerNight, setRentPerNight] = useState<string>('');
  const [features, setFeatures] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageURL, setImageURL] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const navigate=useNavigate();

  //close the AddRoom page
  const closeForm = () => {
        navigate("/admin");
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     
    //construct new room
    const newRoom = {
      id: roomId,
      roomType:roomType,
      length:length,
      rentpernight: rentPerNight,
      features: features.split(','), 
      image:imageURL,
      description:description,
      quantity:quantity,
    };

    try {
      // Send the POST request
      await axios.post('http://localhost:8080/api/rooms/save', newRoom);

      alert('Room added successfully!');

      setRoomId('');
      setRoomType('');
      setDescription('');
      setFeatures('');
      setImageURL('');
      setRentPerNight('');
      setLength('');
      setQuantity('');
      
    } catch {
      alert('Failed to add the room.');
    }
  };

  return (
    <div className="change">
      <h1>ADD ROOM</h1>
       {/* Form submission is handled by the handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
          <input
              type="text"
              className="form-control"
              placeholder="Room Type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              required
            />
          </div>
          <div className="col">
          <input
              type="text"
              className="form-control"
              placeholder="Quantity/Number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="num ft/num Guests"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Rent per night/Number"
              value={rentPerNight}
              onChange={(e) => setRentPerNight(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <textarea
              className="form-control"
              placeholder="Features (comma separated)"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              required
            />
          </div>
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
export default AddRoom;
