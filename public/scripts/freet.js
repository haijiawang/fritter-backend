/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewAllFreets(fields) {
  fetch('/api/freets')
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
  fetch(`/api/freets?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function createFreet(fields) {
  fetch('/api/freets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function editFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFreet(fields) {
  fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function createCollection(fields) {
  fetch('/api/collections', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
  .then(showResponse)
  .then(showResponse);
}

function deleteCollection(fields) {
  fetch(`/api/collections/${fields.id}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
  .then(showResponse)
  .then(showResponse);
}

function updateCollection(fields) {
  fetch(`/api/collections/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function findCollections(fields){
  fetch('/api/collections/all')
  .then(showResponse)
  .then(showResponse);
}

function findByName(fields){ 
  fetch(`/api/collections?collectionId=${fields.id}`,)
  .then(showResponse)
  .then(showResponse);
}

function saveFreet(fields){
  fetch(`/api/freets/save/${fields.freetId}/${fields.collectionId}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFromCollection(fields){
  fetch(`/api/freets/remove/${fields.freetId}/${fields.collectionId}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function createCommunity(fields){
  fetch('/api/communities', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
  .then(showResponse)
  .catch(showResponse);
}

function deleteCommunity(fields){ 
  fetch(`/api/communities/${fields.id}`, {method: 'DELETE', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
  .then(showResponse)
  .catch(showResponse);
}

function updateCommunity(fields){
  fetch(`/api/communities/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}