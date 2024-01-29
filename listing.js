const { readFileSync } = require('fs');
const { writeFile } = require('fs/promises');
const path = require('path');

const rl = require('readline').createInterface(process.stdin);
const size = 5;
let curr = {
  page: 1,
  next: null,
  prev: null,
  list: [],
};
rl.on('line', (line) => {
  let json = JSON.parse(readFileSync(line, { encoding: 'utf-8' }));
  if (curr.list.length === size) {
    flush(curr.page + 1);
  }
  accumulate(json, line);
});

process.stdin.on('close', () => {
  flush(null);
});
function accumulate(json, line) {
  curr.list.push({
    name: json.title,
    description: json.title,
    slug: path.basename(line, '.json'),
  });
}

function flush(next) {
  curr.next = next;
  writeFile(`data/projects/listing/${curr.page}.json`, JSON.stringify(curr));
  curr.prev = curr.page;
  curr.page = next;
  curr.next = null;
  curr.list.length = 0;
}
