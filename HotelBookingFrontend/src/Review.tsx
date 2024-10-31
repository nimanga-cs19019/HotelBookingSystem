import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import Nav from './Nav';

interface ReviewProps {
    noOfStar: number;
}
//Review interface
interface Review {
    id: string;
    comment: string;
    rate: number;
    login: { email: string }; 
}
//User interface
interface User {
    email: string;
}
const Review = (props: ReviewProps) => {
    const { noOfStar = 5 } = props; // Destructure and assign default value 
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [user] = useState<User | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
     // Handle rating click
     const handleClick = (index: number) => setRating(index);
     const handleMouseEnter = (index: number) => setHover(index);
     const handleMouseLeave = () => setHover(rating);

    const fetchData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return setErrorMessage('No token found, user is not authenticated');
        try {
            /*const profileResponse = await fetch('http://localhost:8080/account/profile', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!profileResponse.ok) throw new Error('Failed to fetch profile');

            const profileData = await profileResponse.json();
            setUser(profileData);*/

             // Fetch all reviews from the backend
            const reviewsResponse = await fetch('http://localhost:8080/reviews/fetch', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!reviewsResponse.ok) throw new Error('Failed to fetch reviews');

            const reviewsData = await reviewsResponse.json();
            setReviews(reviewsData);

        } catch {
            setErrorMessage('');
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    // Handle review submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        if (!token) return setErrorMessage('User not authenticated');

        const newReview = { comment, rate: rating };

        try {
             // Post a review 
            const response = await fetch('http://localhost:8080/reviews/save', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            if (!response.ok) throw new Error('Failed to submit review');
            alert("Post Successful");
            setComment('');
            setRating(0);
            setHover(0);
            const data = await response.json();
            setSuccessMessage(data);  
        } catch{
            setErrorMessage('');
        }
    };
    const renderStars = (rating: number) => {
        return (
            <div>
                {[...Array(noOfStar)].map((_, index) => {
                    index += 1; // Start from 1
                    return (
                        <FaStar
                            key={index}
                            className={index <= rating ? 'active' : 'inactive'}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <section className="container">
            <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
            <div className="content">
                <Nav />
                {/* Display list of reviews */}
                <article className="scrollerreview">
                    <section className="room">
                        <div className="">
                            <div className="room-list">
                                <div>
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => (
                                            <div className="review" key={review.id}>
                                                <section className="reviewcontent3">
                                                    <h2>{review.login.email}</h2>
                                                    <p>{review.comment}</p>
                                                    {renderStars(review.rate)}
                                                </section>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No reviews available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
                 {/* Review submission form */}
                <div>
                    <div className="boxreview">
                        <section className="reviewcontent4">
                            <h2>{user?.email}</h2>
                            <textarea
                                className="form-control"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                            {
                                [...Array(noOfStar)].map((_, index) => {
                                    index += 1;
                                    return (
                                        <FaStar
                                            key={index}
                                            className={index <= (hover || rating) ? 'active' : 'inactive'}
                                            onClick={() => handleClick(index)}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={handleMouseLeave}
                                        />
                                    );
                                })
                            }
                            <div className='row'>
                                <button className="btn btn-primary" onClick={handleSubmit}>POST</button>
                            </div>
                            {errorMessage && <p className="error">{errorMessage}</p>}
                            {successMessage && <p className="success">{successMessage}</p>}
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Review;
