const net = require("net")
const {time_format} = require("./util")
const {PORT, COMMAND, GET, UTC, TIMEZONE}  = require("./constants")



const server = new net.Server();

server.listen(PORT, () => {
    console.log("server listening")
})


server.on("connection", socket => {
    console.log("new connection")

    socket.on("data", (data) => {
     
        if(data == null) return

        const dataArgs = data.toString().split(" ")
        if(!dataArgs.length){
            socket.write("ERROR no data")
            return
        }
        const command = dataArgs[0]

        if(!COMMAND.has(command)){
            socket.write("unrecognized command")
            return 
        }
        if(command === GET){
            const timezone = (dataArgs[1] || "/?timezone=UTC").split("=")[1]
            
            const date = new Date();
            const time = time_format(date, timezone)
            socket.write(time)
            socket.end()
            return;
        }
    })

    socket.on("end", () => {
        console.log("closing connection")
        socket.destroy()
    })

    socket.on("error", err => console.log("err " + err))
})
