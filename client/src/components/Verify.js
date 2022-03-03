import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verify } from "../fetchMethods/get";

const Verify = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + 1000 * 60 * 60 * 24 * 2);

  useEffect(() => {
    verify(id)
      .then((res) => res.json())
      .then((res) => {
        if (res.isAuth) {
          document.cookie = `Jwt=${res.token}; expires=${cookieExpires}; path=/`;
          navigate("/bank-system", { replace: true });
        }
      });
  });

  return (
    <>
      <h1>Verify session</h1>
      <h4>Loading...</h4>
    </>
  );
};

export default Verify;
