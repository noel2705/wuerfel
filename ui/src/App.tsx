// @ts-ignore
// @ts-ignore
// @ts-ignore

import {use, useActionState, useDebugValue, useEffect, useReducer, useState,} from 'react'
import './App.css'
import {transformWithEsbuild} from "vite";


function App() {
    const [zahl, setZahl] = useState(0);
    const [usercount, setusercount] = useState(0);
    const [name, setName] = useState("");
    const [userMap, setUserMap] = useState();
    const [bunker, setBunker] = useState<Array<Punktestand>>();
    const [, setstart] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [Visible, setVisible] = useState(true);
    const [userlist, setUserlist] = useState<Map<number, string>>(new Map());
    const [six, setsix] = useState(false)
    const [sixe, setsixe] = useState(true)
    const [botauswahl, setBotauswahl] = useState("")
    const [buttonthere, setButtonthere] = useState(false)
    const [computerround, setComputerround] = useState(false)
    const [namevisibile, setNamevisibile] = useState(false)
    const [tresorvisibile, settresorvisibile] = useState(false)
    const [wuerfel, setwuerfel] = useState(false)
    const [wuerfel2, setwuerfel2] = useState(false)
    const [wuerfel3, setwuerfel3] = useState(false)
    const [wuerfel4, setwuerfel4] = useState(false)
    const [wuerfel5, setwuerfel5] = useState(false)

    const wuerfeltime = (1500)
    var computer = false


    async function einzahlen() {
        const bunker = await fetch("http://localhost:3005/api/bunker", {
            method: "GET",
        })

        let result = await bunker.json()
        const Punkte: Punktestand[] = JSON.parse(JSON.stringify(result))
        setBunker(Punkte)
    }


    async function getwuerfel(): Promise<number> {
        // @ts-ignore
        const zahle = await fetch(`http://localhost:3005/api/wuerfel/${name}`, {
            method: "GET",
        })
        let z = await zahle.json()
        await getUserMap()
        setZahl(z.zahl)

        if (z.zahl == 1) {
            setwuerfel(true)
            setsixe(false)
            await timeout(wuerfeltime)
            setwuerfel(false)
            setsixe(true)
            await timeout(wuerfeltime)
        } else if (z.zahl == 2) {
            setwuerfel2(true)
            setsixe(false)
            await timeout(wuerfeltime)
            setwuerfel2(false)
            setsixe(true)
            await timeout(wuerfeltime)
        } else if (z.zahl == 3) {
            setwuerfel3(true)
            setsixe(false)
            await timeout(wuerfeltime)
            setwuerfel3(false)
            setsixe(true)
            await timeout(wuerfeltime)
        } else if (z.zahl == 4) {
            setwuerfel4(true)
            setsixe(false)
            await timeout(wuerfeltime)
            setwuerfel4(false)
            setsixe(true)
            await timeout(wuerfeltime)
        } else if (z.zahl == 5) {
            setwuerfel5(true)
            setsixe(false)
            await timeout(wuerfeltime)
            setwuerfel5(false)
            setsixe(true)
            await timeout(wuerfeltime)
        }


        if (z.zahl == 6) {
            bunkern(z.zahl)
            setwuerfel(false)
            setwuerfel2(false)
            setwuerfel3(false)
            setwuerfel4(false)
            setwuerfel5(false)
            setsix(true)
            setsixe(false)
            setNamevisibile(false)
           await timeout(wuerfeltime)
            setsix(false);
            setsixe(true);
            setNamevisibile(true)


        } else {
            setsix(false)
            setsixe(true)

        }
        return z.zahl
    }

    async function getUserMap() {
        const result = await fetch("http://localhost:3005/api/wuerfel/zwischenstand", {
            method: "GET",
        })
        let z = await result.json()
        console.log("Usermap:", z)

        // @ts-ignore
        setUserMap(JSON.stringify(z))

    }

    async function starten() {
        const start = await fetch("http://localhost:3005/api/start", {
            method: "GET",
        })
        setstart(JSON.stringify(start))
        console.log({start})


    }

    function roundgui() {

        setIsVisible(!isVisible)
        setVisible(!Visible)
        setButtonthere(true)
        setComputerround(false)
        setNamevisibile(true)
        starten()
        let temp = userlist.get(0)
        if (name == "" && temp) {
            setName(temp)
        }

    }

    function timeout(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {

        let bot = 0;
        if (name == "Computer") {
            setComputerround(true)
            setButtonthere(false)

            timeout(2000)
            getwuerfel()


            const botawnser = async () => {
                while (bot == 0 && name == "Computer" && zahl != 6) {


                    function getRandomInt(min: number, max: number): number {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    function getrandomtime(min: number, max: number): number {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    function getrandomawnser(min: number, max: number): number {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }


                    const randomInt = getRandomInt(0, 2);
                    const randomawnser = getrandomawnser(1, 16)

                    if (randomInt == 0) {
                        setBotauswahl("Würfeln oder Bunkern? Hmm...")
                        await timeout(getrandomtime(1500, 3000))
                        if (randomawnser < 5) {
                            setBotauswahl("Ach komm ich Würfel")

                        } else if (randomawnser < 9) {
                            setBotauswahl("Ich Würfel nocheinmal")

                        } else if (randomawnser < 13) {
                            setBotauswahl("Ich Riskiere es nochmal")

                        } else if (randomawnser < 17) {
                            setBotauswahl("Und nochmal Würfeln")


                        }

                        await timeout(getrandomtime(1300, 1600))

                        let z = await getwuerfel()
                        if (z == 6) {
                            bot = 2
                        }
                    } else if (randomInt == 1) {

                        setBotauswahl("Würfeln oder Bunkern? Hmm...")
                        await timeout(getrandomtime(1000, 2500))

                        if (randomawnser < 5) {
                            setBotauswahl("Ach komm ich Würfel")

                        } else if (randomawnser < 9) {
                            setBotauswahl("Ich Würfel nocheinmal")

                        } else if (randomawnser < 13) {
                            setBotauswahl("Ich Riskiere es nochmal")

                        } else if (randomawnser < 17) {
                            setBotauswahl("Und nochmal Würfeln")


                        }

                        let z = await getwuerfel()
                        if (z == 6) {
                            bot = 2
                        }
                    } else if (randomInt == 2) {
                        setBotauswahl("Würfeln oder Bunkern? Hmm...")
                        await timeout(getrandomtime(1000, 4000))
                        if (randomawnser < 5) {
                            setBotauswahl("Ich Bunker ein")
                            setsixe(false)
                            settresorvisibile(true)
                            await timeout(getrandomtime(1000, 1200))
                            setsixe(true)
                            settresorvisibile(false)
                        } else if (randomawnser < 9) {
                            setBotauswahl("Ich zahle es lieber ein.")
                            setsixe(false)
                            settresorvisibile(true)
                            await timeout(getrandomtime(1000, 1200))
                            setsixe(true)
                            settresorvisibile(false)
                        } else if (randomawnser < 13) {
                            setBotauswahl("Lieber sichergehen und einbunkern")
                            setsixe(false)
                            settresorvisibile(true)
                            await timeout(getrandomtime(1000, 1200))
                            setsixe(true)
                            settresorvisibile(false)
                        } else if (randomawnser < 17) {
                            setBotauswahl("Würfeln ist mir gerade zu Risky")
                            setsixe(false)
                            settresorvisibile(true)
                            await timeout(getrandomtime(1000, 1200))
                            setsixe(true)
                            settresorvisibile(false)

                        }


                        await timeout(getrandomtime(1000, 1200))

                        bot = 2
                        bunkern()

                    }

                }

            }

            botawnser();

        } else {
            setButtonthere(true)
            setComputerround(false)
        }
    }, [name])


    async function bunkern(zahl: number) {
        if (zahl != 6) {
            setsixe(false)
            settresorvisibile(true)
            await timeout(1000)
            settresorvisibile(false)
            setsixe(true)


        }
        setsixe(false)
        einzahlen()
        setZahl(0)
        setsixe(true)


        let temp = userlist.get(0)
        if (name == "" && temp) {
            setName(temp)
            return
        }
        let key = value(userlist, name)

        if (key < 0) {
            console.error("Key are Undefined")
            return;
        }
        let NewName = userlist.get(key + 1)

        if (NewName) {
            setName(NewName)
        } else if (temp) {
            setName(temp)
        }

    }


    function value(map: Map<number, string>, searchvalue: string) {
        for (let [key, value] of map.entries()) {
            if (value === searchvalue)
                return key;
        }
        return -1;
    }

    type Punktestand = {
        Name: string;
        Punkte: number;
    }

    function Computer() {

        if (computer == true) {
            computer = false
            userlist.delete(value(userlist, "Computer"))


        } else {
            computer = true
            userlist.set(userlist.size, "Computer")
        }

    }

    // @ts-ignore
    return (
        <>


            <div>

                {six && (
                    <a href="http://localhost:3004/api/bunkern">
                        <img src="https://cdn-icons-png.flaticon.com/512/8068/8068292.png" className="verflixte"
                             alt="Verflixte 6"/>
                    </a>
                )

                }

                {sixe && (
                    <a href="http://localhost:3004/api/bunkern">
                        <img src="https://www.fips-laden.de/media/image/16/b2/2f/21-102809_b_600x600@2x.jpg"
                             className="logo" alt="Verflixte 6"/>
                    </a>
                )

                }

                {tresorvisibile && (

                    <a href="http://localhost:3004/api/bunkern">
                        <img src="https://thumbs.dreamstime.com/b/banktresor-33262677.jpg" className="bunker" alt={"zahl"} />
                    </a>

                )}

                {wuerfel && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/one-310338_1280.png" className="bunker" alt={"zahl"} />


                )}
                {wuerfel2 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/two-310337_1280.png" className="bunker" alt={"zahl"} />


                )}
                {wuerfel3 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/three-310336_640.png" className="bunker" alt={"zahl"} />


                )}
                {wuerfel4 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312623_960_720.png" className="bunker" alt={"zahl"} />


                )}
                {wuerfel5 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/five-310334_640.png" className="bunker" alt={"zahl"}/>


                )}

            </div>


            <div className="card">


                {isVisible && (
                    <div>


                        {namevisibile && (


                            <div>


                                <h1>{name}</h1>


                            </div>


                        )}


                        {buttonthere && (


                            <div>


                                <button onClick={getwuerfel}>
                                    Würfeln
                                </button>

                                <button onClick={bunkern}>
                                    Bunkern
                                </button>


                                <p>{name} deine Zahl war {zahl}</p>

                            </div>


                        )}
                        {computerround && (


                            <div>


                                <h2>{botauswahl}</h2>


                            </div>


                        )}





                        <br/>


                        {bunker && bunker.map((el) => (

                            <div>
                                <p key={el.Name}>{el.Name}: <b>{el.Punkte}</b></p>

                            </div>


                        ))}


                    </div>

                )}
                {Visible && (
                    <div>


                        <h1>Verflixte 6</h1>


                        <p>Wie viele Personen spielen mit?</p>

                        <div>
                            <input value={usercount} onChange={event => setusercount(event.target.value)} key={"Test"}/>
                        </div>


                        {Array.from({length: usercount}, (_, i) => i).map((el) => (

                            <div>
                                <input value={name[el]} onChange={event => {
                                    setUserlist(map => new Map(map.set(el, event.target.value)))

                                }} key={el}/>

                            </div>


                        ))}


                        <h3>Soll ein Roboter im Spiel mitspielen?</h3>

                        <div>
                            <input type="checkbox" onClick={Computer} className={"bot"}></input>
                        </div>

                        <div>----------------------------------------------------</div>


                        <button onClick={roundgui} className={"startbutton"}>
                            Start
                        </button>
                    </div>
                )}


            </div>


        </>
    )
}

export default App
