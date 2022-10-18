function createCollection(fields) {
    fetch('/api/collections', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .then(showResponse);
}