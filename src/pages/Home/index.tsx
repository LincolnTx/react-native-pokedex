import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PokemonInitialModel } from "../../models/initialPokemon";
import { AppLoading } from 'expo';

import PokemonCard from './../../components/PokemonCard';

import api from '../../services/api';

function  Home () {
    const navigation = useNavigation();
    const [pokemonsList, setPokemon] = useState<PokemonInitialModel[]>([]);
    let requestLoading = true;
    let error: string;
    useEffect(() => {
        api.get('').then((response) => {
            const pokemonReponse: PokemonInitialModel[] = [];

            response.data.results.map((item: any) => {
                const myIndex = item.url.split("/")[item.url.split('/').length - 2]
                const newPokemon = new PokemonInitialModel(myIndex, item.name);
                pokemonReponse.push(newPokemon);
            })
            setPokemon(pokemonReponse);
        })
        .catch((requestError) => error = requestError);
    }, []);
    
    function handleNavigateToDetail() {
        navigation.navigate('Details');
    }


    return (
        
        <ImageBackground 
            source={require('../../assets/pattern.png')}
            style = {styles.mainContainer}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {/*Usar lazy loading nas imagens  */}
                {pokemonsList.map((pokemon:PokemonInitialModel) => (
                    <PokemonCard key={pokemon.index} pokemon={pokemon ? pokemon : error}/>
                ))}

            </ScrollView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        padding: 32,
        alignItems: "center",
    },

});

export default Home;