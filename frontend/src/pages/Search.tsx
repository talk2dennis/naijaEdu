import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axiosClient from "../api/axiosClient";
import "./css/Favorites.css";

const Search = () => {

    return (
        <div className="favorites-page">
                <h2>No Search Result for { }</h2>
                <p>It seems we couldn't find any movies matching your search term.</p>
                <p>Please try a different search term or check your spelling.</p>
                <p>Browse the <a href="/">home page</a> to find movies you like!</p>
        </div>
    );
}

export default Search;