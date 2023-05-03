import firebase, { db } from './firebase';
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import ReviewStars from './ReviewStars';
import RatingStars from './RatingStars';

const CoppercoilScreen = () => {
  const [contraceptives, setContraceptives] = useState([]);
  const [reviewContraceptiveName, setReviewContraceptiveName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewMoods, setReviewMoods] = useState('');
  const [reviewWeight, setReviewWeight] = useState('');
  const [reviewDrive, setReviewDrive] = useState('');
  const [reviewSkin, setReviewSkin] = useState('');
  const [reviewTime, setReviewTime] = useState('');

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
      contraceptiveID: "5iZ62OFb62Z547jo0ryL",
      reviewContraceptiveName,
      reviewText,
      reviewRating,
      reviewMoods,
      reviewWeight,
      reviewDrive,
      reviewSkin,
      reviewTime
    });
    setReviewContraceptiveName('');
    setReviewText('');
    setReviewRating(0);
    setReviewMoods('');
    setReviewWeight('');
    setReviewWeight('');
    setReviewDrive('');
    setReviewSkin('');
    setReviewTime('');

  };

  useEffect(() => {
    const getContraceptives = async () => {
      const querySnapshot = await getDocs(collection(db, "contraceptives"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContraceptives(data);
    };

    getContraceptives();
  }, []);

  const copperCoil = contraceptives.find(c => c.contraceptiveName === "Copper coil");

  const filteredReviews = reviews.filter((review) => review.contraceptiveID === "5iZ62OFb62Z547jo0ryL");
  const starAverage = filteredReviews.reduce((acc, review) => acc + review.reviewRating, 0) / filteredReviews.length;

  return (
    <div>
      <h2 className='contraceptiveName'>{copperCoil?.contraceptiveName}</h2>
      <img className='contraceptiveImages' src={copperCoil?.contraceptiveImage} alt={copperCoil?.contraceptiveName} />
      <p className='contraceptiveDescription'>{copperCoil?.contraceptiveDescription}</p>
      <p className='starAverage'>Star average: {starAverage.toFixed(1)}</p>

      <h2 className='reviewsHeader'>User reviews</h2>

      <ul className='reviewsList'>
        {reviews.filter((review) => review.contraceptiveID === "5iZ62OFb62Z547jo0ryL").map((review) => (
          <li className='reviewItem' key={review.id}>
            <p className='contraceptiveUsed'>Brand used: {review.reviewContraceptiveName}</p>
            <p className='contraceptiveUsed'>Amount of time used: {review.reviewTime}</p>

            <label>
              <ReviewStars reviewRating={review.reviewRating} />
            </label>
            <p className='reviewText'>{review.reviewText}</p>
            <p>
              Mood: {review.reviewMoods}
              <br />
              Weight: {review.reviewWeight}
              <br />
              Sex drive: {review.reviewDrive}
              <br />
              Skin: {review.reviewSkin}
            </p>
          </li>
        ))}
      </ul>



      <div className="reviewFormContainer">
        <h2 className="reviewFormTitle">Contraceptive Review Form</h2>
        <form className='reviewForm' onSubmit={handleSubmit}>
          <label className='brandUsed'>
            Brand used
            <input
              type="text"
              placeholder="For example Ballerine"
              value={reviewContraceptiveName}
              onChange={(event) => setReviewContraceptiveName(event.target.value)}
            />
          </label>

          <label className='brandUsed'>
            How long have you been using or did you use this type of contraception?
            <input
              type="text"
              placeholder="Specify if its years, months or weeks"
              value={reviewTime}
              onChange={(event) => setReviewTime(event.target.value)}

            />
          </label>



          <label className='radioButtonTitle'>
            How do you feel this contraception has affected your moods and emotions?
            <div className="radioButtonsContainer">
              <label>
                <input type="radio" name="reviewMoods" value="Very positively" onChange={(event) => setReviewMoods(event.target.value)} />
                Very positively
              </label>
              <label>
                <input type="radio" name="reviewMoods" value="Somewhat positively" onChange={(event) => setReviewMoods(event.target.value)} />
                Somewhat positively
              </label>
              <label>
                <input type="radio" name="reviewMoods" value="Neutral/No change" onChange={(event) => setReviewMoods(event.target.value)} />
                Neutral/No change
              </label>
              <label>
                <input type="radio" name="reviewMoods" value="Somewhat negatively" onChange={(event) => setReviewMoods(event.target.value)} />
                Somewhat negatively
              </label>
              <label>
                <input type="radio" name="reviewMoods" value="Very negatively" onChange={(event) => setReviewMoods(event.target.value)} />
                Very negatively
              </label>
              <label>
                <input type="radio" name="reviewMoods" value="I don't know/Cant tell" onChange={(event) => setReviewMoods(event.target.value)} />
                I don't know/Cant tell
              </label>
            </div>
          </label>

          <label className='radioButtonTitle'>
            Have you noticed any change to your body weight whilst using this contraception?
            <div className="radioButtonsContainer">
              <label>
                <input type="radio" name="reviewWeight" value="I lost weight" onChange={(event) => setReviewWeight(event.target.value)} />
                I lost weight
              </label>

              <label>
                <input type="radio" name="reviewWeight" value="No change" onChange={(event) => setReviewWeight(event.target.value)} />
                No change
              </label>

              <label>
                <input type="radio" name="reviewWeight" value="I gained weight" onChange={(event) => setReviewWeight(event.target.value)} />
                I gained weight
              </label>
              <label>
                <input type="radio" name="reviewWeight" value="I don't know/Cant tell" onChange={(event) => setReviewWeight(event.target.value)} />
                I don't know/Cant tell
              </label>
            </div>
          </label >

          <label className='radioButtonTitle'>
            Have you noticed any changes to your sex drive whilst using this contraception?
            <div className="radioButtonsContainer">
              <label>
                <input type="radio" name="reviewDrive" value="Increased sex drive" onChange={(event) => setReviewDrive(event.target.value)} />
                Increased sex drive
              </label>

              <label>
                <input type="radio" name="reviewDrive" value="No change" onChange={(event) => setReviewDrive(event.target.value)} />
                No change
              </label>

              <label>
                <input type="radio" name="reviewDrive" value="Loss of sex drive" onChange={(event) => setReviewDrive(event.target.value)} />
                Loss of sex drive
              </label>
              <label>
                <input type="radio" name="reviewDrive" value="I don't know/Cant tell" onChange={(event) => setReviewDrive(event.target.value)} />
                I don't know/Cant tell
              </label>
            </div>
          </label >

          <label className='radioButtonTitle'>
            Have you noticed any changes to your skin whilst using this contraception?
            <div className="radioButtonsContainer">
              <label>
                <input type="radio" name="reviewSkin" value="Skin improved - fewer spots or acne" onChange={(event) => setReviewSkin(event.target.value)} />
                My skin improved - fewer spots or acne
              </label>

              <label>
                <input type="radio" name="reviewSkin" value="No change" onChange={(event) => setReviewSkin(event.target.value)} />
                No change
              </label>

              <label>
                <input type="radio" name="reviewSkin" value="Skin got worse - more spots or acne" onChange={(event) => setReviewSkin(event.target.value)} />
                My skin got worse - more spots or acne
              </label>
              <label>
                <input type="radio" name="reviewSkin" value="I don't know/Cant tell" onChange={(event) => setReviewSkin(event.target.value)} />
                I don't know/Cant tell
              </label>
            </div>
          </label >

          <label className='ratingTitle'>
            Overall how satisfied are you or were you with this contraception?
            <RatingStars reviewRating={reviewRating} onChange={(newRating) => setReviewRating(newRating)} />
          </label>

          <label>
            Please summarise your experience in a few sentences
            <textarea
              placeholder="Share your experience!"
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
            />
          </label>

          <button type="submit">Submit Review</button>
        </form >
      </div>

    </div >
  );
};

export default CoppercoilScreen;

