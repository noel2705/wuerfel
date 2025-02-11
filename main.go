package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
)

//TIP <p>To run your code, right-click the code and select <b>Run</b>.</p> <p>Alternatively, click
// the <icon src="AllIcons.Actions.Execute"/> icon in the gutter and select the <b>Run</b> menu item from here.</p>

func main() {

	usermap := make(map[string]int)
	runden := 0
	fmt.Println("Wieviele Runden möchtet ihr spielen?")
	fmt.Scanln(&runden)

	count := usercount()

	for i := 0; i < count; i++ {

		name := userinput()
		usermap[name] = 0

	}
	maxvalue := 0
	winname := ""

	for i := 0; i < runden; i++ {
		usermap = round(usermap) // speichern
		fmt.Println("Hier Die Ergebnisse von dieser  Runde.Wenn ihr die Nächste Runde Starten wollt, drückt bitte die Enter Taste")
		fmt.Println(usermap)
		for name, value := range usermap {
			if value > maxvalue {
				winname = name
				maxvalue = value
				fmt.Println("Die Höchste Zahl war die", maxvalue, "von", winname)
			}
			bufio.NewReader(os.Stdin).ReadBytes('\n')
		}

	}
	fmt.Println(winname, "ist der Gewinner mit", maxvalue, "Punkten dieses Spieles. Herzlichen Glükwunsch")
}

func usercount() int {

	var count int

	fmt.Print("Wieviele Spieler nehmen an dem Spiel teil?")
	fmt.Scanln(&count)

	return count

}

func round(usermap map[string]int) map[string]int {

	for name, _ := range usermap {

		awnser := 1

		for awnser == 1 {
			zahl := wuerfeln()
			usermap[name] += zahl
			if zahl == 6 {
				fmt.Printf("Hey, %s Deine Zahl war %v\n", name, zahl)
				fmt.Println("All deine Punkte wurden auf 0 gesetzt, da du die Zahl 6 gewürfelt hast.")
				usermap[name] = 0
			} else {
				fmt.Printf("Hey %s Deine Zahl war %v\n", name, zahl)
			}
			awnser = enter(name)
		}

	}
	return usermap
}

func wuerfeln() int {

	zahl := rand.Intn(7)

	return zahl

}

func userinput() string {

	var name string

	fmt.Print("Wie ist dein Name?: ")
	fmt.Scanln(&name)

	return name

}

func enter(name string) int {

	awnser := 0

	fmt.Printf("%s ,möchtest du weitermachen? ( Ja 1 | Nein 2 ).", name)
	fmt.Scanln(&awnser)

	return awnser

}
