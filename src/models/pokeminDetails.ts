import { PokemonInitialModel } from "./initialPokemon";

export class PokemonDetailsModel {
    public index: number;
    public name: string;
    public imageUrl: string;
    public types: string [];
    public description: string;
    public stats: any [];
    public height: number;
    public weight: number;
    public abilities: string [];
    public genderRatioFemale : number;
    public genderRatioMale : number;


    constructor(pokemon: PokemonInitialModel, pokemonResult: any, pokemonSpeciesResult: any) {
        this.index = pokemon.index;
        this.name = pokemon.name
        this.imageUrl = pokemon.imageUrl;
        this.types = this.handleTypes(pokemonResult.types);
        this.description = this.formatDescription(pokemonSpeciesResult.flavor_text_entries);
        this.stats = pokemonResult.stats;
        this.height = pokemonResult.height;
        this.weight = pokemonResult.weight;
        this.abilities = pokemonResult.abilities;
        this.genderRatioFemale = this.handleGenderFemale(pokemonSpeciesResult.gender_rate);
        this.genderRatioMale = this.handleGenderMale(pokemonSpeciesResult.gender_rate);
    }

    handleTypes(types: any) {
        return types.map((type: any)=> {
            type['type'].name;
        });
    }

    formatDescription(unformatedDescription: any) {
        let desc;
        unformatedDescription.some( (unformated: any)=> {
            if (unformated.language.name === 'en' || unformated.language.name === 'pt') {
                desc = unformated.text;
                return;
            }
        });

        return String(desc);
    }
    handleStats(stats: any) {

        stats.map((stat: any, index: number) => {
            console.log(index) 
         if (stat.base_stat && stats) {
            this.stats[index] = new PokemonStats(stat.effort,stat.stat.name, stat.base_stat);
         }
        });

        return this.stats;
    }

    handleAbilities(allAbilitis: any) {
        allAbilitis.map((ability: any) => this.abilities.push(ability['name']));

        return this.abilities;
    }

    handleGenderFemale(genderRate: any) {
        return 12.5 * genderRate;
    }
    handleGenderMale(genderRate: any) {
        return 12.5 * (8- genderRate)
    }
}

 class PokemonStats {
     effort: number;
     statName: string;
     baseStat: number;

     constructor(effort: number, name: string, base: number) {
         this.effort= effort;
         this.statName = name;
         this.baseStat = base;
     }


}

