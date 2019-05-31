package main

import (
    "fmt"
    "os"
    "strconv"
    "math"
	"encoding/csv"
)

type CensusGroup struct {
	population int
	latitude, longitude float64
}

func ParseCensusData(fname string) ([]CensusGroup, error) {
	file, err := os.Open(fname)
    if err != nil {
		return nil, err
    }
    defer file.Close()

	records, err := csv.NewReader(file).ReadAll()
	if err != nil {
		return nil, err
	}
	censusData := make([]CensusGroup, 0, len(records))

    for _, rec := range records {
        if len(rec) == 7 {
            population, err1 := strconv.Atoi(rec[4])
            latitude, err2 := strconv.ParseFloat(rec[5], 64)
            longitude, err3 := strconv.ParseFloat(rec[6], 64)
            if err1 == nil && err2 == nil && err3 == nil {
                latpi := latitude * math.Pi / 180
                latitude = math.Log(math.Tan(latpi) + 1 / math.Cos(latpi))
                censusData = append(censusData, CensusGroup{population, latitude, longitude})
            }
        }
    }

	return censusData, nil
}

func main () {
	// fmt.Printf("LOOOOOOOL\n")
    if len(os.Args) < 4 {
		fmt.Printf("Usage:\nArg 1: file name for input data\nArg 2: number of x-dim buckets\nArg 3: number of y-dim buckets\nArg 4: -v1, -v2, -v3, -v4, -v5, or -v6\n")
		return
	}
	fname, ver := os.Args[1], os.Args[4]
    xdim, err := strconv.Atoi(os.Args[2])
	if err != nil {
		fmt.Println(err)
		return
	}
    ydim, err := strconv.Atoi(os.Args[3])
	if err != nil {
		fmt.Println(err)
		return
	}
	censusData, err := ParseCensusData(fname)
	if err != nil {
		fmt.Println(err)
		return
	}
    var minLong float64

    var maxLong float64

    var minLat float64

    var maxLat float64
    var t_population int

    Array := make([][]int, ydim)
    
    for i := 0; i < ydim; i++ {
        Array[i] = make([]int, xdim)
    }
    
    // Some parts may need no setup code
    switch ver {
    case "-v1":
        // YOUR SETUP CODE FOR PART 1
        minLong = censusData[0].longitude
        maxLong = censusData[0].longitude

        minLat = censusData[0].latitude
        maxLat = censusData[0].latitude
        t_population = 0 

        for i := range censusData {
            if censusData[i].longitude< minLong {
                minLong = censusData[i].longitude
                
            }

            if censusData[i].longitude> maxLong {
                maxLong = censusData[i].longitude
                
            }

            if censusData[i].latitude< minLat {
                minLat = censusData[i].latitude
                
            }

            if censusData[i].latitude> maxLat {
                maxLat = censusData[i].latitude
                
            }
            t_population =  t_population + censusData[i].population

            
        }

        // fmt.Println(minLong)
        // fmt.Println(maxLong)
        // fmt.Println(minLat)
        // fmt.Println(maxLat)
        
       
    case "-v2":
        // YOUR SETUP CODE FOR PART 2
        minLong, maxLong, minLat, maxLat, t_population = min_max(censusData)
        
        
    case "-v3":
        // YOUR SETUP CODE FOR PART 3
        minLong = censusData[0].longitude
        maxLong = censusData[0].longitude

        minLat = censusData[0].latitude
        maxLat = censusData[0].latitude
        t_population = 0 

        for i := range censusData {
            if censusData[i].longitude< minLong {
                minLong = censusData[i].longitude
                
            }

            if censusData[i].longitude> maxLong {
                maxLong = censusData[i].longitude
                
            }

            if censusData[i].latitude< minLat {
                minLat = censusData[i].latitude
                
            }

            if censusData[i].latitude> maxLat {
                maxLat = censusData[i].latitude
                
            }
            t_population =  t_population + censusData[i].population

            
        }

            var grid_x float64
            var grid_y float64
            var range_x int
            var range_y int
           
            grid_x = (maxLong - minLong)/float64(xdim)
            grid_y = (maxLat - minLat)/float64(ydim)

        for i := range censusData {


                range_x = int((censusData[i].longitude - minLong)/grid_x) //coordinates in x
                range_y = int((censusData[i].latitude - minLat)/grid_y)  // coordinates in y
                
                if range_y==12 {
                    range_y--
                }
                Array[range_y][range_x] = Array[range_y][range_x] + censusData[i].population
        }
        
        fmt.Println(Array)


    case "-v4":
        // YOUR SETUP CODE FOR PART 4
    case "-v5":
        // YOUR SETUP CODE FOR PART 5
    case "-v6":
        // YOUR SETUP CODE FOR PART 6
    default:
        fmt.Println("Invalid version argument")
        return
    }

    for {
        var west, south, east, north int
        fmt.Println("Input")
        n, err := fmt.Scanln(&west, &south, &east, &north)
        // fmt.Println("X")
        if n != 4 || err != nil || west<1 || west>xdim || south<1 || south>ydim || east<west || east>xdim || north<south || north>ydim {
            break
        }


        var population int
        var percentage float64
        


        switch ver {
        case "-v1":
            // YOUR QUERY CODE FOR PART 1
            var grid_x float64
            var grid_y float64

           
            grid_x = (maxLong - minLong)/float64(xdim)
            grid_y = (maxLat - minLat)/float64(ydim)
            
            // fmt.Println(grid_x)
            // fmt.Println(grid_y)
            west--
            east--
            north--
            south--
            population,percentage = Query_handlerv1(east,west,north,south,censusData,grid_x, grid_y, minLat ,minLong ,t_population )
             // west_float := float64(west)
             // fmt.Println(west)
             // fmt.Println(west_float)
             // if  {
                 
             // }
            // east_float := float64(east)
            // north_float := float64(north)
            // south_float := float64(south)

            
        case "-v2": 
            // YOUR QUERY CODE FOR PART 2
            var grid_x float64
            var grid_y float64

           
            grid_x = (maxLong - minLong)/float64(xdim)
            grid_y = (maxLat - minLat)/float64(ydim)

        population = Query_handler(east,west,north,south,censusData,grid_x, grid_y, minLat ,minLong )
        percentage = float64(100*population)/float64(t_population )

        case "-v3":
            // YOUR QUERY CODE FOR PART 3
        case "-v4":
            // YOUR QUERY CODE FOR PART 4
        case "-v5":
            // YOUR QUERY CODE FOR PART 5
        case "-v6":
            // YOUR QUERY CODE FOR PART 6
        }

        fmt.Printf("%v %.2f%%\n", population, percentage)
    }
}


func min_max(censusData [] CensusGroup)(float64,float64,float64,float64,int) {
    
    channel := make(chan bool)



        if len(censusData)<10000 {

        var minLong float64

        var maxLong float64

        var minLat float64

        var maxLat float64
        var t_population int
     
        minLong = censusData[0].longitude
        maxLong = censusData[0].longitude

        minLat = censusData[0].latitude
        maxLat = censusData[0].latitude
        t_population = 0 

        for i := range censusData {
            if censusData[i].longitude< minLong {
                minLong = censusData[i].longitude
                
            }

            if censusData[i].longitude> maxLong {
                maxLong = censusData[i].longitude
                
            }

            if censusData[i].latitude< minLat {
                minLat = censusData[i].latitude
                
            }

            if censusData[i].latitude> maxLat {
                maxLat = censusData[i].latitude
                
            }
            t_population =  t_population + censusData[i].population
            
            
           
        }
          
            return minLong, maxLong, minLat, maxLat, t_population
        }


        var size = len(censusData)/2 
       
        var rminLong,rmaxLong, rminLat, rmaxLat float64
        var rminLong2,rmaxLong2, rminLat2, rmaxLat2 float64
        var tpop, tpop2 int
        var pop int
        go func(){

         rminLong,rmaxLong, rminLat, rmaxLat, tpop  =   min_max(censusData[:size])
         channel<-true 
        }()
        go func(){
           rminLong2,rmaxLong2, rminLat2, rmaxLat2, tpop2 =  min_max(censusData[size:])
           channel<-true
        }()


        
        <-channel
        <-channel

        pop = tpop2+tpop

        return math.Min(rminLong,rminLong2),math.Max(rmaxLong,rmaxLong2),math.Min(rminLat,rminLat2),math.Max(rmaxLat,rmaxLat2), pop 
        
        
}

func Query_handlerv1(east int ,west int ,north int ,south int,censusData [] CensusGroup, grid_x float64, grid_y float64, minLat float64, minLong float64, t_population int) (int ,float64) {

            var range_x int
            var range_y int
            var percentage float64
            population := 0

            for i:= range censusData{

                range_x = int((censusData[i].longitude - minLong)/grid_x) //coordinates in x
                range_y = int((censusData[i].latitude - minLat)/grid_y)  // coordinates in y

                
                if range_x<=east&& range_x>=west && range_y<=north && range_y>=south{
                   
                    population = population +  censusData[i].population
                    

                }
                

            }
            percentage = float64(100*population)/float64(t_population )



            return population, percentage
}


func Query_handler(east int ,west int ,north int ,south int,censusData [] CensusGroup, grid_x float64, grid_y float64, minLat float64, minLong float64) (int) {

        channel := make(chan bool)
        if len(censusData) <100 {

            west--
            east--
            north--
            south--
             

            var range_x int
            var range_y int
            population := 0
            for i:= range censusData{

                range_x = int((censusData[i].longitude - minLong)/grid_x)
                range_y = int((censusData[i].latitude - minLat)/grid_y)

               

                if range_x<=east&& range_x>=west && range_y<=north && range_y>=south{
                   
                    population = population +  censusData[i].population
                    

                }
                

            }
            return population

            
        }
        var pop1,pop2 ,pop int
        size := len(censusData)/2
        go func(){

         pop1   =    Query_handler(east,west,north,south,censusData[size:],grid_x, grid_y, minLat ,minLong )
         channel<-true 
        }()
        go func(){
          
           pop2   =    Query_handler(east,west,north,south,censusData[:size],grid_x, grid_y, minLat ,minLong )  
           channel<-true
        }()

        <-channel
        <-channel

        pop = pop1 + pop2
    
        return pop
        // population, percentage = Query_handler(xdim,ydim,east,west,north,south,censusData,grid_x, grid_y, minLat ,minLong )
}