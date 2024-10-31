import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function DeleteRoom() {
  const [roomId, setRoomId] = useState<string>("");

  const navigate=useNavigate();

  //close deleteRoom page
  const closeForm = () => {
        navigate("/admin");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the DELETE request
      await axios.delete(`http://localhost:8080/api/rooms/${roomId}`);
      alert("Room deleted successfully!");
      setRoomId('');
    } catch{
      alert("Failed to delete the room.");
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
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
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

export default DeleteRoom;
