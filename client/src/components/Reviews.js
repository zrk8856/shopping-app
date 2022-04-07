import React, { useState } from 'react';
import Review from "./Review";
import { reviewAdded } from "./productDetailSlice";
import { useDispatch, useSelector } from 'react-redux';

function Reviews({ userId }) {
  const [formData, setFormData] = useState({
    rating: "",
    content: ""
  })
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails.entities)

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleReviewSubmit(e) {
    e.preventDefault()
    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: productDetails.id,
        rating: formData.rating,
        content: formData.content
      })
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((review) => dispatch(reviewAdded(review)))
      }
      setFormData({
        rating: "",
        content: ""
      })
    })
  }

  return (
    <div>
      {productDetails.reviews.map((review) => {
        return (
          <Review key={review.id} review={review} userId={userId} />
        )
      })}
      <form onSubmit={handleReviewSubmit}> 
        <div onChange={handleChange}>       
          <input type="radio" id="review_rating1" name="rating" value={1}/>
          <label htmlFor="review_rating1">1</label><br/>
          
          <input type="radio" id="review_rating2" name="rating" value={2}/>
          <label htmlFor="review_rating2">2</label><br/>
        
          <input type="radio" id="review_rating3" name="rating" value={3}/>
          <label htmlFor="review_rating3">3</label><br/>
          
          <input type="radio" id="review_rating4" name="rating" value={4}/>
          <label htmlFor="review_rating4">4</label><br/>
          
          <input type="radio" id="review_rating5" name="rating" value={5}/>
          <label htmlFor="review_rating5">5</label><br/>
        </div>

        <label htmlFor="review_content">Enter your review:</label><br/>
        <textarea id="review_content" name="content" value={formData.content} onChange={handleChange}/><br/>
        
        <button type="submit">Submit your review</button>
      </form>      
    </div>
  );
}

export default Reviews;