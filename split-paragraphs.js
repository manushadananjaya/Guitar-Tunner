const fs = require('fs');
const glob = require('glob');

const files = glob.sync('app/articles/*/page.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // We want to find <p> tags with long unstructured text inside
  // A simple regex might be dangerous but let's carefully replace them.
  // Match <p>...</p> roughly.
  
  content = content.replace(/<p>\s*([\s\S]+?)\s*<\/p>/g, (match, innerText) => {
    // skip if there are inner block tags (just rough check)
    if (innerText.includes('<p>') || innerText.includes('<ul>')) return match;

    // strip newlines to text
    let plainText = innerText.replace(/\s+/g, ' ').trim();
    
    // if it's less than 350 chars, leave it alone
    if (plainText.length < 350) return match;

    // attempt to split roughly in half
    const half = Math.floor(plainText.length / 2);
    
    // find nearest '. ' to the half
    let splitIndex = plainText.indexOf('. ', half);
    let backwardSplitIndex = plainText.lastIndexOf('. ', half);
    
    if (splitIndex === -1 && backwardSplitIndex !== -1) splitIndex = backwardSplitIndex;
    if (splitIndex !== -1 && splitIndex < plainText.length - 20) { // don't split at the very end
       const part1 = plainText.substring(0, splitIndex + 1);
       const part2 = plainText.substring(splitIndex + 2);
       return `<p>\n        ${part1}\n      </p>\n      <p>\n        ${part2}\n      </p>`;
    }

    return match;
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Processed ${file}`);
});
