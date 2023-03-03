(async () => {


  // Let's create the cert:
  // https://httptoolkit.com/blog/javascript-mitm-proxy-mockttp/

  // This is the step that ensures the client trusts your proxy to rewrite HTTPS.
  // It's normally easiest to create CA certificate files on disk, and then import them, so you can easily load them directly into other software.
  // You can do that in JS by saving the key and cert properties of the CA certificate to a file.

  const mockttp = require('mockttp');
  const fs = require('fs');

  const { key, cert } = await mockttp.generateCACertificate();
  
  fs.writeFileSync("./cert/key.pem", key);
  fs.writeFileSync("./cert/cert.pem", cert);

  // This creates key.pem (your certificate private key) and cert.pem (your 
  // public CA certificate) files on disk, so you can use the same key & 
  // certificate every time, and so you can import the CA certificate into your 
  // HTTPS clients.

  // SSL_CERT_FILE=/path/to/cert.pem

})();