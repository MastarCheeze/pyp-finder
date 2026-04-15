<script setup>
import { ref } from "vue"
import NavigationBar from './components/NavigationBar.vue'
import SearchBar from './components/SearchBar.vue'
import Contents from './components/Contents.vue'

const paperCodeRegex = /^\d{4}\/\d{2}\/(?:(.*)\/)?(?:F\/M|M\/J|O\/N)\/\d{2}$/; // regex to check if code is valid

const typeOrder = {
  qp: 0, // Question paper.
  ms: 1, // Mark scheme.
  in: 2, // Insert.
  i2: 3, // Insert 2 (Survey map) for Geography.
  pm: 4, // Pre-release material for Computer Science.
  ci: 5, // Confidential instructions.
  er: 6, // Examiner report.
  gt: 7, // Grade thresholds.
  sy: 8, // Syllabus.
  rl: 9, // Reference list for Psychology.
}

const searchBarRef = ref(null)
const results = ref([])

const apiUrl = "https://pypfinder.mastarcheeze.com/api/v1"

async function search(paperCode) {
  paperCode = paperCode.toUpperCase()

  if (paperCode.match(paperCodeRegex)) {
    searchBarRef.value.setSearching()
    results.value = []

    let mainRes, mainJson
    try {
      mainRes = await fetch(apiUrl + "/resources?paper-code=" + paperCode)
      mainJson = await mainRes.json()
    } catch {
      searchBarRef.value.setStatus("Unable to connect to API.", "error")
      return
    }

    if (!mainJson.success) {
      searchBarRef.value.setStatus("An unknown error has occured.", "error")
      return
    }

    if (mainJson.results.length == 0) {
      searchBarRef.value.setStatus("No results found.", "")
      return
    }

    // Take the qp if there are qp and ms, else take the only item
    let id = ""
    if (mainJson.results.length == 1) {
      id = mainJson.results[0].id
    } else {
      id = mainJson.results.filter(v => v.typeId == "qp")[0].id
    }

    const relatedRes = await fetch(apiUrl + "/resources/" + id + "/related")
    const relatedJson = await relatedRes.json()

    if (!relatedJson.success) {
      searchBarRef.value.setStatus("An unknown error has occured.", "error")
      return
    }

    const res = relatedJson.results
    res.sort(compareResult)

    res.unshift(relatedJson.metadata.resource)
    results.value = res.map(convertResult)
    searchBarRef.value.setStatus("Found " + results.value.length + " results.")
  } else {
    searchBarRef.value.setStatus("Invalid paper code.", "error")
  }
}

// convert api's json result to an object so that the Contents child can accept it
function convertResult(obj, idx) {
  let examSeries = null
  let year = null
  if (obj.seasonId !== undefined) {
    examSeries = obj.season + " " + obj.year.toString()
  } else if (obj.year !== undefined) {
    year = obj.year.toString()
  } else {
    year = obj.yearStart.toString() + "-" + obj.yearEnd.toString()
  }

  let component = null
  if (obj.componentNumber !== undefined) {
    component = "Paper " + obj.componentNumber + ": " + obj.componentName
  }

  let variant = null
  if (obj.variantNumber !== undefined) {
    variant = obj.variantNumber
  }

  return {
    id: idx,
    type: obj.typeName + (obj.update ? " update" : ""),
    typeId: obj.typeId,
    url: obj.urls[0],
    qualification: obj.qualificationName,
    subject: obj.subjectName + " " + obj.subjectId,
    examSeries: examSeries,
    year: year,
    component: component,
    variant: variant,
    alternativeUrls: obj.urls.slice(1),
  }
}

function compareResult(a, b) {
  return (typeOrder[a.typeId] ?? 99) - (typeOrder[b.typeId] ?? 99)
}
</script>

<template>
  <NavigationBar />
  <main>
    <h2>Search CAIE past year papers effortlessly.</h2>
    <div class="container">
      <SearchBar ref="searchBarRef" @search="search" />
      <Contents v-model:results="results" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  width: clamp(200px, 50%, 600px);
  margin-top: 3em;
  font-size: 1.5rem;
  color: var(--color-brand);
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.container {
  width: clamp(200px, 60%, 600px)
}
</style>