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
	router.GET("/wuerfel/usermap", handleGetUserMap)
	router.GET("/:usercount", handlesendusercount)
	router.GET("/bunker", handlegetzwischenstand)
}

func handlegetzwischenstand(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "*")
	context.JSON(200, gin.H{"Test": fmt.Sprintf("%+v", zwischenstand)})
}

func handlesendusercount(context *gin.Context) {
	temp := context.Param("usercount")
	usercount, _ = strconv.Atoi(temp)
	context.Status(http.StatusNoContent)
}

func handleGetUserMap(context *gin.Context) {

	context.Header("Access-Control-Allow-Origin", "*")
	context.JSON(200, gin.H{"map": fmt.Sprintf("%+v", usermap)})
}

type response struct {
	zahl int
	name string
}

func handleRollDice(context *gin.Context) {
	zahl := rand.Intn(7)
	name := context.Param("name")
	zwischenstand[name] += zahl
	context.Header("Access-Control-Allow-Origin", "*")
	context.JSON(200, gin.H{
		"zahl": zahl,
		"name": name,
	})
}
