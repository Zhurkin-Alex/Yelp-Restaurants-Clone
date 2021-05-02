import React, { useContext, useState} from "react";
import { Link } from "react-router-dom";
import cafeContext from "../../utils/contexts/cafeContext";
import "./cafeCard.scss";
import ReactStars from "react-rating-stars-component";


function CafeCard({ cafe }) {
  // console.log("cafe", cafe);

  const { state, dispatch } = useContext(cafeContext);

  const deleteCard = (e) => {
    e.preventDefault()
    const id = cafe._id
    fetch('/cafe/delete' ,{
      method:"DELETE",
      headers:{
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        id
      })
    })
    .then(res=>res.json())
    // .then(data=> console.log(data))
    .then(data=>dispatch({type:"DELETE", payload:data}))

  };
  return (
    <div className="card">
      <img src={cafe.url} className="card-img-top" alt="img" />
      <div className="card-body card-body_text">
        <div className="card-star">
          <h5 className="card-title">{cafe.name}</h5>
          <p className="card-text">
            {cafe.about}
          </p>
          <div className="card-box-star">
            <ReactStars
              edit={false}
              count={5}
            
              size={24}
              value={cafe.newRating}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <div className="">
          <Link to={`/about/${cafe._id}`}>
            <button href="#" className="btn btn-primary">
              About
            </button>          
          </Link>
          <button onClick={deleteCard} href="#" className="btn btn-primary card-delete">
              Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CafeCard;
