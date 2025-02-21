// @ts-ignore
// @ts-ignore
// @ts-ignore

import {use, useActionState, useDebugValue, useEffect, useReducer, useState,} from 'react'
import './App.css'


function App() {
    const [zahl, setZahl] = useState(0);
    const [usercount, setusercount] = useState(0);
    const [name, setName] = useState("");
    const [userMap, setUserMap] = useState();
    const [bunker, setBunkern] = useState<Array<Punktestand>>();
    const [, setstart] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [userlist, setUserlist] = useState<Map<number, string>>(new Map());
    const [botauswahl, setBotauswahl] = useState("")
    const [buttonthere, setButtonthere] = useState(false)
    const [computerround, setComputerround] = useState(false)
    const [namevisibile, setNamevisibile] = useState(false)
    const [win, setWin] = useState(false)
    const [winname, setWinname] = useState("")
    const [computerdifficult, setcomputerdifficult] = useState("Normal")
    const [computerdifficultshow, setcomputerdifficultshow] = useState(false)
    const [home, setHome] = useState(true)
    const [toutorial, settoutorial] = useState()

    const [toutorialimages, setToutorialImages] = useState(Toutorialimages.WUERFEL)

    enum Image {
        VERFLIXTE_6,
        TRESOR,
        WUERFEL,
        WUERFEL_1,
        WUERFEL_2,
        WUERFEL_3,
        WUERFEL_4,
        WUERFEL_5,
        WUERFEL_6,
        WINNER,
    }

    enum Toutorialimages {
        VERFLIXTE_6,
        TRESOR,
        WUERFEL,
        WUERFEL_1,
        WUERFEL_2,
        WUERFEL_3,
        WUERFEL_4,
        WUERFEL_5,
        WUERFEL_6,
        WINNER,
    }

    enum ToutorialStufe {
        Wuerfeln,
        BUNKERN,
        Wuerfel_6,
        Tipps,

    }

    const [Img, setImg] = useState(Image.VERFLIXTE_6)
    type Punktestand = {
        Name: string;
        Punkte: number;
    }


// @ts-ignore


    const wuerfeltime = (0)
    var computer = false


    async function einzahlen() {
        const bunker = await fetch("http://localhost:3005/api/bunker", {
            method: "GET",

        })

        let result = await bunker.json()
        const Punkte: Punktestand[] = JSON.parse(JSON.stringify(result))
        setBunkern(Punkte)
    }

    async function toutorialwuerfeln(min, max) {
        // @ts-ignore
        var tzahl = getrandomtzahl(min, max)

        // @ts-ignore


        function getrandomtzahl(min: number, max: number): number {


            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }


        if (tzahl == 1) {
            // @ts-ignore
            setToutorialImages(Toutorialimages.WUERFEL_1)

            await timeout(wuerfeltime)

            await timeout(wuerfeltime)
        } else if (tzahl == 2) {
            // @ts-ignore
            setToutorialImages(Toutorialimages.WUERFEL_2)

            await timeout(wuerfeltime)

            await timeout(wuerfeltime)
        } else if (tzahl == 3) {
            // @ts-ignore
            setToutorialImages(Toutorialimages.WUERFEL_3)

            await timeout(wuerfeltime)

            await timeout(wuerfeltime)
        } else if (tzahl == 4) {
            // @ts-ignore
            setToutorialImages(Toutorialimages.WUERFEL_4)

            await timeout(wuerfeltime)

            await timeout(wuerfeltime)
        } else if (tzahl == 5) {
            // @ts-ignore
            setToutorialImages(Toutorialimages.WUERFEL_5)

            await timeout(wuerfeltime)


            await timeout(wuerfeltime)

        } else if (tzahl == 6) {
            // @ts-ignore
            setToutorialImages(Toutorialimages.WUERFEL_6)

            await timeout(wuerfeltime)


            await timeout(wuerfeltime)
        }
    }


    async function getwuerfel(ignore = 0): Promise<number> {
        // @ts-ignore

        const zahle = await fetch(`http://localhost:3005/api/wuerfel/${name}/${ignore}`, {
            method: "GET",
        })
        let z = await zahle.json()
        await getUserMap()
        console.log("Usermap:", userMap)
        setZahl(z.zahl)


        if (z.zahl == 1) {
            setImg(Image.WUERFEL_1)

            await timeout(wuerfeltime)

            await timeout(wuerfeltime)
        } else if (z.zahl == 2) {
            setImg(Image.WUERFEL_2)

            await timeout(wuerfeltime)

            await timeout(wuerfeltime)
        } else if (z.zahl == 3) {
            setImg(Image.WUERFEL_3)

            await timeout(wuerfeltime)

            await timeout(wuerfeltime)
        } else if (z.zahl == 4) {
            setImg(Image.WUERFEL_4)

            await timeout(wuerfeltime)

            await timeout(wuerfeltime)
        } else if (z.zahl == 5) {
            setImg(Image.WUERFEL_5)

            await timeout(wuerfeltime)


            await timeout(wuerfeltime)
        }

        // @ts-ignore

        if (z.zahl == 6) {

            bunkern(z.zahl)
            setNamevisibile(false)
            await timeout(wuerfeltime)
            setNamevisibile(true)
        }

        return z.zahl
    }


    async function getUserMap() {
        const result = await fetch("http://localhost:3005/api/wuerfel/zwischenstand", {
            method: "GET",
        })
        let z = await result.json()
        console.log("Zwischenstand:", z)
        // @ts-ignore
        setUserMap(JSON.stringify(z))
        return z
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


    function result(winner: Punktestand) {
        console.log("Gewinner:", winner)
        setWin(true)
        setWinname(winner.Name)
        setButtonthere(false)
        setNamevisibile(false)
        setImg(Image.WINNER)
        return winner
    }

    function neustart() {
        window.location.reload()
    }

    function getfinalpoints() {

        if (!bunker) {
            return
        }
        let points = bunker.filter(Punkte => Punkte.Name === winname)


        return points[0].Punkte;
    }

    useEffect(() => {

        let winner = (bunker?.filter(punktestand => punktestand.Punkte >= 100))
        if (!winner) {
            return
        }
        if (winner.length == 1) {


            result(winner[0])
        }

    }, [bunker])


    useEffect(() => {
        let Punkte = (bunker?.filter(punktestand => punktestand.Name == "Computer"))
        console.log(Punkte)

        let bot = 0;
        if (name == "Computer") {
            const computerIgnoreLevel = 1
            setImg(Image.VERFLIXTE_6)
            setComputerround(true)
            setButtonthere(false)

            timeout(2000)
            getwuerfel(computerIgnoreLevel)


            const botawnser = async () => {
                while (bot == 0 && name == "Computer" && zahl != 6 && !win) {


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

                    function getrandomawnserofquestion(min: number, max: number): number {
                        min = Math.ceil(min);
                        max = Math.floor(max);
                        return Math.floor(Math.random() * (max - min + 1)) + min;
                    }


                    let randomInt = getRandomInt(0, 3);
                    const randomawnser = getrandomawnser(1, 16)
                    const randomawnserofquestion = getrandomawnserofquestion(1, 3)


                    if (computerdifficult === "Easy") {

                        if (randomInt == 0) {

                            if (randomawnserofquestion == 1) {
                                setBotauswahl("Soll ich Bunkern? hmm")
                            } else if (randomawnserofquestion == 2) {
                                setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                            } else if (randomawnserofquestion == 3) {
                                setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                            }
                            await timeout(getrandomtime(1500, 3000))
                            if (randomawnser < 5) {
                                setBotauswahl("Ach komm ich Würfel")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich Würfel nocheinmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Ich Riskiere es nochmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Und nochmal Würfeln")
                                await timeout(getrandomtime(1000, 1100))

                            }


                            let z = await getwuerfel(computerIgnoreLevel)
                            if (z == 6) {
                                bot = 2
                            }
                        } else if (randomInt == 1) {

                            if (randomawnserofquestion == 1) {
                                setBotauswahl("Soll ich Bunkern? hmm")
                            } else if (randomawnserofquestion == 2) {
                                setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                            } else if (randomawnserofquestion == 3) {
                                setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                            }
                            await timeout(getrandomtime(1000, 2500))

                            if (randomawnser < 5) {
                                if (randomawnserofquestion == 1) {
                                    setBotauswahl("Soll ich Bunkern? hmm")
                                } else if (randomawnserofquestion == 2) {
                                    setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                                } else if (randomawnserofquestion == 3) {
                                    setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                                }

                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich Würfel nocheinmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Ich Riskiere es nochmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Und nochmal Würfeln")
                                await timeout(getrandomtime(1000, 1100))

                            }

                            let z = await getwuerfel(computerIgnoreLevel)
                            if (z == 6) {
                                bot = 2
                            }
                        } else if (randomInt == 2) {


                            setBotauswahl("Würfeln oder Bunkern? Hmm...")
                            await timeout(getrandomtime(1000, 4000))
                            if (randomawnser < 5) {
                                setBotauswahl("Ich Bunker ein")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich zahle es lieber ein.")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Lieber sichergehen und einbunkern")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Würfeln ist mir gerade zu Risky")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))

                            }


                            await timeout(getrandomtime(1000, 1200))

                            bot = 2
                            bunkern(zahl)

                        }


                    } else if (computerdifficult === "Normal") {
                        let temp = await getUserMap()
                        if (temp) {
                            console.log(temp["Computer"])
                            if (temp["Computer"] <= 4) {
                                randomInt = 1

                            } else {
                                randomInt = 2
                            }
                        }

                        console.log("Zufallszahl:", randomInt)
                        if (randomInt == 0) {

                            if (randomawnserofquestion == 1) {
                                setBotauswahl("Soll ich Bunkern? hmm")
                            } else if (randomawnserofquestion == 2) {
                                setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                            } else if (randomawnserofquestion == 3) {
                                setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                            }
                            await timeout(getrandomtime(1500, 3000))
                            if (randomawnser < 5) {
                                setBotauswahl("Ach komm ich Würfel")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich Würfel nocheinmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Ich Riskiere es nochmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Und nochmal Würfeln")
                                await timeout(getrandomtime(1000, 1100))

                            }


                            let z = await getwuerfel(computerIgnoreLevel)
                            if (z == 6) {
                                bot = 2
                            }
                        } else if (randomInt == 1) {

                            if (randomawnserofquestion == 1) {
                                setBotauswahl("Soll ich Bunkern? hmm")
                            } else if (randomawnserofquestion == 2) {
                                setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                            } else if (randomawnserofquestion == 3) {
                                setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                            }
                            await timeout(getrandomtime(1000, 2500))

                            if (randomawnser < 5) {
                                if (randomawnserofquestion == 1) {
                                    setBotauswahl("Soll ich Bunkern? hmm")
                                } else if (randomawnserofquestion == 2) {
                                    setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                                } else if (randomawnserofquestion == 3) {
                                    setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                                }

                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich Würfel nocheinmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Ich Riskiere es nochmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Und nochmal Würfeln")
                                await timeout(getrandomtime(1000, 1100))

                            }

                            let z = await getwuerfel(computerIgnoreLevel)
                            if (z == 6) {
                                bot = 2
                            }
                        } else if (randomInt == 2) {


                            setBotauswahl("Würfeln oder Bunkern? Hmm...")
                            await timeout(getrandomtime(1000, 4000))
                            if (randomawnser < 5) {
                                setBotauswahl("Ich Bunker ein")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich zahle es lieber ein.")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Lieber sichergehen und einbunkern")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Würfeln ist mir gerade zu Risky")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))

                            }


                            await timeout(getrandomtime(1000, 1200))

                            bot = 2
                            bunkern(zahl)

                        }

                    } else if (computerdifficult === "Hard") {

                        let tempe = await getUserMap()
                        if (tempe) {
                            console.log(tempe["Computer"])
                            if (tempe["Computer"] > 12) {
                                randomInt = 2

                            } else if (tempe["Computer"] <= 8) {
                                randomInt = 1
                            }
                        }
                        console.log("Zufallszahl:", randomInt)
                        if (randomInt == 0) {

                            if (randomawnserofquestion == 1) {
                                setBotauswahl("Soll ich Bunkern? hmm")
                            } else if (randomawnserofquestion == 2) {
                                setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                            } else if (randomawnserofquestion == 3) {
                                setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                            }
                            await timeout(getrandomtime(1500, 3000))
                            if (randomawnser < 5) {
                                setBotauswahl("Ach komm ich Würfel")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich Würfel nocheinmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Ich Riskiere es nochmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Und nochmal Würfeln")
                                await timeout(getrandomtime(1000, 1100))

                            }


                            let z = await getwuerfel(computerIgnoreLevel)
                            if (z == 6) {
                                bot = 2
                            }
                        } else if (randomInt == 1) {

                            if (randomawnserofquestion == 1) {
                                setBotauswahl("Soll ich Bunkern? hmm")
                            } else if (randomawnserofquestion == 2) {
                                setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                            } else if (randomawnserofquestion == 3) {
                                setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                            }
                            await timeout(getrandomtime(1000, 2500))

                            if (randomawnser < 5) {
                                if (randomawnserofquestion == 1) {
                                    setBotauswahl("Soll ich Bunkern? hmm")
                                } else if (randomawnserofquestion == 2) {
                                    setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                                } else if (randomawnserofquestion == 3) {
                                    setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                                }

                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich Würfel nocheinmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Ich Riskiere es nochmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Und nochmal Würfeln")
                                await timeout(getrandomtime(1000, 1100))

                            }

                            let z = await getwuerfel(computerIgnoreLevel)
                            if (z == 6) {
                                bot = 2
                            }
                        } else if (randomInt == 2) {


                            setBotauswahl("Würfeln oder Bunkern? Hmm...")
                            await timeout(getrandomtime(1000, 4000))
                            if (randomawnser < 5) {
                                setBotauswahl("Ich Bunker ein")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich zahle es lieber ein.")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Lieber sichergehen und einbunkern")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Würfeln ist mir gerade zu Risky")
                                setImg(Image.TRESOR)
                                await timeout(getrandomtime(1000, 1200))

                            }

                            await timeout(getrandomtime(1000, 1200))

                            bot = 2
                            bunkern(zahl)

                        } else if (randomInt == 3) {

                            if (randomawnserofquestion == 1) {
                                setBotauswahl("Soll ich Bunkern? hmm")
                            } else if (randomawnserofquestion == 2) {
                                setBotauswahl("Bunkern? hmm ne doch, Ich weiß es nicht")
                            } else if (randomawnserofquestion == 3) {
                                setBotauswahl("Würfeln? Ne Ich Bunker wobei..")
                            }
                            await timeout(getrandomtime(1500, 3000))
                            if (randomawnser < 5) {
                                setBotauswahl("Ach komm ich Würfel")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 9) {
                                setBotauswahl("Ich Würfel nocheinmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 13) {
                                setBotauswahl("Ich Riskiere es nochmal")
                                await timeout(getrandomtime(1000, 1100))
                            } else if (randomawnser < 17) {
                                setBotauswahl("Und nochmal Würfeln")
                                await timeout(getrandomtime(1000, 1100))

                            }


                            let z = await getwuerfel(computerIgnoreLevel)
                            if (z == 6) {
                                bot = 2
                            }
                        }

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

            setImg(Image.TRESOR)
            await timeout(1000)


        } else if (zahl == 6) {

            setImg(Image.WUERFEL_6)
            await timeout(1200)
            setImg(Image.VERFLIXTE_6)
        }


        einzahlen()
        setZahl(0)
        setImg(Image.VERFLIXTE_6)


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


    function Computer() {

        if (!computerdifficultshow) {
            setcomputerdifficultshow(true)
        } else {
            setcomputerdifficultshow(false)
        }


        if (computer) {
            computer = false
            userlist.delete(value(userlist, "Computer"))


        } else if (!computer) {
            computer = true
            userlist.set(userlist.size, "Computer")
        }

    }

    function difficult() {

        if (computerdifficult === "Hard") {
            setcomputerdifficult("Easy")

        } else if (computerdifficult === "Easy") {
            setcomputerdifficult("Normal")
        } else if (computerdifficult === "Normal") {
            setcomputerdifficult("Hard")
        } else if (computerdifficult === "Hard")
            setcomputerdifficult("Easy")
    }

    function spielen() {
        setVisible(true)
        setHome(false)
    }

    function toutorial1() {

        setImg(Image.WUERFEL)
        setHome(false)
// @ts-ignore
        settoutorial(ToutorialStufe.Wuerfeln)
        setToutorialImages(Toutorialimages.WUERFEL)
    }

    async function toutorialbunkern() {
        setToutorialImages(Toutorialimages.TRESOR)
        await timeout(3000)
        setToutorialImages(Toutorialimages.WUERFEL)
    }

    // @ts-ignore
    return (
        <>


            <div>

                {Img === Image.WUERFEL_6 && (
                    <a href="http://localhost:3004/api/bunkern">
                        <img src="https://cdn-icons-png.flaticon.com/512/8068/8068292.png" className="verflixte"
                             alt="Verflixte 6"/>
                    </a>
                )

                }


                {Img === Image.VERFLIXTE_6 && (
                    <a href="http://localhost:3004/api/bunkern">
                        <img src="https://www.fips-laden.de/media/image/16/b2/2f/21-102809_b_600x600@2x.jpg"
                             className="logo" alt="Verflixte 6"/>
                    </a>
                )

                }

                {Img === Image.TRESOR && (

                    <a href="http://localhost:3004/api/bunkern">
                        <img src="https://thumbs.dreamstime.com/b/banktresor-33262677.jpg" className="bunker"
                             alt={"zahl"}/>
                    </a>

                )}

                {Img === Image.WUERFEL_1 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/one-310338_1280.png" className="bunker"
                         alt={"zahl"}/>


                )}
                {Img === Image.WUERFEL_2 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/two-310337_1280.png" className="bunker"
                         alt={"zahl"}/>


                )}
                {Img === Image.WUERFEL_3 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/three-310336_640.png" className="bunker"
                         alt={"zahl"}/>


                )}
                {Img === Image.WUERFEL_4 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312623_960_720.png" className="bunker"
                         alt={"zahl"}/>


                )}
                {Img === Image.WUERFEL_5 && (


                    <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/five-310334_640.png" className="bunker"
                         alt={"zahl"}/>


                )}


                {Img === Image.WINNER && (

                    <a href="http://localhost:3004/api/bunkern">
                        <img src="https://cdn.pixabay.com/photo/2016/09/16/19/20/trophy-1674911_1280.png"
                             className="bunker"
                             alt={"zahl"}/>
                    </a>

                )}

            </div>


            <div className="card">


                {toutorial === ToutorialStufe.Wuerfeln && (


                    <div>
                        <h1>Würfeln</h1>

                        {toutorialimages === Toutorialimages.WUERFEL_6 && (
                            <a href="http://localhost:3004/api/bunkern">
                                <img src="https://cdn-icons-png.flaticon.com/512/8068/8068292.png" className="verflixte"
                                     alt="Verflixte 6"/>
                            </a>

                        )


                        }
                        {toutorialimages === Toutorialimages.WUERFEL_6 && (
                            <div>
                                <h3>Oh nein eine 6 du hast alle Punkt verloren!</h3>
                            </div>
                        )


                        }


                        {toutorialimages === Toutorialimages.VERFLIXTE_6 && (
                            <a href="http://localhost:3004/api/bunkern">
                                <img src="https://www.fips-laden.de/media/image/16/b2/2f/21-102809_b_600x600@2x.jpg"
                                     className="logo" alt="Verflixte 6"/>
                            </a>
                        )

                        }

                        {toutorialimages === Toutorialimages.TRESOR && (

                            <a href="http://localhost:3004/api/bunkern">
                                <img src="https://thumbs.dreamstime.com/b/banktresor-33262677.jpg" className="bunker"
                                     alt={"zahl"}/>
                            </a>

                        )}

                        {toutorialimages === Toutorialimages.WUERFEL_1 && (


                            <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/one-310338_1280.png"
                                 className="bunker"
                                 alt={"zahl"}/>


                        )}
                        {toutorialimages === Toutorialimages.WUERFEL_2 && (


                            <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/two-310337_1280.png"
                                 className="bunker"
                                 alt={"zahl"}/>


                        )}
                        {toutorialimages === Toutorialimages.WUERFEL_3 && (


                            <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/three-310336_640.png"
                                 className="bunker"
                                 alt={"zahl"}/>


                        )}
                        {toutorialimages === Toutorialimages.WUERFEL_4 && (


                            <img src="https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312623_960_720.png"
                                 className="bunker"
                                 alt={"zahl"}/>


                        )}
                        {toutorialimages === Toutorialimages.WUERFEL_5 && (


                            <img src="https://cdn.pixabay.com/photo/2014/04/03/10/24/five-310334_640.png"
                                 className="bunker"
                                 alt={"zahl"}/>


                        )}

                        {toutorialimages === Toutorialimages.WINNER && (

                            <a href="http://localhost:3004/api/bunkern">
                                <img src="https://cdn.pixabay.com/photo/2016/09/16/19/20/trophy-1674911_1280.png"
                                     className="bunker"
                                     alt={"zahl"}/>
                            </a>

                        )}


                        {toutorialimages === Toutorialimages.WUERFEL && (
                            <a href="http://localhost:3004/api/bunkern">
                                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/19/dice-1294902_1280.png"
                                     className="verflixte"
                                     alt="Verflixte 6"/>
                            </a>
                        )

                        }


                        {toutorialimages === Toutorialimages.TRESOR && (
                            <div>

                                <h4>Du hast Erfolgreich deine Punkte eingezahlt, und kannst sie nun nicht mehr verlieren</h4>

                            </div>
                        )

                        }
                        <div>----------------------------------------------------</div>

                        <button onClick={() => toutorialwuerfeln(1, 6)}>
                            Würfeln
                        </button>
                        <button onClick={() => toutorialbunkern()}>
                            Bunkern
                        </button>
                        <div>----------------------------------------------------</div>



                        <button onClick={() => {

                           setHome(true)
setImg(Image.VERFLIXTE_6)
                            settoutorial(false)

                        }}>
                    Haupt Menü
                        </button>



                        {toutorial == ToutorialStufe.BUNKERN && (


                            <div>


                                <button onClick={() => toutorialwuerfeln(1, 6)}>
                                    Weiter
                                </button>

                            </div>


                        )}

                    </div>


                )}


                {home && (


                    <div>


                        <h1>Verflixte 6</h1>

                        <button onClick={toutorial1}>Toutorial</button>
                        <button onClick={spielen}>Spielen</button>

                    </div>


                )}

                {isVisible && (
                    <div>


                        {namevisibile && (


                            <div>


                                <h1>{name}</h1>

                            </div>


                        )}


                        {buttonthere && (


                            <div>


                                <button onClick={() => getwuerfel(0)}>
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

                        {win && (


                            <div>

                                <div>----------------------------------------------------</div>
                                <h2>Gewinner: {winname}</h2>
                                <h2>Punkte: {getfinalpoints()} </h2>
                                <div>----------------------------------------------------</div>
                                <button onClick={neustart}>Neue Runde</button>

                            </div>


                        )}


                        <br/>


                        {bunker && !win && bunker.map((el) => (

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

                        {computerdifficultshow && (


                            <div>

                                <h4>Schwierigkeit:</h4>
                                <button onClick={difficult}>Ändern</button>
                                <h2>{computerdifficult}</h2>
                                <div>----------------------------------------------------</div>
                            </div>

                        )}


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
