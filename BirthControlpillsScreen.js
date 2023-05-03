import firebase, { db } from './firebase';
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import ReviewStars from './ReviewStars';
import RatingStars from './RatingStars';

const BirthControlpillsScreen = () => {
  const [contraceptives, setContraceptives] = useState([]);
  const [reviewContraceptiveName, setReviewContraceptiveName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('reviews').onSnapshot((querySnapshot) => {
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() });
      });
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection('reviews').add({
      contraceptiveID: "4ptyc40jMjQVDGnOZ4ny",
      reviewContraceptiveName,
      reviewText,
      reviewRating,
    });
    setReviewContraceptiveName('');
    setReviewText('');
    setReviewRating(0);
  };


  useEffect(() => {
    const getContraceptives = async () => {
      const querySnapshot = await getDocs(collection(db, "contraceptives"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContraceptives(data);
    };

    getContraceptives();
  }, []);

  const BirthControlpills = contraceptives.find(c => c.contraceptiveName === "Birth Control pills");

  const filteredReviews = reviews.filter((review) => review.contraceptiveID === "4ptyc40jMjQVDGnOZ4ny");
  const starAverage = filteredReviews.reduce((acc, review) => acc + review.reviewRating, 0) / filteredReviews.length;

  return (
    <div>
      <h2 className='contraceptiveName'>{BirthControlpills?.contraceptiveName}</h2>
      <img className='contraceptiveImages' src={BirthControlpills?.contraceptiveImage} alt={BirthControlpills?.contraceptiveName} />
      <p className='contraceptiveDescription'>{BirthControlpills?.contraceptiveDescription}</p>
      <p className='starAverage'>Star average: {starAverage.toFixed(1)}</p>

      <h2 className='reviewsHeader'>Reviews</h2>

      <ul className='reviewsList'>
        {reviews.filter((review) => review.contraceptiveID === "4ptyc40jMjQVDGnOZ4ny").map((review) => (
          <li className='reviewItem' key={review.id}>
            <p className='contraceptiveUsed'>Brand used: {review.reviewContraceptiveName}</p>
            <label>
              <ReviewStars reviewRating={review.reviewRating} />
            </label>
            <p className='reviewText'>{review.reviewText}</p>
          </li>
        ))}
      </ul>

      <form className='reviewForm' onSubmit={handleSubmit}>
        <label>
          Brand used
          <input
            type="text"
            placeholder="For example Yasmin"
            value={reviewContraceptiveName}
            onChange={(event) => setReviewContraceptiveName(event.target.value)}
          />
        </label>
        <label>
          Give a rating
          <RatingStars reviewRating={reviewRating} onChange={(newRating) => setReviewRating(newRating)} />
        </label>
        <label>
          Review text
          <textarea
            placeholder="Share your experience!"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
          />
        </label>

        <button type="submit">Submit Review</button>
      </form>

    </div>
  );
};

export default BirthControlpillsScreen;
