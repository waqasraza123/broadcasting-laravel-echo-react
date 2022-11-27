require('../bootstrap');
import React, {useEffect, useState} from 'react';

/**
 *
 * @param props = data from the controller
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxComponent(props){

    const [data, setData] = useState([]);
    const [boxItems, setBoxItems] = useState([]);
    const [emailSentMessage, setEmailSentMessage] = useState("");

    //listen to state changes in data
    //call boxMarkup to render boxes
    useEffect(() => {
        boxMarkup();
    }, [data]);

    //component mounted to the dom
    useEffect(() => {
        //listen for BoxCreatedEvent
        window.Echo.channel("box.created").listen("BoxCreatedEvent", function (response){
            //set state of data
            setData(response.boxes);
        });

        //listen for Email SentEvent
        window.Echo.channel("email.sent").listen("EmailSentEvent", function (response){
            //set state of emailSentMessage
            setEmailSentMessage(response.message);
        });
    });

    //email sent message component
    function EmailSent(props){
        if(props.message){
            return(
                <h1 className="text-6xl">{props.message}</h1>
            );
        }else{
            return "";
        }
    }

    //box component
    function Box(props){
        return(
            <div style={{ "height": props.height, "width": props.width, "backgroundColor": props.color }}></div>
        );
    }

    //returns box markup
    function boxMarkup(){
        const newBox = data.length == 0 ? "" :
            (
                <div className={"columns-" + data.length}>
                    {
                        data.map(item => <Box key={item.id} height={item.height + "px"} width={item.width + "px"} color={item.color}/>)
                    }
                </div>
            );

        //set the state of boxItems
        setBoxItems([...boxItems, newBox]);
    }

    //sort the data by color name
    function handleSort(){

        const sortedData = [...data].sort((a, b) => a.color.localeCompare(b.color));

        //update the state with sorted data
        setData(sortedData);
    }

    //shuffle the colors array
    function handleShuffle(){
        const shuffledData = _.shuffle([...data]);

        //update the state with shuffled data
        setData(shuffledData);
    }

    //render sort and shuffle buttons
    function renderButtons(){
        if (data.length >= 16){
            return(
                <div className="buttons-wrapper p-9" style={{width: "100%"}}>
                    <button onClick={handleSort} boxes={data}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Sort Boxes
                    </button>
                    <button onClick={handleShuffle} boxes={data}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
                        Shuffle Boxes
                    </button>
                </div>
            );
        }
    }

    //return component markup
    return(
        <>
            {renderButtons()}
            <div style={{"display": "grid", "gridTemplateColumns": "auto auto auto auto auto"}}>
                <EmailSent message={emailSentMessage.message} />
                {boxItems}
            </div>
        </>
    );
}
