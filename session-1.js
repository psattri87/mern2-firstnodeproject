// const http = require("http");

// const server = http.createServer((req, res) => {
//     // console.log("req:", req);
//     console.log('hello from server');
//     const date = new Date().toLocaleDateString();
//     const time = new Date().toLocaleTimeString();
//     console.log(`Server Date-Time: ${date} ${time}`);
//     res.write("<h1>This is my first node app</h1>");
//     res.end();
// });

// server.listen(3000, () => {
//   console.log("Listening...");
// });

const http = require("http");
// const server = http.createServer((req, res) => {
//   const serverInfo = {
//     serverName: "server name",
//     version: "1.1.0.0",
//     currentDate: new Date().toLocaleDateString(),
//     currentTime: new Date().toLocaleTimeString(),
//   };
// //   res.write("<h1>This is my First Node App</h1>");
// if(req.url == "/status"){
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify(serverInfo));
//     res.end();

// }else{
//     res.write("Hello from server");
//     res.end();
// }
// });
const { data } = require("./db/currency.json");
const server = http.createServer((req, res) => {
  const splitUrl = req.url.split("/");
  const symbol = splitUrl[splitUrl.length - 1];
  console.log(symbol);
  switch (req.url) {
    case "/": {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write("<h1>Currency Database</h1>");
      res.end();
      break;
    }
    case "/currencies": {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data));
      res.end();
      break;
    }
    // case "/currencies/": {
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     res.write(JSON.stringify(data));
    //     res.end();
    //     break;
    //   }
    case `/currencies/${symbol}`: {
      const result = data.find(
        (ele) => ele.id.toLowerCase() === symbol.toLowerCase()
      );
      //   console.log(result);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result));
      res.end();
      break;
    }
    default: {
      res.writeHead(404);
      res.write("Route not found");
      res.end();
    }
  }
});

server.listen("3000", () => {
  console.log("Listening at port 3000");
});
