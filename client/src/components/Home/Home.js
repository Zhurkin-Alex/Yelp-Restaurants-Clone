import React, { useContext, useEffect } from "react";
import "./Home.scss";
import cafeContext from "../../utils/contexts/cafeContext";
import CafeCard from "../CafeCard/CafeCard";
function Home(props) {
  const { state, dispatch } = useContext(cafeContext);
  console.log('homestate', state);

  useEffect(() => {
    fetch("/cafe/allcafe")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "ALLCAFE", payload: data }));
    // .then(data=>console.log(data))
  }, []);

  const addCafe = (e) => {
    e.preventDefault();
    const {
      name: { value: name },
      url: { value: url },
      about:{value: about}
    } = e.target;
   
    const form = e.target;

    fetch("/cafe/add", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        name,
        url,
        about
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: "ADD", payload: data.newCafe }));

    form.reset();
  };

  return (
    <div className="container">
      <div className=" form-box">
        <div className="form-name_rest">
          <h2>Like cafe</h2>
        </div>
        <form className=" form" onSubmit={addCafe}>
          <div className="mb-3 form-input">
            <input
              type="text"
              name="name"
              className="form-control form-name"
              id="exampleInputEmail1"
              placeholder="name cafe"
            />
            <textarea
              required
              rows="2"
              type="text"
              name="about"              
              className="form-control form-name"
              id="exampleInputEmail1"
              placeholder="about"
            />
            <input
              type="text"
              name="url"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="url page"
            />
          </div>
          <button type="submit" className="form-btn btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="cafe-box">
        <div className="cafe-card">
          {state?.list.map((el) => (
            <CafeCard key={el._id} cafe={el} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
