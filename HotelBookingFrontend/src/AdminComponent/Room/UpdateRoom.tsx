import{ useState, FormEvent } from 'react';
import {useNavigate } from 'react-router-dom';

// Room interface
interface RoomUpdate {
    roomType?: string;
    length?: string;
    description?: string;
    features?: string[];
    rentpernight?: number;
    image?: string;
    quantity?:number;
}
const UpdateRoom = () => {
     //capture input field values
    const [roomId, setRoomId] = useState<string>("");
    const [roomType, setRoomType] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [features, setFeatures] = useState<string>('');
    const [rentpernight, setRentPerNight] = useState<number | undefined>(undefined);
    const [image, setImage] = useState<string>('');
    const [quantity, setQuantity] = useState<number | undefined>(undefined);

    const navigate = useNavigate();

    //close UpdateRoom page
    const closeForm = () => {
        navigate("/admin");
    };
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        //construct Update Room
        const updatePayload: RoomUpdate = {
            roomType: roomType || undefined,
            length: length || undefined,
            description: description || undefined,
            features: features ? features.split(',').map(f => f.trim()) : undefined,
            rentpernight: rentpernight || undefined,
            image: image || undefined,
            quantity:quantity||undefined,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatePayload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Room updated successfully!');

            setRoomId('');
            setRoomType('');
            setDescription('');
            setFeatures('');
            setImage('');
            setRentPerNight(0);
            setLength('');
            setQuantity(0);
        } catch {
            alert('Error updating room ');
        }
    };

    return (
        <div className='change'>
            <h1>Update Room</h1>
            {/* Form submission is handled by the handleSubmit function */}
            <form onSubmit={handleSubmit}>
              <div className='row'>
              <div className='col'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Room ID"
                        value={roomId ||''}
                        onChange={(e) => setRoomId((e.target.value))}
                        required
                    />
              </div>
              <div className='col'>
                    <input
                        type="text"  
                        className="form-control"
                        placeholder="Room Type"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                    />
              </div>
              </div>
                
                <div className='row'>
                <div className='col'>
                <textarea
                        className="form-control"
                        placeholder='Features'
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                />
                </div>
                <div className='col'>
                <textarea 
                        placeholder='Description'
                        className="form-control"
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
                        placeholder="num ft/num Guests"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </div>
                 <div className='col'>
                <input
                        type="text"
                        className="form-control"
                        placeholder='Rent Per Night'
                        value={rentpernight || ''}
                        onChange={(e) => setRentPerNight(parseInt(e.target.value))}
                    />
                </div>
                <div className='col'>
                <input
                        type="text"
                        className="form-control"
                        placeholder='Quantity'
                        value={quantity || ''}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
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
    );
};

export default UpdateRoom;
