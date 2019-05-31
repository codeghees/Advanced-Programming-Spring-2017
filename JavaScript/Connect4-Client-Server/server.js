const fs = require('fs')
const http = require('http')
const socketio = require('socket.io')
socketlist = []
socketids = []
noofgames = 0 
m_gs = []
noofplayers= 0
// console.log(gamestate)

const readFile = f => new Promise((resolve,reject)=>
	fs.readFile(f,(e,d) =>e?reject(e):resolve(d)))

const server = http.createServer(async (req,resp) =>
 
  resp.end(await readFile(req.url.substr(1))))

const io = socketio(server)
io.sockets.on('connection',socket => 
{
		
		console.log('User connected with socket id =' + socket.id)
		socketlist.push(socket)
		socketids.push(socket.id)
		
		if (socketlist.length%2==1) 
		{
			// gamestate = generateGame()
			noofplayers++
			socketlist[noofplayers-1].emit("Wait","You are user 1")
			console.log("Waiting for User 2")

		}
		if(socketlist.length%2==0 )
		{
			gamestate = generateGame()
			noofplayers++
			console.log("Play the game")
			// io.sockets.emit('start',gamestate)
			socketlist[noofplayers-2].emit('gamestate',gamestate)
			socketlist[noofplayers-1].emit('gamestate',gamestate)
			m_gs.push(gamestate)
			// noofplayers = noofplayers + 1
			playgame(socketlist,m_gs[noofgames],noofplayers-2,noofplayers-1)
			noofgames++
			console.log("Number of games being rendered = " + noofgames)
			// console.log(socketlist.length)
			// while(true)
			// {
			// 	if(playgame(socketlist,m_gs[noofgames],noofplayers-2,noofplayers-1)==true)
			// 	{
			// 		noofgames++
			// 		console.log("GAME OVER")
			// 		console.log("Restart")
			// 		gamestate = generateGame()
			// 		playgame(socketlist,gamestate,noofplayers-2,noofplayers-1)
			// 		console.log(socketlist.length)
			// 	}
				
			// }

			
			
			
			}


		})

server.listen(8080, ()=> console.log("Start"))



function generateGame()
{
// Game state
gamestate =[]
temp = []
for (var i = 0; i <7; i++) 
{
	for (var j = 0; j< 6; j++)
	{
		temp.push("E")
	}
	gamestate.push(temp)
	temp = []
		
}
return gamestate
}

function updateGameState(gamestate,row,col,char)
{

	for (var i = 6; i > -1 ; i--)
	{
		if (gamestate[i][col]=='E')
		 {	
		 	gamestate[i][col] = char
		 	break

		 }
	}
	return gamestate
}

function playgame(socketlist,gamestate,Player1,Player2)
{	
	turns = 0
	socketlist[Player1].on('disconnect',()=>
	{
		console.log("User Disconnect")

	})

	socketlist[Player2].on('disconnect',()=>
	{
		console.log("User Disconnect")
		return

	})
	socketlist[Player1].on("Click", id => {  

			 			row = parseInt(id[0]) // parsing row
						col = parseInt(id[1]) // parsing col
						if(turns % 2 ==0)
						{ 
							if (turns == 42)
							{
								console.log('Game tied')
								

								// io.sockets.emit('results','Game tied')
								socketlist[Player1].emit('results','Game tied')
								socketlist[Player2].emit('results','Game tied')
								console.log("GAME OVER")
								console.log("Restart")

								// io.sockets.emit('results', "Game tied\nClick to Restart")
								socketlist[Player1].emit('results',"Game tied\nClick to Restart")
								socketlist[Player2].emit('results',"Game tied\nClick to Restart")
								turns = 0
								socketlist[Player1].emit("Wait","You are user 1")
								gamestate = generateGame() //Restart
								return true
							}
							gamestate = updateGameState(gamestate,row,col,"X")
							check = Results(gamestate,row,col,"X")
							if (check==true) 
							{
								console.log('Player 1 wins')
								// io.sockets.emit('results','Player 1 wins')
								
								socketlist[Player1].emit('results','Player 1 wins')
								socketlist[Player2].emit('results','Player 1 wins')

								console.log("GAME OVER")
								console.log("Restart")
								// io.sockets.emit('results', "Player 1 wins\nClick to Restart")

								socketlist[Player1].emit('results','Player 1 wins\nClick to Restart')
								socketlist[Player2].emit('results','Player 1 wins\nClick to Restart')

								turns = 0
								socketlist[Player1].emit("Wait","You are user 1")
								gamestate = generateGame() //Restart
								return true
							}
							// io.sockets.emit('turn', "Turn for User 2")

								socketlist[Player1].emit('turn',"Turn for User 2")
								socketlist[Player2].emit('turn',"Turn for User 2")

							turns++


						}
						
						//gamestate[row][col] = "X"
						// io.sockets.emit('gamestate',gamestate) //Returning Game state after Click

								socketlist[Player1].emit('gamestate',gamestate)
								socketlist[Player2].emit('gamestate',gamestate)

					})
			socketlist[Player2].on("Click", id => {  
			 			row = parseInt(id[0]) // parsing row
						col = parseInt(id[1]) // parsing col

						if(turns % 2 ==1)
						{
							
							if (turns == 42)
							{
								console.log('Game tied')
								

								// io.sockets.emit('results','Game tied')

								socketlist[Player1].emit('results','Game tied')
								socketlist[Player2].emit('results','Game tied')

								console.log("GAME OVER")
								console.log("Restart")
								// io.sockets.emit('results', "Game tied\nClick to Restart")

								socketlist[Player1].emit('results',"Game tied\nClick to Restart")
								socketlist[Player2].emit('results',"Game tied\nClick to Restart")
								socketlist[Player1].emit("Wait","You are user 1")
								turns = 0
								gamestate = generateGame() //Restart
								return true
							}
							
							// io.sockets.emit('turn', "Turn for User 1")

								socketlist[Player1].emit('turn',"Turn for User 1")
								socketlist[Player2].emit('turn',"Turn for User 1")

							gamestate = updateGameState(gamestate,row,col,"O")
							check = Results(gamestate,row,col,"O")
							if (check==true) 
							{
								console.log('Player 2 wins')
								

								// io.sockets.emit('results','Player 2 wins')

								socketlist[Player1].emit('results','Player 2 wins')
								socketlist[Player2].emit('results','Player 2 wins')


								console.log("GAME OVER")
								console.log("Restart")
								// io.sockets.emit('results', "Player 2 wins\nClick to Restart")

								socketlist[Player1].emit('results', "Player 2 wins\nClick to Restart")
								socketlist[Player2].emit('results', "Player 2 wins\nClick to Restart")

								turns = 0
								socketlist[Player1].emit("Wait","You are user 1")
								gamestate = generateGame() //Restart
								return true
							}
							turns++
							// bool = checkwinnner(gamestate,row,col,"")

						}
						// gamestate[row][col] = "O" // For user 2 
						// io.sockets.emit('gamestate',gamestate) //Returning Game state after Click
								socketlist[Player1].emit('gamestate',gamestate)
								socketlist[Player2].emit('gamestate',gamestate)
					})
			
}
function prevInsertCoordinates(gamestate,row,col,char)
{
	list_c = []
	for (var i = 0; i < 7 ; i++)
	{
		if (gamestate[i][col]==char)
		 {	
		 	list_c.push(i) //row
		 	list_c.push(col) //col
		 	return list_c
		 	break

		 }
	}
	

}


function Results(gamestate,row,col, char)
{
	last =  prevInsertCoordinates(gamestate,row,col,char)
	row = last[0]
	col = last[1] // Coordinates for the last entered element
	
	// horizontal check
		// forward
			if (col<3)
			{
				count = 0
				for (var i = 0; i < 7; i++)
				{
					if (gamestate[row][i]==char)
					{
						count++
						if (count>=4)
						{
							return true
						}
					}
					else
					{
						count=0
					}
					
				}
			}
			//backward
			if (col>2)
			{
				count = 0
				for (var i = 6; i > -1; i--)
				{
					if (gamestate[row][i]==char)
					{
						count++
						if (count>=4)
						{
							return true
						}
					}
					else
					{
						count = 0
					}
					
				}
			}

	// vertical check
		// downward
			
			if(row<4)
			{	count = 0
				for (var i = 0; i < 7; i++) 
				{
					if (gamestate[i][col]==char)
					{
						count++
						if (count>=4)
						{
							return true
						}


					}
					else
					{
						count = 0
					}
					
				}

			}
		// upwards
			if (row>2)
			{
				count = 0
				for (var i = 6; i> -1; i--)
				{
					if (gamestate[i][col]==char)
					{
						count++
						if (count>=4)
						{
							return true
						}
					}
					else
					{
						count = 0
					}
				}

			}		
		// diagonal 1 down-right
			if ((row<=4)&&(col<=3))
			{
				ir =  row
				ic = col
				count = 0
				while((ic<6)&&(ir<7))
				{
					if (gamestate[ir][ic]==char)
					{
						count++
						if (count>=4)
						{
							return true
						}


					}
					else
					{
						count = 0
					}
					ir++
					ic++

				}
			}	
		// diagonal 2 up-left	
			if ((row>=2)&&(col<=3))
			{
				
				// ir =  6
				// ic = 0
				ir =  row
				ic = col

				count = 0
				while(ic<7&&ir>-1)
				{
					if (gamestate[ir][ic]==char)
					{
						count++
						if (count>=4)
						{
							return true
						}


					}
					else
					{
						count = 0
					}
					ir--
					ic++

				}
			}

		// diagonal 3 up right
			if ((row>=2)&&(col>=2))
			{
				
				ir =  row
				ic = col
				count = 0
				while(ic>-1&&ir>-1)
				{
					if (gamestate[ir][ic]==char)
					{
						count++
						if (count>=4)
						{
							return true
						}


					}
					else
					{
						count = 0
					}
					ir--
					ic--

				}
			}
		// diagoanl down left	
			if ((row>=2)&&(col>=2))
			{
				
				ir =  row
				ic = col
				count = 0
				while(ic>-1&&ir<7)
				{
					if (gamestate[ir][ic]==char)
					{
						count++
						if (count>=4)
						{
							return true
						}


					}
					else
					{
						count = 0
					}
					ir++
					ic--

				}
			}		
		


	return  false
}