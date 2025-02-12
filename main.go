package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"time"
)

// TIP <p>To run your code, right-click the code and select <b>Run</b>.</p> <p>Alternatively, click
// the <icon src="AllIcons.Actions.Execute"/> icon in the gutter and select the <b>Run</b> menu item from here.</p>

func main() {
	usermap := make(map[string]int)
	zwischenstand := make(map[string]int) // Map anlegen

	runden := 0
	fmt.Println("Wieviele Runden möchtet ihr spielen?")
	fmt.Scanln(&runden)

	count := usercount()

	var Bot = ""
	fmt.Println("Möchtet ihr gegen Ein Computer Spieler Spielen? ( Ja | Nein )")
	fmt.Scanln(&Bot) // User Antwort auslesen und in "Computer" reinschreiben
	fmt.Println("-----------------")

	if Bot == "Ja" { // Abfrage ob ein Computer eingesetzt werden soll.

		fmt.Println("Du Spielst nun mit einem Computer.")
		zwischenstand["Computer"] = 0

	} else {

	}

	for i := 0; i < count; i++ {

		name := userinput()

		usermap[name] = 0
		zwischenstand[name] = 0
	}
	maxvalue := 0
	winname := ""

	for i := 0; i < runden; i++ {

		zwischenstand = round(zwischenstand, Bot)

		for name, value := range zwischenstand {

			usermap[name] += value // Werte von einer Runde in die Gesammt Wertung einsetzen.

		}

		//zwischentand auf usermap addieren
		// zwischenstand wieder mit 0 initialisieren

		fmt.Println("Hier Die Ergebnisse von dieser  Runde.Wenn ihr die Nächste Runde Starten wollt, drückt bitte die Enter Taste")
		fmt.Println(usermap)
		for name, value := range zwischenstand {
			if value > maxvalue {
				if value != 6 { //Wenn der Gewürfelte wert größter ist als der alte maximaler Wert, und dieser nicht 6 ist wird er überschrieben
					winname = name
					maxvalue = value

				}
				fmt.Println("Die Höchste Zahl war die", maxvalue, "von", winname) // Ausgabe
			}
			bufio.NewReader(os.Stdin).ReadBytes('\n') // Gucken ob die Enter Taste gedrückt wird.
		}

		for name, _ := range zwischenstand {

			zwischenstand[name] = 0 //Zwischenstand zurücksetzen.

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

func round(zwischenstand map[string]int, bot string) map[string]int {

	for name, _ := range zwischenstand {

		awnser := 1

		for awnser == 1 {
			zahl := wuerfeln()
			zwischenstand[name] += zahl
			if zahl == 6 {

				fmt.Printf("Hey, %s Deine Zahl war %v\n", name, zahl)
				fmt.Println("All deine Punkte wurden auf 0 gesetzt, da du die Zahl 6 gewürfelt hast.")
				zwischenstand[name] = 0
			} else {
				fmt.Printf("Hey %s Deine Zahl war %v\n", name, zahl)

			}
			awnser = enter(name, bot)
		}

		fmt.Println("Dein Bunker hat nun ", zwischenstand[name], "Punkte")
		fmt.Println("-----------------")
		time.Sleep(1 * time.Second)
	}
	return zwischenstand // den wert von Zwischenstand zurück zum Absender geben.
}

func wuerfeln() int {

	zahl := rand.Intn(7)

	return zahl

}

func userinput() string {

	var name string

	fmt.Print("Wie sind Eure Namen?: ")
	fmt.Scanln(&name)

	return name

}

func enter(name string, bot string) int {

	awnser := 0
	botawnser := rand.Intn(3)
	if name == "Computer" {
		if bot == "Ja" {

			fmt.Printf("%s ,möchtest du weitermachen und deine Punkte Riskieren oder Bunkern? ( Weitermmachen 1 | Bunkern 2 ).", name)
			time.Sleep(1 * time.Second)
			if botawnser == 1 {
				time.Sleep(1 * time.Second)
				_ = 1
			} else {
				time.Sleep(1 * time.Second)
				_ = 2
			}

		}
	} else {
		fmt.Printf("%s ,möchtest du weitermachen und deine Punkte Riskieren oder Bunkern? ( Weitermmachen 1 | Bunkern 2 ).", name)
		fmt.Scanln(&awnser)
	}
	fmt.Println("\n-----------------")
	return awnser
}
