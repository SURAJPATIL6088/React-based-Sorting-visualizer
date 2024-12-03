// import React, { Component } from 'react';
// import './App.css';
// import './AppDark.css';

// import AppControls from './components/molecules/AppControls';
// import TopBar from './components/organisms/TopBar';
// import AppDrawer from './components/organisms/AppDrawer';
// import SortVisualizer from './components/organisms/SortVisualizer';

// import BubbleSort, {
//   BubbleSortKey,
//   BubbleSortDesc
// } from './algorithms/BubbleSort';
// import SelectionSort, {
//   SelectionSortKey,
//   SelectionSortDesc
// } from './algorithms/SelectionSort';
// import InsertionSort, {
//   InsertionSortKey,
//   InsertionSortDesc
// } from './algorithms/InsertionSort';
// import MergeSort, {
//   MergeSortKey,
//   MergeSortDesc
// } from './algorithms/MergeSort';
// import QuickSort, {
//   QuickSortKey,
//   QuickSortDesc
// } from './algorithms/QuickSort';


// class App extends Component {
//   state = {
//     darkMode: false,
//     array: [],
//     arraySize: 10,
//     trace: [],
//     algorithm: null,
//     appDrawerOpen: false
//   };

//   ALGORITHM = {
//     'Bubble Sort': BubbleSort,
//     'Selection Sort': SelectionSort,
//     'Insertion Sort': InsertionSort,
//     'Merge Sort': MergeSort,
//     'Quick Sort': QuickSort
//   };

//   ALGORITHM_KEY = {
//     'Bubble Sort': BubbleSortKey,
//     'Selection Sort': SelectionSortKey,
//     'Insertion Sort': InsertionSortKey,
//     'Merge Sort': MergeSortKey,
//     'Quick Sort': QuickSortKey
//   };

//   ALGORITHM_DESC = {
//     'Bubble Sort': BubbleSortDesc,
//     'Selection Sort': SelectionSortDesc,
//     'Insertion Sort': InsertionSortDesc,
//     'Merge Sort': MergeSortDesc,
//     'Quick Sort': QuickSortDesc,
//   };

//   componentDidMount() {
//     this.generateRandomArray();
//   }

//   generateRandomArray = () => {
//     // Generate pseudo-random number between 1 and max
//     function getRandomInt(max) {
//       return Math.floor(Math.random() * Math.floor(max)) + 1;
//     }

//     // Generate an array of length max
//     const array = Array(this.state.arraySize)
//       .fill(0)
//       .map(() => getRandomInt(this.state.arraySize * 5));

//     this.setState(
//       {
//         array,
//         trace: []
//       },
//       this.createTrace
//     );
//   };

//   handleAlgorithmChange = (algorithm) => {
//     this.setState({ algorithm }, this.generateRandomArray);
//   };

//   handleArraySizeChange = (size) => {
//     size = Number(size);
//     size = size > 100 ? 100 : size;
//     size = size < 0 ? 0 : size;
//     this.setState({ arraySize: size }, this.generateRandomArray);
//   };

//   createTrace = () => {
//     const numbers = [...this.state.array];
//     const sort = this.ALGORITHM[this.state.algorithm];
//     if (sort) {
//       const trace = sort(numbers);
//       this.setState({ trace });
//     }
//   };

//   toggleDarkMode = () => {
//     this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
//   };

//   toggleAppDrawer = () => {
//     this.setState((prevState) => ({
//       appDrawerOpen: !prevState.appDrawerOpen
//     }));
//   };

//   render() {
//     let theme = `App`;
//     if (this.state.darkMode) theme += ` App_dark`;
//     if (this.state.appDrawerOpen) theme += ` App_modal_open`;

//     const colorKey = this.ALGORITHM_KEY[this.state.algorithm];
//     const desc = this.ALGORITHM_DESC[this.state.algorithm];

//     const controls = (
//       <AppControls
//         onGenerateRandomArray={this.generateRandomArray}
//         algorithm={this.state.algorithm}
//         onAlgorithmChange={this.handleAlgorithmChange}
//         arraySize={this.state.arraySize}
//         onArraySizeChange={this.handleArraySizeChange}
//         onToggleDarkMode={this.toggleDarkMode}
//         darkMode={this.state.darkMode}
//       />
//     );

//     return (
//       <div className={theme}>
//         <TopBar
//           drawerOpen={this.state.appDrawerOpen}
//           toggleDrawer={this.toggleAppDrawer}
//         >
//           {controls}
//         </TopBar>

//         <AppDrawer
//           open={this.state.appDrawerOpen}
//           closeDrawer={this.toggleAppDrawer}
//         >
//           {controls}
//         </AppDrawer>

//         <main className="App__Body">
//           <SortVisualizer
//             array={this.state.array}
//             trace={this.state.trace}
//             colorKey={colorKey}
//             desc={desc}
//           />
//         </main>
//       </div>
//     );
//   }
// }

// export default App;


import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import AppControls from './components/molecules/AppControls';
import TopBar from './components/organisms/TopBar';
import AppDrawer from './components/organisms/AppDrawer';
import SortVisualizer from './components/organisms/SortVisualizer';

import BubbleSort, {
  BubbleSortKey,
  BubbleSortDesc
} from './algorithms/BubbleSort';
import SelectionSort, {
  SelectionSortKey,
  SelectionSortDesc
} from './algorithms/SelectionSort';
import InsertionSort, {
  InsertionSortKey,
  InsertionSortDesc
} from './algorithms/InsertionSort';
import MergeSort, {
  MergeSortKey,
  MergeSortDesc
} from './algorithms/MergeSort';
import QuickSort, {
  QuickSortKey,
  QuickSortDesc
} from './algorithms/QuickSort';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [trace, setTrace] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [appDrawerOpen, setAppDrawerOpen] = useState(false);

  const ALGORITHM = {
    'Bubble Sort': BubbleSort,
    'Selection Sort': SelectionSort,
    'Insertion Sort': InsertionSort,
    'Merge Sort': MergeSort,
    'Quick Sort': QuickSort
  };

  const ALGORITHM_KEY = {
    'Bubble Sort': BubbleSortKey,
    'Selection Sort': SelectionSortKey,
    'Insertion Sort': InsertionSortKey,
    'Merge Sort': MergeSortKey,
    'Quick Sort': QuickSortKey
  };

  const ALGORITHM_DESC = {
    'Bubble Sort': BubbleSortDesc,
    'Selection Sort': SelectionSortDesc,
    'Insertion Sort': InsertionSortDesc,
    'Merge Sort': MergeSortDesc,
    'Quick Sort': QuickSortDesc
  };

  const generateRandomArray = useCallback(() => {
    const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

    const newArray = Array(arraySize)
      .fill(0)
      .map(() => getRandomInt(arraySize * 5));

    setArray(newArray); // Only set array once, preventing infinite re-renders
    setTrace([]); // Clear trace when a new array is generated
  }, [arraySize]); // Only re-run when arraySize changes

  const handleAlgorithmChange = (selectedAlgorithm) => {
    setAlgorithm(selectedAlgorithm);
  };

  const handleArraySizeChange = (size) => {
    const newSize = Math.max(0, Math.min(Number(size), 100));
    setArraySize(newSize); // Ensure size is within the acceptable range
  };

  const createTrace = useCallback(() => {
    if (algorithm) {
      const sort = ALGORITHM[algorithm];
      if (sort) {
        const newTrace = sort([...array]); // Copy array to avoid mutation
        setTrace(newTrace);
      }
    }
  }, [algorithm, array]);

  useEffect(() => {
    generateRandomArray(); // Generate array when arraySize changes
  }, [generateRandomArray]); // Only run when arraySize changes

  useEffect(() => {
    createTrace(); // Create trace when algorithm or array changes
  }, [createTrace]); // Only run when algorithm or array changes

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const toggleAppDrawer = () => setAppDrawerOpen((prev) => !prev);

  let theme = `App`;
  if (appDrawerOpen) theme += ` App_modal_open`;

  const colorKey = ALGORITHM_KEY[algorithm];
  const desc = ALGORITHM_DESC[algorithm];

  const controls = (
    <AppControls
      onGenerateRandomArray={generateRandomArray}
      algorithm={algorithm}
      onAlgorithmChange={handleAlgorithmChange}
      arraySize={arraySize}
      onArraySizeChange={handleArraySizeChange}
      onToggleDarkMode={toggleDarkMode}
      darkMode={darkMode}
    />
  );

  return (
    <div className={theme}>
      <TopBar drawerOpen={appDrawerOpen} toggleDrawer={toggleAppDrawer}>
        {controls}
      </TopBar>

      <AppDrawer open={appDrawerOpen} closeDrawer={toggleAppDrawer}>
        {controls}
      </AppDrawer>

      <main className="App__Body">
        <SortVisualizer
          array={array}
          trace={trace}
          colorKey={colorKey}
          desc={desc}
        />
      </main>
    </div>
  );
};

export default App;
