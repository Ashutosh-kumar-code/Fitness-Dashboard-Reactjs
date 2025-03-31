import React, { useState, useEffect } from "react";
import { Icons } from "../../../../icons";
import axios from "axios";
import { API_URL } from "../../../../config";

// const API_URL = "http://localhost:5000/api"; // Update with your actual API URL

const VerifiedTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  // Fetch verified trainers from API
  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/trainers/verified`);
      setTrainers(response.data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`);
      setTrainers(trainers.filter((user) => user._id !== userId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="list-header">
        <h1 className="list-heading">Verified Trainers List</h1>
      </div>

      {/* Table */}
      <div className="list-table-head">
        <table className="list-table">
          <thead>
            <tr className="list-table-container">
            <th className="list-th">Trainer Name</th>
              <th className="list-th">Email Address</th>
              <th className="list-th">Location</th>
              <th className="list-th">Age</th>
              <th className="list-th">Expertise</th>
              <th className="list-th">Status</th>
              <th className="list-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.length > 0 ? (
              trainers.map((trainer, index) => (
                <tr key={index} className="list-tr">
                  <td className="list-th">{trainer.name}</td>
                  <td className="list-th">{trainer.email}</td>
                   <td className="list-th">{trainer.city || "N/A"}</td>
                                    <td className="list-th">{trainer.age || "N/A"}</td>
                                    <td className="list-th">{trainer.experience || "N/A"}</td>
                                    <td
                                      className={`list-th ${
                                          trainer.verified == true
                                          ? "text-green-500"
                                          : "text-yellow-500"
                                      }`}
                                    >
                                      { "Unverified"}
                                    </td>
                                     <td className="list-th list-action">
                                                        <Icons.Delete
                                                          size={24}
                                                          className="cursor-pointer text-red-500"
                                                          onClick={() => handleDeleteUser(trainer._id)}
                                                        />
                                                      </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No verified trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifiedTrainers;
