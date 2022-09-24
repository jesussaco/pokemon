import { useState } from "react";

import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import confetti from 'canvas-confetti';

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse, SmallPokemon } from "../../interfaces";
import localFavorites from "../../utils/localFavorites";
import { getPokemonInfo } from "../../utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setisInFavorites] = useState(localFavorites.existInFavorites( pokemon.id ))
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setisInFavorites(!isInFavorites);
    
    if( isInFavorites ) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }
    
  return (
    <Layout title={ pokemon.name }>
        <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{padding: '30px'}}>
            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
              alt={pokemon.name}
              width="100%" 
              height={200}
            />      
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
              <Text h1 transform="capitalize">{ pokemon.name}</Text>
              <Button 
                color="gradient"
                ghost={!isInFavorites}
                onPress={ onToggleFavorite }>
                  {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction="row">
                <Image 
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={ 100 }
                  height={ 100}
                />
                <Image 
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={ 100 }
                  height={ 100}
                />
                <Image 
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={ 100 }
                  height={ 100}
                />
                <Image 
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={ 100 }
                  height={ 100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
        </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) =>{
    
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  

  const pokemons151: string[] = data.results.map( poke => poke.name);
  
  return {
    paths: pokemons151.map( name => ({
      params: {name}
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { name } = params as { name: string};

  return {
    props: {
      pokemon: await getPokemonInfo( name)
    }
  }
}

export default PokemonByNamePage;