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
	for name, _ := range zwischenstand {
		usermap[name] = 0 // Werte von einer Runde in die Gesammt Wertung einsetzen.
		zwischenstand[name] = 0

		context.JSON(200, gin.H{"Reset": fmt.Sprintf("%+v", usermap, zwischenstand)})

	}
}

func handlegetzwischenstand(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "*")
	context.JSON(200, gin.H{"": fmt.Sprintf("%+v", zwischenstand)})
}

func handlesendusercount(context *gin.Context) {
	temp := context.Param("usercount")
	usercount, _ = strconv.Atoi(temp)
	context.Status(http.StatusNoContent)
}

func handlegetbunker(context *gin.Context) {

	context.Header("Access-Control-Allow-Origin", "*")

	for name, value := range zwischenstand {

		usermap[name] += value // Werte von einer Runde in die Gesammt Wertung einsetzen.
		zwischenstand[name] = 0
		context.JSON(200, gin.H{"Bunker-Ready": fmt.Sprintf("%+v", "%+v", usermap, zwischenstand)})

	}
	for name, _ := range zwischenstand {
		zwischenstand[name] = 0
		context.JSON(200, gin.H{"Zwischenstand": fmt.Sprintf("%+v", zwischenstand)})

	}
}

type response struct {
	zahl int
	name string
}

func handleRollDice(context *gin.Context) {
	zahl := rand.Intn(7)

	name := context.Param("name")
	zwischenstand[name] += zahl
	if zahl == 6 {
		zwischenstand[name] = 0
		context.Header("Access-Control-Allow-Origin", "*")
		context.JSON(200, gin.H{
			"zahl": zahl,
			"name": name,
		})
	}
}
