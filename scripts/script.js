var w3 = {};
w3.includeHTML = function(cb) {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          elmnt.removeAttribute("w3-include-html");
          w3.includeHTML(cb);
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
  if (cb) cb();
};

fetch("music.json")
.then(function(response){
   return response.json();
})
.then(function(music){
   let placeholder = document.querySelector("#data-output");
   let out = "";
   for(let music of music){
      out += `
         <tr>
            <td>${music.order}</td>
            <td>${music.trackName}</td>
            <td>${music.artistName}</td>
            <td>${music.albumName}</td>
         </tr>
      `;
   }
 
   placeholder.innerHTML = out;
});
