function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

function fetchData() {
  var url = document.querySelector(".urlBar").value; // Get the value from the URL input field
  var queryParams = document.querySelectorAll(".queryParamKey"); // Get all query parameter keys
  var queryParamValues = document.querySelectorAll(".queryParamValue"); // Get all query parameter values
  
  var headers = new Headers();
  headers.append("Content-Type", "application/json"); // Set Content-Type header to application/json
  
  var requestOptions = {
      method: 'GET', // Change the method to GET
      headers: headers,
      redirect: 'follow'
  };
  
  // Construct the query string from the provided query parameters
  var queryString = "";
  queryParams.forEach((param, index) => {
      if (param.value !== "" && queryParamValues[index].value !== "") {
          queryString += (queryString === "" ? "?" : "&") + encodeURIComponent(param.value) + "=" + encodeURIComponent(queryParamValues[index].value);
      }
  });
  
  // Append the constructed query string to the URL
  url += queryString;
  console.log(url)
  fetch(url, requestOptions)
      .then(response => response.text()) // Parse response as text
      .then(data => {
          // Display response data in the response text area
          var responseTextArea = document.querySelector(".response textarea");
          responseTextArea.textContent = data;
      })
      .catch(error => console.error('Error fetching data:', error));
}

// Event listener for the Send button click event
document.querySelector(".sendButton").addEventListener("click", function() {
  fetchData(); // Call fetchData function when Send button is clicked
});
