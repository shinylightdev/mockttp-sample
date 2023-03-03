(async () => {
  const mockttp = require('mockttp');

  // Create a proxy server with a self-signed HTTPS CA certificate:  
  const server = mockttp.getLocal({    
    https: {
      keyPath:  './cert/key.pem',
      certPath: './cert/cert.pem' // <-- this is the one you import in Google
    }
  });  

  await server.forAnyRequest().thenPassThrough({
    
    beforeResponse: async (response) => {
        //console.log("hi");
    },


    // allow
    //  https://developer.oracle.com/search-results.html?q=test
    // block
    //
    beforeRequest: async (r) => {      
      let request = {
        host: r.headers.host,
        userAgent: r.headers['user-agent'],
        referer: r.headers['referer'],      
        url: r.url,
        path: r.path,
        method: r.method        
      };

      // https://www.google.com/search?q=cars

      let endWith = "search?q=cars";
      let doesItEndWith = request.url.endsWith(endWith);
      let doesRefererExist = (request.referer || "").endsWith(endWith);
      
      // allow to pass through
      if(doesItEndWith || doesRefererExist)      
      {
        console.log(request);
      }
      else 
      {
        throw new Error('Access Denied or something went wrong.');
      }
    }
  });  

  await server.start();  
  
})(); // (Run in an async wrapper so we can use top-level await everywhere)