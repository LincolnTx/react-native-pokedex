import React from 'react';
import { View, Text, StyleSheet , TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import { Constants } from 'expo';
import { PokemonInitialModel } from '../../models/initialPokemon';

function Details ( { route, navigation: { goBack } } ) {

    const { selectedPokemon } = route.params
    return (
        <ImageBackground source={require('../../assets/pattern.png')} style={styles.mainContainer} >
            <View style={styles.card}> 
               <View style={styles.cardHeader}>
                    <Text style={styles.pokemonIndex}>{selectedPokemon.index}</Text>
                    <Text>Os icones de tipo vem aqui</Text>
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