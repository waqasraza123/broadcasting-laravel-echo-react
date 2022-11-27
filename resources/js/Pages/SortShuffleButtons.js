import React from "react";

/**
 *
 * renders Sort and Shuffle buttons
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SortShuffleButtons = (props) => {

    /**
     * Sorts the data by color name
     * updates the data state => setData
     * @param props
     */
    function handleSort(){

        const sortedData = [...props.data].sort((a, b) => a.color.localeCompare(b.color));

        //update the state with sorted data
        props.dataStateChanger(sortedData);
    }

    /**
     * Shuffles the data
     * updates the data state => setData
     * @param props
     */
    function handleShuffle(){

        const shuffledData = _.shuffle([...props.data]);

        //update the state with shuffled data
        props.dataStateChanger(shuffledData);
    }

    return(
        <div className="buttons-wrapper p-9" style={{width: "100%"}}>
            <button key={props.data.id} onClick={() => handleSort(props)}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Sort Boxes
            </button>
            <button key={props.data.id} onClick={() => handleShuffle(props)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                Shuffle Boxes
            </button>
        </div>
    );
}


//export button component
export { SortShuffleButtons };
