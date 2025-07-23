import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from "../../authContext";

import logo from "../../assets/github-mark-white.svg";
import { Link } from 'react-router-dom';
import "./CreateRepo.css";

import { PageHeader } from "@primer/react";
import { Box, Button } from "@primer/react";

import Navbar from '../Navbar';
import Footer from '../Footer';

const CreateNewRepo = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState(true); // true for public, false for private
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();

    const handleCreateRepo = async(e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Repository name is required!");
            return;
        }

        try {
            setLoading(true);
            
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            const res = await axios.post("http://localhost:3000/repo/create", {
                name: name.trim(),
                description: description.trim(),
                visibility: visibility,
                owner: userId,
                content: [],
                issues: []
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert("Repository created successfully!");
            setLoading(false);
            
            // Redirect to the new repository or repositories list
            window.location.href = '/';
            
        } catch(err) {
            console.error("Error creating repository:", err);
            if (err.response && err.response.data && err.response.data.error) {
                alert(`Repository creation failed: ${err.response.data.error}`);
            } else {
                alert("Repository creation failed!");
            }
            setLoading(false);
        }
    }

    return (
        <>
        <Navbar />
        <div className="repo-wrapper">
            <div className="repo-logo-container">
                <img className="logo-repo" src={logo} alt="Logo" />
            </div>

            <div className="repo-box-wrapper">
                <div className="repo-heading">
                    <Box sx={{ padding: 1, }}>
                        <PageHeader>
                            <PageHeader.TitleArea variant="large">
                                <PageHeader.Title>Create a New Repository</PageHeader.Title>
                            </PageHeader.TitleArea>
                        </PageHeader>
                    </Box>
                </div>

                <div className="repo-box">
                    <div>
                        <label className="label">Repository Name *</label>
                        <input
                            autoComplete="off"
                            name="RepoName"
                            id="RepoName"
                            className="input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter repository name"
                        />
                    </div>

                    <div>
                        <label className="label">Description</label>
                        <textarea
                            autoComplete="off"
                            name="Description"
                            id="Description"
                            className="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief description of your repository"
                            rows="3"
                        />
                    </div>

                    <div className="visibility-section">
                        <label className="label">Visibility</label>
                        <div className="radio-group">
                            <div className="radio-option">
                                <input
                                    type="radio"
                                    id="public"
                                    name="visibility"
                                    value="public"
                                    checked={visibility === true}
                                    onChange={() => setVisibility(true)}
                                />
                                <label htmlFor="public" className="radio-label">
                                    <strong>Public</strong>
                                    <span className="radio-description">
                                        Anyone can see this repository
                                    </span>
                                </label>
                            </div>
                            
                            <div className="radio-option">
                                <input
                                    type="radio"
                                    id="private"
                                    name="visibility"
                                    value="private"
                                    checked={visibility === false}
                                    onChange={() => setVisibility(false)}
                                />
                                <label htmlFor="private" className="radio-label">
                                    <strong>Private</strong>
                                    <span className="radio-description">
                                        Only you can see this repository
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        className="repo-btn"
                        disabled={loading}
                        onClick={handleCreateRepo}
                    >
                        {loading ? "Creating..." : "Create Repository"}
                    </Button>
                </div>

                <div className="pass-box1">
                    <p>
                        Want to go back? <Link to="/">View Repositories</Link>
                    </p>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default CreateNewRepo;