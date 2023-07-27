import React, { useState } from "react";
import PlaylistRow from "./PlaylistRow";
import SortButton from "../../components/SortButton";


function PlaylistList({ playLists }) {
    // const [playLists, setPlatLists] = useState();

  
    const sortOptions = [
        { label: "Sort by Name", value: "name" },
        { label: "Sort by Date", value: "date" },
    ];

    const handleSort = (sortBy) => {
        console.log("Sorting by:", sortBy);
    };


    return (
        <>
            <br />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <p>Created Playlists</p>
                <SortButton options={sortOptions} handleSort={handleSort} />
            </div>
            {playLists.map((playList, ix) => (
                <PlaylistRow key={ix} playList={playList} />
            ))}


            
        </>
    );
}

export default PlaylistList;
