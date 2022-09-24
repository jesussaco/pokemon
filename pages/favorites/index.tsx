import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts"
import { FavoritePokemons } from "../../components/pokemon";
import { NoFavorites } from "../../components/ui";
import localFavorites from "../../utils/localFavorites";


export const FavoritesPage = () => {

  const [favoritePokemon, setFavoritePokemon] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemon( localFavorites.pokemons());    
  }, [])
  
  return (
    <Layout title="Pokemon - Favoritos">
      {
        favoritePokemon.length === 0 
        ? ( <NoFavorites/> )
        : ( <FavoritePokemons pokemons={favoritePokemon}/> )
      }
      
    </Layout>
  )
}

export default FavoritesPage;