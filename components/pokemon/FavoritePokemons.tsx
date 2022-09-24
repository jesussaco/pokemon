import { Card, Grid } from "@nextui-org/react"
import { FC } from "react"
import { FavoritesCardPokemon } from "./FavoritesCardPokemon"

interface Props {
    pokemons: number[]
}
export const FavoritePokemons: FC<Props> = ({pokemons}) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
       {
          pokemons.map( id => (
            <FavoritesCardPokemon pokemonId={id} key={id}/>
          ))
        }

      </Grid.Container>
  )
}
