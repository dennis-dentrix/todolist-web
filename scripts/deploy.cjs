const ghpages = require('gh-pages');

ghpages.publish('dist', {
  dotfiles: true,
  maxBuffer: 1024 * 1024 // 1MB buffer size
}, (err) => {
  if (err) {
    console.error('Deploy failed:', err);
  } else {
    console.log('Deploy successful!');
  }
});
