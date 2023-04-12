// import React from 'react';
// import { useState } from 'react';

// function CriteriaPopup({ amount }) {
//   const [inputs, setInputs] = useState({}); // state to hold the input elements
//   const [percentage, setPercentage] = useState({});

//   //For handling the value of inputs when there is a change
//   function handleChange(event) {
//     setInputs({
//       ...inputs,
//       [event.target.id]: event.target.value,
//     });
//     setPercentage({ ...inputs, [event.target.id]: 0 });
//   }

//   function handleAmountChange(event) {
//     setPercentage({});
//   }

//   const dataElement = Array.from({ length: amount }, (v, i) => i + 1).map(
//     (input) => {
//       return (
//         <div className="flex gap-3" key={`Criteria${input}`}>
//           <div className="w-2/6">
//             <label htmlFor={`criteria${input}`}>
//               {`Criteria Name ${input}`}:
//             </label>
//             <input
//               type="text"
//               id={`criteria${input}`}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               //   onChange={handleChange}
//             />
//           </div>
//           <div className="w-2/6">
//             <label htmlFor={`percentage${input}`}>
//               {`Percentage ${input}`}:
//             </label>
//             <input
//               type="number"
//               id={`percentage${input}`}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               //   onChange={handleChange}
//             />
//           </div>
//           <div className="w-2/6">
//             <label htmlFor={`subclass${input}`}>
//               {`Subclass Amount ${input}`}:
//             </label>
//             <input
//               type="text"
//               id={`subclass${input}`}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               //   onChange={handleChange}
//             />
//           </div>
//         </div>
//       );
//     }
//   );

//   return (
//     <div
//       id="defaultModal"
//       tabIndex={-1}
//       aria-hidden="true"
//       className="fixed  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
//     >
//       <div className="relative w-full max-w-2xl max-h-full">
//         {/* Modal content */}
//         <div className="relative bg-white rounded-lg shadow ">
//           {/* Modal header */}
//           <div className="flex items-start justify-between p-4 border-b rounded-t ">
//             <h3 className="text-xl font-semibold text-gray-900 ">
//               Criteria First Set-up
//             </h3>
//             <button
//               type="button"
//               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
//               data-modal-hide="defaultModal"
//             >
//               <svg
//                 aria-hidden="true"
//                 className="w-5 h-5"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="sr-only">Close modal</span>
//             </button>
//           </div>
//           {/* Modal body */}
//           <div className="p-6 space-y-6">
//             <p className="text-base leading-relaxed text-gray-500 ">
//               With less than a month to go before the European Union enacts new
//               consumer privacy laws for its citizens, companies around the world
//               are updating their terms of service agreements to comply.
//             </p>
//             {dataElement}
//           </div>
//           {/* Modal footer */}
//           <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
//             <button
//               data-modal-hide="defaultModal"
//               type="button"
//               className="text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CriteriaPopup;
