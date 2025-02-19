package wuerfeln

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"math/rand"
	"net/http"
	"strconv"
)

var (
	usermap       = make(map[string]int)
	zwischenstand = make(map[string]int)
	usercount     = 0
)

func Initalhttp(router *gin.RouterGroup) {
	router.GET("/wuerfel/:name", handleRollDice)
	router.GET("/wuerfel/zwischenstand", handlegetzwischenstand)
	router.GET("/:usercount", handlesendusercount)
	router.GET("/bunker", handlegetbunker)
	router.GET("/start", handlegetstart)
}

func handlegetstart(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "*")
	usermap = make(map[string]int)
	zwischenstand = make(map[string]int)
	context.Status(http.StatusNoContent)
}

func handlegetzwischenstand(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "*")
	context.JSON(200, gin.H{"": fmt.Sprintf("%+v", zwischenstand)})
}

func handlesendusercount(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "*")
	temp := context.Param("usercount")
	usercount, _ = strconv.Atoi(temp)
	context.Status(http.StatusNoContent)
}

func handlegetbunker(context *gin.Context) {

	context.Header("Access-Control-Allow-Origin", "*")

	for name, value := range zwischenstand {

		usermap[name] += value
		zwischenstand[name] = 0

	}
	Punktestaende := []Punktestand{}
	for name, value := range usermap {

		Punktestaende = append(Punktestaende, Punktestand{
			Name:   name,
			Punkte: value,
		})

	}
	//result, _ := json.Marshal(Punktestaende)
	context.JSON(200, Punktestaende)

}

type Punktestand struct {
	Name   string
	Punkte int
}

func handleRollDice(context *gin.Context) {
	zahl := rand.Intn(6) + 1
	context.Header("Access-Control-Allow-Origin", "*")
	name := context.Param("name")
	zwischenstand[name] += zahl
	if zahl == 6 {
		zwischenstand[name] = 0

	}
	context.JSON(200, gin.H{
		"zahl": zahl,
		"name": name,
	})
}
