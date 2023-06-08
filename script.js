

// DOM elements -- references to various HTML elements
const charContainer = document.getElementById('char-container');
const charInput = document.getElementById('char-input');
const generateButton = document.getElementById('generate-btn');
const sortButton = document.getElementById('sort-btn');
const algorithmSelect = document.getElementById('algorithm-select');
const speedInput = document.getElementById('speed-input');
const swapTableBody = document.getElementById('swap-table-body');

// Generate random characters
function generateCharacters() {
    charContainer.innerHTML = '';
    const chars = charInput.value;

    for (let i = 0; i < chars.length; i++) {
        const char = document.createElement('div');
        char.classList.add('char');
        char.textContent = chars[i];
        charContainer.appendChild(char);
    }
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Create swap table row
function createSwapTableRow(swapNum, index1, index2, char1, char2) {
    const row = document.createElement('tr');

    const swapNumCell = document.createElement('td');
    swapNumCell.textContent = swapNum;
    row.appendChild(swapNumCell);

    const index1Cell = document.createElement('td');
    index1Cell.textContent = index1;
    row.appendChild(index1Cell);

    const index2Cell = document.createElement('td');
    index2Cell.textContent = index2;
    row.appendChild(index2Cell);

    const char1Cell = document.createElement('td');
    char1Cell.textContent = char1;
    row.appendChild(char1Cell);

    const char2Cell = document.createElement('td');
    char2Cell.textContent = char2;
    row.appendChild(char2Cell);

    return row;
}

// Bubble Sort
async function bubbleSort() {
    const chars = Array.from(charContainer.children);
    const n = chars.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            chars[j].classList.add('highlight');
            chars[j + 1].classList.add('highlight');
            await sleep(parseInt(speedInput.value));

            if (chars[j].textContent > chars[j + 1].textContent) {
                const temp = chars[j].textContent;
                chars[j].textContent = chars[j + 1].textContent;
                chars[j + 1].textContent = temp;

                const swapTableRow = createSwapTableRow(
                    `${i + 1}.${j + 1}`,
                    j,
                    j + 1,
                    chars[j].textContent,
                    chars[j + 1].textContent
                );
                swapTableBody.appendChild(swapTableRow);
            }

            chars[j].classList.remove('highlight');
            chars[j + 1].classList.remove('highlight');
        }

        chars[n - i - 1].classList.add('sorted');
    }

    chars[0].classList.add('sorted');
}

// Selection Sort
async function selectionSort() {
    const chars = Array.from(charContainer.children);
    const n = chars.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            chars[minIndex].classList.add('highlight');
            chars[j].classList.add('highlight');
            await sleep(parseInt(speedInput.value));

            if (chars[j].textContent < chars[minIndex].textContent) {
                chars[minIndex].classList.remove('highlight');
                minIndex = j;
                chars[minIndex].classList.add('highlight');
            }

            chars[j].classList.remove('highlight');
        }

        if (minIndex !== i) {
            const temp = chars[i].textContent;
            chars[i].textContent = chars[minIndex].textContent;
            chars[minIndex].textContent = temp;

            const swapTableRow = createSwapTableRow(
                i + 1,
                i,
                minIndex,
                chars[i].textContent,
                chars[minIndex].textContent
            );
            swapTableBody.appendChild(swapTableRow);
        }

        chars[i].classList.add('sorted');
    }

    chars[n - 1].classList.add('sorted');
}

// Insertion Sort

async function insertionSort() {
    const chars = Array.from(charContainer.children);
    const n = chars.length;

    for (let i = 1; i < n; i++) {
        const key = chars[i].textContent;
        let j = i - 1;

        while (j >= 0 && chars[j].textContent > key) {
            chars[j].classList.add('highlight');
            chars[j + 1].classList.add('highlight');
            const swapTableRow = createSwapTableRow(
                i,
                j,
                j + 1,
                chars[j].textContent,
                chars[j + 1].textContent
            );
            chars[j + 1].textContent = chars[j].textContent;
            chars[j].textContent = key;
            swapTableBody.appendChild(swapTableRow);

            await sleep(parseInt(speedInput.value));

            chars[j].classList.remove('highlight');
            chars[j + 1].classList.remove('highlight');

            j--;
        }


        chars[i].classList.add('sorted');
    }

    chars[0].classList.add('sorted');
}


//quicksort 
async function partition(low, high) {
    const chars = Array.from(charContainer.children);
    const pivot = chars[high].textContent;
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      chars[j].classList.add('highlight');
      await sleep(parseInt(speedInput.value));
  
      if (chars[j].textContent < pivot) {
        i++;
        const temp = chars[i].textContent;
        chars[i].textContent = chars[j].textContent;
        chars[j].textContent = temp;
  
        const swapTableRow = createSwapTableRow(
          " ",
          i,
          j,
          chars[i].textContent,
          chars[j].textContent
        );
        swapTableBody.appendChild(swapTableRow);
      }
  
      chars[j].classList.remove('highlight');
    }
  
    i++;
    const temp = chars[i].textContent;
    chars[i].textContent = chars[high].textContent;
    chars[high].textContent = temp;
  
    const swapTableRow = createSwapTableRow(
      " ",
      i,
      high,
      chars[i].textContent,
      chars[high].textContent
    );
    swapTableBody.appendChild(swapTableRow);
  
    return i;
  }
  
  async function quickSort(low, high) {
    if (low < high) {
      const partitionIndex = await partition(low, high);
  
      await Promise.all([
        quickSort(low, partitionIndex - 1),
        quickSort(partitionIndex + 1, high)
      ]);
    }
  }
  


// Merge Sort
// we go on dividing the elements untill single ele is left
async function merge(chars, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const leftChars = [];
    const rightChars = [];
  
    for (let i = 0; i < n1; i++) {
      leftChars[i] = chars[left + i].textContent;
    }
    for (let j = 0; j < n2; j++) {
      rightChars[j] = chars[mid + 1 + j].textContent;
    }
  
    let i = 0;
    let j = 0;
    let k = left;
    let count = 0;
    while (i < n1 && j < n2) {
      chars[k].classList.add('highlight');
      await sleep(parseInt(speedInput.value));
  
      if (leftChars[i] <= rightChars[j]) {
        chars[k].textContent = leftChars[i];
        i++;
      } else {
        count++;
        chars[k].textContent = rightChars[j];
        const swapTableRow = createSwapTableRow(
          count,
          k + i,
          k + j,
          leftChars[i],
          rightChars[j]
        );
        swapTableBody.appendChild(swapTableRow);
        j++;
      }
  
      chars[k].classList.remove('highlight');
      k++;
    }
  
    while (i < n1) {
      chars[k].classList.add('highlight');
      await sleep(parseInt(speedInput.value));
  
      chars[k].textContent = leftChars[i];
      chars[k].classList.remove('highlight');
      i++;
      k++;
    }
  
    while (j < n2) {
      chars[k].classList.add('highlight');
      await sleep(parseInt(speedInput.value));
  
      chars[k].textContent = rightChars[j];
      chars[k].classList.remove('highlight');
      j++;
      k++;
    }
  } 
  
  async function mergeSortHelper(chars, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(chars, left, mid);
      await mergeSortHelper(chars, mid + 1, right);
      await merge(chars, left, mid, right);
    } else if (left === right) {
      chars[left].classList.add('sorted');
    }
  }
  
  async function mergeSort() {
    const chars = Array.from(charContainer.children);
    const n = chars.length;
    await mergeSortHelper(chars, 0, n - 1);
  }
  














// Event listeners
generateButton.addEventListener('click', generateCharacters);
sortButton.addEventListener('click', () => {
    swapTableBody.innerHTML = '';
    const chars = Array.from(charContainer.children);
    const selectedAlgorithm = algorithmSelect.value;

    switch (selectedAlgorithm) {
        case 'bubble':
            bubbleSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'insertion':
            insertionSort();
            break;
        case 'quick':
            quickSort(0, chars.length - 1);
            break;
        case 'merge':
            mergeSort();
            break;
    }
});

