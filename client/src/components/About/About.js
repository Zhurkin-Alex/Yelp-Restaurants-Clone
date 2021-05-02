import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import "./About.scss";
import ReactStars from "react-rating-stars-component";
import cafeContext from "../../utils/contexts/cafeContext";

function About(props) {
  const { state, dispatch } = useContext(cafeContext);
  console.log("state", state);

  const { id } = useParams();

  // find cafe from bd on id
  useEffect(() => {
    fetch(`/cafe/${id}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "ADDABOUT", payload: data }));
  }, []);

  //for add star to bd
  const ratingChanged = (newRating) => {
    fetch(`/cafe/star`, {
      method: "PUT",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        newRating,
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: "STAR", payload: data }));
  };

  // console.log("star", state.about.newRating);

  const [update, setUpdate] = useState(false);
  const statusBTN = () => {
    setUpdate(true);
  };
  // for update cafe
  const aboutHandler = (e) => {
    e.preventDefault();

    const { nameCard, aboutCard } = e.target;
    update &&
      fetch("/cafe/updeteCard", {
        method: "PUT",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({
          id,
          nameCard: nameCard.value,
          aboutCard: aboutCard.value,
        }),
      })
        .then((res) => res.json())
        // .then(data=>console.log(data))
        .then((data) => dispatch({ type: "UPDATECARD", payload: data }));

    setUpdate(false);
  };

  return (
    <>
      <div className=" card card-about">
        <div className="card-box">
          <img
            src={state.about.url}
            className="card-img-top"
            alt={state.about.name}
          />
          <div className="card-body">
            {update && (
              <>
                <form onSubmit={aboutHandler}>
                  <h5>
                    <div className="about-input_name">
                      <input
                        className="card-title"
                        name="nameCard"
                        defaultValue={state.about.name}
                      />
                    </div>
                    <textarea
                      className="card-text_input"
                      name="aboutCard"
                      defaultValue={state.about.about}
                    />
                  </h5>
                  <p>your star: {state.about.newRating}</p>
                  <div className="card-box-star">
                    <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      value={state.about.newRating}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div className="about-update_btn">
                    <button href="#" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}
            {state && !update && (
              <form>
                <h5 className="card-title">{state.about.name}</h5>
                <p className="card-text">{state.about.about}</p>

                <p>your star: {state.about.newRating}</p>
                <div className="card-box-star">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    value={state.about.newRating}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="about-update_btn">
                  <button
                    onClick={statusBTN}
                    href="#"
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
