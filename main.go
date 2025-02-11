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

	count := usercount()

	usermap := make(map[string]int)

	for i := 0; i < count; i++ {

		name := userinput()
		usermap[name] = 0

	}
	results := make(map[string]int)
	for name, _ := range usermap {
		zahl := wuerfeln()
		userwuerfel(name)
		wuerfeln()
		results[name] = zahl
		if zahl == 6 {
			fmt.Printf("Hey, %s Deine Zahl war %v\n", name, zahl)
			fmt.Println("All deine Punkte wurden auf 0 gesetzt, da du di Zahl 6 gewürfelt hast.")
			results[name] = 0
		} else {
			fmt.Printf("Hey %s Deine Zahl war %v\n", name, zahl)

		}

	}
	maxvalue := 0
	winname := ""
	for name, value := range results {
		if value > maxvalue {
			winname = name
			maxvalue = value

		}
	}
	fmt.Println("Die Höchste Zahl war die", maxvalue, "von", winname)
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

func usercount() int {

	var count int

	fmt.Print("Wieviele Spieler nehmen an dem Spiel teil?")
	fmt.Scanln(&count)
	fmt.Print("Es spielen ", count, " Spieler mit,")

	return count

}

func userwuerfel(name string) {

	fmt.Printf("%s bitte drücke die Enter-Taste um zu Würfeln.", name)
	bufio.NewReader(os.Stdin).ReadBytes('\n')
}
