export interface Ipokemon {
    id: number,
    name: string,
    image: string,
    attack: number,
    defense: number,
    hp: number,
    type: string | null,
    idAuthor: number
}

export interface IupdatePokemon {
    id?: number,
    name: string,
    image: string,
    attack: number,
    defense: number,
    idAuthor: number
}
