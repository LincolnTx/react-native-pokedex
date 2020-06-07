import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PokemonInitialModel } from "../../models/initialPokemon";


import api from '../../services/api';

function  Home () {
    const navigation = useNavigation();
    const [pokemonsList, setPokemon] = useState<PokemonInitialModel[]>([]);
    
    useEffect(() => {
        api.get('').then((response) => {
            const pokemonReponse: PokemonInitialModel[] = [];

            response.data.results.map((item: any) => {
                const myIndex = item.url.split("/")[item.url.split('/').length - 2]
                const newPokemon = new PokemonInitialModel(myIndex, item.name);
                pokemonReponse.push(newPokemon);
            })
            setPokemon(pokemonReponse);
        });
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
                {pokemonsList.map(pokemon => (
                    <View style={styles.card} key={pokemon.index}>
                        <View style={styles.cardHeader}>
                                <Text style={styles.cod}> {pokemon.index} </Text>
                            <Text style={styles.title}>{pokemon.name}</Text>
                        </View>

                        <View style={styles.imageContainer}>
                            <Image source={{uri: pokemon.imageUrl}} style ={styles.image}/>
                        </View>
                    </View>
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

    card: {
        backgroundColor: '#fff',
        width: 300,
        height: 300,
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 24,
      },

      cardHeader:{
        width: '100%',
        height: '18%',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor: '#f0f0f5',
      },
    
      cod: {
        fontSize: 16,
        paddingHorizontal: 24,
        fontWeight: 'bold'
      },

      title: {
        fontSize: 16,
        paddingHorizontal: 32,
        fontWeight: '500'
      },

      imageContainer: {
        width: '100%',
        height: '80%', 
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
          
      },

      image: {
        width: '90%', 
        height: '90%'
      },
});

export default Home;