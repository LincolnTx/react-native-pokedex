import React, { Component, Props } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { AppLoading } from 'expo'; 

  

function PokemonCard (props:any) {
    return (
        <View style={styles.card} key={props.pokemon.index}>
            <View style={styles.cardHeader}>
                <Text style={styles.cod}> {props.pokemon.index} </Text>
                <Text style={styles.title}>{props.pokemon.name}</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: props.pokemon.imageUrl}} style ={styles.image} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

export default PokemonCard;
