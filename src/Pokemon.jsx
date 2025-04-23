import { useState } from "react"
import { useEffect } from "react"
import { PokemonCards } from "./pokemonCards";

export const Pokemon = () => {


    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=300"


    const fetchPokemon = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json()
            console.log(data)


            const detailedPokemonData = data.results.map(async (curpokemon) => {
                // console.log(curpokemon.url)
                const res = await fetch(curpokemon.url)
                const data = await res.json()
                // console.log(data)
                return data;
            })   // get all results url  and all url data are shown 
            // console.log(detailedPokemonData)

            const detailedResponse = await Promise.all(detailedPokemonData)   // promise data ne shown karva but all promise data are write then success otherwise API are not call 
            setPokemon(detailedResponse)
            console.log(detailedResponse)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, [])


    //search functionality

    const searchData = pokemon.filter((curPokemon) => curPokemon.name.toLowerCase().includes(search.toLowerCase()))

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }
    return (
        <>
            {loading ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <section className="container">
                    <header>
                        <h1>Lets Catch Pokemon</h1>
                    </header>

                    <div className="pokemon-search">
                        <input type="text" placeholder="search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="cards">
                        {searchData.map((curPokemon) => (
                            <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}