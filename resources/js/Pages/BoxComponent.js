import axios from "axios";

require('../bootstrap');
import React, {useEffect, useState} from 'react';
import {SortShuffleButtons} from "@/Pages/SortShuffleButtons";

/**
 *
 * @param props = data from the controller
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxComponent(props){

    const [data, setData] = useState([]);
    const [boxItems, setBoxItems] = useState([]);


    /**
     * listen for state change on data
     * when setData is called we fire boxMarkup function
     */
    useEffect(() => {
        boxMarkup();
    }, [data]);


    /**
     * start listening for data
     * when the component mounts/renders
     * only runs once
     */
    useEffect(() => {

        //listen for BoxCreatedEvent
        window.Echo.channel("box.created").listen("BoxCreatedEvent", function (response){

            //update the data state
            //overwrite the old data
            setData(response.boxes);
        });

        //fetch data from the database
        const boxesData = async () => {
            let res = await axios.get("http://localhost:8000/boxes");
            res = await res.data;
            setData(res);
        }

        //catch errors
        boxesData()
            .catch(err => console.log(err));
    }, []);

    /**
     * Box Component
     * @param props
     * @returns {JSX.Element}
     * @constructor
     */
    function Box(props){
        return(
            <div style={{ "height": props.height, "width": props.width, "backgroundColor": props.color }}></div>
        );
    }

    /**
     * creates box grid markup
     * updates state
     */
    function boxMarkup(){

        if(data){
            const newBox = data.length == 0 ? "" :
                (
                    <div key={data.length} className={"columns-" + data.length}>
                        {
                            data.map(item => <Box key={item.id} height={item.height + "px"} width={item.width + "px"} color={item.color}/>)
                        }
                    </div>
                );

            //set the state of boxItems
            setBoxItems([...boxItems, newBox]);
        }
    }


    return(
        <>
            { (data && data.length) >= 16 ? <SortShuffleButtons
                data={data} dataStateChanger={setData}
                boxItemsStateChanger={setBoxItems} /> : ""
            }

            <div style={{"display": "grid", "gridTemplateColumns": "auto auto auto auto auto"}}>
                {boxItems}
            </div>
        </>
    );
}
