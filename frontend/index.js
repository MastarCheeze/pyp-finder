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

const submit = async function (ev) {
  const code = $("#search-bar-input").value.toUpperCase();
  if (code.match(validRegex)) {
    const type = (function() {
      if ($(".options #qp").checked) return "qp";
      if ($(".options #ms").checked) return "ms";
      if ($(".options #insert").checked) return "insert";
      if ($(".options #pre").checked) return "pre";
    })()

    const query = new URLSearchParams();
    query.set("code", code);
    query.set("type", type);
    const queryUrl = api + "?" + query.toString();

    $("#status-text").innerText = "Searching...";
    $("#status-text").style.visibility = "visible";

    const res = await fetch(queryUrl);
    const json = await res.json();

    if (json.success === 1) {
      window.open(json.url);
      $("#status-text").style.visibility = "hidden";
    } else {
      $("#status-text").innerText = json.message;
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
  const input = $("#search-bar-input").value.toUpperCase();
  const matchInsert = input.includes("INSERT");
  const matchPre = input.includes("PRE");

  if (matchInsert || matchPre) {
    if (!prevType) {
      if ($(".options #qp").checked) prevType = "qp";
      else if ($(".options #ms").checked) prevType = "ms";
      else if ($(".options #insert").checked) prevType = "insert";
      else prevType = "pre";
    }

    $(".options #qp").disabled = true;
    $(".options #ms").disabled = true;
    $(".options #insert").disabled = !matchInsert;
    $(".options #pre").disabled = !matchPre;

    $(".options #insert").checked = matchInsert;
    $(".options #pre").checked = matchPre;
  } else if (prevType) {
    $(".options #qp").disabled = false;
    $(".options #ms").disabled = false;
    $(".options #insert").disabled = false;
    $(".options #pre").disabled = false;

    $(`.options #${prevType}`).checked = true;

    prevType = null;
  }
  $("#status-text").style.visibility = "hidden";
  $("#status-text").className = "";
};
$("#search-bar-input").addEventListener("input", checkType);
