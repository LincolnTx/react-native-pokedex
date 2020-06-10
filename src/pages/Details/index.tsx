import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet , TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import { Constants } from 'expo';
import { PokemonInitialModel } from '../../models/initialPokemon';

import api from '../../services/api';
import axios from 'axios';
import { PokemonDetailsModel } from '../../models/pokeminDetails';

function Details ( { route, navigation: { goBack } } ) {

    const [pokemon, setPokemon] = useState<PokemonDetailsModel>();
    const { selectedPokemon } = route.params;

    useEffect( () => {


        handleResques()
        .then(([firstResponse, secondRepose]) => {
            const pokemonDetailReponse = new PokemonDetailsModel(selectedPokemon, firstResponse.data, secondRepose.data);
            setPokemon(pokemonDetailReponse);
            console.log(pokemon);
        })
        .catch((requestError) => console.log(requestError));
    }, []);

    async function handleResques() {
        let [firstResponse, secondRepose] = [{}, {}];
        try {
            [firstResponse, secondRepose] = await Promise.all([
            axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.index}`),
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.index}/`)
        ]);

    } catch (error) {
        console.log(error)
    }
    return [firstResponse, secondRepose];

        
    }

    return (
        <ImageBackground source={require('../../assets/pattern.png')} style={styles.mainContainer} >
            
            <View style={styles.card}> 
               <View style={styles.cardHeader}>
                    <Text style={styles.pokemonIndex}>{selectedPokemon.index}</Text>
                    <Text>Os icones de tipo vem aqui</Text>
                    <View>
                        <Text>haha</Text>
                    </View>
               </View>
                

                <TouchableOpacity onPress={() => goBack()}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        width: Dimensions.get("window").width - 20,
        height: Dimensions.get("window").height - 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'column',
        overflow: 'hidden',
    },

    cardHeader: {
        backgroundColor: '#f0f0f5',
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
       alignItems: 'center',
    },

    pokemonIndex: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Details;