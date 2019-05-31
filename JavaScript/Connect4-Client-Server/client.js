
const socket = io()			
const state = {}
gamestate =[]
turn =""
result =""
socket.on('Wait', data => {

	console.log("You are user 1 \nwaiting for user 2 to connect")
	result = data
	// render()
	// result = ''
})
socket.on('turn', data => {

	turn = data
	render()
	console.log(data)


})
socket.on('results', results =>{ 

	result = results
	console.log(results)
	// result = ""
})
socket.on('start', data =>
{
// Renders the start of game 
 gamestate = data	
 gamestart()
})
socket.on('gamestate',game =>
{
	 //Renders updated game state
	 gamestate = game 
	 render()
})


const gamestart = () =>
{
	render()

}


const Click = id=>
 {
	socket.emit("Click",id)
	render()


}


const render =() => 
{
	
	
	ReactDOM.render(

		React.createElement('div',{}, //Row 1
			React.createElement('div',{style: {display: "inline-block", width:"60px",height:"20px" , border:"solid"}, id :"00" , onClick: event => {Click("00")} },gamestate[0][0] ),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"01" , onClick: event => {Click("01")} },gamestate[0][1]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"02" , onClick: event => {Click("02")}},gamestate[0][2]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"03" , onClick: event => {Click("03")}},gamestate[0][3]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"04" , onClick: event => {Click("04")}},gamestate[0][4]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"05" , onClick: event => {Click("05")}}, gamestate[0][5] ),
			
			React.createElement('div',{}, //Row 2
			React.createElement('div',{style: {display: "inline-block", width:"60px",height:"20px" , border:"solid"}, id :"10" , onClick: event => {Click("10")} }, gamestate[1][0]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"11" , onClick: event => {Click("11")}}, gamestate[1][1]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"12" , onClick: event => {Click("12")} }, gamestate[1][2]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"13" , onClick: event => {Click("13")}  }, gamestate[1][3]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"14" , onClick: event => {Click("14")}  }, gamestate[1][4]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"15" , onClick: event => {Click("15")}}, gamestate[1][5]),
			
			React.createElement('div',{}, //Row 3
			React.createElement('div',{style: {display: "inline-block", width:"60px",height:"20px" , border:"solid"}, id :"20" , onClick: event => {Click("20")}  }, gamestate[2][0]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"21" , onClick: event => {Click("21")}}, gamestate[2][1]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"22" , onClick: event => {Click("22")} }, gamestate[2][2]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"23" , onClick: event => {Click("23")} }, gamestate[2][3]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"24" , onClick: event => {Click("24")}  }, gamestate[2][4]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"25" , onClick: event => {Click("25")}  }, gamestate[2][5]),
			
			React.createElement('div',{}, //Row 4 
			React.createElement('div',{style: {display: "inline-block", width:"60px",height:"20px" , border:"solid"}, id :"30" , onClick: event => {Click("30")}}, gamestate[3][0]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"31" , onClick: event => {Click("31")} }, gamestate[3][1]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"32" , onClick: event => {Click("32")} }, gamestate[3][2]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"33" , onClick: event => {Click("33")}}, gamestate[3][3]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"34" , onClick: event => {Click("34")}}, gamestate[3][4]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"35" , onClick: event => {Click("35")} }, gamestate[3][5]),
			
			React.createElement('div',{}, //Row 5
			React.createElement('div',{style: {display: "inline-block", width:"60px",height:"20px" , border:"solid"}, id :"40" , onClick: event => {Click("40")}  }, gamestate[4][0]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"41" , onClick: event => {Click("41")} }, gamestate[4][1]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"42" , onClick: event => {Click("42")}}, gamestate[4][2]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"43" , onClick: event => {Click("43")} }, gamestate[4][3]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"44" , onClick: event => {Click("44")} }, gamestate[4][4]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"45" , 
				onClick: event => {Click("45")}}, gamestate[4][5]),
			
			React.createElement('div',{}, //Row 6
			React.createElement('div',{style: {display: "inline-block", width:"60px",height:"20px" , border:"solid"}, id :"50", 
				onClick: event => {Click("50")}  }, gamestate[5][0]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"51", onClick: event => {Click("51")} }, gamestate[5][1]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"52", onClick: event => {Click("52")}}, gamestate[5][2]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"53", onClick: event => {Click("53")}}, gamestate[5][3]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"54", onClick: event => {Click("54")} }, gamestate[5][4]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"55", onClick: event => {Click("55")}}, gamestate[5][5]),
			
			React.createElement('div',{}, //Row 7
			React.createElement('div',{style: {display: "inline-block", width:"60px",height:"20px" , border:"solid"}, id :"60", onClick: event => {Click("60")} } , gamestate[6][0]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"61", onClick: event => {Click("61")} } , gamestate[6][1]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"62", onClick: event => {Click("62")}}, gamestate[6][2]), 
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"63", onClick: event => {Click("63")}} , gamestate[6][3]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"64", onClick: event => {Click("64")}} , gamestate[6][4]),
			React.createElement('div',{style: {display: "inline-block", width: "60px",height:"20px", border:"solid"}, id :"65", onClick: event => {Click("65")}} , gamestate[6][5]),
			React.createElement('div',{},turn),
			React.createElement('div',{},result),
				))))))),


		 document.getElementById('root')

		)
}

// render()
