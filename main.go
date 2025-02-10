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

	for name, _ := range usermap {
		userwuerfel(name)
		wuerfeln()

	}

}
func wuerfeln() int {

	zahl := rand.Intn(6)

	return zahl

}

func wuerfelausgabe(zahl int) {

	fmt.Printf("Hey Deine Zahl war %v\n", zahl)

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

	fmt.Printf("%s du bist nun dran. Drücke die Enter Taste um zu Würfeln", name)
	bufio.NewReader(os.Stdin).ReadBytes('\n')
}
