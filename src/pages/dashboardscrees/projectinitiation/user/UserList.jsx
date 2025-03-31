import React, { useState, useEffect } from "react";
import { Icons } from "../../../../icons";
import { Link } from "react-router-dom";
import axios from "axios";
// import AddUser from "./AddUser";
import { API_URL } from "../../../../config";

// const API_URL = "http://localhost:5000/api"; // Update with your actual API URL

const UserList = () => {
  const [adduserModal, setAddUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users-list`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserModal = () => {
    setAddUserModal(!adduserModal);
  };

  const handleClose = () => {
    setAddUserModal(false);
  };

  // Delete user function
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="list-header">
        <h1 className="list-heading">Users List</h1>
        <div className="flex gap-4">
         
          
        </div>
      </div>

      {/* Table */}
      <div className="list-table-head">
        <table className="list-table">
          <thead>
            <tr className="list-table-container">
              <th className="list-th">User Name</th>
              <th className="list-th">Email Address</th>
              <th className="list-th">Location</th>
              <th className="list-th">Age</th>
              <th className="list-th">Gender</th> 
              <th className="list-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="list-tr">
                  <td className="list-th">{user.name}</td>
                  <td className="list-th">{user.email}</td>
                  <td className="list-th">{user.city || "N/A"}</td>
                  <td className="list-th">{user.age || "N/A"}</td>
                  <td className="list-th">
                   {user.gender || "N/A"}
                  </td>
                
                  <td className="list-th list-action">
                    <Icons.Delete
                      size={24}
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDeleteUser(user._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

   
    </div>
  );
};

export default UserList;
