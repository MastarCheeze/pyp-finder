const $ = document.querySelector.bind(document);

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const api = "https://pyp-finder-server-417289630154.asia-east1.run.app";
const validRegex = /^\d{4}\/\d{2}\/(?:(INSERT|PRE)\/)?(?:F\/M|M\/J|O\/N)\/\d{2}$/; // regex to check if code is valid
const typeRegex = /^\d{4}\/\d{2}\/(INSERT|PRE)/; // regex to capture PRE and INSERT codes

const submit = async function (ev) {
  const code = $("#search-bar-input").value.toUpperCase();
  if (code.match(validRegex)) {
    const type = $(".options #qp").checked ? "qp" : "ms";

    const query = new URLSearchParams();
    query.set("code", code);
    query.set("type", type);
    const queryUrl = api + "?" + query.toString();

    const res = await fetch(queryUrl);
    const json = await res.json();

    if (json.success === 1) {
      window.open(json.url);
    } else {
      $("#status-text").innerText = "Invalid code";
      $("#status-text").classList.add("status-error");
      $("#status-text").style.visibility = "visible";
    }
  } else {
    $("#status-text").innerText = "Invalid code";
    $("#status-text").classList.add("status-error");
    $("#status-text").style.visibility = "visible";
  }
};
$("#submit").addEventListener("click", submit);

let prevType = null;
const checkType = function (ev) {
  if ($("#search-bar-input").value.toUpperCase().match(typeRegex)) {
    if ($(".options #qp").checked) prevType = "qp";
    else prevType = "ms";

    $(".options #other").checked = true;
    $(".options #other").disabled = false;
    $(".options #qp").disabled = true;
    $(".options #ms").disabled = true;
  } else if (prevType) {
    $(`.options #${prevType}`).checked = true;
    $(".options #other").disabled = true;
    $(".options #qp").disabled = false;
    $(".options #ms").disabled = false;

    prevType = null;
  }
  $("#status-text").style.visibility = "hidden";
  $("#status-text").className = "";
};
$("#search-bar-input").addEventListener("input", checkType);
