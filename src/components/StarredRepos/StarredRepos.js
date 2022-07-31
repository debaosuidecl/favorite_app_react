import React from 'react';

const Starredrepos = ({ starredRepos, toggleFavorite, favorites }) => {

    return (
        <ul>
            {
                starredRepos && starredRepos.map(starredRepo => {
                    return <li key={starredRepo.id}>
                        <p>
                            <img height="100px" src={`${starredRepo?.owner?.avatar_url}`} alt="avatar" />
                        </p>
                        <p>Name: {starredRepo?.name}</p>
                        <p>Star Count: {starredRepo?.stargazers_count}</p>

                        {favorites.hasOwnProperty(starredRepo.id) && <p>Favorite</p>}

                        <button onClick={() => toggleFavorite(starredRepo)}>
                            {favorites.hasOwnProperty(starredRepo.id) ? "Remove Favorite" : "Mark As Favorite"}
                        </button>
                    </li>
                })
            }

        </ul>
    );
}

export default Starredrepos;
