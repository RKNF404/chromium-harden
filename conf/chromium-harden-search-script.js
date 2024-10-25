function sanitize(string) { return string.replaceAll("'", '"').replaceAll('`', '"'); } // Function to replace dangerous characters
const query = sanitize(new URLSearchParams(document.location.search).get('q')); // gets the query input and sanitizes it
const sanitized = trustedTypes.createPolicy("query", { createHTML: (input) => `<input type=hidden name=q value='` + query + `'>`, }); // create trusted types policy to prevent additional injection
const instances = ['searx.ox2.fr', 'searxng.shreven.org', 'search.mdosch.de', 'searx.namejeff.xyz', 'gruble.de']; // a few instances that are reliable and I personally trust
const rand = Math.floor((instances.length)*self.crypto.getRandomValues(new Uint32Array(1))[0]/2**32|0); // cryptographically secure random number from 1 to the size of the list above
// the next lines display both the query submitted by the user and the instance it will be submitted with
document.getElementById('query').innerText='Searching for `' + query + '` using:';
document.getElementById('instance').innerText=instances[rand];
const doc = document.getElementById('SearchFrame').contentDocument; // locate the frame to open it
doc.open(); // open frame document for modification
const form = doc.createElement('form'); // create a form element in that frame
form.name = 'f'; // add name to form (to be able to submit it)
form.target = '_parent'; // tell form to redirect top-level document
form.action = 'https://' + instances[rand]; // set the url redirect to selected instance
form.method = 'POST'; // set the submit method
form.innerHTML = sanitized.createHTML(query); // add the input data (user's query, which should already be sanitized)
doc.appendChild(form); // add the form element to the frame
doc.f.submit(); // submit the created form (redirect to results page)
