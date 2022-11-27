require('../bootstrap');
import React, {useState} from 'react';

/**
 *
 * @param props = data from the controller
 * @returns {JSX.Element}
 * @constructor
 */
export default function Box(props){

    const [data, setData] = useState([]);
    const [emailSentMessage, setEmailSentMessage] = useState("");

    //listen for BoxCreatedEvent
    window.Echo.channel("box.created").listen("BoxCreatedEvent", function (response){
        //set state of data
        setData(response.boxes);
        console.log(data);
    });

    //listen for Email SentEvent
    window.Echo.channel("email.sent").listen("EmailSentEvent", function (response){
        //set state of emailSentMessage
        setEmailSentMessage(response.message);
    });

    //box component
    function BoxComponent(props){
        return(
            <div className="h-12 w-20" style={{ "height": props.height, "width": props.width, "backgroundColor": props.color }}></div>
        );
    }

    //email sent component
    function EmailSent(props){
        if(props.message ){
            return(
                <h1 className="text-6xl">{props.message}</h1>
            );
        }else{
            return "";
        }
    }

    //renders multiple box components
    function getBoxComponent(){
        return (
            data.map(item => {
                return <BoxComponent key={item.id} height={item.height + "px"} width={item.width + "px"} color={item.color} />
            })
        );
    }

    //return component markup
    return(
        <>
            <EmailSent message={emailSentMessage.message} />
            {
                data.length > 0 ?
                getBoxComponent()
                :
                <h1>Loading</h1>
            }
        </>

    );

}
