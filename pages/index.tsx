import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { PokemonCard } from '../components/pokemon'
import Image from 'next/image'

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ( {pokemons} ) => {

  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map(( poke ) => (
            <PokemonCard key={poke.id} pokemon={poke}/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  
  const getURL = (id:number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id+1}.svg`
  }

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => (
    {...poke,
      id: i+1,
      img:getURL(i)
    }));

  return {
    props: {
      pokemons: pokemons
    }
  }
}


export default HomePage
