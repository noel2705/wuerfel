// @ts-ignore
// @ts-ignore
// @ts-ignore

import {useActionState, useDebugValue, useReducer, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


    const [zahl, setZahl] = useState(0);
    const [name, setName] = useState("");
    const [userMap, setUserMap] = useState("");
    const [bunker, setBunker] = useState("");
    const [, setstart] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [Visible, setVisible] = useState(true);



    async function bunkern(){
        const bunker = await fetch("http://localhost:3005/api/bunker", {
            method: "GET",
        })
        console.log("BUNKER", name,":", bunker,  )
        setBunker(JSON.stringify(userMap))
setBunker(userMap)
    }



    async function getwuerfel() {
        const zahl = await fetch(`http://localhost:3005/api/wuerfel/${name}`, {
            method: "GET",
        })
        let z = await zahl.json()
        await getUserMap()
        setName(z.name)
        setZahl(z.zahl)
    }

    async function getUserMap() {
        const result = await fetch("http://localhost:3005/api/wuerfel/zwischenstand", {
            method: "GET",
        })
        let z = await result.json()
        console.log(z)
        setUserMap(JSON.stringify(z))

    }

    async function starten() {
        const start = await fetch("http://localhost:3005/api/start", {
            method: "GET",
        })
        setstart(JSON.stringify(start))

        console.log({start})


    }

    function roundgui(){

         setIsVisible(!isVisible)
        setVisible(!Visible)
        starten()
    }



                return (
        <>
            <div>

                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <div className="card">

                {isVisible && (
                    <div>
                        <h1>{name}</h1>

                        <button onClick={getwuerfel}>
                            Würfeln
                        </button>

                        <button onClick={bunkern} >
                            Bunkern
                        </button>


                        <p>
                            {name}, du hast folgende Zahl gewürfelt: {zahl}
                        </p>


                        <br/>

                        <p>Bunker: {bunker} </p>

                    </div>

                )}
                {Visible &&(
                    <div>


                        <h1>Verflixte 6</h1>


                        <p>Mit wievielen Personen spielst du?</p>


                        <div>
                            <input value={name} onChange={event => setName(event.target.value)}/>
                        </div>




                        <button onClick={roundgui} >
                            Start
                        </button>


                    </div>
                )}








            </div>








        </>
    )
}

export default App
