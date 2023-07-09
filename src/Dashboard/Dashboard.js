import React, { useState, useEffect } from 'react';
import { Playlist } from '../Playlist/Playlist';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useQuery ,gql ,useMutation } from "@apollo/client";


export const PLAYLIST_QUERY = gql`
query{
  playlists{
    id
    name
    userId
    movies{
      id
      title
      posterPath
    }
  }
}
`;

export const Dashboard = () => {
  const [playlistss, setPlaylistss] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"))
  console.log(userId)

  const handleClick = () => {
    navigate('/new-playlist')
  }

  const handleLogOut = () => {
    navigate('/login')
  }



  const {data} = useQuery( PLAYLIST_QUERY);

  useEffect(() => {
    // Actualiza la URL con tu punto de acceso a la API
    /*axios.get('/playlist/playlists') 
      .then(response => {
        setPlaylistss(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las listas de reproducción:', error);
      });*/
      if (data) {
        setPlaylistss(data.playlists)
      }
  }, [data]);
  

  console.log(playlistss);
  console.log('DATA',data);

  let playlistsFiltered = [];
  if (playlistss) {
    playlistsFiltered = playlistss.filter((pl) => pl.userId === +userId)
  }

  const DELETE_PLAYLIST_QUERY = gql`
  mutation removePlaylist($id: String!){
    removePlaylist(removePlaylistInput: {id: $id}) {
      name
    }
  }
  `;

  const [deletePlaylist] = useMutation(DELETE_PLAYLIST_QUERY,{
    refetchQueries: [
      { query: PLAYLIST_QUERY },
    ]
  });

  return (
    <div className="dashboard-container">
      <h1>Mis Listas de Reproducción</h1>
      <div className="button-container">
        <button onClick={handleClick}>Nueva Playlist</button>
        <button onClick={handleLogOut}>Salir</button>
      </div>
      <div className="playlists">
        {playlistsFiltered.map(playlist => (
          <div className="playlist-container" key={playlist.id}>
            <h2>{playlist.name}</h2>
            <div className="playlist">
              <Playlist playlist={playlist} />
              <button className="delete-button" onClick={() =>{
              console.log(''+playlist.id, typeof (''+playlist.id))
              deletePlaylist({
                  id: ''+playlist.id,
                })
              }
              }>Eliminar lista de reproducción</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


