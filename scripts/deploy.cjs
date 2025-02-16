const ghpages = require('gh-pages');
const path = require('path');
const fs = require('fs');

const distPath = path.join(__dirname, '../dist');

// Function to split files into smaller chunks
function splitFiles(files, chunkSize) {
  const chunks = [];
  for (let i = 0; i < files.length; i += chunkSize) {
    chunks.push(files.slice(i, i + chunkSize));
  }
  return chunks;
}

// Read all files in the dist directory
fs.readdir(distPath, (err, files) => {
  if (err) {
    console.error('Failed to read dist directory:', err);
    return;
  }

  // Split files into smaller chunks
  const fileChunks = splitFiles(files, 100); // Adjust chunk size as needed

  // Deploy each chunk sequentially
  (async function deployChunks() {
    for (const chunk of fileChunks) {
      const startTime = Date.now(); // Start time for the chunk
      await new Promise((resolve, reject) => {
        ghpages.publish(distPath, {
          dotfiles: true,
          maxBuffer: 1024 * 1024, // 1MB buffer size
          add: true, // Add files incrementally
          src: chunk.map(file => path.join('**', file))
        }, (err) => {
          if (err) {
            console.error('Deploy failed:', err);
            reject(err);
          } else {
            const endTime = Date.now(); // End time for the chunk
            console.log(`Deploy successful for chunk: ${chunk}`);
            console.log(`Time taken for chunk: ${(endTime - startTime) / 1000} seconds`);
            resolve();
          }
        });
      });
    }
  })().catch(err => {
    console.error('Deployment failed:', err);
  });
});
