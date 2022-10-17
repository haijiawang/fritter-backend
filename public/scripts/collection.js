function createCollection(fields) {
    console.log('hi');
    fetch('/api/collections', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .then(showResponse);
}