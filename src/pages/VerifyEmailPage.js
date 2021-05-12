import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../apiService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmailPage = () => {
  const { code } = useParams();
  console.log("Your code is:", code);

  const verifyEmail = async () => {
    const url = `/users/verify_email`;
    const response = await api.post(url, { code });
    console.log(response);
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div>
      <h1>This is Verify Email Page</h1>
    </div>
  );
};

export default VerifyEmailPage;
