// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => {
    preParent.classList.remove('flashing');
  }, 300);
}

function showResponse(response) {
  response.json().then(data => {
    showObject({
      data,
      status: response.status,
      statusText: response.statusText
    });
  });
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 *
 * Native browser Fetch API documentation to fetch resources: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'create-forum': createForum,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
  'create-collection': createCollection,
  'delete-collection': deleteCollection,
  'update-collection': updateCollection, 
  'find-collections': findCollections, 
  'find-by-name': findByName,
  'save-freet': saveFreet,
  'remove-freet': deleteFromCollection.apply,
  'create-community': createCommunity, 
  'delete-community': deleteCommunity, 
  'update-community': updateCommunity, 
  'join-community': joinCommunity, 
  'leave-community': leaveCommunity,
  'make-public': makePublic,
  'make-private': makePrivate,
  'add-owner': addOwner, 
  'delete-owner': deleteOwner, 
  'get-communities': getCommunities, 
  'get-following-feed': getFollowingFeed, 
  'follow-user': followUser, 
  'unfollow-user': unfollowUser,
  'get-following': getFollowing, 
  'get-recommended-feed': getRecommendedFeed, 
  'get-community-feed': getCommunityFeed, 
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(form);
      handler(Object.fromEntries(formData.entries()));
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init;
