function fetchSpanIds() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;  // No selection, so exit

    const selectedRange = selection.getRangeAt(0);  // Get the selected range

    // Get all spans with class "permalinky"
    const spans = document.querySelectorAll('span.permalinky');

    let startId = null;
    let endId = null;

    const selectedSpanIds = [];

    spans.forEach(span => {
        // Check if the current span is part of the selected range
        if (selectedRange.intersectsNode(span)) {
            selectedSpanIds.push(span.id);
        }
    });
    startId = selectedSpanIds[0];
    endId = selectedSpanIds[selectedSpanIds.length - 1]

    // If startId and endId are set, construct the URL and open the modal
    if (startId && endId) {

        console.log(`Start ID: ${startId}, End ID: ${endId}`);
        offsets = `
        {
            "start": "${startId}",
            "end": "${endId}",
            "payload": ""
        }
        `
        console.log(offsets);

        currentUrl = location.protocol + '//' + location.host + location.pathname
        permlink = `${currentUrl}?from=${startId}&to=${endId}`


        // Insert the URL into the modal's content
        document.getElementById('modalText').textContent = offsets;
        document.getElementById('permalink').textContent = permlink;

        // Show the modal using Bootstrap's JavaScript API
        const modal = new bootstrap.Modal(document.getElementById('selectionModal'));
        modal.show();
    } else {
        console.log("No spans selected.");
    }
}


// Function to highlight a node (either text or element)
function highlightNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        // Wrap text node in a span and apply background color
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        node.parentNode.insertBefore(span, node);
        span.appendChild(node);
        return span
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.style.backgroundColor = 'yellow';
        return node
    }
}

// Example: bind this function to mouseup event to trigger on text selection
document.addEventListener('mouseup', fetchSpanIds);


function highlight(start, stop, payload) {
    const startId = start;
    const endId = stop;
    const startElement = document.getElementById(startId);
    const endElement = document.getElementById(endId);

    // If the start or end element is not found, stop
    if (!startElement || !endElement) {
        console.error("Start or End element not found in the DOM.");
        return;
    }
    // Traverse from startElement to endElement and highlight everything in between
    let currentElement = startElement;

    while (currentElement) {
        // Highlight the current node
        newEl = highlightNode(currentElement);

        // Stop once we reach the end element
        if (currentElement === endElement) {
            console.log("hallo");
            if (payload) {
                const newDiv = document.createElement("div");
                newDiv.style.backgroundColor = "lightGrey"
                newDiv.classList.add("p-5", "text-center")
                
                newDiv.style.position = "relative"
	      newDiv.style.zIndex = "-10"
                
                const newContent = document.createTextNode(payload);
                newDiv.appendChild(newContent);
                currentElement.insertAdjacentElement("beforeend", newDiv)
            }

            break
        }


        // Move to the next node (including text nodes, elements, etc.)
        currentElement = newEl.nextSibling;
    }
}

function highlightBetweenIdsFromUrl() {
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const annotationSource = urlParams.get('annotations')
    if (annotationSource) {
        fetch(annotationSource)
            .then((res) => {
                if (!res.ok) {
                    throw new Error
                        (`HTTP error! Status: ${res.status}`);
                }
                return res.json()
            })
            .then((data) =>
                // console.log(data))
                data.forEach((item) => {
                    highlight(item["start"], item["end"], item["payload"])
                })
            )
            .catch((error) =>
                console.error("Unable to fetch data:", error));
    }
}

function highlightCitedPassages() {
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const startId = urlParams.get('from')
    const endId = urlParams.get('to')
    if (startId && endId) {
        highlight(startId, endId, "")
    }
}

// Call the function to highlight elements and text on page load
window.addEventListener('DOMContentLoaded', highlightBetweenIdsFromUrl);
window.addEventListener('DOMContentLoaded', highlightCitedPassages);

