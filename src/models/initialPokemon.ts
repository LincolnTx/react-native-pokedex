export class PokemonInitialModel {
    public index: number;
    public name: string;
    public imageUrl: string;

    constructor(index: number, name: string) {
        this.index = index;
        this.name = this.formatPokemonName(name);
        this.imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.formatIndex(this.index)}.png`;
    }

    formatIndex(index: number) {
        if (index < 10) {
            return `00${index}`;
        }

        if (index > 10 && index <100) {
             return `0${index}`;
        }

        return index;
    }

    formatPokemonName(name: string) {
        return name.toLowerCase().split(' ')
            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
            .join(' ');
    }
}