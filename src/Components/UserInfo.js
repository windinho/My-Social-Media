import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as UserIcon } from "../Assets/user.svg";

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // getting users
        const usersResponse = await fetch(
          `https://gorest.co.in/public/v2/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 0d457d422346f26e1b96e76de5adc10418b499f408d02f16ec261c2c4aac0bc5"
            }
          }
        );
        const usersData = await usersResponse.json();
        setUser(usersData);
        setIsUserLoading(false);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className="container sticky-top bg-white col-lg-5 pt-4 pb-1">
      <div className="card bg-warning bg-gradient border-0 mb-4">
        <div className="card-body">
          <div className="d-flex align-items-start">
            <UserIcon width="34" className="me-2" />
            <div>
              {isUserLoading ? (
                <p className="placeholder-wave">
                  <span className="placeholder">Loading...</span>
                </p>
              ) : (
                <>
                  <div className="d-flex align-items-center">
                    <h3>{user.name + " "}</h3>
                    <span className="badge border border-1 ms-2">
                      {user.gender}
                    </span>
                  </div>
                  <p>{user.email}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
